/**
 * rating — the voting/rating among skills (the organism's consensus signal).
 *
 * Every [[link]] from one atom to another is a VOTE: the linking atom (itself
 * content-addressed) attests that the target exists and is relevant. A skill's
 * rating is its count of DISTINCT incoming attestations — the merge law: the same
 * attester counts once, no ballot-stuffing. An orphan rates 0 (nothing confirms
 * it); a depended-upon atom rates high. The attestation count IS the tamper-cost
 * (removing/forging the target means fooling every attester), and it is the skill's
 * leverage proxy — how many others it serves — so it feeds harmonic karma
 * ([[allocation]]: pay tracks leverage; a high-rating atom earns the higher harmonic).
 *
 * This generalises the one-off entropy-attack attestations into a STANDING signal
 * over the live link graph: the same machinery the per-message aura ([[subgraph]])
 * resolves, now read as votes. Pure over the SkillNode index — no IO, deterministic.
 *
 * @standard ISO/IEC 25010 §5.5 testability (pure, deterministic)
 */
import type { SkillNode } from './resolve'
import { norm } from '@/corpus/index.mts'

export interface Rating {
  /** the rated atom (normalized leaf-word). */
  readonly subject: string
  /** distinct incoming attestations (votes) — atoms that link to it. */
  readonly confirmations: number
  /** normalized 0..1 against the index's most-attested atom — comparable across skills. */
  readonly rating: number
  /** = confirmations: the independent attestations a forger must fool (the tamper-cost). */
  readonly tamperCost: number
}

const leafOf = (ref: string): string => {
  const segs = ref.replace(/\/SKILL$/i, '').split('/').filter(Boolean)
  return segs.length ? segs[segs.length - 1] : ''
}

/**
 * Map every atom → the SET of distinct atoms that attest to it (link to it via
 * related/children/ancestors). Distinct attesters only (the merge law); self-links
 * and links to absent atoms are ignored.
 */
export function attestationCounts(index: readonly SkillNode[]): Map<string, Set<string>> {
  const incoming = new Map<string, Set<string>>()
  for (const n of index) incoming.set(norm(n.name), new Set<string>())
  for (const n of index) {
    const attester = norm(n.name)
    for (const ref of [...n.related, ...n.children, ...n.ancestors]) {
      const key = norm(leafOf(ref))
      if (!key || key === attester) continue
      const set = incoming.get(key)
      if (set) set.add(attester) // distinct attester ⇒ one vote
    }
  }
  return incoming
}

const maxOf = (incoming: Map<string, Set<string>>): number => {
  let m = 1
  for (const s of incoming.values()) if (s.size > m) m = s.size
  return m
}

/** Rate one atom by its distinct incoming attestations, normalized against the index max. */
export function rate(subject: string, index: readonly SkillNode[]): Rating {
  const incoming = attestationCounts(index)
  const confirmations = incoming.get(norm(subject))?.size ?? 0
  return { subject: norm(subject), confirmations, rating: confirmations / maxOf(incoming), tamperCost: confirmations }
}

/** Rate every atom — the comparable, descending consensus over the whole corpus. */
export function rateAll(index: readonly SkillNode[]): Rating[] {
  const incoming = attestationCounts(index)
  const max = maxOf(incoming)
  return [...incoming.entries()]
    .map(([subject, set]) => ({ subject, confirmations: set.size, rating: set.size / max, tamperCost: set.size }))
    .sort((a, b) => b.confirmations - a.confirmations || a.subject.localeCompare(b.subject))
}
