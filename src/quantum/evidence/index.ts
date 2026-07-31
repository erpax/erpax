/**
 * quantum/evidence — external claims held at their real epistemic status.
 *
 *   tsx src/quantum/evidence/index.ts
 */
import { uuid as toUuid } from '@/integrity'

/**
 * What a claim's status actually is. `open` is the honest superposition: not yet collapsed, and
 * NOT the same as `contested` (evidence pulling both ways) or `unfalsifiable` (nothing could ever
 * pull either way — the state where a lie is safe, [[rules]]/refutable).
 */
export type VerdictKind = 'theorem' | 'measured' | 'contested' | 'open' | 'error' | 'metaphor' | 'unfalsifiable'

export interface Claim {
  /** stated AGNOSTICALLY — the structural proposition, never "the source says…" */
  readonly claim: string
  readonly verdict: VerdictKind
  /** what observation would make this FALSE — the only thing that makes it a claim at all */
  readonly refutedBy: string | null
  /** where the boundary of the claim actually sits */
  readonly boundary: string
}

/**
 * DECLARED, not derived — and deliberately so.
 *
 * No theorem assigns a verdict to an empirical claim; a human reads the evidence and writes it
 * down where it can be argued with. That is the same split [[rules]]/audience makes for its
 * role→standard map: a hand-picked list pretending to be a measurement is the frozen rosetta.
 * What IS computed here is the distribution, the refutability check, and the address.
 */
export const EVIDENCE: readonly Claim[] = [
  {
    claim: 'Which-path information and interference are mutually exclusive in a two-path experiment.',
    verdict: 'theorem',
    refutedBy: 'observing full fringe visibility and full path distinguishability in one run',
    boundary: 'complementarity is quantitative — partial path info permits partial visibility',
  },
  {
    claim: 'Measurement is a physical interaction; no conscious observer is required for definite outcomes.',
    verdict: 'theorem',
    refutedBy: 'outcome statistics changing with observer awareness, detector held identical',
    boundary: 'settles the mechanism, not the interpretation of the wavefunction',
  },
  {
    claim: 'Correlations violating Bell inequalities exclude local hidden-variable explanations.',
    verdict: 'theorem',
    refutedBy: 'a loophole-free experiment satisfying the inequality',
    boundary: 'excludes LOCAL hidden variables; non-local ones survive',
  },
  {
    claim: 'Entangled correlations transmit no usable information.',
    verdict: 'theorem',
    refutedBy: 'a protocol signalling faster than light using entanglement alone',
    boundary: 'no-signalling is why perfect correlation is not a channel',
  },
  {
    claim: 'Integer factoring is polynomial-time on a sufficiently large fault-tolerant quantum computer.',
    verdict: 'theorem',
    refutedBy: 'an error in the algorithm, not an engineering delay',
    boundary: 'proved 1994; hardware sufficiency is a separate, unmet condition',
  },
  {
    claim: 'Breaking 2048-bit RSA needs fewer than one million physical qubits.',
    verdict: 'measured',
    refutedBy: 'a corrected resource estimate raising the count',
    boundary: 'a 2025 estimate under stated assumptions, not a demonstration',
  },
  {
    claim: 'Hydrogen tunnelling contributes measurably to enzymatic transfer rates.',
    verdict: 'measured',
    refutedBy: 'kinetic isotope effects falling within classical bounds',
    boundary: 'establishes tunnelling participates, not that it is rate-limiting everywhere',
  },
  {
    claim: 'Proton tunnelling produces DNA tautomers at rates relevant to mutation.',
    verdict: 'measured',
    refutedBy: 'tautomer populations matching purely thermal predictions',
    boundary: 'relevance to observed mutation rates in vivo remains unquantified',
  },
  {
    claim: 'Avian magnetoreception operates via a radical-pair mechanism in cryptochrome.',
    verdict: 'contested',
    refutedBy: 'retained magnetic orientation under cryptochrome knockout',
    boundary: 'strongly supported in vitro; the in-vivo chain is incomplete',
  },
  {
    claim: 'Near-unit photosynthetic transfer efficiency is explained by long-lived electronic coherence.',
    verdict: 'contested',
    refutedBy: 'room-temperature coherence lifetimes too short to affect transport',
    boundary: 'the 2007 reading was substantially revised after 2020 toward vibrational origins',
  },
  {
    claim: 'Olfactory discrimination reads molecular vibration via inelastic electron tunnelling.',
    verdict: 'contested',
    refutedBy: 'controlled receptor-level isotope experiments showing no discrimination',
    boundary: 'behavioural results exist; receptor-level replication has largely failed',
  },
  {
    claim: 'Our vacuum is metastable and may decay to a lower-energy state.',
    verdict: 'open',
    refutedBy: 'a demonstration that the present vacuum is absolutely stable',
    boundary: 'depends on parameters measured near a stability boundary; unfalsifiable in practice for now',
  },
  {
    claim: 'Microtubule quantum processing underlies conscious experience.',
    verdict: 'contested',
    refutedBy: 'decoherence times in vivo far below the required threshold',
    boundary: 'the supporting Gödel argument is separately rejected by most logicians',
  },
  {
    claim: 'A delayed-choice eraser lets a later choice change an earlier outcome.',
    verdict: 'error',
    refutedBy: 'the raw signal pattern, which never shows interference at any time',
    boundary: 'fringes appear only in coincidence-sorted subsets; nothing earlier is altered',
  },
  {
    claim: 'Transistor switching operates by electron tunnelling.',
    verdict: 'error',
    refutedBy: 'field-effect device physics; tunnelling is a leakage and scaling limit',
    boundary: 'tunnelling genuinely powers flash memory and tunnel diodes',
  },
  {
    claim: 'The 1961 electron two-slit experiment fired electrons one at a time.',
    verdict: 'error',
    refutedBy: 'the 1961 apparatus used a beam; single-particle builds came in 1976 and 1989',
    boundary: 'the conclusion survives; the attribution does not',
  },
  {
    claim: 'Consciousness continues along surviving branches, so death is never experienced.',
    verdict: 'unfalsifiable',
    refutedBy: null,
    boundary: 'self-confirming from inside, invisible from outside — forbids nothing',
  },
  {
    claim: 'Dreams are echoes returned from a hidden layer of mind, in the sense a physical echo is.',
    verdict: 'metaphor',
    refutedBy: null,
    boundary: 'no mechanism is proposed, so no observation bears on it',
  },
] as const

