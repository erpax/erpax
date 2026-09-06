#!/usr/bin/env bash
# The content key every Payload generator's verdict depends on — ONE definition.
#
# `payload generate:types` and `payload generate:importmap` are pure functions of the tracked
# source and the installed Payload. Their verdict therefore depends on exactly:
#   • the index blobs of src + payload.config.ts   (every tracked change, staged or committed)
#   • the unstaged diff over those paths            (every working-tree change)
#   • every UNTRACKED file under src, by content    (a new collection is a new input, and neither
#                                                    ls-files -s nor git diff can see one)
#   • the two generated artefacts themselves        (so a hand-edit misses the memo)
#   • pnpm-lock.yaml                                (the installed Payload)
#
# Anything else the generators read is not an input to their OUTPUT, and anything in this list
# changing means the memo misses and the full ~100s boot is paid. That is the whole guarantee.
#
# `migrate:status` is NOT keyed here and must never be memoised on it: it reads the DATABASE,
# which no hash of this repository can see.
#
# @standard ISO/IEC 25010:2023 §5.6 maintainability — one truth, one address
set -euo pipefail
cd "$(dirname "$0")/.."
{
  git ls-files -s -- src payload.config.ts 2>/dev/null
  git diff -- src payload.config.ts 2>/dev/null
  # An untracked new atom is invisible to both commands above and IS an input to the generators.
  git ls-files --others --exclude-standard -- src 2>/dev/null | sort | while IFS= read -r f; do
    printf '%s ' "$f"
    shasum -a 256 "$f" 2>/dev/null | cut -d' ' -f1
  done
  cat pnpm-lock.yaml 2>/dev/null
  for t in "src/payload-types.ts" "src/app/(payload)/admin/importMap.js"; do
    [ -f "$t" ] && cat "$t"
  done
} | shasum -a 256 | cut -d' ' -f1
