import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ERPAX_DOI, ERPAX_SPDX, ERPAX_VERSION_DOI, SOURCE_URL } from '@/algebra'
/**
 * publish/paper — a lean LaTeX paper per sealed claim, and an HONEST prior-art verdict.
 *
 * The ask was: for each sealed novelty with no prior-art publication, mint a DOI. Half of that
 * is mechanical and half of it is a claim nobody can make from a search box.
 *
 * A Zenodo query returning nothing means NOTHING WAS FOUND IN ZENODO. It is not evidence that
 * no prior art exists — Zenodo is one repository among many, indexes a fraction of the
 * literature, holds almost no patents, and matches on words a paper about the same idea may
 * simply not use. This corpus has paid for that inference before: a claim built on a shell glob
 * that errored and returned nothing, read as proof of absence ([[rules]]/unraised).
 *
 * So the verdict type has three values and `novel` is not one of them:
 *
 *   found    — hits came back; here they are, read them
 *   none     — nothing in Zenodo matched THESE terms. A lead, never a finding.
 *   unknown  — the search could not run (offline, rate-limited). Not `none`.
 *
 * `none` is what warrants a human looking further, and a deposit is a human's decision:
 * a Zenodo record is permanent, publicly attributed, and cannot be deleted — only superseded.
 * This atom writes the paper and reports the search; it never deposits.
 *
 * @see ./SKILL.md · ../index — the git publisher, which also acts only on a computed decision
 */

export type PriorArtStatus = 'found' | 'none' | 'unknown'

export interface PriorArtHit {
  readonly doi: string
  readonly title: string
  readonly year: string
}

export interface PriorArtVerdict {
  readonly query: string
  readonly status: PriorArtStatus
  readonly hits: readonly PriorArtHit[]
  /** Why this status — the sentence a reader needs to not over-read it. */
  readonly caveat: string
}

const NOT_A_FINDING =
  'nothing in Zenodo matched these terms — a lead to investigate, NOT evidence that no prior art exists'

/**
 * Search Zenodo for prior art on a claim.
 *
 * Fails to `unknown`, never to `none`: an unreachable API that reported "no prior art" would be
 * the most dangerous output this function could produce.
 */
export async function priorArt(
  query: string,
  fetchImpl: typeof fetch = fetch,
): Promise<PriorArtVerdict> {
  const url = `https://zenodo.org/api/records?q=${encodeURIComponent(query)}&size=5`
  try {
    const res = await fetchImpl(url, { headers: { Accept: 'application/json' } })
    if (!res.ok) {
      return { query, status: 'unknown', hits: [], caveat: `Zenodo returned HTTP ${res.status}` }
    }
    const body = (await res.json()) as {
      hits?: { total?: number; hits?: { doi?: string; metadata?: { title?: string; publication_date?: string } }[] }
    }
    const raw = body.hits?.hits ?? []
    const hits = raw.map((h) => ({
      doi: h.doi ?? '',
      title: h.metadata?.title ?? '',
      year: (h.metadata?.publication_date ?? '').slice(0, 4),
    }))
    return hits.length > 0
      ? { query, status: 'found', hits, caveat: 'read these before claiming anything is new' }
      : { query, status: 'none', hits: [], caveat: NOT_A_FINDING }
  } catch (e) {
    return {
      query,
      status: 'unknown',
      hits: [],
      caveat: `the search could not run (${(e as Error).message.slice(0, 60)}) — absence of a result is not a result`,
    }
  }
}

export interface PaperInput {
  /** The claim, as the corpus states it. */
  readonly claim: string
  /** The atom path whose gate enforces it — the paper's evidence. */
  readonly atomPath: string
  /** The claim's content-uuid: what the paper is ABOUT, addressed. */
  readonly contentUuid?: string
  /** What the claim does NOT prove — required, because a paper without one overclaims. */
  readonly boundary: string
  /** The prior-art search, reproduced in the paper so a reader can judge it. */
  readonly priorArt?: PriorArtVerdict
}


/** A standard the atom itself cites, with a resolvable home where one is known. */
export interface Reference {
  readonly label: string
  readonly url: string | null
}

/**
 * Where a standards body actually publishes. DECLARED, because a resolvable home is a fact about
 * the world — and a link that 404s is worse than no link ([[rules]]/reference).
 */
