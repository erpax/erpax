/**
 * rodin/state — the vortex states as they are CARRIED, which needs the live matrix.
 *
 * `../index` is arithmetic on residues: `orbit`, `composeSteps`, `compositionMatrix`,
 * `cayleyIsCyclic` — pure, and what every caller of this atom actually wants. `stateUuids` is
 * the one function that asks which content-uuids carry each state, and to answer it reads
 * `UUID_MATRIX_NODES` — **4.2 MB, 3,411 nodes**.
 *
 * One import held it there, and `@erpax/cloudflare` paid for all of it to reach `orbit` through
 * a key-derivation function:
 *
 *     cloudflare/seal → nist/sp/800/108 → rodin → @/uuid/matrix → 3,412 node literals
 *
 * Third time this shape appeared in one cut: a heavy import serving a minority of a file's
 * functions, and every consumer of the majority paying for it.
 *
 * @see ../index — the arithmetic, which now imports nothing
 */
import { UUID_MATRIX_NODES as N } from '@/uuid/matrix'
import { digitalRootOfUuid } from '@/digit'
import { VORTEX_SEQUENCE, CMYK } from '../index'

/** Each vortex state carried by content-uuids (word·digit·uuid): count + a sample per digit. */
export function stateUuids(): { digit: number; channel?: string; count: number; sample?: { atom: string; uuid: string; contentDigit: number } }[] {
  return [...VORTEX_SEQUENCE].map((d) => {
    const here = N.filter((node) => node.horo === d)
    const s = here[0]
    return {
      digit: d,
      channel: (CMYK as Record<number, string>)[d],
      count: here.length,
      sample: s ? { atom: s.atom, uuid: s.uuid, contentDigit: digitalRootOfUuid(s.uuid) } : undefined,
    }
  })
}

