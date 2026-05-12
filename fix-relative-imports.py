#!/usr/bin/env python3
"""
Fix all remaining relative imports in accounting collections
Run from project root: python3 fix-relative-imports.py
"""

import os
import re
import sys
from pathlib import Path

def fix_imports(root_dir='.'):
    """Fix all relative imports in src/collections/accounting/"""

    fixes = [
        (r"from ['\"]\.\.\/factories['\"]", "from '@/services/accounting/factories'"),
        (r"from ['\"]\.\.\/fields\/index['\"]", "from '@/fields/accounting'"),
        (r"from ['\"]\.\.\/fields['\"]", "from '@/fields/accounting'"),
        (r"from ['\"]\.\.\/utilities['\"]", "from '@/services/accounting/utilities'"),
        (r"from ['\"]\.\.\/hooks['\"]", "from '@/hooks/collections/accounting'"),
    ]

    total_fixed = 0

    # Walk through accounting collections
    collections_dir = Path(root_dir) / 'src' / 'collections' / 'accounting'

    if not collections_dir.exists():
        print(f"❌ Directory not found: {collections_dir}")
        sys.exit(1)

    print(f"🔧 Scanning {collections_dir}")
    print()

    for ts_file in collections_dir.glob('*.ts'):
        content = ts_file.read_text('utf-8')
        original = content

        for pattern, replacement in fixes:
            content = re.sub(pattern, replacement, content)

        if content != original:
            ts_file.write_text(content, 'utf-8')
            total_fixed += 1
            print(f"  ✓ {ts_file.name}")

    print()
    print(f"✅ Fixed {total_fixed} files")
    print()
    print("Next steps:")
    print("  pnpm build")
    print("  pnpm dev")

if __name__ == '__main__':
    fix_imports()
