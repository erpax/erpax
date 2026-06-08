#!/usr/bin/env sh
# pre-push-uuid — uuid-only push gate when Payload typegen is an environmental blocker.
#
# Law: all is passed with uuids without payload. This script runs `pnpm confirm:uuid`
# instead of the full pre-push stack (which includes `payload-verify-types.sh`).
# Use when the content-address layer is sealed but `payload generate:types` cannot run
# (sandbox, missing CSS chain, offline). Does NOT bypass husky — wire explicitly:
#
#   git push --no-verify   # never recommended
#   bash scripts/pre-push-uuid.sh && git push --no-verify  # still discouraged
#
# Preferred: run confirm:uuid locally, then push with the normal hook when typegen works.
# When only uuid purity must be proven: `pnpm confirm:uuid` exit 0 is the seal.
#
# @see src/confirm/index.ts · src/confirm/SKILL.md

cd "$(dirname "$0")/.." || exit 1
export PATH="$PWD/node_modules/.bin:$PATH"
export NODE_OPTIONS=--no-deprecation
set -e
pnpm run -s confirm:uuid
