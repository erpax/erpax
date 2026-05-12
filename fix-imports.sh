#!/bin/bash
# Comprehensive import fix script for Phase 11
# Run this from the project root: bash fix-imports.sh

set -e

echo "🔧 Fixing all import paths..."

# Fix 1: Replace ../fields/base-accounting-fields with @/fields/accounting/base-accounting-fields
echo "  [1/4] Fixing base-accounting-fields imports..."
find src/collections/accounting -name "*.ts" -type f | while read file; do
  sed -i.bak "s|from '\.\./fields/base-accounting-fields'|from '@/fields/accounting/base-accounting-fields'|g" "$file"
  sed -i.bak "s|from \"\.\./fields/base-accounting-fields\"|from \"@/fields/accounting/base-accounting-fields\"|g" "$file"
done

# Fix 2: Replace ../utilities/period-lock with @/services/accounting/utilities/period-lock
echo "  [2/4] Fixing period-lock imports..."
find src/collections/accounting -name "*.ts" -type f | while read file; do
  sed -i.bak "s|from '\.\./utilities/period-lock'|from '@/services/accounting/utilities/period-lock'|g" "$file"
  sed -i.bak "s|from \"\.\./utilities/period-lock\"|from \"@/services/accounting/utilities/period-lock\"|g" "$file"
done

# Fix 3: Handle other relative imports in collections
echo "  [3/4] Fixing other relative collection imports..."
# Replace relative paths like ../../../hooks/validateAddress with @/hooks/validateAddress
find src/collections -name "*.ts" -type f | while read file; do
  sed -i.bak "s|from '\.\./\.\./\.\./hooks/|from '@/hooks/|g" "$file"
  sed -i.bak "s|from \"\.\./\.\./\.\./hooks/|from \"@/hooks/|g" "$file"
done

# Fix 4: Handle other relative utilities imports
echo "  [4/4] Fixing relative utilities imports..."
# Replace relative paths like ../utilities with @/services/accounting/utilities
find src/collections/accounting -name "*.ts" -type f | while read file; do
  sed -i.bak "s|from '\.\./utilities'|from '@/services/accounting/utilities'|g" "$file"
  sed -i.bak "s|from \"\.\./utilities\"|from \"@/services/accounting/utilities\"|g" "$file"
done

# Clean up backup files
find src -name "*.bak" -type f -delete

echo "✅ Import fixes complete!"
echo ""
echo "Next steps:"
echo "  1. Run: pnpm typecheck"
echo "  2. Run: pnpm build"
echo "  3. Run: pnpm dev"
