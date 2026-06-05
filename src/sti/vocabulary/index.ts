/**
 * schema.org vocabulary → related atoms (the type dimension, materialised).
 *
 * Computes the WHOLE schema.org graph (rdfs:Class + rdf:Property + DataType) from
 * the vendored JSON-LD into one-concatenated-word atom folders — each term a
 * `src/<norm>/SKILL.md`, its `subClassOf` / `domainIncludes` / `rangeIncludes`
 * wired as `[[links]]`. The fractal architecture IS the schema.org hierarchy
 * ([[sti]] · [[collapse]] · [[merge]]).
 *
 * MERGE-SAFE: never overwrites an existing atom (the corpus / the live society own
 * those); only emits a `[[link]]` to a target that will exist (existing ∪ generated)
 * so the aura speech-gate stays gap = 0 by construction.
 *
 *   pnpm vocab:schemaorg          # stats + dry run
 *   pnpm vocab:schemaorg --emit   # materialise the new atoms
 *
 * @standard schema.org (the universal type vocabulary; Thing + subClassOf)
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'

const SRC = join(process.cwd(), 'src')
const EMIT = process.argv.includes('--emit')
const norm = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '')

interface Ref {
  '@id': string
}
type LangStr = string | { '@value': string } | Array<string | { '@value': string }>
interface Node {
  '@id': string
  '@type': string | string[]
  'rdfs:label'?: LangStr
  'rdfs:comment'?: LangStr
  'rdfs:subClassOf'?: Ref | Ref[]
  'schema:domainIncludes'?: Ref | Ref[]
  'schema:rangeIncludes'?: Ref | Ref[]
}

const str = (v: LangStr | undefined): string => {
  if (v == null) return ''
  if (Array.isArray(v)) return str(v[0])
  return typeof v === 'string' ? v : (v['@value'] ?? '')
}
const refs = (r: Ref | Ref[] | undefined): string[] =>
  r == null ? [] : (Array.isArray(r) ? r : [r]).map((x) => x['@id'])
const hasType = (n: Node, t: string): boolean => {
  const x = n['@type']
  return x === t || (Array.isArray(x) && x.includes(t))
}
const isType = (n: Node): boolean => hasType(n, 'rdfs:Class') || hasType(n, 'schema:DataType')
const isProp = (n: Node): boolean => hasType(n, 'rdf:Property')
const isSchema = (n: Node): boolean => String(n['@id']).startsWith('schema:')
const labelOf = (n: Node): string => str(n['rdfs:label']) || n['@id'].replace(/^schema:/, '')

// ── foreign atoms (walk src) — any SKILL.md NOT minted by this generator is
// FOREIGN: never overwrite it, but it IS a valid [[link]] target. Files carrying
// our sentinel are ours ⇒ re-emit overwrites them (idempotent self-heal). ──
const MINE = 'Encoded from schema.org'
const foreign = new Set<string>()
const walk = (dir: string): void => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name === 'SKILL.md' && !readFileSync(p, 'utf8').includes(MINE)) foreign.add(norm(basename(dirname(p))))
  }
}
walk(SRC)

// ── parse the graph ──
const graph: Node[] = (
  JSON.parse(readFileSync(join(SRC, 'sti', 'vocabulary', 'schemaorg.jsonld'), 'utf8')) as { '@graph': Node[] }
)['@graph']
const byId = new Map<string, Node>()
for (const n of graph) byId.set(n['@id'], n)
const idNorm = (id: string): string => {
  const n = byId.get(id)
  return norm(n ? labelOf(n) : id.replace(/^schema:/, ''))
}

const terms = graph.filter((n) => isSchema(n) && (isType(n) || isProp(n)))

// properties grouped by the type they apply to (domainIncludes)
const propsOfType = new Map<string, string[]>()
for (const n of terms)
  if (isProp(n))
    for (const d of refs(n['schema:domainIncludes'])) {
      const arr = propsOfType.get(d) ?? []
      arr.push(n['@id'])
      propsOfType.set(d, arr)
    }

// folder norm → senses (collision = several terms share a folder, merged into one atom)
const byNorm = new Map<string, Node[]>()
for (const n of terms) {
  const k = norm(labelOf(n))
  if (!k) continue
  const a = byNorm.get(k) ?? []
  a.push(n)
  byNorm.set(k, a)
}

// reserved: top-level src symlinks (e.g. `skills -> .`) — minting into them follows
// the link and pollutes src/; never mint or link these.
const reserved = new Set<string>()
for (const e of readdirSync(SRC, { withFileTypes: true })) if (e.isSymbolicLink()) reserved.add(norm(e.name))
const validTarget = (k: string): boolean => (byNorm.has(k) || foreign.has(k)) && !reserved.has(k)
const clean = (s: string): string =>
  s
    .replace(/\[\[([^[\]]+)\]\]/g, '$1') // schema.org [[CrossRef]] comment syntax → plain text (else spurious dead wikilinks)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // markdown [text](url) → text
    .replace(/<[^>]+>/g, '') // html tags
    .replace(/\\n/g, ' ') // literal backslash-n
    .replace(/\s+/g, ' ')
    .trim()
const yamlSafe = (s: string): string => clean(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').slice(0, 280)
const linkList = (ids: string[], cap: number): string =>
  [...new Set(ids.map(idNorm).filter(validTarget))].slice(0, cap).map((k) => `[[${k}]]`).join(' · ')

const render = (k: string, senses: ReadonlyArray<Node>): string => {
  const primary = senses[0]
  const desc =
    yamlSafe(str(primary['rdfs:comment'])) ||
    `schema.org ${isType(primary) ? 'type' : 'property'} ${labelOf(primary)}`
  const out: string[] = [
    '---',
    `name: ${k}`,
    `description: "${desc}"`,
    '---',
    '',
    `# ${k} — schema.org ${senses.map(labelOf).join(' / ')}`,
    '',
  ]
  for (const n of senses) {
    const L = labelOf(n)
    if (isType(n)) {
      const parents = linkList(refs(n['rdfs:subClassOf']), 8)
      const props = linkList(propsOfType.get(n['@id']) ?? [], 60)
      out.push(`**\`${L}\`** — type. ${clean(str(n['rdfs:comment']))}`, '')
      if (parents) out.push(`- subClassOf — ${parents}`)
      if (props) out.push(`- properties — ${props}`)
      out.push('')
    } else {
      const dom = linkList(refs(n['schema:domainIncludes']), 40)
      const rng = linkList(refs(n['schema:rangeIncludes']), 40)
      out.push(`**\`${L}\`** — property. ${clean(str(n['rdfs:comment']))}`, '')
      if (dom) out.push(`- on (domain) — ${dom}`)
      if (rng) out.push(`- value (range) — ${rng}`)
      out.push('')
    }
  }
  out.push('Encoded from schema.org — the type vocabulary IS the atom graph ([[sti]] · [[collapse]] · [[merge]]).', '')
  out.push(`@standard schema.org — ${senses.map((n) => 'https://schema.org/' + labelOf(n)).join(' · ')}`, '')
  return out.join('\n')
}

// ── emit / report ──
let minted = 0
let skipped = 0
const collisions = [...byNorm.values()].filter((s) => s.length > 1).length
for (const [k, senses] of byNorm) {
  if (foreign.has(k) || reserved.has(k)) {
    skipped++
    continue
  }
  if (EMIT) {
    mkdirSync(join(SRC, k), { recursive: true })
    writeFileSync(join(SRC, k, 'SKILL.md'), render(k, senses))
  }
  minted++
}

console.log('schema.org vocabulary → atoms')
console.log(`  terms ${terms.length} · folders ${byNorm.size} · merged-sense collisions ${collisions}`)
console.log(`  ${EMIT ? 'MINTED' : 'would mint'} ${minted} new · skipped ${skipped} existing (merge-safe)`)
console.log('  every [[link]] targets existing∪generated ⇒ aura gap stays 0')
if (!EMIT) console.log('  (dry run — pass --emit to materialise)')
