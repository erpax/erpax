/**
 * convention/discern — a claim is a verdict or a compass, and nothing else.
 *
 * [[constitution]] Rule 1 is *claim no result you have not computed*. This is that rule given a
 * type. Every public claim an atom exposes must be exactly one of:
 *
 *   VERDICT   `{ property, measuredBy }` — a property backed by a test that EXERCISES it.
 *   COMPASS   `{ property, closedBy, owner }` — an honest direction, not yet proven, with a named
 *             condition that would close it and a named person who owns closing it.
 *
 * The third possibility — a claim that is neither — is the one this exists to abolish. It reads
 * exactly like a verdict and is worth exactly as much as a compass, and nothing in a codebase
 * distinguishes them at a glance.
 *
 * **The measurement that matters is not "is there a test".** A test named beside a claim proves the
 * claim has a NEIGHBOUR, not that it is measured. [[rules]]/refutable found 64 `@invariant`s with no
 * proof at all; the subtler failure is a proof that runs and asserts nothing about the property —
 * `expect(true).toBe(true)` under a security heading. So `verdictHolds` demands EVIDENCE from the
 * run: what was exercised, and what would have failed. A run that returns a bare `true` is rejected,
 * because a boolean is indistinguishable from a tautology.
 *
 * @law a public claim is a verdict or a compass. A verdict names the test that exercises its
 *      property and returns evidence; a compass names what would close it and who owns that. A
 *      claim that is neither is undeclared, and an undeclared surface fails the build.
 * @invariant a verdict whose test is absent FAILS — a name is not a measurement
 * @invariant a verdict whose run returns bare `true` FAILS — that is a tautology, not evidence
 * @invariant a compass without `closedBy` or `owner` FAILS — a direction nobody owns is a wish
 * @invariant an undeclared public surface throws; silence is never a claim of safety
 * @standard ISO/IEC 25010:2023 §5.5 — testability: a claim that cannot be exercised cannot be met
 * @standard ISO-19011:2018 §6.4 — audit evidence: sufficient and appropriate, not merely present
 * @see ./SKILL.md -- ../../rules/refutable -- ../../constitution
 */

/** A property proven by a test that exercises it. */
export interface Verdict {
  readonly property: string
  /** the test that exercises the property — a path, or a test name that can be located */
  readonly measuredBy: string
}

/** A direction taken honestly, with the condition that would close it and its owner. */
export interface Compass {
  readonly property: string
  /** what would turn this into a verdict — a standard, a KAT set, a piece of hardware */
  readonly closedBy: string
  /** who owns closing it; an unowned direction is a wish */
  readonly owner: string
}

export type Claim = Verdict | Compass
export type ClaimKind = 'verdict' | 'compass'

/** Thrown when an atom exposes a public surface it never declared. */
export class UndeclaredSurface extends Error {
  constructor(
    readonly atom: string,
    readonly surfaces: readonly string[],
  ) {
    super(
      `discern: ${atom} exposes ${surfaces.length} undeclared surface(s): ${surfaces.join(', ')}. ` +
        'Declare each as a verdict (property + measuredBy) or a compass (property + closedBy + owner). ' +
        'Silence is not a claim of safety.',
    )
    this.name = 'UndeclaredSurface'
  }
}

/**
 * Which kind of claim this is — decided by SHAPE, never by a label the author supplies.
 *
 * A claim carrying both `measuredBy` and `closedBy` is a verdict wearing a hedge, and it is refused
 * rather than resolved: the author must decide whether the property is proven or is a direction.
 */
export function classify(claim: Claim): ClaimKind {
  const hasMeasure = 'measuredBy' in claim && String(claim.measuredBy).trim().length > 0
  const hasClose = 'closedBy' in claim && String((claim as Compass).closedBy).trim().length > 0
  if (hasMeasure && hasClose) {
    throw new Error(
      `discern: "${claim.property}" declares both measuredBy and closedBy — it is a verdict wearing ` +
        'a hedge. Decide: is the property proven, or is it a direction?',
    )
  }
  if (hasMeasure) return 'verdict'
  if (hasClose) {
    const owner = String((claim as Compass).owner ?? '').trim()
    if (owner.length === 0) {
      throw new Error(`discern: compass "${claim.property}" has no owner — a direction nobody owns is a wish`)
    }
    return 'compass'
  }
  throw new Error(
    `discern: "${claim.property}" is neither a verdict nor a compass. A claim with no measuredBy and ` +
      'no closedBy asserts something nothing can contradict.',
  )
}

/**
 * What a measuring run must hand back. A boolean is not enough, and that is the whole point.
 *
 * `exercised` names what the test actually touched; `wouldFailIf` names the mutation that would
 * break it. A test that cannot answer the second question is not exercising the property — it is
 * observing that the code exists.
 */
