# Portfolio Deployment

Operational runbook for the self-hosted backend stack running on the Raspberry Pi.

Architecture-level "why" lives in the inline comments of `docker-compose.yml` and `nginx/nginx.conf` — this doc is just *how to run it*.

## Architecture

```
adrianeddy.com (Vercel-hosted frontend)
         │
         ▼
https://api.adrianeddy.com — Cloudflare Tunnel (cloudflared systemd service)
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

The tunnel config lives in the `adrian-glass` repo (`config/cloudflared/config.yml`, deployed to `/etc/cloudflared/`); it replaced the old ngrok setup.

All three containers run on host networking, so they share the Pi's network namespace. `lifxlan` needs LAN access for its UDP traffic to the bulb.

## First-Time Setup on the Pi

Assumes Docker + Docker Compose are installed and the Cloudflare Tunnel is set up (see the `adrian-glass` repo — `cloudflared` runs as a systemd service and survives reboots on its own).

```bash
git clone https://github.com/Halyconer/Welcome-to-my-Portfolio.git ~/portfolio
cd ~/portfolio

# The portfolio service bind-mounts ./data for calls.db and stats.json.
# Without this directory, the container will fail to start.
mkdir -p data

# Create backend/.env from the example, then set:
#   FLASK_ENV=production, DEVELOPMENT_MODE=false
#   BULB_IP / BULB_MAC — the LIFX bulb's address (find both in Home
#   Assistant's LIFX integration). Broadcast discovery does NOT work on
#   this network (the Velop mesh drops broadcast UDP), so these values
#   are required — and they rot silently if the bulb or subnet changes.
cp backend/.env.example backend/.env
nano backend/.env

# Build images and start the stack in the background
docker compose up -d --build
```

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
# From the Pi (skip the tunnel)
curl http://localhost:8080/health
curl http://localhost:5002/game_state

# End-to-end (through the tunnel)
curl https://api.adrianeddy.com/health
```

## Public Endpoints

All routed through the Cloudflare Tunnel → nginx → the appropriate Flask app.

**Lighting (`/lighting/*` → port 5001):**
- `POST /lighting/set_brightness` — `{"brightness": 1-100}`
- `POST /lighting/set_color` — set bulb color

**Generated JSON (bare paths → port 5001):**
- `GET /stats.json` — lighting call stats
- `GET /spotify_stats.json` — top artists
- `GET /reading.json` — Hardcover reading shelf

**Connect4 (`/connect4/*` → port 5002):**
- `POST /connect4/play` — start a new game
- `POST /connect4/move` — `{"column": 0-6}`
- `GET  /connect4/game_state`

## Troubleshooting

**502 Bad Gateway from api.adrianeddy.com** — nginx is up but Flask isn't responding. Check `docker logs portfolio` / `docker logs connectx`. If nginx itself is down too, check `systemctl status cloudflared` and `docker ps`.

**`port is already allocated` on `docker compose up`** — something outside Docker is on 5001 / 5002 / 8080. Find it with `sudo lsof -i :8080`.

**CORS blocked in the browser** — either the browser's `Origin` isn't in the allowlist (edit the `map $http_origin $cors_origin` block in `nginx/nginx.conf`), or a preflight is failing (any request with custom headers triggers an OPTIONS preflight, and the matching `location` block must answer it — see the inline comments). After editing `nginx.conf`, run `docker restart nginx` — a **full restart, not `nginx -s reload`**: the config is a single-file bind mount, and editing it on the host creates a new file identity (inode) that the running container can't see. Only a restart re-resolves the mount.

**Bulb not responding** — check `BULB_IP` / `BULB_MAC` in `backend/.env` against what Home Assistant reports for the bulb; these go stale if the bulb is replaced or the router/subnet changes (this exact failure happened 2026-07-12: the env pointed at a long-gone bulb on a 192.168.1.x subnet). After editing `.env`, recreate the container (`docker compose up -d --no-build portfolio`) — env vars are injected at container creation, not on restart. Reproduce the failure from the Pi with:
`curl -X POST http://localhost:5001/set_brightness -H "Content-Type: application/json" -H "Origin: https://www.adrianeddy.com" -d '{"brightness": 50}'`

**Data wiped after recreate** — the bind mount is `./data:/data` relative to the directory you ran `docker compose` from. If you accidentally ran it from a different cwd, a new empty `data/` directory was created elsewhere. Always run compose commands from `~/portfolio`.

## Development

For running the Flask apps locally without Docker, see `backend/README_DEV.md`.
