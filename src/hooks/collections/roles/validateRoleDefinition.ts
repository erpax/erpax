import type { CollectionBeforeValidateHook } from 'payload'

import { type ScopeResourceCollection, scopeResourceCollections } from '@/nist/incits/359'
import { apiErr, ERR } from '@/error'

/**
 * Ensures `roles` documents have consistent global / collection / document bindings.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control role-binding
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.4
 */
export const validateRoleDefinition: CollectionBeforeValidateHook = ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  const merged = {
    ...(originalDoc && typeof originalDoc === 'object' ? originalDoc : {}),
    ...(data && typeof data === 'object' ? data : {}),
  } as Record<string, unknown>

  const binding = merged.binding as string | undefined
  const nextBinding = binding ?? 'global'

  if (nextBinding === 'global') {
    if (data && typeof data === 'object') {
      ;(data as Record<string, unknown>).scopedCollection = null
      ;(data as Record<string, unknown>).resource = null
    }
    return data
  }

  if (nextBinding === 'collection') {
    const slug = merged.scopedCollection as string | undefined
    if (!slug || !scopeResourceCollections.includes(slug as ScopeResourceCollection)) {
      throw apiErr(ERR.ROLE_SCOPE_COLLECTION_INVALID)
    }
    if (data && typeof data === 'object') {
      ;(data as Record<string, unknown>).resource = null
    }
    return data
  }

  if (nextBinding === 'document') {
    const resource = merged.resource
    const hasDoc =
      (typeof resource === 'number' && Number.isFinite(resource)) ||
      (resource &&
        typeof resource === 'object' &&
        'value' in resource &&
        (resource as { value?: unknown }).value != null &&
        (resource as { value?: unknown }).value !== '')
    if (!hasDoc && operation === 'create') {
      throw apiErr(ERR.ROLE_DOCUMENT_REQUIRED)
    }
    if (data && typeof data === 'object') {
      ;(data as Record<string, unknown>).scopedCollection = null
    }
    return data
  }

  req?.payload?.logger?.warn({
    binding: nextBinding,
    code: ERR.ROLE_BINDING_INVALID,
    msg: 'Invalid role binding',
  })
  throw apiErr(ERR.ROLE_BINDING_INVALID)
}
