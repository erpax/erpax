/**
 * The 4-seal gate LANE — the CLI face of ./index.ts#assertMatrixSigned.
 *
 * Moved out of the barrel so importing the matrix API carries no top-level
 * gate execution: the barrel stays side-effect-free (tree-shakeable — a
 * toUuid-only consumer ships without the generated matrix), and the lane
 * stays fail-closed (exit 1) for the registry.
 *
 *   tsx src/uuid/matrix/gate.ts
 */
import { assertMatrixSigned } from './index'

try {
  const { signed } = assertMatrixSigned()
  console.log(`✓ 4-seal gate — ${signed} atoms signed (uuid⊕parent⊕prev⊕next binds recompute · root folds to UUID_MATRIX_ROOT)`)
} catch (e) {
  console.error((e as Error).message)
  process.exit(1)
}
