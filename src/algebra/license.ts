/**
 * algebra/license — USER LAW (computable): core math free for all; the rest via contact.
 *
 * DRY source for README licenseNote, LICENSE preamble, and path checks.
 * Surface = src/algebra (exact* and algebra* exports). No secrets; free lean.
 *
 * @see ./index · ../../readme/compute · LICENSE
 */

/** Repo glob — free-for-all core math (this atom tree). */
export const CORE_MATH_GLOB = 'src/algebra/**' as const

/** Commercial / non-core licensing contact. */
export const LICENSE_CONTACT = 'license@erpax.com' as const

/** Package SPDX for everything outside core math. */
export const ERPAX_SPDX = 'CC-BY-NC-ND-4.0' as const

/** SPDX for the publishable free core-math package (`@erpax/algebra`). */
export const CORE_MATH_SPDX = 'MIT' as const

/** True iff a repo-relative path is under the free core-math surface. */
export function isCoreMathPath(repoPath: string): boolean {
  const n = repoPath.replace(/\\/g, '/').replace(/^\.\//, '')
  return n === 'src/algebra' || n.startsWith('src/algebra/')
}

/**
 * README license body — GENERATED from this law so the diamond cannot drift.
 * A restricted SPDX (copyleft or NC/ND) emits the note; permissive emits nothing.
 */
export function erpaxLicenseNote(license: string): string[] {
  if (!/AGPL|GPL|CC-BY/i.test(license)) return []
  return [
    `**Core math** (\`${CORE_MATH_GLOB}\` · exact* / algebra* · \`@erpax/algebra\` · ${CORE_MATH_SPDX}): free for all.`,
    `Everything else — ([${ERPAX_SPDX}](LICENSE) / commercial) via \`${LICENSE_CONTACT}\`.`,
    '',
  ]
}

/** Where the licensed material lives — CC BY-NC-ND §3(a)(1) attribution requires the source link. */
export const SOURCE_URL = 'https://github.com/erpax/erpax' as const

/** What an agent needs to cite one piece of corpus matter in license compliance. */
export interface CitationInput {
  /** Repo-relative path of the cited matter (e.g. 'src/rules/ask'). Its tree decides the SPDX tier. */
  readonly path: string
  /** The matter's content-uuid — the corpus's own citation primitive (cite by uuid, never by copy). */
  readonly uuid?: string
  /** ISO date, set only if the citing work MODIFIED the matter (CC BY-NC-ND §3(a)(1)(B): indicate modifications; §2(a)(1) NoDerivatives — modified matter may be produced but NOT shared). */
  readonly modified?: string
}

/**
 * The one line an agent emits to cite corpus matter in COMPLIANCE with the license.
 *
 * It carries every element the license requires: attribution (© erpax), the SPDX for the
 * matter's TIER (MIT for core math via isCoreMathPath, else CC-BY-NC-ND-4.0), the source
 * URL (BY-NC-ND §3(a)(1) — attribution with the source link), the commercial alternative for
 * the restricted tier (NC — commercial use needs the separate licence), and — when the matter
 * was changed — the modification notice (§3(a)(1)(B)). The content-uuid is the corpus's
 * citation primitive: an agent cites BY uuid, it does not copy.
 *
 * @example citation({ path: 'src/rules/ask', uuid: '9ed5…' })
 *   → 'erpax:src/rules/ask · content-uuid 9ed5… · © erpax · CC-BY-NC-ND-4.0 · source https://github.com/erpax/erpax · commercial license@erpax.com'
 */
export function citation(input: CitationInput): string {
  const spdx = isCoreMathPath(input.path) ? CORE_MATH_SPDX : ERPAX_SPDX
  return [
    `erpax:${input.path}`,
    input.uuid ? `content-uuid ${input.uuid}` : null,
    `© erpax · ${spdx}`,
    `source ${SOURCE_URL}`,
    spdx === ERPAX_SPDX ? `commercial ${LICENSE_CONTACT}` : null,
    input.modified ? `modified ${input.modified}` : null,
  ]
    .filter((p): p is string => p !== null)
    .join(' · ')
}

/** A citation complies iff it carries the SPDX tier AND the source URL — the two the license cannot omit. */
export function citationComplies(text: string): boolean {
  return (text.includes(ERPAX_SPDX) || text.includes(CORE_MATH_SPDX)) && text.includes(SOURCE_URL)
}
