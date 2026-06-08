'use client'

/**
 * Generic form field wrapper — shadcn FormItem layout + Payload form errors.
 */

import type { FieldErrorsImpl } from 'react-hook-form'
import type { ReactNode } from 'react'
import React from 'react'
import { FormItem, Label } from '@/ui'
import { useTranslations } from 'next-intl'
import { Error } from '@/blocks/form/error'
import { Width } from '@/blocks/form/width'

export interface FormFieldProps {
  name: string
  label?: ReactNode
  required?: boolean
  width?: number | string
  errors: Partial<FieldErrorsImpl>
  children: ReactNode
  className?: string
  hint?: ReactNode
  showLabel?: boolean
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  required = false,
  width,
  errors,
  children,
  className,
  hint,
  showLabel = true,
}) => {
  const t = useTranslations()
  const hasError = !!errors[name]

  return (
    <Width width={width}>
      <FormItem className={className}>
        {showLabel && label ? (
          <Label htmlFor={name} className={hasError ? 'text-destructive' : undefined}>
            {label}
            {required ? (
              <span className="required">
                {' '}
                * <span className="sr-only">({t('required')})</span>
              </span>
            ) : null}
          </Label>
        ) : null}
        {hint ? <p className="text-muted-foreground text-sm">{hint}</p> : null}
        {children}
        {hasError ? <Error name={name} /> : null}
      </FormItem>
    </Width>
  )
}
