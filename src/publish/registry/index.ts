import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { ERPAX_DOI, ERPAX_VERSION_DOI, SOURCE_URL } from '@/algebra'
import { chainLeaf } from '@/merge'

/**
 * publish/registry — which results this corpus can honestly publish, computed from the corpus.
 *
 * @see ./SKILL.md
 */

export interface CrossLink {
  readonly rel: string
  readonly url: string
}

export interface PublishableResult {
  readonly atomPath: string
  /**
   * The result's identity ACROSS REPOSITORIES — a content-address of the claim, not of the path.
   *
   * Two repos deriving the same result produce the same uuid, which is what makes a duplicate
   * detectable instead of a second deposit for one finding. The path is repo-local and would make
   * every sibling's copy look novel; the claim is the work.
   */
  readonly uuid: string
  /** The atom's own H1 — an authored title, never one this code invented. */
  readonly title: string
  /** URL-safe id, stable across runs — the paper's slug and its anchor on the site. */
  readonly slug: string
  /** The Law sentence, as the atom states it. Authored, never generated. */
  readonly claim: string
  /** The atom's own statement of what it does NOT prove. A paper without one is not publishable. */
  readonly boundary: string
  /** The command that recomputes the result — the method, executable. */
  readonly method: string
  /** Standards the atom cites. */
  readonly standards: readonly string[]
  /** Atoms it composes with, as slugs — the citation graph between papers. */
  readonly composes: readonly string[]
  /** The kernel-checked development, when the atom has one. */
  readonly proof: string | null
  readonly links: readonly CrossLink[]
}

/**
 * Markdown stripped for structured data.
 *
 * A JSON-LD field is read by a machine that will render `**bold**` literally, and a wikilink
 * means nothing outside this corpus. The prose stays markdown where a human reads it.
 */
const plain = (t: string): string =>
  t
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()

/**
 * The identity of a RESULT, repo-independent.
 *
 * Addresses the claim and its boundary — the two things a reader is asked to believe — and
 * nothing about where the file lives. Same finding, same address, in any repository: that is the
 * whole point of a content-address, applied to publications so a body of work can merge in
 * metadata rather than duplicate in deposits.
 */
export const resultUuid = (claim: string, boundary: string): string => chainLeaf({ boundary, claim }, '')

const blobUrl = (p: string): string => `${SOURCE_URL}/blob/main/${p}`
const treeUrl = (p: string): string => `${SOURCE_URL}/tree/main/${p}`

export const slugOf = (atomPath: string): string => atomPath.replace(/\//g, '-')

const atomDirs = (cwd: string): string[] => {
  const out: string[] = []
  const walk = (d: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(d, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.name === 'SKILL.md') out.push(join(p, '..'))
    }
  }
  walk(join(cwd, 'src'))
  return out.sort()
}

/** An atom is publishable only with all three legs: a law, a boundary, and a gate that can fail. */
const gateOf = (dir: string): string | null => {
  for (const name of ['index.ts', 'index.tsx']) {
    const p = join(dir, name)
    if (!existsSync(p)) continue
    const m = /export\s+(?:async\s+)?function\s+(assert[A-Z]\w*)/.exec(readFileSync(p, 'utf8'))
    if (m) return m[1]!
  }
  return null
}

/**
 * The Lean development this atom points at — read from the atom's OWN text, never guessed.
 *
 * Both the SKILL and the barrel are read: an atom commonly names its kernel file in the `@see`
 * of `index.ts` rather than in its prose, and a reader that looked only at the SKILL found 2 of
 * the 4 developments that exist ([[rules]]/domain, again).
 */
const proofOf = (dir: string, skill: string, cwd: string): string | null => {
  let text = skill
  for (const name of ['index.ts', 'index.tsx']) {
    const p = join(dir, name)
    if (existsSync(p)) text += readFileSync(p, 'utf8')
  }
  for (const m of text.matchAll(/([A-Za-z]+)\.lean\b/g)) {
    const p = join('src/verify/lean', `${m[1]!}.lean`)
    if (existsSync(join(cwd, p))) return p
  }
  return null
}

