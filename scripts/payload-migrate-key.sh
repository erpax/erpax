#!/usr/bin/env bash
# The content key `payload migrate:status`'s verdict depends on — or nothing, when it cannot.
#
# migrate:status boots Payload (~39s) to compare the migrations the config declares against the
# rows in `payload_migrations`. Two inputs, both cheap to read:
#
#   • src/migrations — tracked content, unstaged diff, and untracked files
#   • the DATABASE it will actually query
#   • pnpm-lock.yaml — the installed Payload decides what "pending" means
#
# The database is the whole difficulty, and it is why this is a SEPARATE key from
# scripts/payload-input-key.sh. Locally, payload.config.ts resolves the D1 binding through
# wrangler's platform proxy with remoteBindings=false, so the database IS the miniflare state
# under .wrangler/state/v3/d1.
#
# Hash the ROWS, never the FILES. Hashing the state files was the first attempt and it could not
# work: opening the database writes WAL/SHM sidecars, so the key changed on every read and the
# memo missed 100% of the time — a cache that is pure cost. scripts/payload-migrate-rows.mjs reads
# `payload_migrations` read-only, which is exactly what migrate:status compares against and leaves
# the database byte-identical.
#
# In production, or under CF_PAGES / WORKERS_CI / PAYLOAD_BUILD_USE_REMOTE_D1=true, the same
# config binds a REMOTE D1 that no local hash can see. This script then prints nothing and exits
# non-zero: no key, no memo, the full boot is paid. Refusing to answer is the only honest option
# when the input is out of reach — the failure this corpus keeps finding is a check that returns
# green because it could not look.
#
# @standard ISO/IEC 25010:2023 §5.6 maintainability
# @audit ISO-19011:2018 §6.4 audit-evidence — a memo is evidence only if its key saw the inputs
set -euo pipefail
cd "$(dirname "$0")/.."

# Any of these means the verdict depends on a database this hash cannot reach.
if [ "${NODE_ENV:-}" = "production" ] \
  || [ "${CF_PAGES:-}" = "1" ] \
  || [ "${WORKERS_CI:-}" = "1" ] \
  || [ "${PAYLOAD_BUILD_USE_REMOTE_D1:-}" = "true" ]; then
  exit 1
fi

ROWS="$(node scripts/payload-migrate-rows.mjs 2>/dev/null)" || exit 1   # no rows ⇒ no key

{
  git ls-files -s -- src/migrations 2>/dev/null
  git diff -- src/migrations 2>/dev/null
  git ls-files --others --exclude-standard -- src/migrations 2>/dev/null | sort | while IFS= read -r f; do
    printf '%s ' "$f"
    shasum -a 256 "$f" 2>/dev/null | cut -d' ' -f1
  done
  printf '%s\n' "$ROWS"
  cat pnpm-lock.yaml 2>/dev/null
} | shasum -a 256 | cut -d' ' -f1
