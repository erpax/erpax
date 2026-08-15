#!/usr/bin/env node
/**
 * ensure-image-size-patch — fail closed unless the image-size DoS patch is intact.
 *
 * image-size@2.0.2 has three infinite-loop DoS holes with NO upstream fix
 * (CVE-2025-71330 ICNS, CVE-2025-71329 JXL+HEIF): a box/entry of size 0 never
 * advances the parse offset. patches/image-size@2.0.2.patch adds a zero-advance
 * guard to all three loops in every dist file (index+detector, cjs+mjs).
 *
 * A `pnpm patch` fixes BEHAVIOUR without changing the version, so version-based
 * scanners can't confirm it and — worse — dropping the patch (removing the
 * pnpm-workspace entry, deleting the .patch, or bumping the version without
 * re-patching) makes install SUCCEED with the vulnerable code back. This is the
 * guard that catches exactly that: it scans every resolved image-size dist file
 * and asserts all three guards are present, exiting 1 if any copy is unguarded.
 *
 * The dual of scripts/ensure-mcp-patch.mjs, but an ASSERTION not an overlay —
 * a silent security hole must fail the build, never be healed away unseen.
 *
 *   node scripts/ensure-image-size-patch.mjs
 */
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const nodeModules = join(root, 'node_modules')

/** The three zero-advance guards the patch installs — one per vulnerable loop. */
const GUARDS = [
  { cve: 'CVE-2025-71330 (ICNS)', marker: 'if (imageHeader[1] <= 0) break;' },
  { cve: 'CVE-2025-71329 (JXL)', marker: '<= offset) break;' },
  { cve: 'CVE-2025-71329 (HEIF)', marker: '<= currentOffset) break;' },
]
const DIST_FILES = ['index.cjs', 'index.mjs', 'detector.cjs', 'detector.mjs']

/**
 * Every LOADABLE image-size copy — the real dirs behind live `image-size`
 * symlinks, deduped by realpath. This checks what can actually be required at
 * runtime (including a second webpack resolution, the case ensure-mcp-patch
 * exists for) and ignores orphaned .pnpm store leftovers that nothing links to.
 */
function imageSizeDistDirs() {
  const seen = new Set()
  const walk = (dir, depth) => {
    if (depth > 8 || !existsSync(dir)) return
    let entries
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      const p = join(dir, e.name)
      if (e.isSymbolicLink()) {
        if (e.name !== 'image-size') continue
        try {
          const dist = join(realpathSync(p), 'dist')
          if (existsSync(dist)) seen.add(dist)
        } catch {
          /* dangling link */
        }
      } else if (e.isDirectory()) {
        // descend only where package dirs live: scoped roots, .pnpm, node_modules
        if (e.name.startsWith('@') || e.name === '.pnpm' || e.name === 'node_modules') {
          walk(p, depth + 1)
        }
      }
    }
  }
  walk(nodeModules, 0)
  return [...seen]
}

const dirs = imageSizeDistDirs()
if (dirs.length === 0) {
  // image-size is a transitive dep of payload; absent only if the tree changed
  // radically. Nothing to guard, so nothing to fail — report and pass.
  console.log('[ensure-image-size-patch] no image-size resolved — nothing to guard')
  process.exit(0)
}

const failures = []
for (const dist of dirs) {
  for (const file of DIST_FILES) {
    const fp = join(dist, file)
    if (!existsSync(fp)) continue
    const body = readFileSync(fp, 'utf8')
    for (const { cve, marker } of GUARDS) {
      if (!body.includes(marker)) {
        failures.push(`${fp.replace(root + '/', '')} — missing ${cve} guard`)
      }
    }
  }
}

if (failures.length > 0) {
  console.error('[ensure-image-size-patch] ✗ the image-size DoS patch is NOT intact:')
  for (const f of failures) console.error('   ' + f)
  console.error(
    '\n  The infinite-loop guards are gone — a malformed image can hang the parser.\n' +
      '  Restore patches/image-size@2.0.2.patch (and its pnpm-workspace entry), or if\n' +
      '  image-size shipped a real fix, bump the version and drop the patch + this guard.',
  )
  process.exit(1)
}

console.log(
  `[ensure-image-size-patch] ✓ all 3 DoS guards intact across ${dirs.length} image-size copy(ies)`,
)
