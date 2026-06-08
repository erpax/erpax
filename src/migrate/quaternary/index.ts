/**
 * quaternary -- the ONE folder-file law, computed from the live tree.
 *
 * A folder's files must each be ALLOWED: the canonical word-atom files, plus
 * anything a framework requires (Next.js routes, Payload config, assets) -- "they
 * are all the same". Everything else MERGES BY EXTENSION into its canonical:
 *   *.ts        -> index.ts   (matter)        *.md  -> SKILL.md  (antimatter)
 *   *.test.ts   -> test.ts    (the test, part of the architecture, one per folder)
 *   translations.ts / seed.ts / README.md      (per-folder computed / opening data / diamond projection)
 * A leftover same-extension file is entropy -- collide it into the canonical
 * ([[collapse]] · [[merge]] · [[dissolution]]).
 *
 * Scope = ALL folders, strict, no exceptions. Derive-from-fs ([[aura]] ·
 * [[coordinate]]). The co-located test.ts ratchets the violation count to 0;
 * driving it to 0 drives tamper-cost to infinity.
 *
 *   tsx src/migrate/quaternary/index.ts          # print the merge-by-extension queue
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 * @audit the folder law is computed from the live tree, never hand-maintained
 * @see ../ (the migrating skills) · ../../aura (the link gap)
 */
import { readdirSync } from 'node:fs'
import { join, extname } from 'node:path'
import { isRealDir } from '@/aura'

/** Canonical word-atom files -- one per role, per folder. */
export const CANONICAL = ['SKILL.md', 'index.ts', 'test.ts', 'translations.ts', 'seed.ts', 'README.md'] as const
/** Files the frameworks require (Next.js app router · Payload · admin) -- all allowed. */
export const FRAMEWORK = new Set<string>([
  'page.tsx', 'layout.tsx', 'loading.tsx', 'not-found.tsx', 'error.tsx', 'global-error.tsx',
  'template.tsx', 'default.tsx', 'route.ts', 'page.client.tsx', 'sitemap.ts', 'robots.ts',
  'manifest.ts', 'icon.tsx', 'apple-icon.tsx', 'opengraph-image.tsx', 'favicon.ico',
  'payload.config.ts', 'payload-types.ts', 'payload-generated-schema.ts', 'middleware.ts',
  'instrumentation.ts', 'importMap.js',
])
/** Asset / data extensions the frameworks carry -- allowed as-is. */
export const ASSET_EXT = new Set<string>(['.json', '.jsonld', '.scss', '.css', '.webp', '.png', '.svg', '.ico', '.woff', '.woff2', '.d.ts'])
const CANON = new Set<string>(CANONICAL)

const isAllowed = (file: string): boolean =>
  CANON.has(file) || FRAMEWORK.has(file) || ASSET_EXT.has(extname(file))

export interface Violation {
  readonly folder: string
  readonly file: string
}

/** Every file, in ANY folder, that is not allowed -- the merge-by-extension queue. */
export function quaternaryViolations(root: string = join(process.cwd(), 'src')): Violation[] {
  const out: Violation[] = []
  const walk = (dir: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir).sort()
    } catch {
      return
    }
    for (const e of entries) {
      if (e === 'node_modules' || e.startsWith('.')) continue
      const p = join(dir, e)
      if (isRealDir(p)) walk(p)
      else if (!isAllowed(e)) out.push({ folder: dir.slice(root.length + 1) || '.', file: e })
    }
  }
  walk(root)
  return out
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const v = quaternaryViolations()
  const folders = new Set(v.map((x) => x.folder))
  const byExt = new Map<string, number>()
  const byName = new Map<string, number>()
  for (const { file } of v) {
    const ext = extname(file) || '(none)'
    byExt.set(ext, (byExt.get(ext) ?? 0) + 1)
    byName.set(file, (byName.get(file) ?? 0) + 1)
  }
  console.log(`quaternary: ${v.length} files to merge-by-extension across ${folders.size} folder(s)`)
  console.log('  by ext:', [...byExt.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k}:${n}`).join(' '))
  console.log('  by name:', [...byName.entries()].sort((a, b) => b[1] - a[1]).slice(0, 14).map(([k, n]) => `${k}:${n}`).join(' '))
}
