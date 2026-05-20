# Portfolio Deployment

Operational runbook for the self-hosted backend stack running on the Raspberry Pi.

Architecture-level "why" lives in the inline comments of `docker-compose.yml` and `nginx/nginx.conf` — this doc is just *how to run it*.

## Architecture

```
adrianeddy.com (Vercel-hosted frontend)
         │
         ▼
ngrok static URL: https://valid-goblin-full.ngrok-free.app
         │
         ▼
Pi host:8080 — nginx reverse proxy (CORS + path routing)
         │
   ┌─────┴─────┐
   ▼           ▼
host:5001   host:5002
portfolio   connectx
(lighting)  (Connect4 AI)
```

All three containers run on host networking, so they share the Pi's network namespace. `lifxlan` needs this for UDP broadcast discovery of the bulb on the LAN.

## First-Time Setup on the Pi

Assumes Docker + Docker Compose are installed and ngrok is configured with the static domain.

```bash
git clone https://github.com/Halyconer/Welcome-to-my-Portfolio.git ~/portfolio
cd ~/portfolio

# The portfolio service bind-mounts ./data for calls.db and stats.json.
# Without this directory, the container will fail to start.
mkdir -p data

# Create backend/.env from the example. The defaults are fine for production;
# the bulb itself is auto-discovered on the LAN, no IP needed.
cp backend/.env.example backend/.env
nano backend/.env  # set FLASK_ENV=production, DEVELOPMENT_MODE=false

# Build images and start the stack in the background
docker compose up -d --build
```

Then start ngrok pointing at the nginx host port:

```bash
ngrok http --domain=valid-goblin-full.ngrok-free.app 8080
```

For ngrok to survive reboots, run it under `screen`, `tmux`, or a systemd user unit — the compose stack restarts itself via `restart: unless-stopped`, but ngrok doesn't.

## Everyday Operations

```bash
cd ~/portfolio

# Pull latest code and rebuild any changed images
git pull
docker compose up -d --build

# Live logs (one service at a time)
docker logs -f nginx
docker logs -f portfolio
docker logs -f connectx

# Restart a single service
docker compose restart portfolio

# Stop the whole stack
docker compose down
```

## Health Checks

```bash
# From the Pi (skip ngrok)
curl http://localhost:8080/health
curl http://localhost:5002/game_state

# End-to-end (through ngrok)
curl https://valid-goblin-full.ngrok-free.app/health
```

## Public Endpoints

All routed through ngrok → nginx → the appropriate Flask app.

**Lighting (`/lighting/*` → port 5001):**
- `POST /lighting/set_brightness` — `{"brightness": 1-100}`
- `POST /lighting/set_color` — set bulb color
- `GET  /lighting/stats.json`
- `GET  /lighting/spotify_stats.json`

**Connect4 (`/connect4/*` → port 5002):**
- `POST /connect4/play` — start a new game
- `POST /connect4/move` — `{"column": 0-6}`
- `GET  /connect4/game_state`

## Troubleshooting

**502 Bad Gateway from ngrok** — nginx is up but Flask isn't responding. Check `docker logs portfolio` / `docker logs connectx`.

**`port is already allocated` on `docker compose up`** — something outside Docker is on 5001 / 5002 / 8080. Find it with `sudo lsof -i :8080`.

**CORS blocked in the browser** — the browser's `Origin` isn't in the allowlist. Edit the `map $http_origin $cors_origin` block in `nginx/nginx.conf`, then `docker compose restart nginx`.

**Bulb not responding** — the LIFX bulb is discovered via LAN broadcast (`LifxLAN(1)` in `backend/app.py`), so there's no IP to misconfigure. Confirm the bulb is powered on and on the same LAN as the Pi. Host networking is required for `lifxlan`'s UDP discovery; if you ever switch to bridge networking, discovery will break silently.

**Data wiped after recreate** — the bind mount is `./data:/data` relative to the directory you ran `docker compose` from. If you accidentally ran it from a different cwd, a new empty `data/` directory was created elsewhere. Always run compose commands from `~/portfolio`.

## Development

For running the Flask apps locally without Docker, see `backend/README_DEV.md`.
