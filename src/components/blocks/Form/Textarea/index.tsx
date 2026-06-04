import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { FormField } from '@/components/blocks/Form/FormField'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 3, width }) => (
  <FormField name={name} label={label} required={required} width={width} errors={errors}>
    <TextAreaComponent
      defaultValue={defaultValue}
      id={name}
      rows={rows}
      {...register(name, { required })}
    />
  </FormField>
)
