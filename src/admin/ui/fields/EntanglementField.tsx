'use client'

import { fieldEntanglementOf } from '@/quantum/entanglement'
import { Alert, AlertDescription, AlertTitle } from '@/ui'
import {
  TextInput,
  useField,
  FieldLabel,
  FieldDescription,
  useDocumentInfo,
} from '@payloadcms/ui'
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
        <Alert className="mt-2 border-amber-200 bg-amber-50">
          <AlertTitle className="text-amber-700">superposition</AlertTitle>
          <AlertDescription className="text-amber-800">{ent.superposition}</AlertDescription>
          <AlertTitle className="text-foreground mt-1.5">collapse</AlertTitle>
          <AlertDescription>{ent.collapse.join(' · ')}</AlertDescription>
          {ent.partners.length > 0 ? (
            <AlertDescription className="text-muted-foreground mt-1.5">
              <strong>partners</strong> — {ent.partners.join(', ')}
            </AlertDescription>
          ) : null}
        </Alert>
      ) : null}
    </div>
  )
}

export default EntanglementField
