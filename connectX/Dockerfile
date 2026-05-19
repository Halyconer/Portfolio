# connectX/Dockerfile
# Mirror of backend/Dockerfile — go read that file's comments for the full
# explanation of layer caching, slim base image, exec form CMD, etc.
# This file repeats the same pattern in condensed form for the Connect4 service.

# python:3.12-slim is multi-arch, so Docker on the Pi (arm64) automatically
# pulls the arm64 variant. We use 3.12 instead of 3.13 (which pyproject.toml
# requested) because more arm64 wheels exist for 3.12 — fewer chances of pip
# falling back to a slow source build.
FROM python:3.12-slim

WORKDIR /app

# numpy and scipy ship pre-built arm64 wheels on PyPI, so this usually isn't
# needed. gcc is kept as a defensive net in case a transitive dependency only
# ships a source distribution (sdist) and pip has to compile it.
RUN apt-get update && apt-get install -y --no-install-recommends \
        gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements.txt first, install deps, THEN copy source. This means a
# code change in app.py / Connect4.py / scoring.py won't invalidate the pip
# install layer (which is the slow one).
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the connectX directory: app.py, Connect4.py, scoring.py,
# index.html (served at /), README, etc. A .dockerignore could trim out
# poetry.lock and the like later; not worth it for now.
COPY . .

# connectX has NO persistent state — game lives in process memory and is
# wiped on container restart. That matches the pre-Docker behavior, so we
# don't add a bind mount or override working_dir like the portfolio service
# does. If you ever want game history, add a /data mount in docker-compose.yml.

# Documentation-only: tells humans which port matters. The actual port the
# Flask app listens on is set via the PORT env var (see compose) and read by
# app.py's __main__ block.
EXPOSE 5002

# Exec form (JSON array) so Python is PID 1 and receives SIGTERM directly
# from `docker stop`. The app reads PORT from os.environ, so the same image
# can run on a different port by changing compose env — no rebuild needed.
CMD ["python", "app.py"]
