#!/usr/bin/env bash
# Audit every `defaultColumns: [...]` array against actual field positions.
# Reports columns that reference fields nested inside `type: 'group'`
# containers — these may render as placeholders or be silently dropped
# depending on Payload version.
#
# Output format:
#   <file>: defaultColumns '<name>' nested at indent=<n> (line <m>)
#   <file>: defaultColumns mentions '<name>' but no field declaration found
#
# Run from repo root: `bash scripts/audit-default-columns.sh`
#
# See CHANGELOG.md "Discovered, decision pending — defaultColumns nested-
# field references" and Slice MM in docs/MIGRATION_WORKLIST.md §slice-ledger.
#
# @standard ISO-19011:2018 audit-evidence
# @standard ISO-25010:2023 quality-model functional-correctness

set -uo pipefail
cd "$(dirname "$0")/.."

files=$(grep -rln "CollectionConfig\|admin:.*{.*defaultColumns" \
        --include='*.ts' \
        src/collections/ src/plugins/accounting/collections/ 2>/dev/null)

for f in $files; do
  dc_line=$(grep -nE "^\s+defaultColumns:\s*\[" "$f" | head -1)
  [ -z "$dc_line" ] && continue
  line_no=$(echo "$dc_line" | cut -d: -f1)

  # Get the array contents (may span multiple lines until the closing `]`)
  raw=$(awk -v start="$line_no" 'NR>=start{ print; if (/\]/) exit }' "$f" | tr '\n' ' ')

  # Extract column names from the quoted strings
  names=$(echo "$raw" | grep -oE "'[^']+'" | tr -d "'")

  for name in $names; do
    field_line=$(grep -nE "name:\s*['\"]${name}['\"]" "$f" | head -1 | cut -d: -f1)
    if [ -z "$field_line" ]; then
      # Built-in Payload columns are exempt
      case "$name" in
        updatedAt|createdAt|id|_status|status) ;;
        *) echo "  $f: defaultColumns mentions '$name' but no field declaration found" ;;
      esac
      continue
    fi
    indent=$(sed -n "${field_line}p" "$f" | sed -E 's/^( *).*/\1/' | wc -c)
    indent=$((indent - 1))
    if [ "$indent" -ge 8 ]; then
      echo "  $f: defaultColumns '$name' nested at indent=$indent (line $field_line)"
    fi
  done
done
