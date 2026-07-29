/**
 * algebra/fold — magma over uuids via [[merge]] (closed, NOT associative).
 *
 * Bound to `@/merge` (licensed app surface) — NOT part of the npm free package.
 * In-repo: `import { FOLD } from '@/algebra/fold'`. Free core math: `@erpax/algebra`.
 *
 * @see ./index · ./license · ../merge
 */
import { merge } from '@/merge'
import type { Algebra } from './index'

/** The fold, as an algebra over uuids — a magma (closed, deterministic, NOT associative). */
export const FOLD: Algebra<string> = {
  name: 'fold',
  carrier: ['00000000-0000-0000-0000-000000000000'],
  op: (a, b) => merge(a, b),
  overlay: 'the merkabas folding into themselves and each other',
}
