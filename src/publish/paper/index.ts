import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ERPAX_DOI, ERPAX_SPDX, SOURCE_URL } from '@/algebra'
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

  return `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\title{${escapeTex(input.claim)}}
\\author{Tsvetan Rouschev\\\\\\texttt{https://orcid.org/0009-0000-7312-9778}}
\\date{erpax v${escapeTex(version)} — \\texttt{${escapeTex(ERPAX_DOI)}}}
\\begin{document}
\\maketitle

\\section*{Claim}
${escapeTex(input.claim)}

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
Source: \\texttt{${escapeTex(SOURCE_URL)}}. Archived: \\texttt{${escapeTex(ERPAX_DOI)}}.
Licence: ${escapeTex(ERPAX_SPDX)}.
\\end{document}
`
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
