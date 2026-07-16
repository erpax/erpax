/**
 * invisible — matter at an unlawful path has no uuid, so the fold cannot see it, so it silently duplicates.
 *
 * **If the path does not match the name, the quantum breaks.** The path IS the account code ([[path]]) and the
 * content-uuid is folded from it. A folder named `reporting.service` cannot be addressed: it has no lawful
 * path, so no uuid, so no node in the [[matrix]] (verified: the matrix holds **0** dotted paths), so the
 * dedup never runs over it. Whatever lives there is outside the corpus.
 *
 * This is NOT the [[law]]/folder `alphanumeric-name` axis restated. That axis counts NAMES (ceiling 433) and
 * reads as cosmetic — tidy it eventually. This names the CONSEQUENCE, which is structural:
 *
 *   The financial reporting service lived under a DOTTED folder — no SKILL, no uuid, no matrix node — and it
 *   holds a SECOND `generateTrialBalance`, private, beside the exported one in `accounting/reports`. The
 *   trial balance is what every financial report projects from. Two of them means the statutory SAF-T export
 *   and the balance sheet can disagree, each internally consistent, with no gate between them. The
 *   duplication is not the disease — it is the symptom of a path that could not be addressed.
 *
 * Measured 41 → **0**: every piece of matter in `src` is now addressable. **The path is the message — no
 * payload.** A path carries what a thing IS, never what you DO to it (`configure`/`create`/`sync` are verbs
 * ⇒ functions) nor how it behaves (`tenant`/`aware` are adjectives). A REPEATED segment is the tell: a name
 * restating its own location is unfolded linear logic. And the separators were slashes in disguise — the dot
 * IS a slash, so no word is dropped. Ceiling 0: matter may not become invisible again.
 *
 * HONEST BOUNDARY: this proves matter is UNADDRESSABLE, never that it is duplicated — finding the duplicate
 * took reading. It measures the gap where duplication can hide unseen, which is why the count matters more
 * than any single instance.
 *
 * @standard ISO/IEC 25010:2023 §5.6 maintainability — one source, addressable
 *
 * Composes [[rules]] · [[path]] · [[law]].
 */
import { readdirSync, existsSync, type Dirent } from 'node:fs'
import { join, relative } from 'node:path'

/** A folder's name is lawful — one generic lowercase word, `[a-z0-9]+`, so a uuid can fold from its path. */
export const isLawfulSegment = (name: string): boolean => /^[a-z0-9]+$/.test(name)

/** Matter the fold cannot see: an `index.ts` under a path that cannot be addressed. */
export interface InvisibleMatter {
  readonly path: string
  /** it has no SKILL either — no form, so not even a name to fold. */
  readonly formless: boolean
}

/**
 * Every folder carrying `index.ts` whose path is unlawful — matter outside the fold. These cannot be
 * content-addressed, so nothing deduplicates them and a second implementation can grow unnoticed.
 */
export function invisibleMatter(cwd: string = process.cwd()): InvisibleMatter[] {
  const out: InvisibleMatter[] = []
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (!e.isDirectory() || e.name === 'node_modules' || e.name === 'worktrees') continue
      const p = join(dir, e.name)
      if (!isLawfulSegment(e.name) && existsSync(join(p, 'index.ts'))) {
        out.push({
          path: relative(cwd, p).replace(/\\/g, '/'),
          formless: !existsSync(join(p, 'SKILL.md')),
        })
      }
      walk(p)
    }
  }
  walk(join(cwd, 'src'))
  return out.sort((a, b) => (a.path < b.path ? -1 : 1))
}

/**
 * Gate: matter must be addressable. Ratchets — the tree carries a known count, so it fails on getting WORSE
 * and the ceiling drops as each is renamed into the fold. Every one closed is a place a duplicate can no
 * longer hide.
 */
export function assertMatterVisible(cwd: string = process.cwd(), ceiling: number): void {
  const invisible = invisibleMatter(cwd)
  if (invisible.length <= ceiling) return
  throw new Error(
    `✖ invisible — ${invisible.length} folder(s) carry matter at an unaddressable path (ceiling ${ceiling}). No lawful path ⇒ no uuid ⇒ no dedup:\n${invisible
      .slice(0, 10)
      .map((i) => `  ${i.path}${i.formless ? ' (no SKILL — no form either)' : ''}`)
      .join('\n')}`,
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const invisible = invisibleMatter()
  console.log(
    `invisible — ${invisible.length} folder(s) carry matter the fold cannot see · ${invisible.filter((i) => i.formless).length} have no SKILL either`,
  )
  for (const i of invisible.slice(0, 12)) console.log(`  ${i.formless ? 'NO-FORM' : 'form   '}  ${i.path}`)
}
