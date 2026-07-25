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
import { SKILL_INDEX } from '@/skill/router'
import type { SkillNode } from '@/skill/router/resolve'
import { computeContentUuid } from '@/integrity'

/** The content-uuid of the WHOLE skill corpus — its aura: the hash over every atom's content-uuid, sorted (order-free). */
export function corpusContentUuid(tenantId = ''): string {
  const atoms = SKILL_INDEX.map((n: SkillNode) => n.contentUuid ?? n.route).sort()
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

/**
 * The full stability chain — a release is stable only when EVERY stage passes. Gates green is necessary, not
 * sufficient: code that passes the gate but fails to build or deploy is NOT a stable release (it ships nothing).
 */
export interface ReleaseChecks {
  /** the gate lanes passed green for this corpus. */
  readonly gatesGreen: boolean
  /** the production build succeeded. */
  readonly buildOk: boolean
  /** the deploy succeeded (the release actually reached production). */
  readonly deployOk: boolean
}

/** A computationally-tagged release — content-addressed version, stable iff the WHOLE chain passed. */
export interface ReleaseTag {
  /** `semver+<corpus-uuid8>` — same corpus ⇒ same tag, on every clone. */
  readonly version: string
  /** stable iff gates AND build AND deploy all passed — a release that ships nothing is not stable. */
  readonly stable: boolean
  /** the whole-corpus content-uuid this tag pins. */
  readonly corpusUuid: string
  /** which stages failed (empty ⇒ stable) — names exactly why a tag is not stable. */
  readonly failed: readonly string[]
}

/**
 * Computationally tag a stable release. The version is DERIVED from the corpus state (corpusVersion — content-
 * addressed, reproducible on any clone). It is marked `stable` only when the ENTIRE chain passed: gates green,
 * build ok, AND deploy ok. Gates green is necessary but NOT sufficient — a release that fails to build or deploy
 * ships nothing, so it is not stable, no matter how green the tests were. A stable tag is a theorem over the full
 * pipeline, not an assertion: nothing can mint one over a failed deploy; `failed` names exactly which stage broke.
 */
export function stableReleaseTag(semver: string, checks: ReleaseChecks): ReleaseTag {
  const failed: string[] = []
  if (!checks.gatesGreen) failed.push('gates')
  if (!checks.buildOk) failed.push('build')
  if (!checks.deployOk) failed.push('deploy')
  return { version: corpusVersion(semver), stable: failed.length === 0, corpusUuid: corpusContentUuid(), failed }
}

/** Verify a claimed stable tag against the live corpus: it must be marked stable AND still match the corpus. */
export function isStableTag(tag: ReleaseTag): boolean {
  return tag.stable && versionMatchesCorpus(tag.version)
}
