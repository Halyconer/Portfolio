from flask import Flask, request, jsonify, send_file
import sqlite3
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

# Configuration from environment variables
FLASK_ENV = os.getenv('FLASK_ENV', 'production')
DEVELOPMENT_MODE = os.getenv('DEVELOPMENT_MODE', 'false').lower() == 'true'
ALLOWED_ORIGIN = os.getenv('ALLOWED_ORIGIN', 'https://halyconer.github.io')

# LIFX A19 — discovered via LAN broadcast; cached after first discovery
_lifx_light = None

# Print configuration on startup
print(f"Flask Environment: {FLASK_ENV}")
print(f"Development Mode: {DEVELOPMENT_MODE}")
print(f"Allowed Origin: {ALLOWED_ORIGIN}")

app = Flask(__name__)

# CORS is handled by nginx - no Flask CORS configuration needed
# This prevents duplicate CORS headers

if DEVELOPMENT_MODE:
    print("Development mode - CORS handled by nginx")
else:
    print(f"Production mode - CORS handled by nginx for: {ALLOWED_ORIGIN}")

def get_bulb():
    """Return a cached LIFX Light. Prefer unicast (env-configured), fall back to discovery.

    If BULB_MAC and BULB_IP are set in the environment, construct the Light
    object directly — no broadcast needed. This is the production path on
    networks where the router drops broadcast UDP between mesh nodes
    (notably Linksys Velop), which silently breaks LifxLAN's discovery
    even though unicast LIFX traffic on UDP 56700 works fine.

    Without those vars, fall back to LAN broadcast discovery. Useful for
    quick local testing on simpler networks where broadcast works.
    """
    global _lifx_light
    if _lifx_light is not None:
        return _lifx_light
    try:
        from lifxlan import Light, LifxLAN
        mac = os.getenv("BULB_MAC")
        ip = os.getenv("BULB_IP")
        if mac and ip:
            _lifx_light = Light(mac, ip)
            return _lifx_light
        lan = LifxLAN(1)
        devices = lan.get_lights()
        if not devices:
            return None
        _lifx_light = devices[0]
        return _lifx_light
    except Exception:
        return None

def rgb_to_hsbk(r, g, b):
    """
    Convert RGB (each 0–255) to LIFX's HSBK tuple.

    The math, step by step:

    1. Normalise to 0.0–1.0 so we're working in fractions.
    2. Find the dominant channel (max) and the spread (max - min).
       - max tells us how bright the colour is (value/brightness).
       - the spread (called 'delta') tells us how saturated it is —
         a grey has equal R/G/B so delta == 0; a pure red has delta == max.
    3. Saturation = delta / max  (if the colour is totally dark, saturation is 0).
    4. Hue is calculated differently depending on which channel dominates,
       because hue is an angle around a colour wheel (0°–360°):
         - Red dominant  → hue lives in the 0°–60° / 300°–360° sector
         - Green dominant → 60°–180°
         - Blue dominant  → 180°–300°
       The formula picks the right sector and interpolates within it.
    5. LIFX doesn't use 0–360 or 0–1; it scales everything to 0–65535.
       Kelvin controls the warmth of *white* light and doesn't meaningfully
       affect saturated colours, so we fix it at 3500K (neutral warm white).
    """
    # Step 1 — normalise
    r_, g_, b_ = r / 255.0, g / 255.0, b / 255.0

    # Step 2 — find range
    max_c = max(r_, g_, b_)
    min_c = min(r_, g_, b_)
    delta = max_c - min_c

    # Step 3 — brightness (LIFX calls this 'value')
    brightness = max_c  # 0.0 = off, 1.0 = full brightness

    # Step 4 — saturation
    saturation = 0.0 if max_c == 0 else delta / max_c

    # Step 5 — hue angle
    if delta == 0:
        hue = 0.0  # achromatic (grey), hue is undefined so we default to 0
    elif max_c == r_:
        # Red is dominant; wrap with % 6 to handle the red sector that wraps past 360°
        hue = ((g_ - b_) / delta) % 6
    elif max_c == g_:
        # Green dominant; offset by 2 to land in the 120°–240° sector
        hue = (b_ - r_) / delta + 2
    else:
        # Blue dominant; offset by 4 to land in the 240°–360° sector
        hue = (r_ - g_) / delta + 4

    hue = hue / 6.0  # convert from 0–6 range to 0.0–1.0 fraction of full circle

    # Step 6 — scale to LIFX's 0–65535 range
    return (
        int(hue * 65535),         # hue
        int(saturation * 65535),  # saturation
        int(brightness * 65535),  # brightness
        3500                      # kelvin — neutral warm white
    )


@app.before_request
def check_auth():
    if request.endpoint not in ('set_brightness', 'set_color'):
        return

    # Skip authentication checks in development mode
    if DEVELOPMENT_MODE:
        print("Development mode: Skipping origin/referer checks")
        return

    origin = request.headers.get("Origin")
    referer = request.headers.get("Referer")
    
    # origin and referrer are always automatically attached by browsers when making CORS requests
    # this should block against curl or postman in production mode
    if origin != ALLOWED_ORIGIN and (referer is None or not referer.startswith(ALLOWED_ORIGIN)):
        print(f"Request blocked - Origin: {origin}, Referer: {referer}")
        return jsonify({"error": "Request origin not allowed"}), 403

