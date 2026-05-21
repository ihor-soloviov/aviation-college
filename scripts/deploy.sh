#!/usr/bin/env bash
# Local deploy: SSH в aviation, бекап Payload SQLite, git pull, перебудова стека,
# health-check для next.
# Перед запуском: git push гілки в origin.

set -euo pipefail

BRANCH="${1:-}"
HOST=aviation
REMOTE_DIR=/home/deploy/aviation

ssh "$HOST" bash -s <<REMOTE
set -euo pipefail
cd "$REMOTE_DIR"

# 1. Backup Payload SQLite (якщо існує)
if [ -f data/payload/cms.sqlite ]; then
  ts=\$(date +%F-%H%M%S)
  sudo cp data/payload/cms.sqlite "data/payload/cms.sqlite.bak-\$ts"
  echo "=== backup: data/payload/cms.sqlite.bak-\$ts ==="
fi

# 2. Pull + rebuild
if [ -n "${BRANCH}" ]; then
  git fetch origin
  git checkout "${BRANCH}"
fi
git pull --ff-only
docker compose --env-file .env.production up -d --build

# nginx тримає DNS-резолв upstream'ів у пам'яті — при перебудові next
# (новий внутрішній IP) лишається висіти 502, поки nginx не рестартонути.
docker compose --env-file .env.production restart nginx

# 3. Health check (next через nginx на localhost)
echo
echo "=== waiting for next ==="
ok=0
for i in 1 2 3 4 5 6 7 8 9 10; do
  if curl -fsS -o /dev/null http://localhost/; then
    echo "=== next OK (try \$i) ==="
    ok=1
    break
  fi
  sleep 3
done
if [ \$ok -ne 1 ]; then
  echo "!!! next not responding after 30s, last logs:" >&2
  docker compose --env-file .env.production logs --tail=80 next >&2
  exit 1
fi

# 4. Status
echo
echo "=== status ==="
docker compose --env-file .env.production ps
REMOTE
