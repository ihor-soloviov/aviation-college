#!/usr/bin/env bash
# Local deploy: SSH в aviation, git pull, перебудова стека.
# Перед запуском: git push гілки в origin.

set -euo pipefail

BRANCH="${1:-}"
HOST=aviation
REMOTE_DIR=/home/deploy/aviation

if [ -n "$BRANCH" ]; then
  ssh "$HOST" "cd $REMOTE_DIR && git fetch origin && git checkout $BRANCH && git pull --ff-only && docker compose --env-file .env.production up -d --build"
else
  ssh "$HOST" "cd $REMOTE_DIR && git pull --ff-only && docker compose --env-file .env.production up -d --build"
fi

echo
echo "=== status ==="
ssh "$HOST" "cd $REMOTE_DIR && docker compose --env-file .env.production ps"
