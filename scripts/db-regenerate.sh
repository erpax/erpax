#!/usr/bin/env bash
# db-regenerate — greenfield schema regeneration from the Payload config (NO backward compat).
#
# erpax generates its schema FROM config; the local D1 database and the migration files are a
# DISPOSABLE snapshot of that config — never an append-only history. So every regeneration starts
# from a clean slate: reset the local D1 and remove all migrations, then regenerate a fresh
# baseline, apply it to the empty DB, and refresh the generated types. No stale tables, no gaps.
#
# Run after any collection / field / plugin change. See the `database` skill.
set -euo pipefail
cd "$(dirname "$0")/.."
export NODE_OPTIONS="--no-deprecation --max-old-space-size=8000"
PAYLOAD="./node_modules/.bin/payload"

echo "1/5  reset local D1 database (drop all tables)"
rm -rf .wrangler/state/v3/d1

echo "2/5  remove all migrations (disposable, regenerated from config)"
find src/migrations -maxdepth 1 -type f \
  \( -name '[0-9]*.ts' -o -name '[0-9]*.json' -o -name 'payload-config-snapshot.json' -o -name 'index.ts' \) \
  -delete

echo "3/5  regenerate fresh baseline migration"
"$PAYLOAD" migrate:create

echo "4/5  apply the baseline to the clean DB"
"$PAYLOAD" migrate

echo "5/5  refresh generated types"
"$PAYLOAD" generate:types

echo "✓ schema regenerated from config — clean DB, fresh migration, types in sync"