export interface Evidence {
  /** what the test exercised — the call, the input, the surface */
  readonly exercised: string
  /** the change that would make this test fail; a test nothing can break proves nothing */
  readonly wouldFailIf: string
  readonly passed: boolean
}

/** A run of the test named by a verdict. `undefined` means the test does not exist. */
export type MeasureRun = (measuredBy: string) => Evidence | undefined

/**
 * An atom's declaration of what its proof exercises — exported beside its CLAIMS, not buried in the
 * test file.
 *
 * The two halves of evidence come from different places on purpose. **What a test exercises and what
 * would break it are prose only the author can write**; whether it PASSED is a fact only a run can
 * supply. Keeping the declaration in the atom lets the corpus-level metric read it without importing
 * a test, and stops the same sentences being written twice.
 */
export interface EvidenceSource {
  readonly measuredBy: string
  readonly exercised: string
  readonly wouldFailIf: string
}

/**
 * Build a `MeasureRun` from declared sources plus an outcome oracle.
 *
 * `passed` returns `undefined` for a test that was not run or does not exist — which surfaces as
 * ABSENT rather than as a silent pass. A declared source with no outcome is not evidence.
 */
export function runFrom(
  sources: readonly EvidenceSource[],
  passed: (measuredBy: string) => boolean | undefined,
): MeasureRun {
  return (measuredBy) => {
    const s = sources.find((x) => x.measuredBy === measuredBy)
    if (!s) return undefined
    const ok = passed(measuredBy)
    if (ok === undefined) return undefined
    return { exercised: s.exercised, wouldFailIf: s.wouldFailIf, passed: ok }
  }
}

export interface VerdictVerdict {
  readonly holds: boolean
  readonly reason: string
}

/**
 * Does the verdict hold?
 *
 * Fails on three distinct things, and they are different failures:
 *   ABSENT      the named test does not exist — the claim cites nothing
 *   TAUTOLOGY   the run returns no evidence of what it exercised or what would break it
 *   FAILING     the test ran, exercised the property, and did not pass
 */
export function verdictHolds(claim: Claim, run: MeasureRun): VerdictVerdict {
  if (classify(claim) !== 'verdict') {
    return { holds: false, reason: `"${claim.property}" is a compass — a direction never holds as a verdict` }
  }
  const measuredBy = (claim as Verdict).measuredBy
  const ev = run(measuredBy)
  if (!ev) {
    return { holds: false, reason: `measuredBy "${measuredBy}" does not exist — a name is not a measurement` }
  }
  if (ev.exercised.trim().length === 0 || ev.wouldFailIf.trim().length === 0) {
    return {
      holds: false,
      reason:
        `"${claim.property}" ran but returned no evidence — a test that cannot say what it exercised, ` +
        'or what would break it, is a tautology under a heading',
    }
  }
  if (!ev.passed) {
    return { holds: false, reason: `"${claim.property}" exercised ${ev.exercised} and FAILED` }
  }
  return { holds: true, reason: `${ev.exercised} — breaks if ${ev.wouldFailIf}` }
}

export interface Manifest {
  readonly atom: string
  readonly verdicts: readonly Verdict[]
  readonly compasses: readonly Compass[]
  /** every public surface, declared or not — the denominator honesty is measured against */
  readonly surfaces: readonly string[]
}

/**
 * Partition an atom's claims, and refuse a surface nobody declared.
 *
 * The `surfaces` argument is the atom's real public shape — its exported names, its endpoints, its
 * channels. A surface with no claim is not "assumed safe"; it is undeclared, and it throws. That is
 * `noExpectation` applied to attention: dismissal must be a typed claim that justifies itself.
 */
export function manifest(atom: string, claims: readonly Claim[], surfaces: readonly string[]): Manifest {
  const declared = new Set(claims.map((c) => c.property))
  const undeclared = surfaces.filter((s) => !declared.has(s))
  if (undeclared.length > 0) throw new UndeclaredSurface(atom, undeclared)

  const verdicts: Verdict[] = []
  const compasses: Compass[] = []
  for (const c of claims) {
    if (classify(c) === 'verdict') verdicts.push(c as Verdict)
    else compasses.push(c as Compass)
  }
  return { atom, verdicts, compasses, surfaces }
}

/**
 * INTEGRITY — passing verdicts over total public claims.
 *
 * Hand-set nowhere. It rises only as a compass becomes a tested verdict, and it falls the moment a
 * verdict stops holding. A reviewer runs it to see the honesty as a number rather than as a tone.
 *
 * An atom with no claims scores 0, never 1: nothing declared is nothing proven, the same rule
 * [[agent]]/receipt applies to a session that asserted nothing.
 */
export function integrity(manifests: readonly Manifest[], run: MeasureRun): number {
  let total = 0
  let passing = 0
  for (const m of manifests) {
    total += m.verdicts.length + m.compasses.length
    for (const v of m.verdicts) if (verdictHolds(v, run).holds) passing += 1
  }
  return total === 0 ? 0 : passing / total
}
