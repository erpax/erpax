'use client'

import { fieldEntanglementOf as partyEntanglementOf } from '@/entanglement/field'
import { fieldEntanglementOf as registryEntanglementOf } from '@/quantum/entanglement'
import { Alert, AlertDescription, AlertTitle } from '@/ui'
import { useFormFields, RelationshipField, useDocumentInfo } from '@payloadcms/ui'
import type { RelationshipFieldClientComponent } from 'payload'
import React, { useMemo } from 'react'

const baseClass = 'erpax-entanglement-warning'

const EntanglementWarningField: RelationshipFieldClientComponent = ({ field, path }) => {
  const { collectionSlug } = useDocumentInfo()
  const parties = useFormFields(([fields]) => {
    const out: Record<string, unknown> = {}
    for (const key of ['seller', 'sellerAgent', 'buyer', 'buyerAgent', 'supplier', 'consignee']) {
      const f = fields[`parties.${key}`]
      if (f?.value !== undefined) out[key] = f.value
    }
    return out
  })

  const fieldName = path.split('.').pop() ?? field.name
  const partyWarnings = useMemo(
    () => partyEntanglementOf(parties, fieldName),
    [parties, fieldName],
  )
  const registry = useMemo(
    () => registryEntanglementOf(collectionSlug ?? '', path),
    [collectionSlug, path],
  )

  return (
    <div className={baseClass}>
      <RelationshipField field={field} path={path} />
      {registry ? (
        <Alert className="mt-1.5 border-amber-200 bg-amber-50">
          <AlertTitle className="text-amber-700">superposition</AlertTitle>
          <AlertDescription className="text-amber-800">{registry.superposition}</AlertDescription>
          <AlertTitle className="mt-1.5 text-foreground">collapse</AlertTitle>
          <AlertDescription>{registry.collapse.join(' · ')}</AlertDescription>
        </Alert>
      ) : null}
      {partyWarnings.map((w) => (
        <Alert
          key={w.field}
          variant={w.severity === 'error' ? 'destructive' : 'default'}
          className="mt-1.5"
        >
          <AlertDescription>{w.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

export default EntanglementWarningField