/**
 * Every result this corpus can publish, computed — never a hand-kept list.
 *
 * The three legs are the scientific bar and each is read from the atom itself: a **Law** it
 * states, an **Honest boundary** naming what it does not prove, and an exported `assert…` that
 * fails closed. An atom missing any one of them is not published, and that is the whole filter —
 * a claim with no falsifier is [[rules]]/refutable's defect, and a claim with no stated limit is
 * how every overreach in this corpus began.
 */
export function publishableResults(cwd: string = process.cwd()): PublishableResult[] {
  const out: PublishableResult[] = []
  for (const dir of atomDirs(cwd)) {
    const atomPath = relative(join(cwd, 'src'), dir)
    const skill = readFileSync(join(dir, 'SKILL.md'), 'utf8')
    const law = /\*\*Law — (?:\[\[law\]\]: )?([\s\S]*?)\*\*/.exec(skill)?.[1]
    const boundary = /\*\*Honest boundary\.?\*\*\s*([\s\S]*?)(?=\n\n\*\*Law|\n\n##|$)/.exec(skill)?.[1]
    const gate = gateOf(dir)
    if (law === undefined || boundary === undefined || gate === null) continue

    const standards = [...(/\n## Standards\n([\s\S]*?)(?=\n## |\n---|$)/.exec(skill)?.[1] ?? '').matchAll(/^\s*[-*]\s+\*\*(.+?)\*\*/gm)].map((m) => m[1]!.trim())
    const composes = [...(/\nComposes:([^\n]*)/.exec(skill)?.[1] ?? '').matchAll(/\[\[([a-z0-9]+)\]\](\/[a-z0-9/]+)?/g)].map((m) => slugOf(`${m[1]!}${m[2] ?? ''}`))
    const proof = proofOf(dir, skill, cwd)
    const entry = join('src', atomPath, existsSync(join(dir, 'index.tsx')) ? 'index.tsx' : 'index.ts')

    out.push({
      atomPath,
      uuid: resultUuid(plain(law), plain(boundary)),
      title: plain(/^#\s+(.+)$/m.exec(skill)?.[1] ?? atomPath),
      slug: slugOf(atomPath),
      claim: plain(law),
      boundary: plain(boundary),
      method: `tsx ${entry}`,
      standards,
      composes,
      proof,
      links: [
        { rel: 'atom', url: treeUrl(join('src', atomPath)) },
        { rel: 'law', url: blobUrl(join('src', atomPath, 'SKILL.md')) },
        { rel: 'gate', url: `${blobUrl(entry)}#:~:text=${encodeURIComponent(gate)}` },
        { rel: 'proof-of-work', url: blobUrl(join('src', atomPath, 'test.ts')) },
        ...(proof === null ? [] : [{ rel: 'kernel-proof', url: blobUrl(proof) }]),
        { rel: 'archived-version', url: `https://doi.org/${ERPAX_VERSION_DOI}` },
        { rel: 'archived-all-versions', url: `https://doi.org/${ERPAX_DOI}` },
      ],
    })
  }
  return out
}

/**
 * The citation graph BETWEEN results — a paper cites the papers it composes with.
 *
 * Only edges to results that are themselves published: a cross-link to an atom nobody can read
 * is the dangling citation [[rules]]/reference exists to forbid, moved from prose into metadata.
 */
export function citationGraph(results: readonly PublishableResult[]): Map<string, string[]> {
  const published = new Set(results.map((r) => r.slug))
  return new Map(results.map((r) => [r.slug, r.composes.filter((c) => published.has(c) && c !== r.slug)]))
}

/**
 * One result as schema.org `ScholarlyArticle` — the form a search engine and a harvester read.
 *
 * Every field is derived from the result, so the structured data cannot disagree with the page
 * beside it. `citation` carries the cross-links to sibling results, which is what turns 44 pages
 * into one connected body of work rather than 44 orphans.
 */
export function scholarlyArticle(
  r: PublishableResult,
  cites: readonly string[],
  siteUrl: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    '@id': `${siteUrl}/publications/${r.slug}`,
    url: `${siteUrl}/publications/${r.slug}`,
    name: r.title,
    headline: r.title,
    abstract: r.claim,
    disambiguatingDescription: r.boundary,
    inLanguage: 'en',
    author: { '@type': 'Person', name: 'Tsvetan Rouschev', identifier: 'https://orcid.org/0009-0000-7312-9778' },
    publisher: { '@type': 'Organization', name: 'erpax', url: SOURCE_URL },
    license: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    isPartOf: { '@type': 'Dataset', name: 'erpax', identifier: `https://doi.org/${ERPAX_DOI}` },
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'DOI', value: ERPAX_VERSION_DOI },
      { '@type': 'PropertyValue', propertyID: 'concept-DOI', value: ERPAX_DOI },
      { '@type': 'PropertyValue', propertyID: 'erpax-result-uuid', value: r.uuid },
    ],
    citation: cites.map((c) => ({ '@type': 'ScholarlyArticle', '@id': `${siteUrl}/publications/${c}` })),
    ...(r.standards.length > 0 ? { about: r.standards.map((name) => ({ '@type': 'DefinedTerm', name })) } : {}),
    ...(r.proof === null ? {} : { encoding: { '@type': 'MediaObject', name: 'kernel-checked proof', contentUrl: blobUrl(r.proof) } }),
    codeRepository: SOURCE_URL,
    relatedLink: r.links.map((l) => l.url),
  }
}

/**
 * Zenodo `related_identifiers` for one result, cross-linked to its siblings.
 *
 * A deposit that names only the repository is an island. Naming the results it composes with is
 * what makes the body of work navigable from the archive rather than only from the site.
 */
export function relatedIdentifiers(
  r: PublishableResult,
  cites: readonly string[],
  siteUrl: string,
): { identifier: string; relation: string }[] {
  // NO `scheme`. It is not a documented attribute — the docs list identifier · relation ·
  // resource_type and say "the identifier type (e.g. DOI) is automatically detected". A sibling
  // repo's audit caught this in code written the same day, having shipped 338 records with an
  // invented `notes_funding` field before reading the same page.
  return [
    { identifier: `${siteUrl}/publications/${r.slug}`, relation: 'isSupplementTo' },
    { identifier: ERPAX_DOI, relation: 'isPartOf' },
    { identifier: ERPAX_VERSION_DOI, relation: 'isDerivedFrom' },
    // the cross-repo identity: a sibling deriving this same result deposits the same urn, so the
    // two records relate as identical rather than standing as two claims to one finding
    { identifier: `urn:uuid:${r.uuid}`, relation: 'isIdenticalTo' },
    ...r.links.filter((l) => l.rel !== 'archived-version' && l.rel !== 'archived-all-versions').map((l) => ({ identifier: l.url, relation: 'references' })),
    ...cites.map((c) => ({ identifier: `${siteUrl}/publications/${c}`, relation: 'cites' })),
  ]
}

export interface ResultManifest {
  readonly repo: string
  /** The archived version this manifest describes — a manifest with no record is unanchored. */
  readonly versionDoi: string
  readonly results: readonly { uuid: string; slug: string; title: string; claim: string }[]
}

/**
 * What this repository publishes, in the form a sibling can check against.
 *
 * No timestamp: the manifest is a content-address of a state, and a clock would make two
 * identical states differ. The version DOI anchors it instead.
 */
export const resultManifest = (repo: string, results: readonly PublishableResult[]): ResultManifest => ({
  repo,
  versionDoi: ERPAX_VERSION_DOI,
  results: results.map((r) => ({ uuid: r.uuid, slug: r.slug, title: r.title, claim: r.claim })),
})

export interface Collision {
  readonly uuid: string
  readonly here: string
  readonly there: string
  readonly repo: string
}

/** Two results in THIS repo sharing an identity — the same finding published twice. */
export function duplicateResults(results: readonly PublishableResult[]): Collision[] {
  const byUuid = new Map<string, string[]>()
  for (const r of results) byUuid.set(r.uuid, [...(byUuid.get(r.uuid) ?? []), r.slug])
  return [...byUuid]
    .filter(([, slugs]) => slugs.length > 1)
    .flatMap(([uuid, slugs]) => slugs.slice(1).map((there) => ({ uuid, here: slugs[0]!, there, repo: 'erpax' })))
}

/**
 * Results a SIBLING repository already publishes, matched by identity rather than by title.
 *
 * This is what "repos merge in metadata" means concretely: the identity is a content-address of
 * the claim, so a sibling deriving the same finding lands on the same uuid and the duplicate is
 * visible before a second deposit exists. Two DOIs for one result is the failure being prevented.
 *
 * An empty drop is reported as EMPTY, never as clean — a sibling that has published no manifest
 * has not been checked, which is the absence-of-evidence trap this corpus has already paid for.
 */
export function foreignCollisions(
  results: readonly PublishableResult[],
  dropDir: string,
): { collisions: Collision[]; manifestsRead: number } {
  const mine = new Map(results.map((r) => [r.uuid, r.slug]))
  const collisions: Collision[] = []
  let manifestsRead = 0
  let names: string[] = []
  try {
    names = readdirSync(dropDir).filter((n) => n.endsWith('.results.json'))
  } catch {
    return { collisions, manifestsRead: 0 }
  }
  for (const name of names) {
    let m: ResultManifest
    try {
      m = JSON.parse(readFileSync(join(dropDir, name), 'utf8')) as ResultManifest
    } catch {
      continue
    }
    if (m.repo === 'erpax') continue
    manifestsRead++
    for (const r of m.results ?? []) {
      const here = mine.get(r.uuid)
      if (here !== undefined) collisions.push({ uuid: r.uuid, here, there: r.slug, repo: m.repo })
    }
  }
  return { collisions, manifestsRead }
}

/** Fails closed on one finding published twice HERE. Zero is a theorem. */
export function assertResultsUnique(cwd: string = process.cwd()): void {
  const dupes = duplicateResults(publishableResults(cwd))
  if (dupes.length === 0) return
  throw new Error(
    `✖ publish/registry — ${dupes.length} result(s) share an identity, so one finding would be published twice:\n` +
      dupes.map((d) => `  ${d.uuid}  ${d.here} = ${d.there}`).join('\n'),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rs = publishableResults()
  const graph = citationGraph(rs)
  const edges = [...graph.values()].reduce((n, xs) => n + xs.length, 0)
  console.log(`publish/registry — ${rs.length} publishable result(s) · ${edges} cross-citation(s)`)
  console.log(`${rs.filter((r) => r.proof !== null).length} carry a kernel-checked proof · ${rs.filter((r) => r.standards.length > 0).length} cite a standard\n`)
  for (const r of rs) {
    console.log(`  ${r.slug.padEnd(28)} ${r.proof ? 'proof' : '     '}  cites ${String(graph.get(r.slug)?.length ?? 0).padStart(2)}  ${r.claim.slice(0, 66)}…`)
  }
  const drop = `${process.env.HOME ?? '.'}/.erpax/fusion`
  const target = process.argv[2] ?? join(drop, 'erpax.results.json')
  writeFileSync(target, `${JSON.stringify(resultManifest('erpax', rs), null, 2)}\n`)
  const { collisions, manifestsRead } = foreignCollisions(rs, drop)
  console.log(`\nidentity — ${new Set(rs.map((r) => r.uuid)).size} distinct · ${duplicateResults(rs).length} duplicated here`)
  console.log(`wrote ${target}`)
  console.log(
    manifestsRead === 0
      ? 'cross-repo: NO sibling manifest in the drop — unchecked, which is not the same as clean'
      : `cross-repo: ${manifestsRead} sibling manifest(s) read · ${collisions.length} collision(s)`,
  )
  for (const c of collisions) console.log(`  ${c.repo}:${c.there} publishes the same result as ${c.here}`)
}
