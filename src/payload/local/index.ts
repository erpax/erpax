/**
 * payload/local — an installed skill, and this project's extension of it, as generated page seeds.
 *
 * The upstream Payload skill is a SKILL document plus reference files. This project adds one more
 * document — how Payload is used HERE — and turns the whole set into rows for the `pages`
 * collection: the skill is the parent, each reference a child, the local extension a child beside
 * them. The rows are written to a generated seed file, and the seed file is what gets loaded, so
 * loading needs neither the installed skill nor a checkout.
 *
 * Run: tsx src/payload/local/index.ts            (writes src/payload/local/seed.generated.json)
 *      tsx src/seed/content/load/index.ts --url <origin> --seed src/payload/local/seed.generated.json
 *
 * @invariant a reference file becomes a child of the skill it belongs to, addressed by its lowercased name
 * @invariant a link to a reference file is rewritten to the page that file became
 * @see ./SKILL.md
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { pageRows, slugOf, type PageRow } from '@/seed/content'

/** Where the skill tree hangs in the page tree. */
export const skillRoot = (name: string): string => `skills/${name}`

/** `reference/QUERIES.md` → `skills/payload/queries`; `SKILL.md` → `skills/payload`. */
export function skillPath(root: string, file: string): string {
  if (file === 'SKILL.md') return root
  const leaf = file.slice(file.lastIndexOf('/') + 1).replace(/\.md$/i, '').toLowerCase()
  return `${root}/${leaf}`
}

/** `](reference/QUERIES.md)` and `](QUERIES.md#x)` → the page each file became. */
export function relink(root: string, markdown: string): string {
  return markdown.replace(/\]\((?:\.\/)?(?:reference\/)?([A-Z][A-Z0-9-]*)\.md(#[^)]*)?\)/g, (_m, name: string, hash?: string) =>
    `](/${slugOf(`${root}/${name.toLowerCase()}`)}${hash ?? ''})`)
}

/**
 * Page rows for one skill: its files keyed by their path inside the skill folder, plus documents
 * this project adds beside the references (`extra`, keyed by leaf name).
 */
export function skillRows(name: string, files: Readonly<Record<string, string>>, extra: Readonly<Record<string, string>> = {}): PageRow[] {
  const root = skillRoot(name)
  const bodies = new Map<string, string>([['skills', `# Skills\n\nInstalled skills and this project's extensions of them, one page each.`]])
  for (const [file, markdown] of Object.entries(files)) bodies.set(skillPath(root, file), relink(root, markdown))
  for (const [leaf, markdown] of Object.entries(extra)) bodies.set(`${root}/${leaf}`, relink(root, markdown))
  return pageRows([...bodies.keys()].map((path) => ({ path })), (path) => bodies.get(path))
}

/** Read an installed skill folder: its SKILL document and every reference file. */
export function readSkill(dir: string): Record<string, string> {
  const out: Record<string, string> = {}
  if (existsSync(join(dir, 'SKILL.md'))) out['SKILL.md'] = readFileSync(join(dir, 'SKILL.md'), 'utf8')
  const ref = join(dir, 'reference')
  if (existsSync(ref)) for (const f of readdirSync(ref).filter((x) => x.endsWith('.md')).sort()) out[`reference/${f}`] = readFileSync(join(ref, f), 'utf8')
  return out
}

/** The generated seed: the installed Payload skill and the local extension, as page rows. */
export function payloadSkillSeed(cwd: string): PageRow[] {
  const local = join(cwd, 'src', 'payload', 'local', 'SKILL.md')
  return skillRows('payload', readSkill(join(cwd, '.agents', 'skills', 'payload')), existsSync(local) ? { local: readFileSync(local, 'utf8') } : {})
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const rows = payloadSkillSeed(process.cwd())
  const file = join(process.cwd(), 'src', 'payload', 'local', 'seed.generated.json')
  writeFileSync(file, JSON.stringify(rows, null, 1) + '\n')
  console.log(`payload/local — ${rows.length} page rows → ${file}`)
}
