'use client'

import { fieldEntanglementOf } from '@/quantum/entanglement'
import { Banner, FieldDescription, FieldLabel, TextInput, useDocumentInfo, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import React, { useMemo } from 'react'

import '../erpax-computed.scss'

const baseClass = 'erpax-entanglement-field'

const EntanglementField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path })
  const { collectionSlug } = useDocumentInfo()
  const ent = useMemo(
    () => fieldEntanglementOf(collectionSlug ?? '', path),
    [collectionSlug, path],
  )

  return (
    <div className={baseClass}>
      <FieldLabel label={field.label} required={field.required} />
      {field.admin?.description ? (
        <FieldDescription description={field.admin.description} path={path} />
      ) : null}
      <TextInput
        path={path}
        value={value ?? ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        readOnly={field.admin?.readOnly}
      />
      {ent ? (
        <Banner type="info">
          <strong>superposition</strong> — {ent.superposition}
          <br />
          <strong>collapse</strong> — {ent.collapse.join(' · ')}
          {ent.partners.length > 0 ? (
            <>
              <br />
              <strong>partners</strong> — {ent.partners.join(', ')}
            </>
          ) : null}
        </Banner>
      ) : null}
    </div>
  )
}

export default EntanglementField
