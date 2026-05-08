/** @vitest-environment jsdom */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Number } from '@/components/blocks/Form/Number'

import { FormHarness, renderForm } from './renderWithRHF'

vi.mock('@/components/blocks/Form/FormField', () => ({
  FormField: ({ name, label, required, width: _width, errors, children }: any) => (
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

describe('Number Form Field', () => {
  const defaultProps = {
    name: 'numberField',
    label: 'Number Input',
    defaultValue: '',
    required: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders number input', () => {
      renderForm((register, errors) => (
        <Number {...defaultProps} register={register} errors={errors} />
      ))
      expect(screen.getByTestId('input-numberField')).toBeInTheDocument()
    })

    it('renders FormField wrapper', () => {
      renderForm((register, errors) => (
        <Number {...defaultProps} register={register} errors={errors} />
      ))
      expect(screen.getByTestId('form-field-numberField')).toBeInTheDocument()
    })

    it('renders label', () => {
      renderForm((register, errors) => (
        <Number {...defaultProps} label="Quantity" register={register} errors={errors} />
      ))
      expect(screen.getByText('Quantity')).toBeInTheDocument()
    })
  })

  describe('input type', () => {
    it('uses type="number"', () => {
      const { container } = renderForm((register, errors) => (
        <Number {...defaultProps} register={register} errors={errors} />
      ))
      const input = container.querySelector('input')
      expect(input?.type).toBe('number')
    })
  })

  describe('required field', () => {
    it('shows required indicator when required is true', () => {
      renderForm((register, errors) => (
        <Number {...defaultProps} required register={register} errors={errors} />
      ))
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('passes required to register', () => {
      const register = vi.fn(() => ({}))
      render(<Number {...defaultProps} required register={register as any} errors={{}} />)
      expect(register).toHaveBeenCalledWith('numberField', { required: true })
    })
  })

  describe('width property', () => {
    it('passes width to FormField', () => {
      const { container } = renderForm((register, errors) => (
        <Number {...defaultProps} width="one-third" register={register} errors={errors} />
      ))
      expect(container).toBeTruthy()
    })
  })

  describe('default value', () => {
    it('uses defaultValue prop', () => {
      const { container } = renderForm((register, errors) => (
        <Number {...defaultProps} defaultValue="42" register={register} errors={errors} />
      ))
      const input = container.querySelector('input') as HTMLInputElement
      expect(input.defaultValue).toBe('42')
    })

    it('handles numeric defaultValue', () => {
      const { container } = renderForm((register, errors) => (
        <Number {...defaultProps} defaultValue={100} register={register} errors={errors} />
      ))
      const input = container.querySelector('input') as HTMLInputElement
      expect(input.defaultValue).toBe('100')
    })
  })

  describe('field name', () => {
    it('uses field name from props', () => {
      const { container } = renderForm((register, errors) => (
        <Number {...defaultProps} name="itemCount" register={register} errors={errors} />
      ))
      const input = container.querySelector('input')
      expect(input?.id).toBe('itemCount')
    })
  })

  describe('error handling', () => {
    it('displays error when field has validation error', () => {
      const mockErrors = { numberField: { message: 'Must be a number' } }

      render(
        <FormHarness>
          {(register) => (
            <Number {...defaultProps} register={register} errors={mockErrors as any} />
          )}
        </FormHarness>,
      )
      expect(screen.getByTestId('error-numberField')).toBeInTheDocument()
    })

    it('does not display error when field is valid', () => {
      renderForm((register, errors) => (
        <Number {...defaultProps} register={register} errors={errors} />
      ))
      expect(screen.queryByTestId('error-numberField')).not.toBeInTheDocument()
    })
  })

  describe('component composition', () => {
    it('properly composes all props', () => {
      const { container } = renderForm((register, errors) => (
        <Number
          name="price"
          label="Price (USD)"
          defaultValue="29.99"
          required
          width="half"
          register={register}
          errors={errors}
        />
      ))
      expect(screen.getByTestId('form-field-price')).toBeInTheDocument()
      expect(screen.getByText('Price (USD)')).toBeInTheDocument()
      const input = container.querySelector('input') as HTMLInputElement
      expect(input.type).toBe('number')
    })
  })
})
