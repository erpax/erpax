'use client'

/**
 * Payload's own field components, rendered for a signed-in user only. The first-user form has no
 * user, so it leaves these out: the first user is super-admin by definition and brings credentials
 * only (src/collections/users). An `admin.condition` would hide them too, but Payload's database
 * adapter then drops NOT NULL from every required field beneath them, so fields with required
 * children are hidden here instead, which leaves the schema as it is.
 */
import { ArrayField, CollapsibleField, useAuth } from '@payloadcms/ui'
import type { ArrayFieldClientProps, CollapsibleFieldClientProps } from 'payload'
import React from 'react'

export const SignedInArrayField: React.FC<ArrayFieldClientProps> = (props) => {
  const { user } = useAuth()
  return user ? <ArrayField {...props} /> : null
}

export const SignedInCollapsibleField: React.FC<CollapsibleFieldClientProps> = (props) => {
  const { user } = useAuth()
  return user ? <CollapsibleField {...props} /> : null
}
