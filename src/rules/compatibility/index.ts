/**
 * rules/compatibility — an atom may not seize a name the FRAMEWORK reserves for another purpose.
 *
 * ISO/IEC 25010 §5.3 compatibility = co-existence + interoperability: the corpus must share its
 * environment with the framework without detriment. It does NOT: `src/pages` is a one-word erpax atom
 * (a CMS collection) AND Next.js's reserved Pages-Router directory. Next reads it as a router, not as
 * data — the admin panel's generated types fail (`.next/dev/types/validator.ts` rejects every
 * `src/pages/*` module), so the app does not compile. A perfect one-word name ([[law]]/folder cannot
 * see the clash) that collides with the framework's namespace, which is not in this corpus's model.
 *
 * The gate is the reverse-engineering of §5.3 into law ([[engineering]]): an atom folder whose leaf is a
 * framework-reserved ROUTER name breaks co-existence. `pages` is the live violation; the ceiling
 * ratchets to 0 when it is renamed (the src/pages → a data slug move, task-tracked).
 *
 *   tsx src/rules/compatibility/index.ts
 *
 * @standard ISO/IEC 25010:2023 §5.3 compatibility — co-existence with the framework namespace
 */
import { readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

/**
 * DECLARED framework-reserved ROUTER namespaces — a directory Next.js parses as ROUTING, so a data atom
 * of the same name is misread. `app` is NOT here: it is the App Router erpax legitimately owns. The
 * reserved FILE stems (layout · error · route · template · loading · not-found · middleware) are special
 * only INSIDE app/, not as src-root atoms, so they do not break co-existence and are not flagged.
 */
export const FRAMEWORK_RESERVED: Readonly<Record<string, string>> = {
  pages: 'Next.js Pages Router directory — erpax uses the App Router (src/app), so a pages/ atom is parsed as a router and its modules fail type-generation',
}

export interface FrameworkCollision {
  readonly atom: string
  readonly reserved: string
  readonly why: string
}

const SKIP = new Set(['node_modules', 'app', 'migrations'])

/** Every SKILL-bearing atom whose leaf name is a framework-reserved router namespace. */
export function frameworkCollisions(cwd: string = process.cwd()): FrameworkCollision[] {
  const out: FrameworkCollision[] = []
  const walk = (dir: string): void => {
    let ents: import('node:fs').Dirent[]
    try {
      ents = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of ents) {
      if (!e.isDirectory() || e.name.startsWith('.') || SKIP.has(e.name)) continue
      const p = join(dir, e.name)
      const reserved = FRAMEWORK_RESERVED[e.name]
      if (reserved && existsSync(join(p, 'SKILL.md'))) {
        out.push({ atom: p.replace(/.*\/src\//, 'src/'), reserved: e.name, why: reserved })
      }
      walk(p)
    }
  }
  walk(join(cwd, 'src'))
  return out
}

/**
 * The gate: a corpus atom may not collide with a framework-reserved router name. Ratchets DOWN — the
 * live count is `pages`; renaming it to a data slug drops the ceiling to 0 and the app compiles.
 */
export function assertCompatible(cwd: string = process.cwd(), ceiling: number): void {
  const collisions = frameworkCollisions(cwd)
  if (collisions.length <= ceiling) return
  throw new Error(
    `✖ rules/compatibility — ${collisions.length} atom(s) collide with a framework namespace (ceiling ${ceiling}): ` +
      `${collisions.map((c) => `${c.atom}↔${c.reserved}`).join(' ')} — rename to a data name, or the framework misparses it.`,
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const collisions = frameworkCollisions()
  console.log(`rules/compatibility — ${collisions.length} framework-namespace collision(s)`)
  for (const c of collisions) console.log(`  ✗ ${c.atom} ↔ ${c.reserved}: ${c.why}`)
}

/** @index-cross.foldback child=rules/compatibility parent=rules — this cross folds back into its parent. */
