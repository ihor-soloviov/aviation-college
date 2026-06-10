#!/usr/bin/env bash
# SSH-тунель до prod-Postgres (Payload CMS) для локальної розробки на живих даних.
# Локальний 15432 → сервер 127.0.0.1:5432 (postgres-контейнер, назовні закритий).
#
# Використання:
#   ./scripts/tunnel.sh        # тримай у окремому терміналі, поки працюєш
# Потім в іншому терміналі: npm run dev
#
# .env.local має містити:
#   DATABASE_URI=postgres://aviation:<pw>@localhost:5433/payload
set -euo pipefail

HOST="${AVIATION_SSH_HOST:-aviation}"
LOCAL_PORT="${LOCAL_PG_PORT:-15432}"

echo "→ Тунель localhost:${LOCAL_PORT} → ${HOST}:127.0.0.1:5432 (Ctrl-C щоб зупинити)"

# Чистий вихід по Ctrl-C (інакше потрапимо в reconnect-цикл).
trap 'echo; echo "Тунель зупинено."; exit 0' INT TERM

# keepalive тримає idle-зʼєднання живим; ExitOnForwardFailure — не висіти мовчки,
# якщо порт зайнятий. Авто-реконект, якщо мережа обірве сесію.
while true; do
    ssh -N \
        -o ServerAliveInterval=30 \
        -o ServerAliveCountMax=3 \
        -o ExitOnForwardFailure=yes \
        -L "${LOCAL_PORT}:127.0.0.1:5432" "${HOST}" \
        || echo "⚠ тунель обірвався (код $?) — реконект за 3с…"
    sleep 3
done
