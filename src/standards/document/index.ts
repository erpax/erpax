/**
 * standards/document — the standards seed as nested pages.
 *
 * The standards seed is one list: each standard, its family, and the modules that cite it. The
 * gates read that list as code. A person or an agent reads it as documents: one page for the
 * register, one per family, one per standard saying what it is and where the corpus cites it. The
 * pages are derived from the seed and never typed, so they cannot say something the seed does not.
 *
 * Run: tsx src/standards/document/index.ts
 *      (writes seed.generated.json beside this file; load it with
 *       tsx src/seed/content/load/index.ts --url <origin> --seed src/standards/document/seed.generated.json)
 *
 * @invariant every standard in the seed is exactly one page, under the page of its family
 * @invariant a page lists exactly the citing modules the seed records for that standard
 * @see ./SKILL.md
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { pageRows, type PageRow } from '@/seed/content'

/** What a page needs of a seed entry — the fields it reads, and no others. */
export interface StandardEntry {
  readonly id: string
  readonly family: string
  readonly title: string
  readonly count: number
  readonly modules: ReadonlyArray<{ readonly path: string; readonly section: string }>
}

/** A standard's id as a path segment: lowercase, every run of other characters one hyphen. */
export const standardSlug = (id: string): string => id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** Where a standard's page lives: `standards/<family>/<id>`. */
export const standardPath = (entry: Pick<StandardEntry, 'id' | 'family'>): string => `standards/${standardSlug(entry.family)}/${standardSlug(entry.id)}`

/** One standard as a document: what it is, how often it is cited, and where. */
export function standardMarkdown(entry: StandardEntry): string {
  const rows = entry.modules.map((m) => `| \`${m.path}\` | ${m.section || '—'} |`)
  return [
    `# ${entry.id} — ${entry.title}`,
    '',
    `${entry.title}. Cited by ${entry.modules.length} module(s) of the corpus.`,
    ...(rows.length > 0 ? ['', '| Module | Section |', '| --- | --- |', ...rows] : []),
  ].join('\n')
}

/** The standards seed as nested page rows: the register, each family, each standard. */
export function standardRows(entries: readonly StandardEntry[]): PageRow[] {
  const families = new Map<string, StandardEntry[]>()
  for (const e of entries) (families.get(e.family) ?? families.set(e.family, []).get(e.family)!).push(e)
  const bodies = new Map<string, string>()
  bodies.set('standards', `# Standards\n\nEvery standard the corpus cites: ${entries.length} standard(s) in ${families.size} famil${families.size === 1 ? 'y' : 'ies'}, each with the modules that cite it.`)
  for (const [family, members] of families) {
    const list = [...members].sort((a, b) => a.id.localeCompare(b.id)).map((e) => `- [${e.id}](/${standardPath(e).replace(/\//g, '-')}) — ${e.title}`)
    bodies.set(`standards/${standardSlug(family)}`, [`# ${family}`, '', `The ${family} family: ${members.length} standard(s).`, '', ...list].join('\n'))
  }
  for (const e of entries) bodies.set(standardPath(e), standardMarkdown(e))
  return pageRows([...bodies.keys()].map((path) => ({ path })), (path) => bodies.get(path))
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { STANDARDS_CATALOGUE } = await import('@/standards/seed')
  const rows = standardRows(STANDARDS_CATALOGUE)
  const file = join(process.cwd(), 'src', 'standards', 'document', 'seed.generated.json')
  writeFileSync(file, JSON.stringify(rows, null, 1) + '\n')
  console.log(`standards/document — ${rows.length} page rows from ${STANDARDS_CATALOGUE.length} standards → ${file}`)
}
