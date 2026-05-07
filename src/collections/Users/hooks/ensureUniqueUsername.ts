import type { FieldHook, Where } from 'payload'

import { ValidationError } from 'payload'

import { isSuperAdmin } from '@/access/isSuperAdmin'
import { getUserTenantIDs } from '../../../utilities/getUserTenantIDs'
import { getTenantFromCookie } from '@payloadcms/plugin-multi-tenant/utilities'
import { getCollectionIDType } from '@/utilities/getCollectionIDType'

/** Blank / omitted username is allowed for any number of users; uniqueness applies only to non-empty values. */
function normalizeUsername(value: unknown): string | null {
  if (value === undefined || value === null) return null
  if (typeof value !== 'string') return null
  const t = value.trim()
  return t === '' ? null : t
}

export const ensureUniqueUsername: FieldHook = async ({ originalDoc, req, value }) => {
  const next = normalizeUsername(value)
  const previous = normalizeUsername(originalDoc?.username)

  if (previous === next) {
    return next
  }

  if (next === null) {
    return null
  }

  const constraints: Where[] = [
    {
      username: {
        equals: next,
      },
    },
  ]

  const selectedTenant = getTenantFromCookie(
    req.headers,
    getCollectionIDType({ payload: req.payload, collectionSlug: 'tenants' }),
  )

  if (selectedTenant) {
    constraints.push({
      'tenants.tenant': {
        equals: selectedTenant,
      },
    })
  }

  const findDuplicateUsers = await req.payload.find({
    collection: 'users',
    where: {
      and: constraints,
    },
  })

  if (findDuplicateUsers.docs.length > 0 && req.user) {
    const tenantIDs = getUserTenantIDs(req.user)
    // if the user is an admin or has access to more than 1 tenant
    // provide a more specific error message
    if (isSuperAdmin(req.user) || tenantIDs.length > 1) {
      const attemptedTenantChange = await req.payload.findByID({
        // @ts-ignore - selectedTenant will match DB ID type
        id: selectedTenant,
        collection: 'tenants',
      })

      throw new ValidationError({
        errors: [
          {
            message: `The "${attemptedTenantChange.name}" tenant already has a user with the username "${next}". Usernames must be unique per tenant.`,
            path: 'username',
          },
        ],
      })
    }

    throw new ValidationError({
      errors: [
        {
          message: `A user with the username ${next} already exists. Usernames must be unique per tenant.`,
          path: 'username',
        },
      ],
    })
  }

  return next
}
