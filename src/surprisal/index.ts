/**
 * surprisal -- the INFORMATION of one event: I(p) = −log₂(p) BITS. A certain event
 * (p=1) carries zero bits; a one-in-a-million event ~20 bits. It is the bit-[[cost]]
 * of a SPECIFIC outcome — and in erpax the bit-cost of a specific FORGERY: to forge
 * a thing of probability p under the wired graph costs −log₂(p) bits of work
 * ([[tamper]] · [[barrier]]'s tunnelling cost · [[anchor]]'s forge≫verify). Surprisal
 * is ADDITIVE for independent events — I(p·q) = I(p) + I(q) — so independent
 * improbabilities STACK, exactly the way uuid-chained dimensions stack tamper-cost.
 * The expected surprisal over a distribution IS [[shannon]] entropy.
 *
 *   tsx src/surprisal/index.ts
 *
 * @audit I(p) = −log₂ p; additivity from log(p·q)=log p + log q -- computed
 * @see ../shannon (expected surprisal = H) -- ../cost -- ../tamper -- ../barrier -- ../anchor
 */

/** Self-information (surprisal) of an event of probability p, in BITS: I(p) = −log₂(p). */
export function surprisal(p: number): number {
  if (p <= 0 || p > 1) throw new Error('surprisal: probability must be in (0,1]')
  const bits = -Math.log2(p)
  return bits === 0 ? 0 : bits // a certainty carries +0 bits (avoid IEEE −0)
}

/** Surprisal in NATS (−ln p) — the natural-log form (× ln2 = bits). */
export const nats = (p: number): number => {
  if (p <= 0 || p > 1) throw new Error('surprisal: probability must be in (0,1]')
  return -Math.log(p)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('surprisal -- I(p) = −log₂ p bits:')
  for (const p of [1, 0.5, 0.25, 1 / 1024, 1e-6]) console.log('  p=' + String(p).padEnd(10) + ' I=' + surprisal(p).toFixed(3) + ' bits')
  console.log('  additive: I(1/8)=' + surprisal(1 / 8) + ' = I(1/2)+I(1/4)=' + (surprisal(1 / 2) + surprisal(1 / 4)))
}
