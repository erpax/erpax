/**
 * version — erpax's version is CONTENT-ADDRESSED and skill-based by construction.
 *
 * Versioning is not a manual bump you remember to do; it is a FUNCTION of the skill
 * corpus. The whole corpus has an aura — the content-uuid over every atom's
 * content-uuid — so the same skills produce the same version on every machine and
 * every clone ([[merge]]/[[identity]]/[[aura]]). A human semver names the release;
 * the corpus-uuid IS the build identity, so a tag can be derived automatically from
 * the corpus state rather than asserted: same corpus ⇒ same tag, a changed atom ⇒ a
 * new tag, with no drift between what shipped and what the code says.
 *
 * This is the npm side too: an `@erpax/*` package's published version carries the
 * corpus-uuid as build metadata, so `npm install erpax@x.y.z+<uuid>` resolves to an
 * exact, verifiable corpus — the proof-bundle (`[[proof]]`) of a release.
 *
 * @standard SemVer 2.0.0 — `MAJOR.MINOR.PATCH+<build-metadata>` (the corpus-uuid is build metadata)
 * @audit the version is derived, not declared — re-derivable from SKILL_INDEX on any clone
 */
import { SKILL_INDEX } from '@/services/skill-router/skills.index'
import { computeContentUuid } from '@/services/integrity/content-uuid'

/** The content-uuid of the WHOLE skill corpus — its aura: the hash over every atom's content-uuid, sorted (order-free). */
export function corpusContentUuid(tenantId = ''): string {
  const atoms = SKILL_INDEX.map((n) => n.contentUuid ?? n.route).sort()
  return computeContentUuid({ atoms }, tenantId)
}

/** The corpus size — the atom count; a coarse, monotone, skill-based version signal. */
export const corpusSize = (): number => SKILL_INDEX.length

/**
 * The content-addressed version string: `semver+<corpus-uuid8>` (SemVer build metadata).
 * Same corpus ⇒ same version everywhere; a manual `semver` only names the release, the
 * suffix proves WHICH corpus shipped. Use as the automatic git-tag / npm-version.
 */
export function corpusVersion(semver: string): string {
  return `${semver}+${corpusContentUuid().slice(0, 8)}`
}

/** True iff a stored version's corpus-uuid still matches the live corpus (no drift between tag and code). */
export function versionMatchesCorpus(version: string): boolean {
  const suffix = version.split('+')[1]
  return typeof suffix === 'string' && suffix.length > 0 && corpusContentUuid().startsWith(suffix)
}
