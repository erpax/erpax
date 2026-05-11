#!/usr/bin/env bash
# DRY-clean residue: .bak files + _attic directories left from prior refactorings.
# Per user 'yes. complete dry clean' (post-survey of 36 dead files in the tree).
#
# Run from repo root.
set -euo pipefail

cd "$(dirname "$0")/.."

echo "=== Listing residue ==="
find src tests -name "*.bak" -o -name "*.old" -o -name "*.orig" -o -name "*~" 2>/dev/null | tee /tmp/erpax-dry-clean-bak.txt
find src tests -type d \( -name "_attic" -o -name "_old" -o -name "_dead" \) 2>/dev/null | tee /tmp/erpax-dry-clean-dirs.txt

count_bak=$(wc -l < /tmp/erpax-dry-clean-bak.txt | tr -d ' ')
count_dirs=$(wc -l < /tmp/erpax-dry-clean-dirs.txt | tr -d ' ')

echo ""
echo "Found $count_bak files + $count_dirs directories of residue."

if [ "$count_bak" -eq 0 ] && [ "$count_dirs" -eq 0 ]; then
  echo "✓ Nothing to clean."
  exit 0
fi

echo ""
read -p "Delete all? (y/N) " confirm
if [ "$confirm" != "y" ]; then
  echo "Aborted."
  exit 1
fi

# Use git rm for tracked files; plain rm for untracked
while IFS= read -r f; do
  [ -z "$f" ] && continue
  if git ls-files --error-unmatch "$f" >/dev/null 2>&1; then
    git rm -f "$f" >/dev/null
  else
    rm -f "$f"
  fi
done < /tmp/erpax-dry-clean-bak.txt

while IFS= read -r d; do
  [ -z "$d" ] && continue
  if [ -d "$d" ]; then
    # check if any tracked files inside
    if git ls-files "$d" --error-unmatch . >/dev/null 2>&1; then
      git rm -rf "$d" >/dev/null
    else
      rm -rf "$d"
    fi
  fi
done < /tmp/erpax-dry-clean-dirs.txt

echo ""
echo "=== Verification ==="
remaining=$(find src tests -name "*.bak" -o -path "*/_attic/*" 2>/dev/null | wc -l | tr -d ' ')
if [ "$remaining" -eq 0 ]; then
  echo "✓ Clean."
else
  echo "⚠ $remaining files still present:"
  find src tests -name "*.bak" -o -path "*/_attic/*" 2>/dev/null
fi

echo ""
echo "Run:"
echo "  git status"
echo "  git commit -m 'chore: complete DRY clean — remove .bak files + _attic dirs'"
echo "  pnpm exec payload migrate:create     # should now succeed without esbuild scanning the .bak files"
