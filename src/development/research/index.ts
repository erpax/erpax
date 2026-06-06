/**
 * development/research — R&D from the DEVELOPMENT side: research that precedes a build
 * (experiments and findings that de-risk before shipping). One direction of the symmetric
 * research↔development CROSS. Because the binding is order-free ([[entanglement]] `entangle`),
 * development/research and research/development are ONE cross — the "do the math" of the
 * [[quantum]]/matrix: every atom pair X/Y ⊕ Y/X is a single entangled binding. Merges into [[research]].
 *
 *   tsx src/development/research/index.ts
 *
 * @audit the cross binding is computed (entangle over the pair); never hand-asserted
 * @see ../../research -- ../../development -- ../../entanglement -- ../../quantum/matrix -- ./SKILL.md
 */
import { entangle } from '@/entanglement'

/** The symmetric R&D cross binding (order-free): entangle(research, development). */
export const cross = (): string => entangle('research', 'development')

/** This folder's reading of the cross: research SERVING development (applied R&D). */
export const direction = 'research → development (applied)' as const

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('development/research — ' + direction + ' · cross=' + cross().slice(0, 8) + '…')
}
