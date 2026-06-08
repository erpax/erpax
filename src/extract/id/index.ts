import { Config } from '@/types'
import type { CollectionSlug } from 'payload'

export const extractID = <T extends Config['collections'][CollectionSlug]>(
  objectOrID: T | T['id'],
): T['id'] => {
  if (objectOrID !== null && objectOrID !== undefined && typeof objectOrID === 'object') {
    return objectOrID.id
  }

  return objectOrID as T['id']
}
