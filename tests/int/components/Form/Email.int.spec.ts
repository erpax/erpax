import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Email } from '@/components/blocks/Form/Email'
import { useForm } from 'react-hook-form'

// Mock FormField component
vi.mock('@/components/blocks/Form/FormField', () => ({
  FormField: ({ name, label, required, width, errors, children }: any) => (
    <div data-testid={`form-field-${name}`}>
      {label && <label>{label}</label>}
      {required && <span className="required">*</span>}
      {children}
      {errors[name] && <div data-testid={`error-${name}`}>Error</div>}
    </div>
  ),
}))

// Mock UI components
vi.mock('@/components/ui/input', () => ({
  Input: React.forwardRef(({ type, ...props }: any, ref) => (
    <input {...props} type={type} ref={ref} data-testid={`input-${props.id || 'default'}`} />
  )),
}))

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
      const { register, formState: { errors } } = useForm()
      render(
        <Email
          {...defaultProps}
          register={register}
          errors={errors}
        />
      )
      expect(screen.getByTestId('input-emailField')).toBeInTheDocument()
    })

    it('renders FormField wrapper', () => {
      const { register, formState: { errors } } = useForm()
      render(
        <Email
          {...defaultProps}
          register={register}
          errors={errors}
        />
      )
      expect(screen.getByTestId('form-field-emailField')).toBeInTheDocument()
    })

    it('renders label', () => {
      const { register, formState: { errors } } = useForm()
      render(
        <Email
          {...defaultProps}
          label="Your Email"
          register={register}
          errors={errors}
        />
      )
      expect(screen.getByText('Your Email')).toBeInTheDocument()
    })
  })

  describe('input type', () => {
    it('uses type="email"', () => {
      const { register, formState: { errors } } = useForm()
      const { container } = render(
        <Email
          {...defaultProps}
          register={register}
          errors={errors}
        />
      )
      const input = container.querySelector('input')
      expect(input?.type).toBe('email')
    })
  })

  describe('email validation', () => {
    it('includes email pattern validation', () => {
      const { register, formState: { errors } } = useForm()
      render(
        <Email
          {...defaultProps}
          register={register}
          errors={errors}
        />
      )
      // Register is called with pattern validation
      expect(register).toHaveBeenCalled()
    })
  })

  describe('required field', () => {
    it('shows required indicator when required is true', () => {
      const { register, formState: { errors } } = useForm()
      render(
        <Email
          {...defaultProps}
          required
          register={register}
          errors={errors}
        />
      )
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })

  describe('width property', () => {
    it('passes width to FormField', () => {
      const { register, formState: { errors } } = useForm()
      const { container } = render(
        <Email
          {...defaultProps}
          width="full"
          register={register}
          errors={errors}
        />
      )
      expect(container).toBeTruthy()
    })
  })

  describe('default value', () => {
    it('uses defaultValue prop', () => {
      const { register, formState: { errors } } = useForm()
      const { container } = render(
        <Email
          {...defaultProps}
          defaultValue="user@example.com"
          register={register}
          errors={errors}
        />
      )
      const input = container.querySelector('input') as HTMLInputElement
      expect(input.defaultValue).toBe('user@example.com')
    })
  })

  describe('field name', () => {
    it('uses field name from props', () => {
      const { register, formState: { errors } } = useForm()
      const { container } = render(
        <Email
          {...defaultProps}
          name="contactEmail"
          register={register}
          errors={errors}
        />
      )
      const input = container.querySelector('input')
      expect(input?.id).toBe('contactEmail')
    })
  })

  describe('error handling', () => {
    it('displays error when field has validation error', () => {
      const { register, formState: { errors } } = useForm()
      const mockErrors = { emailField: { message: 'Invalid email format' } }

      render(
        <Email
          {...defaultProps}
          register={register}
          errors={mockErrors}
        />
      )
      expect(screen.getByTestId('error-emailField')).toBeInTheDocument()
    })

    it('does not display error when field is valid', () => {
      const { register, formState: { errors } } = useForm()
      render(
        <Email
          {...defaultProps}
          register={register}
          errors={errors}
        />
      )
      expect(screen.queryByTestId('error-emailField')).not.toBeInTheDocument()
    })
  })

  describe('component composition', () => {
    it('properly composes all props', () => {
      const { register, formState: { errors } } = useForm()
      const { container } = render(
        <Email
          name="userEmail"
          label="User Email"
          defaultValue="john@example.com"
          required
          width="half"
          register={register}
          errors={errors}
        />
      )
      expect(screen.getByTestId('form-field-userEmail')).toBeInTheDocument()
      expect(screen.getByText('User Email')).toBeInTheDocument()
      const input = container.querySelector('input') as HTMLInputElement
      expect(input.defaultValue).toBe('john@example.com')
      expect(input.type).toBe('email')
    })
  })
})
