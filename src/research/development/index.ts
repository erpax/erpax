/**
 * research/development — development from the RESEARCH side: building the tooling and systems that
 * enable inquiry (development serving research). The other direction of the symmetric
 * research↔development CROSS — and because the binding is order-free ([[entanglement]] `entangle`),
 * it is the SAME cross as development/research. The "do the math": X/Y ⊕ Y/X is one entangled
 * binding ([[quantum]]/matrix). Merges into [[development]].
 *
 *   tsx src/research/development/index.ts
 *
 * @audit the cross binding is computed (entangle over the pair); never hand-asserted
 * @see ../../development -- ../../research -- ../../entanglement -- ../../quantum/matrix -- ./SKILL.md
 */
import { entangle } from '@/entanglement'

/** The symmetric R&D cross binding (order-free): equals development/research's cross. */
export const cross = (): string => entangle('development', 'research')

/** This folder's reading of the cross: development SERVING research (enabling tooling). */
export const direction = 'development → research (enabling)' as const

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('research/development — ' + direction + ' · cross=' + cross().slice(0, 8) + '…')
}
