/** @vitest-environment jsdom */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Email } from '@/components/blocks/Form/Email'

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

describe('Email Form Field', () => {
  const defaultProps = {
    name: 'emailField',
    label: 'Email Address',
    defaultValue: '',
    required: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders email input', () => {
      renderForm((register, errors) => (
        <Email {...defaultProps} register={register} errors={errors} />
      ))
      expect(screen.getByTestId('input-emailField')).toBeInTheDocument()
    })

    it('renders FormField wrapper', () => {
      renderForm((register, errors) => (
        <Email {...defaultProps} register={register} errors={errors} />
      ))
      expect(screen.getByTestId('form-field-emailField')).toBeInTheDocument()
    })

    it('renders label', () => {
      renderForm((register, errors) => (
        <Email {...defaultProps} label="Your Email" register={register} errors={errors} />
      ))
      expect(screen.getByText('Your Email')).toBeInTheDocument()
    })
  })

  describe('input type', () => {
    it('uses type="email"', () => {
      const { container } = renderForm((register, errors) => (
        <Email {...defaultProps} register={register} errors={errors} />
      ))
      const input = container.querySelector('input')
      expect(input?.type).toBe('email')
    })
  })

  describe('email validation', () => {
    it('renders input suitable for email entry', () => {
      renderForm((register, errors) => (
        <Email {...defaultProps} register={register} errors={errors} />
      ))
      expect(screen.getByTestId('input-emailField')).toHaveAttribute('type', 'email')
    })
  })

  describe('required field', () => {
    it('shows required indicator when required is true', () => {
      renderForm((register, errors) => (
        <Email {...defaultProps} required register={register} errors={errors} />
      ))
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })

  describe('width property', () => {
    it('passes width to FormField', () => {
      const { container } = renderForm((register, errors) => (
        <Email {...defaultProps} width="full" register={register} errors={errors} />
      ))
      expect(container).toBeTruthy()
    })
  })

  describe('default value', () => {
    it('uses defaultValue prop', () => {
      const { container } = renderForm((register, errors) => (
        <Email
          {...defaultProps}
          defaultValue="user@example.com"
          register={register}
          errors={errors}
        />
      ))
      const input = container.querySelector('input') as HTMLInputElement
      expect(input.defaultValue).toBe('user@example.com')
    })
  })

  describe('field name', () => {
    it('uses field name from props', () => {
      const { container } = renderForm((register, errors) => (
        <Email {...defaultProps} name="contactEmail" register={register} errors={errors} />
      ))
      const input = container.querySelector('input')
      expect(input?.id).toBe('contactEmail')
    })
  })

  describe('error handling', () => {
    it('displays error when field has validation error', () => {
      const mockErrors = { emailField: { message: 'Invalid email format' } }

      render(
        <FormHarness>
          {(register) => (
            <Email {...defaultProps} register={register} errors={mockErrors as any} />
          )}
        </FormHarness>,
      )
      expect(screen.getByTestId('error-emailField')).toBeInTheDocument()
    })

    it('does not display error when field is valid', () => {
      renderForm((register, errors) => (
        <Email {...defaultProps} register={register} errors={errors} />
      ))
      expect(screen.queryByTestId('error-emailField')).not.toBeInTheDocument()
    })
  })

  describe('component composition', () => {
    it('properly composes all props', () => {
      const { container } = renderForm((register, errors) => (
        <Email
          name="userEmail"
          label="User Email"
          defaultValue="john@example.com"
          required
          width="half"
          register={register}
          errors={errors}
        />
      ))
      expect(screen.getByTestId('form-field-userEmail')).toBeInTheDocument()
      expect(screen.getByText('User Email')).toBeInTheDocument()
      const input = container.querySelector('input') as HTMLInputElement
      expect(input.defaultValue).toBe('john@example.com')
      expect(input.type).toBe('email')
    })
  })
})
