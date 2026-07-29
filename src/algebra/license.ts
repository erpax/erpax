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
export const ERPAX_SPDX = 'AGPL-3.0-or-later' as const

/** SPDX for the publishable free core-math package (`@erpax/algebra`). */
export const CORE_MATH_SPDX = 'MIT' as const

/** True iff a repo-relative path is under the free core-math surface. */
export function isCoreMathPath(repoPath: string): boolean {
  const n = repoPath.replace(/\\/g, '/').replace(/^\.\//, '')
  return n === 'src/algebra' || n.startsWith('src/algebra/')
}

/**
 * README license body — GENERATED from this law so the diamond cannot drift.
 * Copyleft SPDX emits the note; permissive emits nothing (no dual-license playbook).
 */
export function erpaxLicenseNote(license: string): string[] {
  if (!/AGPL|GPL/i.test(license)) return []
  return [
    `**Core math** (\`${CORE_MATH_GLOB}\` · exact* / algebra* · \`@erpax/algebra\` · ${CORE_MATH_SPDX}): free for all.`,
    `Everything else — ([${ERPAX_SPDX}](LICENSE) / commercial) via \`${LICENSE_CONTACT}\`.`,
    '',
  ]
}