/** Content-address of the whole body — the same claims in the same order fold to the same id. */
export const evidenceUuid = (claims: readonly Claim[] = EVIDENCE): string =>
  toUuid(claims.map((c) => `${c.verdict}:${c.claim}`).join('\n'))

/** How the body actually distributes across verdicts — computed, never typed. */
export function byVerdict(claims: readonly Claim[] = EVIDENCE): Record<VerdictKind, number> {
  const out = {
    theorem: 0, measured: 0, contested: 0, open: 0, error: 0, metaphor: 0, unfalsifiable: 0,
  } as Record<VerdictKind, number>
  for (const c of claims) out[c.verdict]++
  return out
}

/**
 * A claim asserting something about the world while carrying no refutation condition.
 *
 * `unfalsifiable` and `metaphor` declare their own emptiness, so they are exempt BY SAYING SO —
 * that is the honest state, not the defect. The defect is a claim that reads as empirical and
 * quietly cannot be contradicted.
 */
export function unrefutable(claims: readonly Claim[] = EVIDENCE): readonly Claim[] {
  return claims.filter((c) => c.refutedBy === null && c.verdict !== 'unfalsifiable' && c.verdict !== 'metaphor')
}

/** Ratchets at zero: an empirical claim here must state what would kill it. */
export function assertEvidenceRefutable(claims: readonly Claim[] = EVIDENCE): { ok: boolean; bad: readonly Claim[] } {
  const bad = unrefutable(claims)
  return { ok: bad.length === 0, bad }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const d = byVerdict()
  console.log(`${EVIDENCE.length} claims · ${evidenceUuid().slice(0, 16)}…\n`)
  for (const [k, v] of Object.entries(d)) if (v) console.log(`  ${k.padEnd(14)} ${v}`)
  const a = assertEvidenceRefutable()
  console.log(`\nempirical claims with no refutation condition: ${a.bad.length}`)
}