const STANDARD_HOMES: readonly (readonly [RegExp, string])[] = [
  [/RFC\s*(\d+)/i, 'https://www.rfc-editor.org/rfc/rfc$1'],
  [/ISO\/IEC\s*25010/i, 'https://www.iso.org/standard/78176.html'],
  [/ISO\s*19011/i, 'https://www.iso.org/standard/70017.html'],
  [/ISO\s*26324/i, 'https://www.iso.org/standard/81599.html'],
  [/ISO\s*3166/i, 'https://www.iso.org/iso-3166-country-codes.html'],
  [/ISO\s*4217/i, 'https://www.iso.org/iso-4217-currency-codes.html'],
  [/ISO\s*8601/i, 'https://www.iso.org/iso-8601-date-and-time-format.html'],
  [/ISO\/IEC\s*27001/i, 'https://www.iso.org/standard/27001'],
  [/WCAG/i, 'https://www.w3.org/TR/WCAG22/'],
  [/WAI-ARIA/i, 'https://www.w3.org/TR/wai-aria-1.2/'],
  [/EN[-\s]?16931/i, 'https://ec.europa.eu/digital-building-blocks/sites/display/DIGITAL/eInvoicing'],
  [/SOX/i, 'https://www.govinfo.gov/app/details/PLAW-107publ204'],
  [/Наредба/i, 'https://nra.bg'],
]

/**
 * The standards an atom cites, parsed from its own SKILL — never a list typed beside the paper.
 *
 * A paper's references must be the atom's references, or the two drift and the paper cites
 * something the code never claimed ([[rules]]/drift).
 */
export function referencesOf(atomPath: string, cwd: string = process.cwd()): Reference[] {
  let body: string
  try {
    body = readFileSync(join(cwd, 'src', atomPath, 'SKILL.md'), 'utf8')
  } catch {
    return []
  }
  const section = /##\s+Standards\s*\n([\s\S]*?)(?:\n##\s|$)/.exec(body)?.[1] ?? ''
  const out: Reference[] = []
  for (const line of section.split('\n')) {
    const m = /^-\s+\*\*(.+?)\*\*\s*(?:—|--)?\s*(.*)$/.exec(line.trim())
    if (!m) continue
    const label = `${m[1]!.trim()}${m[2]!.trim() ? ` — ${m[2]!.trim()}` : ''}`
    const home = STANDARD_HOMES.find(([re]) => re.test(m[1]!))
    // Substitute the MATCHED SUBSTRING only. Replacing within the whole label leaves the section
    // number attached — `…/rfc9562 §5.8` — a URL that does not resolve, and a dead link is worse
    // than no link ([[rules]]/reference). The section belongs in the label, never in the href.
    const matched = home ? (home[0].exec(m[1]!)?.[0] ?? null) : null
    out.push({ label, url: matched !== null && home ? matched.replace(home[0], home[1]) : null })
  }
  return out
}

/**
 * The credits block — attribution assembled from what the repository already declares.
 *
 * ZERO MANUAL WORK is the point: the author comes from CITATION.cff, the licence and source from
 * the generated licence face, the references from the atom's own SKILL, the support links from
 * .github/FUNDING.yml. Nothing here is typed per paper, so nothing here can drift from the paper it
 * credits — the drift law applied to attribution.
 */
export function creditsOf(atomPath: string, cwd: string = process.cwd()): string[] {
  const lines = [
    `© erpax — ${ERPAX_SPDX}, or commercial via license@erpax.com`,
    `Source: ${SOURCE_URL}`,
    // the VERSION doi: a credit names the record this paper was built from, and a concept doi
    // would name whatever is newest — a citation that changes its mind ([[publish]]/harvest)
    `Archived record: ${ERPAX_VERSION_DOI}`,
    `All versions: ${ERPAX_DOI}`,
  ]
  const refs = referencesOf(atomPath, cwd)
  if (refs.length) lines.push(`Built against: ${refs.map((r) => r.label.split('—')[0]!.trim()).join(' · ')}`)
  const fund = fundingOf(cwd)
  if (fund.links.length) lines.push(`Support: ${fund.links.join(' · ')}`)
  lines.push(fund.awards.length ? `Awards: ${fund.awards.join(' · ')}` : 'No grant award is claimed for this work.')
  return lines
}

