# backend/generate_reading_stats.py
#
# Fetches the "reading shelf" from the Hardcover API (https://hardcover.app)
# and writes reading.json for the frontend's Reading section.
#
# Same pattern as generate_spotify_stats.py: run this script on a schedule
# (systemd timer, see systemd/reading-stats.*), it writes a JSON file into
# the data/ directory, and Flask serves that file at /reading.json. The
# Hardcover API token therefore never leaves the Pi — the public site only
# ever sees the generated JSON.
#
# The file is only overwritten on a fully successful fetch: if Hardcover is
# down or the token has expired (tokens last ~1 year), the script exits
# non-zero and the site keeps serving the last good shelf.
#
# Run from the data/ directory (or anywhere — output lands in the cwd):
#   python3 ../backend/generate_reading_stats.py

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

import requests

HARDCOVER_GRAPHQL_URL = 'https://api.hardcover.app/v1/graphql'
OUTPUT_FILENAME = 'reading.json'

# Hardcover user_books status ids (from their docs):
# 1 = Want to Read, 2 = Currently Reading, 3 = Read, 5 = Did Not Finish
STATUS_CURRENTLY_READING = 2
STATUS_READ = 3

# One request fetches everything: username (for the profile link), the
# currently-reading shelf, and the N most recently finished books with their
# ratings. GraphQL aliases (currently_reading:, recent_reads:) let us query
# user_books twice with different filters in a single round trip.
QUERY = """
query PortfolioShelf($recentLimit: Int!) {
  me {
    username
    currently_reading: user_books(
      where: {status_id: {_eq: 2}}
      order_by: {updated_at: desc}
    ) {
      book { title contributions { author { name } } }
    }
    recent_reads: user_books(
      where: {status_id: {_eq: 3}}
      order_by: {last_read_date: desc_nulls_last}
      limit: $recentLimit
    ) {
      rating
      book { title contributions { author { name } } }
    }
  }
}
"""


def load_env_file():
    """
    Load backend/.env into os.environ (without overriding real env vars).

    Prefers python-dotenv when available (inside the container / dev laptop),
    but falls back to a minimal KEY=value parser so the script also runs on
    the Pi host, where the systemd unit provides EnvironmentFile= anyway and
    dotenv isn't installed system-wide.
    """
    env_path = Path(__file__).resolve().parent / '.env'
    try:
        from dotenv import load_dotenv
        load_dotenv(env_path)
        return
    except ImportError:
        pass
    if not env_path.is_file():
        return
    for line in env_path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        key, _, value = line.partition('=')
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def book_entry(user_book):
    """Flatten Hardcover's nested book shape into {title, author}."""
    book = user_book.get('book') or {}
    authors = [
        c['author']['name']
        for c in (book.get('contributions') or [])
        if c.get('author') and c['author'].get('name')
    ]
    return {
        'title': book.get('title') or 'Untitled',
        # Most books have one author; co-authored books read "A & B".
        'author': ' & '.join(authors[:2]) if authors else 'Unknown',
    }


def main():
    load_env_file()

    token = os.environ.get('HARDCOVER_API_TOKEN')
    if not token:
        print('Error: HARDCOVER_API_TOKEN is not set (backend/.env).')
        sys.exit(1)

    recent_count = int(os.environ.get('HARDCOVER_RECENT_COUNT', '3'))

    print('Fetching reading shelf from Hardcover...')
    try:
        response = requests.post(
            HARDCOVER_GRAPHQL_URL,
            json={'query': QUERY, 'variables': {'recentLimit': recent_count}},
            headers={
                'Authorization': f'Bearer {token}',
                'Content-Type': 'application/json',
            },
            timeout=30,
        )
        response.raise_for_status()
        payload = response.json()
    except requests.exceptions.RequestException as e:
        print(f'❌ Request to Hardcover failed: {e}')
        if getattr(e, 'response', None) is not None:
            print('Response content:', e.response.text[:500])
        sys.exit(1)

    # GraphQL reports errors in the body with HTTP 200, so check explicitly —
    # an expired token or a schema change shows up here, not as an HTTP error.
    if payload.get('errors'):
        print('❌ Hardcover returned GraphQL errors:')
        for err in payload['errors']:
            print('  -', err.get('message', err))
        sys.exit(1)

    # `me` comes back as a list of one user in Hardcover's (Hasura) schema;
    # tolerate a plain object too in case that ever changes.
    me = payload.get('data', {}).get('me')
    if isinstance(me, list):
        me = me[0] if me else None
    if not me:
        print('❌ Unexpected response shape: no `me` in data.')
        sys.exit(1)

    output = {
        'generated_at': datetime.now(timezone.utc).isoformat(),
        'username': me.get('username'),
        'currently_reading': [book_entry(ub) for ub in me.get('currently_reading', [])],
        'recent_reads': [
            {**book_entry(ub), 'rating': ub.get('rating')}
            for ub in me.get('recent_reads', [])
        ],
    }

    with open(OUTPUT_FILENAME, 'w') as f:
        json.dump(output, f, indent=4)

    print(
        f"✅ Saved {len(output['currently_reading'])} currently-reading and "
        f"{len(output['recent_reads'])} recent reads to {OUTPUT_FILENAME}"
    )


if __name__ == '__main__':
    main()
