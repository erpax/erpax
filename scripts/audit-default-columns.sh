#!/usr/bin/env bash
# Audit every `defaultColumns: [...]` array against actual field positions.
#
# Slice III (2026-05-10) upgrade: understands Payload v3 dotted refs
# (`identity.code`, `geography.country`, etc.) and the field-names produced
# by the canonical factories that the audit can't see by `grep name:`:
# `multiTenancyField()` → `tenant`, `currencyField()` → `currency`,
# `auditFields()` → `approvedBy` / `approvedAt` / `createdBy`,
# `timestampFields()` → `createdAt` / `updatedAt`. Payload `auth: true`
# adds `email`. Payload's `Slug` field plugin adds `slug`.
#
# Reports:
#   - Top-level columns that reference fields nested inside `type: 'group'`
#     containers without using the dotted-path form (Payload v3 needs the
#     dotted form: `'identity.code'`, not `'code'`).
#   - Columns that reference fields that don't exist anywhere on the
#     collection.
#
# Output format:
#   <file>: defaultColumns '<name>' nested at indent=<n> (line <m>)
#   <file>: defaultColumns mentions '<name>' but no field declaration found
#
# Run from repo root: `bash scripts/audit-default-columns.sh`
#
# See CHANGELOG.md and Slice III in docs/MIGRATION_WORKLIST.md §slice-ledger.
#
# @standard ISO-19011:2018 audit-evidence
# @standard ISO-25010:2023 quality-model functional-correctness

set -uo pipefail
cd "$(dirname "$0")/.."

# Field names that DO exist on the collection but aren't visible to a
# `grep name:` because they're injected by a factory or by Payload itself.
# When the audit can't find a `name:` declaration for one of these on a
# given collection, it stays silent (no false positive).
FACTORY_NAMES_FOR=":multiTenancyField():tenant:currencyField():currency:auditFields():approvedBy approvedAt createdBy:timestampFields():createdAt updatedAt:slugField():slug:auth-true:email:"

# Returns 0 (true) when $name is a known factory output present in $file.
field_provided_by_factory() {
  local file="$1" name="$2"
  case "$name" in
    tenant)
      grep -qE 'multiTenancyField\(' "$file" ;;
    currency)
      grep -qE 'currencyField\(' "$file" ;;
    approvedBy|approvedAt|createdBy)
      grep -qE 'auditFields\(' "$file" ;;
    createdAt|updatedAt)
      # Provided automatically by Payload AND by timestampFields()
      return 0 ;;
    email)
      # Both `auth: true` and `auth: { ... }` get the auto-managed `email`
      # column from Payload's auth plugin.
      grep -qE '\bauth:\s*(true|\{)' "$file" ;;
    slug)
      # Some collections use the SlugField utility import.
      grep -qE 'slugField\(|SlugField' "$file" ;;
    *)
      return 1 ;;
  esac
}

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
    # Dotted ref: split on last dot, look up the leaf name. The leaf is
    # always nested-by-design — that's the whole point of dotted refs.
    if [[ "$name" == *.* ]]; then
      leaf="${name##*.}"
      # Verify the leaf exists somewhere in the file at indent ≥ 8 (i.e.
      # actually inside a group/array). If not, real bug.
      leaf_lines=$(grep -nE "name:\s*['\"]${leaf}['\"]" "$f" | head -3 | cut -d: -f1)
      [ -z "$leaf_lines" ] && {
        echo "  $f: defaultColumns mentions '$name' but no field declaration found"
        continue
      }
      # Pass — dotted refs that resolve to *some* nested declaration are accepted.
      continue
    fi

    # Bare name: look up. Built-in Payload columns are exempt.
    case "$name" in
      updatedAt|createdAt|id|_status|status) continue ;;
    esac

    # Find ALL declarations of this name in the file; prefer the one with
    # the smallest indent (top-level shadow trumps an inner-array hit).
    matches=$(grep -nE "name:\s*['\"]${name}['\"]" "$f")
    if [ -z "$matches" ]; then
      if field_provided_by_factory "$f" "$name"; then
        continue
      fi
      echo "  $f: defaultColumns mentions '$name' but no field declaration found"
      continue
    fi

    # Find smallest-indent occurrence
    smallest_indent=999
    smallest_line=0
    while IFS= read -r match; do
      [ -z "$match" ] && continue
      line=$(echo "$match" | cut -d: -f1)
      indent=$(sed -n "${line}p" "$f" | sed -E 's/^( *).*/\1/' | wc -c)
      indent=$((indent - 1))
      if [ "$indent" -lt "$smallest_indent" ]; then
        smallest_indent=$indent
        smallest_line=$line
      fi
    done <<EOF
$matches
EOF

    # Indent threshold for "this is inside a group/array, not a top-level field".
    # If the file uses a `() => [` factory wrapper for the fields list, the
    # top-level fields themselves are at indent 6 (inside `() => [\n      ...]`).
    # Inside-a-group fields sit at indent 10+ (inside `fields: [\n        ...]`
    # one level down). Pick the threshold accordingly.
    if grep -qE '^\s*\(\) => \[' "$f"; then
      threshold=10
    else
      threshold=8
    fi
    if [ "$smallest_indent" -ge "$threshold" ]; then
      echo "  $f: defaultColumns '$name' nested at indent=$smallest_indent (line $smallest_line)"
    fi
  done
done
