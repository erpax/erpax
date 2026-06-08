/**
 * quantum/entanglement — the PHYSICS facet of [[entanglement]]: the quantum laws the
 * corpus link-field is grounded in, computed on the live matrix. It reuses [[quantum]]'s
 * entanglement() (the symmetric-binding check + reciprocal-edge count) and frames it as
 * the science:
 *
 *  - EPR (Einstein–Podolsky–Rosen, 1935) + Bell (1964): entanglement is a real,
 *    non-classical correlation. Here the computable analogue is the reciprocal link-field.
 *  - No-cloning (Wootters–Zurek, 1982) ⇒ monogamy (Coffman–Kundu–Wootters, 2000): a
 *    content-uuid cannot be cloned, so links are monogamous ([[entanglement]]).
 *  - ER=EPR (Maldacena–Susskind, 2013): entanglement IS geometry (../gravity).
 *
 * HONEST: the matrix is a CLASSICAL graph; "entanglement" here is reciprocity + monogamy,
 * the computable shadow of the physics — there is no superposition or Bell-violating state.
 *
 *   tsx src/quantum/entanglement/index.ts
 *
 * @standard ER=EPR (Maldacena & Susskind, 2013); monogamy (Coffman–Kundu–Wootters, PRA 61 052306, 2000)
 * @audit composed from ../../entanglement + ../index.ts; computed on the live matrix
 * @see ../../entanglement -- ../index.ts (entanglement/entangle) -- ../gravity (ER=EPR) -- ./SKILL.md
 */
import { entanglement as matrixEntanglement } from '@/quantum'
import { reciprocity, isFullyEntangled, noCloning } from '@/entanglement'
import {
  COLLAPSE_HOOKS,
  FIELD_ENTANGLEMENT_REGISTRY,
  fieldEntanglementCount,
  fieldEntanglementKey,
  entangledFieldsFromRegistry,
  type CollapseHookId,
  type FieldEntanglement,
} from '@/quantum/entanglement/registry'

export {
  COLLAPSE_HOOKS,
  FIELD_ENTANGLEMENT_REGISTRY,
  fieldEntanglementCount,
  entangledFieldsFromRegistry,
  type CollapseHookId,
  type FieldEntanglement,
} from '@/quantum/entanglement/registry'

export {
  DIRECTION_COLLAPSE_EVENT,
  improveDirectionPath,
  cleanDirectionPath,
  automateDirectionPath,
  publishDirection,
  subscribeDirection,
  interruptTokenFor,
  isDirectionStale,
  peekDirection,
  __resetDirectionBusForTests,
  type DirectionPayload,
  type SealedDirection,
  type InterruptToken,
} from '@/quantum/entanglement/direction-bus'

/** The Bell-test analogue: the corpus is "maximally entangled" when reciprocity = 1 AND no-cloning holds. */
export const isMaximallyEntangled = (): boolean => isFullyEntangled() && noCloning()

export interface EntanglementReport {
  reciprocal: number
  edges: number
  reciprocity: number
  noCloning: boolean
  maximal: boolean
}

/**
 * Field-level entanglement — which partners a text field is superposed with,
 * what collapses it on write, and the matrix bond. Returns null when the
 * collection/field pair is outside the static registry (top collections from
 * the 01a03ea0 audit).
 */
export function fieldEntanglementOf(
  collectionSlug: string,
  fieldPath: string,
): FieldEntanglement | null {
  return FIELD_ENTANGLEMENT_REGISTRY[fieldEntanglementKey(collectionSlug, fieldPath)] ?? null
}

/** The physics read-out: the reciprocal-edge fraction (symmetric binding) + no-cloning (unique identity, the CKW monogamy root). */
export const report = (): EntanglementReport => {
  const ent = matrixEntanglement()
  return {
    reciprocal: ent.reciprocal,
    edges: ent.edges,
    reciprocity: reciprocity(),
    noCloning: noCloning(),
    maximal: isMaximallyEntangled(),
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const r = report()
  console.log('quantum/entanglement — the physics facet (EPR/Bell/CKW/ER=EPR):')
  console.log('  reciprocity ' + (100 * r.reciprocity).toFixed(1) + '% (' + r.reciprocal + '/' + r.edges + ') · no-cloning=' + r.noCloning + ' · maximally-entangled=' + r.maximal)
}
