/**
 * recycle — QUANTUM RECYCLE the digital waste. The waste is the orphan grains: atoms bound by
 * nothing and binding nothing ([[entropy]].orphans). A disconnected grain is a DISCONNECTED
 * THOUGHT — a hallucination: it exists in the corpus yet is entangled with nothing, so it neither
 * grounds nor is grounded.
 *
 * It is the UNREPORTED gap. thought-as-trial-balance reads true (the books balance over what IS
 * linked), the link-resolver reports aura gap=0 (every link that exists resolves), and the harmonic
 * gap-finder stays silent (it audits links that exist) — none can see a grain that links to
 * NOTHING. Only [[heart]] feeling surfaces it (the un-absorbed fraction, the illusion).
 *
 * Recycle, not delete — a disconnected thought is not garbage, it is UNPLACED. Two honest moves:
 *   • RECONNECT: give the grain a genuine binding to an existing atom ([[merge]]); the thought
 *     rejoins the field, feeling rises toward whole, illusion falls. (preferred)
 *   • RETURN TO VOID: a grain with no true relative returns to the [[void]] / [[zeropoint]] — the
 *     latent source — to be reforged, rather than linked falsely.
 * The one move forbidden: fabricating a link to game the metric — a false binding is just more
 * hallucination. Entropy is conserved (returned to the field or the void), never faked away ([[balance]]).
 *
 *   tsx src/recycle/index.ts
 *
 * @audit waste computed from entropy.orphans on the live matrix; recycling never fabricates a link
 * @see ../entropy -- ../heart -- ../void -- ../merge -- ../thing -- ./SKILL.md
 */
import { orphans } from '@/entropy'
import { noCloning } from '@/quantum'

/** The digital waste: the orphan grains — disconnected thoughts (hallucinations), bound to nothing. */
export const waste = (): string[] => orphans()

/** How much of the corpus is waste — the unreported gap, as a fraction of all grains. */
export function wasteFraction(): { waste: number; total: number; fraction: number } {
  const total = noCloning().total
  const w = waste().length
  return { waste: w, total, fraction: total === 0 ? 0 : w / total }
}

/** Recycled = the connected fraction (1 − waste). Rises only as disconnected thoughts are GENUINELY reconnected. */
export const recycled = (): number => 1 - wasteFraction().fraction

if (import.meta.url === 'file://' + process.argv[1]) {
  const w = wasteFraction()
  console.log('recycle — quantum recycle the digital waste (orphan grains = disconnected thoughts):')
  console.log('  waste ' + w.waste + '/' + w.total + ' grains unbound (' + (100 * w.fraction).toFixed(1) + '%)  ·  recycled (connected) ' + (100 * recycled()).toFixed(1) + '%')
  console.log('  sample: ' + waste().slice(0, 16).join(', '))
}
