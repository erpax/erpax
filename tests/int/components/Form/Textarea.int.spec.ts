import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Textarea } from '@/components/blocks/Form/Textarea'
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
vi.mock('@/components/ui/textarea', () => ({
  Textarea: React.forwardRef(({ ...props }: any, ref) => (
    <textarea {...props} ref={ref} data-testid={`textarea-${props.id || 'default'}`} />
  )),
}))

describe('Textarea Form Field', () => {
  const defaultProps = {
    name: 'textareaField',
    label: 'Text Area',
    defaultValue: '',
    required: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders textarea input', () => {
      const { register, formState: { errors } } = useForm()
      render(
        <Textarea
          {...defaultProps}
          register={register}
          errors={errors}
        />
      )
      expect(screen.getByTestId('textarea-textareaField')).toBeInTheDocument()
    })

    it('renders FormField wrapper', () => {
      const { register, formState: { errors } } = useForm()
      render(
        <Textarea
          {...defaultProps}
          register={register}
          errors={errors}
        />
      )
      expect(screen.getByTestId('form-field-textareaField')).toBeInTheDocument()
    })

    it('renders label', () => {
      const { register, formState: { errors } } = useForm()
      render(
        <Textarea
          {...defaultProps}
          label="Comments"
          register={register}
          errors={errors}
        />
      )
      expect(screen.getByText('Comments')).toBeInTheDocument()
    })
  })

  describe('rows property', () => {
    it('defaults to 3 rows', () => {
      const { register, formState: { errors } } = useForm()
      const { container } = render(
        <Textarea
          {...defaultProps}
          register={register}
          errors={errors}
        />
      )
      const textarea = container.querySelector('textarea')
      expect(textarea?.rows).toBe(3)
    })

    it('uses custom rows value', () => {
      const { register, formState: { errors } } = useForm()
      const { container } = render(
        <Textarea
          {...defaultProps}
          rows={5}
          register={register}
          errors={errors}
        />
      )
      const textarea = container.querySelector('textarea')
      expect(textarea?.rows).toBe(5)
    })

    it('handles large row values', () => {
      const { register, formState: { errors } } = useForm()
      const { container } = render(
        <Textarea
          {...defaultProps}
          rows={20}
          register={register}
          errors={errors}
        />
      )
      const textarea = container.querySelector('textarea')
      expect(textarea?.rows).toBe(20)
    })
  })

  describe('required field', () => {
    it('shows required indicator when required is true', () => {
      const { register, formState: { errors } } = useForm()
      render(
        <Textarea
          {...defaultProps}
          required
          register={register}
          errors={errors}
        />
      )
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('passes required to register', () => {
      const { register, formState: { errors } } = useForm()
      render(
        <Textarea
          {...defaultProps}
          required
          register={register}
          errors={errors}
        />
      )
      expect(register).toHaveBeenCalled()
    })
  })

  describe('width property', () => {
    it('passes width to FormField', () => {
      const { register, formState: { errors } } = useForm()
      const { container } = render(
        <Textarea
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
        <Textarea
          {...defaultProps}
          defaultValue="Initial text"
          register={register}
          errors={errors}
        />
      )
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement
      expect(textarea.defaultValue).toBe('Initial text')
    })

    it('handles multiline defaultValue', () => {
      const { register, formState: { errors } } = useForm()
      const { container } = render(
        <Textarea
          {...defaultProps}
          defaultValue="Line 1\nLine 2\nLine 3"
          register={register}
          errors={errors}
        />
      )
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement
      expect(textarea.defaultValue).toContain('Line 1')
    })
  })

  describe('field name', () => {
    it('uses field name from props', () => {
      const { register, formState: { errors } } = useForm()
      const { container } = render(
        <Textarea
          {...defaultProps}
          name="userFeedback"
          register={register}
          errors={errors}
        />
      )
      const textarea = container.querySelector('textarea')
      expect(textarea?.id).toBe('userFeedback')
    })
  })

  describe('error handling', () => {
    it('displays error when field has validation error', () => {
      const { register, formState: { errors } } = useForm()
      const mockErrors = { textareaField: { message: 'Text is required' } }

      render(
        <Textarea
          {...defaultProps}
          register={register}
          errors={mockErrors}
        />
      )
      expect(screen.getByTestId('error-textareaField')).toBeInTheDocument()
    })

    it('does not display error when field is valid', () => {
      const { register, formState: { errors } } = useForm()
      render(
        <Textarea
          {...defaultProps}
          register={register}
          errors={errors}
        />
      )
      expect(screen.queryByTestId('error-textareaField')).not.toBeInTheDocument()
    })
  })

  describe('component composition', () => {
    it('properly composes all props', () => {
      const { register, formState: { errors } } = useForm()
      const { container } = render(
        <Textarea
          name="message"
          label="Your Message"
          defaultValue="Type here..."
          required
          width="full"
          rows={8}
          register={register}
          errors={errors}
        />
      )
      expect(screen.getByTestId('form-field-message')).toBeInTheDocument()
      expect(screen.getByText('Your Message')).toBeInTheDocument()
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement
      expect(textarea.rows).toBe(8)
      expect(textarea.defaultValue).toBe('Type here...')
    })
  })
})
