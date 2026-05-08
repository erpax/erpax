import { render, type RenderResult } from '@testing-library/react'
import React from 'react'
import { useForm, type FieldErrors, type UseFormRegister } from 'react-hook-form'

/** `useForm()` must run inside a component. */
export function FormHarness({
  children,
}: {
  children: (register: UseFormRegister<any>, errors: FieldErrors) => React.ReactNode
}) {
  const { register, formState } = useForm()
  return <>{children(register, formState.errors)}</>
}

export function renderForm(
  children: (register: UseFormRegister<any>, errors: FieldErrors) => React.ReactElement,
): RenderResult {
  return render(<FormHarness>{children}</FormHarness>)
}
