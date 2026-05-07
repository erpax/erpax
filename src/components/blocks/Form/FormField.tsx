'use client'

/**
 * Generic form field wrapper component
 * Provides consistent label, error display, width layout, and required indicator
 * Eliminates duplication across Text, Email, Number, Textarea, Checkbox, etc.
 *
 * @example
 * <FormField name="email" label="Email" required errors={errors} width="full">
 *   <Input type="email" {...register('email')} />
 * </FormField>
 */

import type { FieldErrorsImpl, FieldValues } from 'react-hook-form'
import type { ReactNode } from 'react'
import React from 'react'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'
import { Error } from './Error'
import { Width } from './Width'

export interface FormFieldProps {
  /** Form field name (must match register name) */
  name: string
  /** Label text to display above the input */
  label?: ReactNode
  /** Whether the field is required (shows asterisk) */
  required?: boolean
  /** Layout width (Payload form-builder uses numeric %; legacy fields may use string tokens) */
  width?: number | string
  /** Form errors from react-hook-form */
  errors: Partial<FieldErrorsImpl>
  /** The input component (Input, Textarea, Checkbox, Select, etc.) */
  children: ReactNode
  /** Optional className to add to wrapper */
  className?: string
  /** Optional hint text below the label */
  hint?: ReactNode
  /** Show label above input (default: true) */
  showLabel?: boolean
}

/**
 * FormField component: Generic wrapper for all form input types
 * Handles: label, required indicator, error messages, layout
 *
 * Provides:
 * - Consistent styling across all input types
 * - Proper accessibility with labels and error messages
 * - Required field indicator
 * - Error display below input
 * - Optional hint text
 * - Flexible width support
 *
 * Eliminates duplication in Text, Email, Number, Textarea, Checkbox, Select, etc.
 */
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
      <div className={className}>
        {showLabel && label && (
          <Label htmlFor={name} className={hasError ? 'text-red-600' : ''}>
            {label}
            {required && (
              <span className="required">
                {' '}
                * <span className="sr-only">({t('required')})</span>
              </span>
            )}
          </Label>
        )}

        {hint && <p className="text-sm text-gray-600 mt-1">{hint}</p>}

        {children}

        {hasError && <Error name={name} />}
      </div>
    </Width>
  )
}
