/**
 * fusion/reactor — THE fusion reactor readout: the engine that fuses atoms into one matrix,
 * composed over the three forces — [[gravity]] (force: mass curves the corpus inward),
 * [[entropy]] (fuel: the disorder the ledger burns), and the [[quantum]] laws (collapse /
 * quantization). Each fusion is a content-uuid collision; run over the whole corpus it folds
 * to ONE root. Zero entropy ⇒ infinite mass ⇒ infinite tamper cost (the [[singularity]]).
 *
 * Lives in its own atom by gravity-pull; [[fusion]] re-exports it (the act of fusing —
 * `fuse` / `foldToRoot` — stays in fusion; the READOUT is the reactor).
 *
 *   tsx src/fusion/reactor/index.ts
 *
 * @audit computed from the live matrix, never hand-asserted
 * @see ../index.ts (fuse/foldToRoot) -- ../../gravity (force) -- ../../entropy (fuel) -- ../../quantum (laws) -- ./SKILL.md
 */
import { matrixDigest } from '@/uuid/matrix'
import { well, concentration } from '@/gravity'
import { entropy } from '@/entropy'
import { collapse, quantization } from '@/quantum'

export interface ReactorReadout {
  nodes: number
  edges: number
  root: string
  well: { atom: string; mass: number }
  concentration: number
  entropy: number
  collapse: boolean
  quantized: boolean
}

/** The full reactor readout: gravity (force) ⊕ entropy (fuel) ⊕ quantum (laws) composed over the matrix. */
export function reactor(): ReactorReadout {
  const d = matrixDigest()
  return {
    nodes: d.nodes,
    edges: d.edges,
    root: d.root,
    well: well(),
    concentration: concentration(),
    entropy: entropy(),
    collapse: collapse(),
    quantized: quantization().offSequence === 0,
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const r = reactor()
  console.log('fusion/reactor (' + r.nodes + ' nodes, ' + r.edges + ' edges):')
  console.log('  root=' + r.root + '  well=[[' + r.well.atom + ']] mass=' + r.well.mass)
  console.log('  concentration(Gini)=' + r.concentration.toFixed(3) + '  entropy=' + r.entropy.toFixed(4) + '  collapse=' + r.collapse + '  quantized=' + r.quantized)
}
