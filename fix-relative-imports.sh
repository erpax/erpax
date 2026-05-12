#!/bin/bash
# Fix all remaining relative imports in accounting collections
# Run from project root: bash fix-relative-imports.sh

set -e

cd "$(dirname "$0")"

echo "🔧 Fixing all relative imports in accounting collections..."

# Fix ../factories imports
echo "  Fixing ../factories → @/services/accounting/factories"
find src/collections/accounting -name "*.ts" -type f | while read file; do
  if grep -q "\.\./factories" "$file"; then
    sed -i.bak "s|from '\.\./factories'|from '@/services/accounting/factories'|g" "$file"
    sed -i.bak "s|from \"\.\./factories\"|from \"@/services/accounting/factories\"|g" "$file"
  fi
done

# Fix ../fields imports
echo "  Fixing ../fields → @/fields/accounting"
find src/collections/accounting -name "*.ts" -type f | while read file; do
  if grep -q "\.\./fields" "$file"; then
    sed -i.bak "s|from '\.\./fields'|from '@/fields/accounting'|g" "$file"
    sed -i.bak "s|from \"\.\./fields\"|from \"@/fields/accounting\"|g" "$file"
    sed -i.bak "s|from '\.\./fields/index'|from '@/fields/accounting'|g" "$file"
    sed -i.bak "s|from \"\.\./fields/index\"|from \"@/fields/accounting\"|g" "$file"
  fi
done

# Fix ../utilities imports
echo "  Fixing ../utilities → @/services/accounting/utilities"
find src/collections/accounting -name "*.ts" -type f | while read file; do
  if grep -q "\.\./utilities" "$file"; then
    sed -i.bak "s|from '\.\./utilities'|from '@/services/accounting/utilities'|g" "$file"
    sed -i.bak "s|from \"\.\./utilities\"|from \"@/services/accounting/utilities\"|g" "$file"
  fi
done

# Fix any remaining ../ imports
echo "  Fixing other relative imports"
find src/collections -name "*.ts" -type f | while read file; do
  if grep -q "from '\.\./\.\./\.\/" "$file"; then
    # ../../../ → @/services/ or @/hooks/
    sed -i.bak "s|from '\.\./\.\./\.\./\.\./services/|from '@/services/|g" "$file"
    sed -i.bak "s|from '\.\./\.\./\.\./hooks/|from '@/hooks/|g" "$file"
  fi
done

# Clean up backup files
find src -name "*.bak" -type f -delete

echo "✅ All relative imports fixed!"
echo ""
echo "Next: pnpm build"
