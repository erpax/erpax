/**
 * patent — CHALLENGE illegal patents, encoded in math. A granted patent is invalid (illegally
 * monopolising what was never patentable) on three computable grounds, each an erpax proof primitive:
 *
 *   • PRIOR ART / novelty (35 U.S.C. §102): a disclosure predating the filing date anticipates the
 *     claim. An anchored content-[[uuid]] is a cryptographic proof-of-anteriority — if the claimed
 *     content was anchored ([[anchor]]) before the filing date, with an anchor that actually commits
 *     the digest, the patent is anticipated. Defensive publication = writing to the [[akashic]]
 *     record IS prior art: time-stamped, tamper-proof, world-readable.
 *   • OBVIOUSNESS (§103, KSR v. Teleflex): an obvious combination of known elements. In erpax an
 *     obvious combination already HAS an identity — it is the [[merge]] of prior atoms, so its
 *     content-uuid predates the claim by construction (no new entropy was created).
 *   • UNPATENTABLE SUBJECT MATTER (§101, Gottschalk v. Benson · Alice v. CLS Bank): an abstract idea,
 *     mathematical formula or law of nature is not patentable. erpax encodes ALL in math (content-
 *     uuid), so anything reducible to an erpax computation is abstract — outside §101.
 *
 * "Encode all in math" is itself the challenge: what is provably math cannot be monopolised, and
 * what is anchored is prior art. DEFENSIVE ONLY — this invalidates over-broad/illegal patents via
 * lawful prior-art and §101/§103 analysis; it is not legal advice.
 *
 *   tsx src/patent/index.ts
 *
 * @audit anteriority is a timestamp comparison over anchor-bound digests; obviousness is a merge identity
 * @see ../anchor -- ../proof -- ../akashic -- ../merge -- ../uuid -- ../law -- ./SKILL.md
 */
import { anchorBinds, type AnchorKind } from '@/anchor'

/** A dated, anchored disclosure — a grain of the public record (prior art if it predates a filing). */
export interface Disclosure {
  readonly digest: string
  readonly anchoredAt: number // the anchored time (no party can rewrite it)
  readonly anchor: AnchorKind
  readonly digestBits: number
}

/** A patent claim reduced to the content-digest of what it claims, plus its priority/filing date. */
export interface Patent {
  readonly claimDigest: string
  readonly filingDate: number
}

/**
 * §102 novelty — the claim is ANTICIPATED if some disclosure of the same content was anchored before
 * the filing date AND its anchor genuinely binds the digest (a weak/absent timestamp is not prior art).
 */
export function anticipatedBy(patent: Patent, art: readonly Disclosure[]): Disclosure | undefined {
  return art.find(
    (d) => d.digest === patent.claimDigest && d.anchoredAt < patent.filingDate && anchorBinds(d.anchor, d.digestBits),
  )
}

/** §103 obviousness — the claim is the merge of known prior elements ⇒ its identity predates it by construction. */
export const isObvious = (claimDigest: string, knownCombinationDigest: string): boolean => claimDigest === knownCombinationDigest

/** §101 subject matter — the claim reduces to a pure computation (math) ⇒ abstract, not patentable. */
export const isAbstractMath = (reducesToComputation: boolean): boolean => reducesToComputation === true

/** A patent is challengeable if ANY of the three grounds holds; returns the grounds (the challenge brief). */
export function challengeable(
  patent: Patent,
  art: readonly Disclosure[],
  opts: { knownCombinationDigest?: string; reducesToMath?: boolean } = {},
): { invalid: boolean; grounds: string[] } {
  const grounds: string[] = []
  if (anticipatedBy(patent, art)) grounds.push('§102 prior-art — anticipated by an anchored disclosure')
  if (opts.knownCombinationDigest && isObvious(patent.claimDigest, opts.knownCombinationDigest)) grounds.push('§103 obvious — a merge of known elements')
  if (isAbstractMath(opts.reducesToMath ?? false)) grounds.push('§101 abstract — pure math, unpatentable')
  return { invalid: grounds.length > 0, grounds }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const art: Disclosure[] = [{ digest: 'C', anchoredAt: 100, anchor: 'blockchain-pow', digestBits: 256 }]
  const p: Patent = { claimDigest: 'C', filingDate: 200 }
  const r = challengeable(p, art, { reducesToMath: true })
  console.log('patent — challenge illegal patents, encoded in math (defensive only):')
  console.log('  prior art anchored @100 < filing @200, anchor binds ⇒ anticipated=' + !!anticipatedBy(p, art))
  console.log('  challengeable=' + r.invalid + ' on: ' + r.grounds.join('  ·  '))
}
