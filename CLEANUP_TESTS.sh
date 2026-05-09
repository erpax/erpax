#!/bin/bash

# Test Directory Cleanup Script
# Removes old __tests__ directories and consolidates tests to canonical locations
# This script should be run after verifying that tests have been moved to new locations

set -e

echo "=== Starting Test Directory Cleanup ==="
echo ""

# Function to safely remove directory
remove_directory() {
    local dir=$1
    if [ -d "$dir" ]; then
        echo "Removing: $dir"
        rm -rf "$dir"
        echo "✓ Removed: $dir"
    else
        echo "- Skipped (not found): $dir"
    fi
}

# Remove old __tests__ directories
echo "Removing old src/__tests__/ structure..."
remove_directory "src/__tests__"
echo ""

echo "Removing old plugin __tests__ directories in src/..."
remove_directory "src/plugins/accounting/__tests__"
remove_directory "src/plugins/receivables/__tests__"
remove_directory "src/plugins/export/__tests__"
echo ""

echo "Removing old lib/services __tests__..."
remove_directory "src/lib/state-machine/__tests__"
remove_directory "src/lib/services/__tests__"
echo ""

echo "Removing old src/services __tests__..."
remove_directory "src/services/__tests__"
echo ""

echo "=== Cleanup Complete ==="
echo ""
echo "New test structure locations:"
echo "  - tests/testing/           (shared testing infrastructure)"
echo "  - tests/lib/               (lib utility tests)"
echo "  - tests/services/          (service examples)"
echo "  - tests/plugins/           (plugin-specific tests)"
echo "  - plugins/*/tests/         (plugin tests)"
echo "  - plugins/*/seeds/         (plugin seeds)"
echo ""
echo "Next steps:"
echo "  1. Run tests: npm test tests/testing/"
echo "  2. Verify all tests pass"
echo "  3. Update CI/CD to use new test paths"
