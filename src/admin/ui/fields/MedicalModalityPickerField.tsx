'use client'

import { MODALITIES, deviceSpec, type MedicalDeviceModality } from '@/medical/device'
import { Banner, FieldDescription, FieldLabel, SelectInput, useField } from '@payloadcms/ui'
import type { SelectFieldClientComponent } from 'payload'
import React, { useMemo } from 'react'

const baseClass = 'erpax-medical-modality'

const isModality = (v: string): v is MedicalDeviceModality =>
  (MODALITIES as readonly string[]).includes(v)

const MedicalModalityPickerField: SelectFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path })
  const spec = useMemo(
    () => (typeof value === 'string' && isModality(value) ? deviceSpec(value) : null),
    [value],
  )

  const options = MODALITIES.map((m) => {
    const s = deviceSpec(m)
    return {
      label: `${m} (${s.category} · ${s.signal})`,
      value: m,
    }
  })

  return (
    <div className={baseClass}>
      <FieldLabel label={field.label} required={field.required} />
      {field.admin?.description ? (
        <FieldDescription description={field.admin.description} path={path} />
      ) : null}
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={(opt) => {
          if (typeof opt === 'string') setValue(opt)
          else if (Array.isArray(opt)) setValue(String(opt[0]?.value ?? ''))
          else setValue(String(opt?.value ?? ''))
        }}
        readOnly={field.admin?.readOnly}
      />
      {spec ? (
        <Banner>LOINC outputs: {spec.outputs.map((o) => o.code).join(', ')}</Banner>
      ) : null}
    </div>
  )
}

export default MedicalModalityPickerField
