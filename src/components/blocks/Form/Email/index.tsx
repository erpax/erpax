import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import React from 'react'

import { FormField } from '@/components/blocks/Form/FormField'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => (
  <FormField name={name} label={label} required={required} width={width} errors={errors}>
    <Input
      defaultValue={defaultValue}
      id={name}
      type="email"
      {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
    />
  </FormField>
)
