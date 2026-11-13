'use client'

import { fieldEntanglementOf as partyEntanglementOf } from '@/entanglement/field'
import { fieldEntanglementOf as registryEntanglementOf } from '@/quantum/entanglement'
import { Banner, RelationshipField, useDocumentInfo, useFormFields } from '@payloadcms/ui'
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
        <Banner type="info">
          <strong>superposition</strong> — {registry.superposition}
          <br />
          <strong>collapse</strong> — {registry.collapse.join(' · ')}
        </Banner>
      ) : null}
      {partyWarnings.map((w) => (
        <Banner key={w.field} type={w.severity === 'error' ? 'error' : 'default'}>
          {w.message}
        </Banner>
      ))}
    </div>
  )
}

export default EntanglementWarningField