# SQL database setup
def log_call(brightness, status, r=None, g=None, b=None):
    conn = sqlite3.connect('calls.db')

    # r/g/b columns are nullable — brightness-only calls leave them NULL
    conn.execute('''
        CREATE TABLE IF NOT EXISTS calls (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            brightness INTEGER,
            status    INTEGER,
            r         INTEGER,
            g         INTEGER,
            b         INTEGER
        )
    ''')
    conn.execute(
        'INSERT INTO calls (brightness, status, r, g, b) VALUES (?, ?, ?, ?, ?)',
        (brightness, status, r, g, b)
    )
    conn.commit()
    conn.close()

# Endpoint to set brightness and log the call to the database
@app.route('/set_brightness', methods=['POST']) # Remember that with app.route, /set_brightness is the endpoint, not /set_brightness/
def set_brightness():
    data = request.get_json(silent=True) or request.form.to_dict() # Returns None if the request body is empty or not JSON
    value = data.get('brightness')
    
    if value is None:
        log_call(None, 400)  # Log the failure
        return jsonify({"error": "No brightness provided - Please let me know how you did that."}), 400

    try:
        br = int(value)
    except ValueError:
        log_call(None, 400)  # Log the failure
        return jsonify({"error": "Brightness must be an integer"}), 400

    if not 1 <= br <= 100:
        log_call(br, 400)  # Log the failure
        return jsonify({"error": "How the hell did you ask for something below 1 or above 100?"}), 400

    bulb = get_bulb()
    if bulb is None:
        log_call(br, 500)  # Log the failure
        return jsonify({"error": "Either my Bulb is dead or you have a bad connection."}), 500

    try:
        # Power on first (equivalent to yeelight's auto_on=True)
        bulb.set_power("on")
        # lifxlan brightness range is 0–65535; remap from 1–100
        lifx_brightness = int(round(br / 100 * 65535))
        bulb.set_brightness(lifx_brightness, rapid=False)
        log_call(br, 200)  # Log the success
        return jsonify({"status": "success", "brightness_set": br}), 200
    except Exception as e:
        log_call(br, 500)  # Log the failure
        return jsonify({"error": f"For Adrian: {e}"}), 500

# Endpoint to set colour (RGB → HSBK) and optionally brightness
@app.route('/set_color', methods=['POST'])
def set_color():
    data = request.get_json(silent=True) or request.form.to_dict()

    # Validate R, G, B
    try:
        r = int(data.get('r'))
        g = int(data.get('g'))
        b = int(data.get('b'))
    except (TypeError, ValueError):
        return jsonify({"error": "r, g, b must all be integers"}), 400

    if not all(0 <= c <= 255 for c in (r, g, b)):
        return jsonify({"error": "r, g, b must each be between 0 and 255"}), 400

    # Brightness is optional — defaults to 100 if not supplied
    brightness_raw = data.get('brightness', 100)
    try:
        br = int(brightness_raw)
    except (TypeError, ValueError):
        return jsonify({"error": "brightness must be an integer"}), 400

    if not 1 <= br <= 100:
        return jsonify({"error": "brightness must be between 1 and 100"}), 400

    bulb = get_bulb()
    if bulb is None:
        log_call(br, 500, r, g, b)
        return jsonify({"error": "Either my Bulb is dead or you have a bad connection."}), 500

    try:
        hue, sat, lifx_br, kelvin = rgb_to_hsbk(r, g, b)
        # Override brightness with the caller's value rather than the RGB-derived one
        lifx_br = int(round(br / 100 * 65535))

        bulb.set_power("on")
        # set_color takes (hue, saturation, brightness, kelvin, duration, rapid)
        bulb.set_color([hue, sat, lifx_br, kelvin], rapid=False)
        log_call(br, 200, r, g, b)
        return jsonify({"status": "success", "r": r, "g": g, "b": b, "brightness_set": br}), 200
    except Exception as e:
        log_call(br, 500, r, g, b)
        return jsonify({"error": f"For Adrian: {e}"}), 500


# Endpoint to serve the stats.json file
@app.route('/stats.json', methods=['GET'])
def serve_stats():
    try:
        return send_file('stats.json', mimetype='application/json')
    except FileNotFoundError:
        # Return empty stats if file doesn't exist yet
        return jsonify({
            "last_updated": datetime.now().isoformat(),
            "collection_period": "24_hours",
            "update_frequency": "daily", 
            "total_calls_all_time": 0,
            "avg_brightness_all_time": 0
        })

# Endpoint to serve the spotify stats file
@app.route('/spotify_stats.json', methods=['GET'])
def serve_spotify_stats():
    try:
        return send_file('spotify_top_artists.json', mimetype='application/json')
    except FileNotFoundError:
        # Return empty stats if file doesn't exist yet
        return jsonify({
            "last_updated_utc": datetime.utcnow().isoformat(),
            "artists": []
        })

# Development mode endpoint for testing
@app.route('/dev/status')
def dev_status():
    """Development endpoint to check current configuration"""
    if not DEVELOPMENT_MODE:
        return jsonify({"error": "This endpoint is only available in development mode"}), 404
    
    return jsonify({
        "flask_env": FLASK_ENV,
        "development_mode": DEVELOPMENT_MODE,
        "allowed_origin": ALLOWED_ORIGIN,
        "lifx_cached": _lifx_light is not None,
        "request_origin": request.headers.get("Origin"),
        "request_referer": request.headers.get("Referer"),
        "user_agent": request.headers.get("User-Agent")
    })

if __name__ == '__main__': # Only to be run when this file is executed directly on the Pi
    debug_mode = DEVELOPMENT_MODE or FLASK_ENV == 'development'
    app.run(host='0.0.0.0', port=5001, debug=debug_mode)
