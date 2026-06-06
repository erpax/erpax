/**
 * Content-UUID plugin — universal content-addressed identity.
 *
 * Injects a content-addressed `uuid` field + compute hook into EVERY
 * collection. The building block already existed
 * (`services/integrity/tamper-proof-uuid-field`) but no collection used
 * it — this is the DRY fill for that identity gap. One injector, all
 * collections, the same way the multi-tenant plugin injects `tenant`.
 * See the `identity` skill.
 *
 * Decisions:
 *   - Plugin, not per-collection opt-in: one place, no duplication/drift.
 *   - `required` is dropped: the value is computed in `beforeChange`
 *     (after validation), so a required check at validate time would
 *     reject every create — the ordering trap that left the opt-in
 *     unused. The hook guarantees population on every write.
 *   - The hook is appended LAST so the multi-tenant plugin's `tenant`
 *     value is on `data` before the uuid is hashed (tenant namespaces
 *     the content-uuid).
 *   - Collections already declaring a top-level `uuid` field are left
 *     untouched (no DuplicateFieldName).
 */
import type { Config, Field, Plugin } from 'payload'
import {
  tamperProofUuidField,
  tamperProofBeforeChangeHook,
} from '@/integrity/tamper-proof-uuid-field'

const isNamed = (f: Field): f is Field & { name: string } =>
  'name' in f && typeof (f as { name?: unknown }).name === 'string'

export const uuidPlugin =
  (): Plugin =>
  (config: Config): Config => ({
    ...config,
    collections: (config.collections ?? []).map((collection) => {
      if ((collection.fields ?? []).some((f) => isNamed(f) && f.name === 'uuid')) {
        return collection
      }
      // Side-effect: registers the slug in the Law-8 tamper-proof registry.
      const [uuidField] = tamperProofUuidField(collection.slug)
      const uuid: Field = { ...uuidField }
      delete (uuid as Record<string, unknown>).required
      return {
        ...collection,
        fields: [uuid, ...(collection.fields ?? [])],
        hooks: {
          ...collection.hooks,
          beforeChange: [
            ...(collection.hooks?.beforeChange ?? []),
            tamperProofBeforeChangeHook(collection.slug),
          ],
        },
      }
    }),
  })
