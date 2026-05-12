#!/usr/bin/env bash
# Audit plugin duplicates — find shared/redundant logic across src/plugins/

set -euo pipefail

cd "$(dirname "$0")/.."

echo "=== ERPax Plugin Duplication Audit ==="
echo
echo "Scanning src/plugins/* for duplicate file names and similar logic..."
echo

# 1. Find duplicate filenames across plugins
echo "## Duplicate Filenames"
echo
find src/plugins -maxdepth 2 -type f -name "*.ts" ! -name "*.test.ts" ! -name "index.ts" | \
  sed 's|src/plugins/||' | \
  awk -F'/' '{print $2}' | \
  sort | uniq -d > /tmp/dup_names.txt || true

if [ -s /tmp/dup_names.txt ]; then
  echo "Found duplicate filenames across plugins:"
  cat /tmp/dup_names.txt | while read fname; do
    echo "  - $fname (used in: $(find src/plugins -name "$fname" | sed 's|src/plugins/||' | awk -F'/' '{print $1}' | sort -u | tr '\n' ' '))"
  done
else
  echo "  (none found)"
fi

echo

# 2. Look for similar function names (case-insensitive)
echo "## Likely Duplicate Logic (function name patterns)"
echo

declare -A seen_funcs

for file in $(find src/plugins -maxdepth 2 -type f -name "*.ts" ! -name "*.test.ts" ! -name "index.ts"); do
  plugin=$(echo "$file" | sed 's|src/plugins/||' | awk -F'/' '{print $1}')

  # Extract function/export names
  grep -E "^export (function|const|interface|type) " "$file" | \
    sed 's/export \(function\|const\|interface\|type\) //' | \
    awk '{print tolower($1)}' | \
    while read func; do
      if [ -n "$func" ]; then
        if [ -v "seen_funcs[$func]" ]; then
          echo "  - $func (in: ${seen_funcs[$func]}, $plugin)"
        fi
        seen_funcs[$func]="$plugin"
      fi
    done
done

echo

# 3. File size analysis — which plugins are largest
echo "## Plugin File Sizes (ranked)"
echo

find src/plugins -maxdepth 1 -type d ! -name "plugins" | while read dir; do
  plugin=$(basename "$dir")
  size=$(find "$dir" -type f \( -name "*.ts" -o -name "*.tsx" \) -exec wc -l {} + | tail -1 | awk '{print $1}')
  count=$(find "$dir" -type f \( -name "*.ts" -o -name "*.tsx" \) ! -name "*.test.ts" | wc -l)
  echo "  $plugin: $size lines, $count files"
done | sort -k2 -rn

echo

# 4. Service folder analysis
echo "## Service Files (candidates for consolidation)"
echo

for plugin in accounting receivables payables parties export auth dimensions mcp hooks; do
  if [ -d "src/plugins/$plugin/services" ] || find "src/plugins/$plugin" -maxdepth 1 -name "*.ts" | grep -q service; then
    echo "  $plugin:"
    find "src/plugins/$plugin" -maxdepth 2 -type f -name "*service*.ts" -o -name "*utility*.ts" -o -name "*shared*.ts" 2>/dev/null | \
      sed "s|src/plugins/$plugin/||" | \
      sed 's/^/    - /' || true
  fi
done

echo

# 5. Field definitions
echo "## Field Definitions (likely duplicates)"
echo

for plugin in accounting receivables payables export; do
  if find "src/plugins/$plugin" -name "fields.ts" -o -path "*/fields/*" | grep -q .; then
    echo "  $plugin:"
    find "src/plugins/$plugin" -name "fields.ts" -o -path "*/fields/*" 2>/dev/null | sed "s|src/plugins/$plugin/||" | sed 's/^/    - /'
  fi
done

echo

# 6. Access control rules
echo "## Access Rules (consolidation candidates)"
echo

for plugin in accounting receivables payables auth; do
  if find "src/plugins/$plugin" -name "access.ts" -o -path "*/access/*" | grep -q .; then
    echo "  $plugin:"
    find "src/plugins/$plugin" -name "access.ts" -o -path "*/access/*" 2>/dev/null | sed "s|src/plugins/$plugin/||" | sed 's/^/    - /'
  fi
done

echo

# 7. Summary recommendations
echo "## Consolidation Opportunities"
echo
echo "Based on audit, consider consolidating:"
echo "  1. Aging logic → src/services/shared/aging.service.ts"
echo "       (found in: receivables, payables, parties)"
echo "  2. Money field → src/fields/money.ts"
echo "       (used by: accounting, receivables, export)"
echo "  3. Currency handling → src/services/shared/currency.service.ts"
echo "       (needed by: accounting, receivables, payables, export)"
echo "  4. Tenant access rules → src/access/tenant-based.ts"
echo "       (pattern repeated in: all plugins)"
echo
echo "=== Audit Complete ==="