export interface Funding {
  /** Where support can be given — sponsorship links, resolvable. */
  readonly links: readonly string[]
  /**
   * Grant awards, for Zenodo's `grants` field.
   *
   * EMPTY unless a real award identifier is declared. Zenodo is award-first: an award id resolves
   * through OpenAIRE, or a custom award names a funder registered in ROR. Both are REGISTERED
   * identifiers, so inventing one to fill the field is exactly [[rules]]/forge — a locally minted
   * identifier returned as provenance. Sponsorship is not an award and is never reported as one.
   */
  readonly awards: readonly string[]
}

/**
 * The funding this work actually declares, read from where the repository declares it.
 *
 * `.github/FUNDING.yml` is the surface GitHub renders and a reader already knows; `package.json`
 * `funding` is the npm one. Neither is a grant.
 */
export function fundingOf(cwd: string = process.cwd()): Funding {
  const links: string[] = []
  try {
    const yml = readFileSync(join(cwd, '.github/FUNDING.yml'), 'utf8')
    for (const m of yml.matchAll(/^github:\s*\[?([^\]\n]+)\]?/gm))
      for (const u of m[1]!.split(',')) links.push(`https://github.com/sponsors/${u.trim().replace(/['"]/g, '')}`)
    for (const m of yml.matchAll(/https?:\/\/[^\s'"\]]+/g)) links.push(m[0])
  } catch {
    /* a repository need not declare funding */
  }
  try {
    const pkg = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')) as { funding?: unknown }
    if (typeof pkg.funding === 'string') links.push(pkg.funding)
    else if (Array.isArray(pkg.funding)) for (const f of pkg.funding) if (typeof f === 'string') links.push(f)
  } catch {
    /* absent is not an error */
  }
  return { links: [...new Set(links)], awards: [] }
}

/**
 * The deposition record for ONE paper — the metadata that makes it findable and correctly related.
 *
 * `related_identifiers` is the part that matters and the part most often left empty: a deposit with
 * no stated relation to its repository or its parent record is an orphan, discoverable only by
 * someone who already knows it exists. Every relation here is one Zenodo defines, used for what it
 * means — `isSupplementTo` the source, `isPartOf` the concept record, `references` for a standard
 * the work is built against. Accurate relations ARE the discoverability; keyword stuffing is not.
 */
export function paperMetadata(input: PaperInput, cwd: string = process.cwd()): Record<string, unknown> {
  const refs = referencesOf(input.atomPath, cwd)
  const fund = fundingOf(cwd)
  const atomUrl = `${SOURCE_URL}/tree/main/src/${input.atomPath}`
  return {
    upload_type: 'publication',
    publication_type: 'workingpaper',
    title: input.claim,
    description:
      `<p><strong>${input.claim}</strong></p>` +
      `<p>Enforced by a gate in <code>src/${input.atomPath}</code>, which fails closed when the claim is ` +
      `violated — the claim is not asserted in prose. <a href="${atomUrl}">Source</a>.</p>` +
      `<p><strong>What this does not prove:</strong> ${input.boundary}</p>` +
      (fund.links.length > 0
        ? `<p>Support: ${fund.links.map((u) => `<a href="${u}">${u}</a>`).join(' · ')}. ` +
          `This work is not grant-funded; no award identifier is claimed.</p>`
        : ''),
    creators: [{ name: 'Rouschev, Tsvetan', orcid: '0009-0000-7312-9778' }],
    license: ERPAX_SPDX.toLowerCase(),
    access_right: 'open',
    keywords: [
      'content-addressing',
      'compliance-as-code',
      'executable-specification',
      'tamper-evidence',
      ...input.atomPath.split('/'),
    ],
    // `grants` is OMITTED, not empty-arrayed, when no award exists: Zenodo reads an award id
    // through OpenAIRE or ROR, both registered identifiers, and filling the field without one is a
    // fabricated funder. Sponsorship links go where they are true — the description.
    ...(fund.awards.length > 0 ? { grants: fund.awards.map((id) => ({ id })) } : {}),
    // `scheme` is deliberately absent: the documented attributes are identifier · relation ·
    // resource_type, and Zenodo detects the identifier type itself. Setting an undocumented field
    // is the same class of defect as inventing one.
    related_identifiers: [
      { identifier: atomUrl, relation: 'isSupplementTo' },
      { identifier: SOURCE_URL, relation: 'isSupplementTo' },
      // isPartOf points at the WORK — every version — so this one is the concept doi by design
      { identifier: ERPAX_DOI, relation: 'isPartOf' },
      // …and the paper is derived from one fixed snapshot, which only a version doi can name
      { identifier: ERPAX_VERSION_DOI, relation: 'isDerivedFrom' },
      ...(input.contentUuid ? [{ identifier: `urn:uuid:${input.contentUuid}`, relation: 'isIdenticalTo' }] : []),
      ...refs.filter((r) => r.url !== null).map((r) => ({ identifier: r.url as string, relation: 'references' })),
    ],
  }
}

const escapeTex = (s: string): string =>
  s
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([&%$#_{}])/g, '\\$1')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}')

/**
 * A lean paper: claim, the gate that enforces it, the boundary, the prior-art search verbatim.
 *
 * LEAN is the point — an article class, no packages beyond what a plain LaTeX install has, so it
 * compiles anywhere and reviews in one screen. The sections are fixed because each one answers a
 * question a reader is entitled to ask, and the BOUNDARY is required: a paper stating what it
 * proves without stating what it does not is the overclaim this corpus gates everywhere else.
 */
export function paperTex(input: PaperInput, cwd: string = process.cwd()): string {
  if (!input.boundary.trim()) {
    throw new Error('paperTex: a paper must state what it does NOT prove — boundary is required')
  }
  const pa = input.priorArt
  const priorArtSection = pa
    ? pa.status === 'found'
      ? `A Zenodo search for \\emph{${escapeTex(pa.query)}} returned ${pa.hits.length} record(s):\n` +
        `\\begin{itemize}\n${pa.hits
          .map((h) => `  \\item ${escapeTex(h.title)} (${escapeTex(h.year)}), \\texttt{${escapeTex(h.doi)}}`)
          .join('\n')}\n\\end{itemize}`
      : pa.status === 'none'
        ? `A Zenodo search for \\emph{${escapeTex(pa.query)}} returned no records. ` +
          `This is reported as a search result, not as a finding: ${escapeTex(NOT_A_FINDING)}. ` +
          `No claim of novelty is made here.`
        : `A prior-art search could not be completed (${escapeTex(pa.caveat)}). ` +
          `Absence of a result is not a result, and no claim of novelty is made here.`
    : 'No prior-art search was run for this claim, and no claim of novelty is made.'

  const version = (() => {
    try {
      return (JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')) as { version?: string }).version ?? '0.0.0'
    } catch {
      return '0.0.0'
    }
  })()

  const refs = referencesOf(input.atomPath, cwd)
  const atomUrl = `${SOURCE_URL}/tree/main/src/${input.atomPath}`
  const keywords = ['content-addressing', 'compliance-as-code', 'executable specification', ...input.atomPath.split('/')]
  // The prior-art STATUS, said plainly and up front. `none` is a search result, never a novelty
  // claim — surfacing it clearly is not the same as upgrading it, and the wording keeps them apart.
  const status = !pa
    ? '\\textbf{Prior art: not searched.}'
    : pa.status === 'found'
      ? `\\textbf{Prior art: ${pa.hits.length} record(s) found} for this query.`
      : pa.status === 'none'
        ? '\\textbf{Prior art: no records returned} for this query. This is a search result, not a finding of novelty.'
        : '\\textbf{Prior art: not established} --- the search could not be completed.'

  return `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{hyperref}
\\hypersetup{
  pdftitle={${escapeTex(input.claim)}},
  pdfauthor={Tsvetan Rouschev},
  pdfsubject={erpax --- a claim enforced by a gate, not asserted in prose},
  pdfkeywords={${escapeTex(keywords.join(', '))}},
  colorlinks=true, linkcolor=blue, urlcolor=blue, citecolor=blue
}
\\title{${escapeTex(input.claim)}}
\\author{Tsvetan Rouschev\\\\\\url{https://orcid.org/0009-0000-7312-9778}}
\\date{erpax v${escapeTex(version)} --- \\href{https://doi.org/${escapeTex(ERPAX_VERSION_DOI)}}{${escapeTex(ERPAX_VERSION_DOI)}}}
\\begin{document}
\\maketitle

\\begin{abstract}
\\noindent\\textbf{${escapeTex(input.claim)}}

\\medskip\\noindent
${status}
\\end{abstract}

\\section*{Claim}
\\textbf{${escapeTex(input.claim)}}

\\section*{Evidence}
The claim is enforced by a gate in \\texttt{src/${escapeTex(input.atomPath)}}, which fails closed
when it is violated. It is not asserted in prose: the corpus's own law is that a claim is obeyed
only when something blocks its violation.${
    input.contentUuid ? `\n\nThe matter this paper is about is addressed by content-uuid \\texttt{${escapeTex(input.contentUuid)}}.` : ''
  }

\\section*{Prior art}
${priorArtSection}

\\section*{What this does not prove}
${escapeTex(input.boundary)}

\\section*{Availability}
\\begin{itemize}
  \\item Gate enforcing this claim: \\url{${atomUrl}}
  \\item Repository: \\url{${SOURCE_URL}}
  \\item Archived record (this version): \\href{https://doi.org/${escapeTex(ERPAX_VERSION_DOI)}}{${escapeTex(ERPAX_VERSION_DOI)}}
  \\item All versions: \\href{https://doi.org/${escapeTex(ERPAX_DOI)}}{${escapeTex(ERPAX_DOI)}}
  \\item Licence: ${escapeTex(ERPAX_SPDX)} --- commercial terms via \\url{mailto:license@erpax.com}
\\end{itemize}

\\section*{Funding and credits}
\\begin{itemize}
${creditsOf(input.atomPath, cwd).map((l) => `  \\item ${escapeTex(l)}`).join('\n')}
\\end{itemize}

${
    refs.length === 0
      ? ''
      : `\\section*{References}\n\\begin{enumerate}\n${refs
          .map((r) => `  \\item ${escapeTex(r.label)}${r.url ? ` \\url{${r.url}}` : ''}`)
          .join('\n')}\n\\end{enumerate}\n`
  }\\end{document}
`
}

/**
 * A paper must name the FIXED record it was built from.
 *
 * A concept DOI resolves to whatever version is newest, so a paper carrying only that one cites a
 * target that can change after it is written — the citation still resolves, to something else
 * ([[publish]]/harvest). ISO 19011 §6.4 asks that a citation lead to THE evidence.
 *
 * The concept DOI is not forbidden: it is correct for "all versions", and the paper prints both.
 * What is forbidden is a paper naming only the moving one.
 */
export function assertPaperPinsVersion(tex: string): void {
  if (!tex.includes(ERPAX_VERSION_DOI)) {
    throw new Error(
      `✖ publish/paper — the paper names no version DOI (${ERPAX_VERSION_DOI}); a concept DOI alone cites whatever is newest`,
    )
  }
  const date = /\\date\{[^}]*\}/.exec(tex)?.[0] ?? ''
  if (date.includes(ERPAX_DOI) && !date.includes(ERPAX_VERSION_DOI)) {
    throw new Error('✖ publish/paper — the date line states a version number beside a concept DOI, which contradicts it')
  }
}

export interface PaperRun {
  readonly claim: string
  readonly verdict: PriorArtVerdict
  readonly tex: string | null
  /** Why no paper was written, when none was. */
  readonly skipped?: string
}

/**
 * Run the pair over a set of sealed claims: search, then write a paper for the ones nothing
 * was found for.
 *
 * `found` writes NO paper — records came back, and a paper that ignores them is the overclaim
 * this atom exists to prevent. `unknown` writes none either: a paper justified by a search that
 * did not run is justified by nothing. Only `none` produces a draft, and a draft is not a
 * deposit — the caveat travels inside the paper so whoever decides reads it there.
 */
export async function runPapers(
  claims: readonly PaperInput[],
  fetchImpl: typeof fetch = fetch,
  cwd: string = process.cwd(),
): Promise<PaperRun[]> {
  const out: PaperRun[] = []
  for (const c of claims) {
    const verdict = await priorArt(c.claim, fetchImpl)
    if (verdict.status === 'none') {
      out.push({ claim: c.claim, verdict, tex: paperTex({ ...c, priorArt: verdict }, cwd) })
    } else {
      out.push({
        claim: c.claim,
        verdict,
        tex: null,
        skipped:
          verdict.status === 'found'
            ? `${verdict.hits.length} record(s) found — read them before drafting anything`
            : 'the search did not run; a paper justified by no search is justified by nothing',
      })
    }
  }
  return out
}
