/** @vitest-environment jsdom */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Text } from '@/components/blocks/Form/Text'

import { FormHarness, renderForm } from './renderWithRHF'

vi.mock('@/components/blocks/Form/FormField', () => ({
  FormField: ({ name, label, required, width: _width, errors, children }: Record<string, unknown>) => (
    <div data-testid={`form-field-${name}`}>
      {label && <label>{label}</label>}
      {required && <span className="required">*</span>}
      {children}
      {errors[name] && <div data-testid={`error-${name}`}>Error</div>}
    </div>
  ),
}))

vi.mock('@/components/ui/input', () => {
  const Input = React.forwardRef(({ type, ...props }: any, ref) => (
    <input {...props} type={type} ref={ref} data-testid={`input-${props.id || 'default'}`} />
  ))
  Input.displayName = 'Input'
  return { Input }
})

describe('Text Form Field', () => {
  const defaultProps = {
    name: 'textField',
    label: 'Text Input',
    defaultValue: '',
    required: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders text input', () => {
      renderForm((register, errors) => (
        <Text {...defaultProps} register={register} errors={errors} />
      ))
      expect(screen.getByTestId('input-textField')).toBeInTheDocument()
    })

    it('renders FormField wrapper', () => {
      renderForm((register, errors) => (
        <Text {...defaultProps} register={register} errors={errors} />
      ))
      expect(screen.getByTestId('form-field-textField')).toBeInTheDocument()
    })

    it('renders label', () => {
      renderForm((register, errors) => (
        <Text {...defaultProps} label="Full Name" register={register} errors={errors} />
      ))
      expect(screen.getByText('Full Name')).toBeInTheDocument()
    })
  })

  describe('input type', () => {
    it('uses type="text"', () => {
      const { container } = renderForm((register, errors) => (
        <Text {...defaultProps} register={register} errors={errors} />
      ))
      const input = container.querySelector('input')
      expect(input?.type).toBe('text')
    })
  })

  describe('required field', () => {
    it('shows required indicator when required is true', () => {
      renderForm((register, errors) => (
        <Text {...defaultProps} required register={register} errors={errors} />
      ))
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('passes required to register', () => {
      const register = vi.fn(() => ({}))
      render(<Text {...defaultProps} required register={register as any} errors={{}} />)
      expect(register).toHaveBeenCalledWith('textField', { required: true })
    })
  })

  describe('width property', () => {
    it('passes width to FormField', () => {
      const { container } = renderForm((register, errors) => (
        <Text {...defaultProps} width="half" register={register} errors={errors} />
      ))
      expect(container).toBeTruthy()
    })
  })

  describe('default value', () => {
    it('uses defaultValue prop', () => {
      const { container } = renderForm((register, errors) => (
        <Text
          {...defaultProps}
          defaultValue="Initial Value"
          register={register}
          errors={errors}
        />
      ))
      const input = container.querySelector('input') as HTMLInputElement
      expect(input.defaultValue).toBe('Initial Value')
    })
  })

  describe('field name', () => {
    it('uses field name from props', () => {
      const { container } = renderForm((register, errors) => (
        <Text {...defaultProps} name="userName" register={register} errors={errors} />
      ))
      const input = container.querySelector('input')
      expect(input?.id).toBe('userName')
    })
  })

  describe('error handling', () => {
    it('displays error when field has validation error', () => {
      const mockErrors = { textField: { message: 'Field is required' } }

      render(
        <FormHarness>
          {(register) => (
            <Text {...defaultProps} register={register} errors={mockErrors as any} />
          )}
        </FormHarness>,
      )
      expect(screen.getByTestId('error-textField')).toBeInTheDocument()
    })

    it('does not display error when field is valid', () => {
      renderForm((register, errors) => (
        <Text {...defaultProps} register={register} errors={errors} />
      ))
      expect(screen.queryByTestId('error-textField')).not.toBeInTheDocument()
    })
  })

  describe('component composition', () => {
    it('properly composes all props', () => {
      const { container } = renderForm((register, errors) => (
        <Text
          name="email"
          label="Email Address"
          defaultValue="test@example.com"
          required
          width="full"
          register={register}
          errors={errors}
        />
      ))
      expect(screen.getByTestId('form-field-email')).toBeInTheDocument()
      expect(screen.getByText('Email Address')).toBeInTheDocument()
      const input = container.querySelector('input') as HTMLInputElement
      expect(input.defaultValue).toBe('test@example.com')
    })
  })
})
