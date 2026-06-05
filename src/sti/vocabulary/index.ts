/**
 * schema.org → single-word atoms, entangled (collide the vocabulary with itself).
 *
 * A concatenated multiword folder (`creativework`) is multiword disguised as one — a
 * lie/violation. So COLLIDE schema.org with itself: split every label at its word
 * boundaries (the [[harmony]] camelCase split) into TRUE single words; the unique
 * words are the atoms; a compound is the ENTANGLEMENT (co-occurrence [[links]]) of its
 * word-atoms; the same word across terms MERGES. No `schema` prefix — the atom is the
 * bare word; schema.org is a cited @standard, never a name.
 *
 *   pnpm vocab:schemaorg          # stats (dry)
 *   pnpm vocab:schemaorg --emit   # mint the single-word atoms
 *
 * @standard schema.org (the universal type vocabulary, collided to single words)
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'

const SRC = join(process.cwd(), 'src')
const EMIT = process.argv.includes('--emit')
const MINE = 'collided out of schema.org'
const norm = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '')

// the collision: split a label into its constituent single words (camelCase / digits)
const STOP = new Set<string>([
  'the', 'a', 'an', 'of', 'and', 'or', 'to', 'in', 'on', 'for', 'by', 'with', 'from', 'at', 'as', 'is', 'be', 'per', 'via', 'this', 'that',
])
const wordsOf = (label: string): string[] =>
  label
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
    .replace(/([0-9])([a-zA-Z])/g, '$1 $2')
    .split(/[\s_-]+/)
    .map((w) => w.toLowerCase())
    .filter((w) => /^[a-z][a-z0-9]*$/.test(w) && w.length >= 2 && !STOP.has(w))

interface LangLike {
  '@value'?: string
}
type Lang = string | LangLike | Array<string | LangLike>
interface Node {
  '@id': string
  '@type': string | string[]
  'rdfs:label'?: Lang
  'rdfs:comment'?: Lang
}
const str = (v: Lang | undefined): string => {
  if (v == null) return ''
  if (Array.isArray(v)) return str(v[0])
  return typeof v === 'string' ? v : (v['@value'] ?? '')
}
const hasType = (n: Node, t: string): boolean => {
  const x = n['@type']
  return x === t || (Array.isArray(x) && x.includes(t))
}
const isTerm = (n: Node): boolean =>
  String(n['@id']).startsWith('schema:') &&
  (hasType(n, 'rdfs:Class') || hasType(n, 'rdf:Property') || hasType(n, 'schema:DataType'))
const labelOf = (n: Node): string => str(n['rdfs:label']) || n['@id'].replace(/^schema:/, '')
const clean = (s: string): string =>
  s
    .replace(/\[\[([^[\]]+)\]\]/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
const yamlSafe = (s: string): string => clean(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').slice(0, 200)

// ── foreign (no overwrite) + reserved (symlinks) — merge-safe ──
const foreign = new Set<string>()
const walk = (dir: string): void => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name === 'SKILL.md' && !readFileSync(p, 'utf8').includes(MINE)) foreign.add(norm(basename(dirname(p))))
  }
}
walk(SRC)
const reserved = new Set<string>()
for (const e of readdirSync(SRC, { withFileTypes: true })) if (e.isSymbolicLink()) reserved.add(norm(e.name))

// ── collide the graph into single words ──
const graph: Node[] = (
  JSON.parse(readFileSync(join(SRC, 'sti', 'vocabulary', 'schemaorg.jsonld'), 'utf8')) as { '@graph': Node[] }
)['@graph']
const concept = new Map<string, string>() // word -> its own schema comment (single-word terms only)
const co = new Map<string, Set<string>>() // word -> entangled (co-occurring) words
const forms = new Map<string, Set<string>>() // word -> compound labels it builds
const allWords = new Set<string>()
for (const n of graph) {
  if (!isTerm(n)) continue
  const label = labelOf(n)
  const words = wordsOf(label)
  if (!words.length) continue
  if (words.length === 1) {
    const c = clean(str(n['rdfs:comment']))
    if (c && !concept.has(words[0])) concept.set(words[0], c)
  }
  for (const w of words) {
    allWords.add(w)
    const f = forms.get(w) ?? new Set<string>()
    f.add(label)
    forms.set(w, f)
    const cs = co.get(w) ?? new Set<string>()
    for (const o of words) if (o !== w) cs.add(o)
    co.set(w, cs)
  }
}

const validTarget = (k: string): boolean => (allWords.has(k) || foreign.has(k)) && !reserved.has(k)
const linksOf = (ws: ReadonlySet<string> | undefined, cap: number): string =>
  [...(ws ?? new Set<string>())].filter(validTarget).slice(0, cap).map((k) => `[[${k}]]`).join(' · ')

const render = (w: string): string => {
  const def = concept.get(w)
  const desc = yamlSafe(def ?? 'A single-word atom, collided out of schema.org compounds (entangled, no multiword disguise).')
  const ent = linksOf(co.get(w), 40)
  const compounds = [...(forms.get(w) ?? [])].slice(0, 24).join(' · ')
  const out: string[] = [
    '---',
    `name: ${w}`,
    `description: "${desc}"`,
    '---',
    '',
    `# ${w}`,
    '',
    def ?? 'A single-word atom — collided out of schema.org compounds (no multiword disguise; [[sti]] · [[collapse]] · [[merge]]).',
    '',
  ]
  if (ent) out.push(`Entangled with — ${ent}`, '')
  if (compounds) out.push(`Attested in schema.org — ${compounds}`, '')
  out.push('@standard schema.org — the type vocabulary, collided to single words', '')
  return out.join('\n')
}

// ── emit / report ──
let minted = 0
let skipped = 0
for (const w of allWords) {
  if (foreign.has(w) || reserved.has(w)) {
    skipped++
    continue
  }
  if (EMIT) {
    mkdirSync(join(SRC, w), { recursive: true })
    writeFileSync(join(SRC, w, 'SKILL.md'), render(w))
  }
  minted++
}
console.log('schema.org → single-word atoms (collided with itself)')
console.log(`  distinct single words ${allWords.size}`)
console.log(`  ${EMIT ? 'MINTED' : 'would mint'} ${minted} · skipped ${skipped} foreign/reserved (merge-safe)`)
if (!EMIT) console.log('  (dry — pass --emit)')
