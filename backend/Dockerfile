# ── Stage: base image ──────────────────────────────────────────────────────────
# python:3.12-slim is the official Python image stripped of everything non-essential.
# The "slim" variant is ~50MB vs ~350MB for the full image — plenty for a Flask app.
# It's a multi-arch image, so Docker on your ARM64 Pi will automatically pull the
# arm64 layer. You don't need to specify the platform explicitly here.
FROM python:3.12-slim

# ── Working directory inside the container ─────────────────────────────────────
# This is where the APPLICATION CODE lives (app.py, requirements.txt, etc.).
# It's distinct from the DATA directory (calls.db, stats.json) which will be
# bind-mounted at runtime. We set this here so subsequent COPY/RUN commands
# land in the right place.
WORKDIR /app

# ── Install system dependencies ────────────────────────────────────────────────
# Some Python packages (particularly ones with C extensions) need build tools or
# shared libraries at install time. We install them here, before pip, so the
# layer is cached independently. If requirements.txt changes but this list
# doesn't, Docker reuses this cached layer and skips the apt step.
#
# --no-install-recommends: don't pull in optional suggested packages
# rm -rf /var/lib/apt/lists/*: wipe the package index to shrink image size
RUN apt-get update && apt-get install -y --no-install-recommends \
        gcc \
        libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# ── Install Python dependencies ────────────────────────────────────────────────
# We COPY requirements.txt first (before the rest of the code) deliberately.
# Docker builds images in layers; each instruction is a layer that gets cached.
# If you copy everything at once and then a single .py file changes, Docker
# invalidates the pip install layer too and reinstalls all packages needlessly.
# Copying requirements.txt separately means pip only re-runs when that file
# actually changes.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ── Copy application source code ───────────────────────────────────────────────
# Now we copy the rest of the backend code. This layer will invalidate on any
# code change, but that's fine — it's just a file copy, not a slow pip install.
#
# Assumption: your docker build context will be ~/Welcome-to-my-Portfolio/backend/
# If you run `docker build` from the repo root, adjust these paths accordingly.
COPY . .

# ── Runtime data directory ─────────────────────────────────────────────────────
# calls.db, stats.json, and spotify_top_artists.json live here at runtime.
# This path will be BIND-MOUNTED from the host (see docker-compose.yml), so
# whatever is on the host at that path appears here inside the container.
# We also set this as the working directory override at runtime via Compose,
# so relative paths in app.py (e.g. open("calls.db")) resolve correctly.
# We create it here so the directory exists in the image even before mounting.
RUN mkdir -p /data

# ── Expose the port Flask listens on ──────────────────────────────────────────
# EXPOSE is documentation only — it doesn't actually publish the port to the
# host. That's done in docker-compose.yml with the `ports` directive.
# It's still good practice: tells anyone reading the Dockerfile what port matters.
EXPOSE 5001

# ── Start the app ──────────────────────────────────────────────────────────────
# CMD is the default command run when the container starts. We use the exec
# form (JSON array) rather than shell form ("python app.py") because:
#   - Exec form makes Python PID 1, so SIGTERM from `docker stop` reaches it
#     directly and the app can shut down cleanly.
#   - Shell form wraps in /bin/sh -c, which swallows signals.
#
# We run app.py from /app (where we copied it), but the working_dir at runtime
# will be overridden to /data via docker-compose so file I/O hits the mount.
# Flask itself is imported from app.py — it doesn't care about cwd.
CMD ["python", "app.py"]
