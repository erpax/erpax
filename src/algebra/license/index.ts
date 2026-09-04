import { ERPAX_DOI, ERPAX_SPDX, LICENSE_CONTACT, SOURCE_URL } from './generated'

/**
 * The licence facts are READ from CITATION.cff via ./generated — never typed here.
 *
 * Each is an external fact: an SPDX identifier, a repository, a contact, a DOI a registration
 * agency assigned. None is derivable from the corpus fold, so a constant is the only honest form —
 * and a constant typed twice is two sources that drift. CITATION.cff is the one the world reads.
 */
export { ERPAX_DOI, ERPAX_SPDX, LICENSE_CONTACT, SOURCE_URL, ERPAX_VERSION_DOI } from './generated'
/**
 * algebra/license — USER LAW (computable): ONE licence, no tier.
 *
 * The corpus was tiered — `src/algebra/**` MIT, everything else CC-BY-NC-ND-4.0 — and a
 * tier is a seam: two answers to "may I use this", decided by a path test, with a package
 * whose LICENSE file disagreed with the corpus around it. It is now one answer everywhere,
 * so `citation()` has nothing to branch on and no path can be read into the wrong tier.
 *
 * DRY source for README licenseNote, LICENSE preamble, and the citation line.
 *
 * @see ./index · ../../readme/compute · LICENSE
 */

/** Commercial licensing contact — the only alternative to the terms below. */

/** The SPDX of the whole corpus. One licence, every path. */

/**
 * README license body — GENERATED from this law so the diamond cannot drift.
 * A restricted SPDX (copyleft or NC/ND) emits the note; permissive emits nothing.
 */
export function erpaxLicenseNote(license: string): string[] {
  if (!/AGPL|GPL|CC-BY/i.test(license)) return []
  return [
    `Every path — ([${ERPAX_SPDX}](LICENSE) / commercial) via \`${LICENSE_CONTACT}\`.`,
    '',
  ]
}

/** Where the licensed material lives — CC BY-NC-ND §3(a)(1) attribution requires the source link. */

/**
 * The archived, citable address — Zenodo's CONCEPT doi, which resolves to the newest release.
 *
 * A source URL says where the work lives; a DOI says what it WAS on a date, in a record nobody
 * can edit — including erpax. A citation that carries only the repo points at a moving target,
 * which is the same defect [[rules]]/reference gates inside the corpus: a pointer that resolves
 * to something other than what was cited.
 */

/** The resolvable form of a doi. Derived, so it cannot drift from the value above. */
export const doiUrl = (doi: string = ERPAX_DOI): string => `https://doi.org/${doi}`

/** What an agent needs to cite one piece of corpus matter in license compliance. */
export interface CitationInput {
  /** Repo-relative path of the cited matter (e.g. 'src/rules/ask'). */
  readonly path: string
  /** The matter's content-uuid — the corpus's own citation primitive (cite by uuid, never by copy). */
  readonly uuid?: string
  /** ISO date, set only if the citing work MODIFIED the matter (CC BY-NC-ND §3(a)(1)(B): indicate modifications; §2(a)(1) NoDerivatives — modified matter may be produced but NOT shared). */
  readonly modified?: string
}

/**
 * The one line an agent emits to cite corpus matter in COMPLIANCE with the license.
 *
 * It carries every element the license requires: attribution (© erpax), the SPDX (one for
 * every path — there is no tier to resolve), the source URL (BY-NC-ND §3(a)(1) — attribution
 * with the source link), the commercial alternative (NC — commercial use needs the separate
 * licence), and — when the matter was changed — the modification notice (§3(a)(1)(B)). The
 * content-uuid is the corpus's citation primitive: an agent cites BY uuid, it does not copy.
 *
 * @example citation({ path: 'src/rules/ask', uuid: '9ed5…' })
 *   → 'erpax:src/rules/ask · content-uuid 9ed5… · © erpax · CC-BY-NC-ND-4.0 · source https://github.com/erpax/erpax · commercial license@erpax.com'
 */
export function citation(input: CitationInput): string {
  return [
    `erpax:${input.path}`,
    input.uuid ? `content-uuid ${input.uuid}` : null,
    `© erpax · ${ERPAX_SPDX}`,
    `source ${SOURCE_URL}`,
    `doi ${ERPAX_DOI}`,
    `commercial ${LICENSE_CONTACT}`,
    input.modified ? `modified ${input.modified}` : null,
  ]
    .filter((p): p is string => p !== null)
    .join(' · ')
}

/**
 * A citation complies iff it carries the SPDX, the source URL and the DOI.
 *
 * The first two are what the licence requires (attribution with a link). The DOI is what makes
 * the citation CHECKABLE a decade from now: the repo can move, be renamed or disappear, and the
 * deposit cannot — it can only be superseded. A citation you cannot resolve is not attribution,
 * it is a claim about attribution.
 */
export function citationComplies(text: string): boolean {
  return text.includes(ERPAX_SPDX) && text.includes(SOURCE_URL) && text.includes(ERPAX_DOI)
}
