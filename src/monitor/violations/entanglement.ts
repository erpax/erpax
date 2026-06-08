/**
 * monitor/violations/entanglement — field entanglement unhooked scan axis.
 *
 * Split from index.ts — concentration law distributes scan axes across child modules.
 *
 * @see ./index.ts — @/quantum/entanglement
 */
import {
  COLLAPSE_HOOKS,
  FIELD_ENTANGLEMENT_REGISTRY,
  type FieldEntanglement,
} from '@/quantum/entanglement/registry'

export function fieldEntanglementUnhooked(): readonly FieldEntanglement[] {
  const knownHooks = new Set(Object.keys(COLLAPSE_HOOKS))
  return Object.values(FIELD_ENTANGLEMENT_REGISTRY).filter(
    (entry) =>
      entry.collapse.length === 0 ||
      entry.collapse.every((hookId) => !knownHooks.has(hookId)),
  )
}

export const fieldEntanglementUnhookedCount = (): number => fieldEntanglementUnhooked().length
