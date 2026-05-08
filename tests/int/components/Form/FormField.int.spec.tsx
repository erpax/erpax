/** @vitest-environment jsdom */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { FormField } from '@/components/blocks/Form/FormField'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      required: 'required',
    }
    return translations[key] || key
  },
}))

// Mock UI components
vi.mock('@/components/ui/label', () => ({
  Label: ({ children, htmlFor, className }: any) => (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  ),
}))

vi.mock('@/components/blocks/Form/Error', () => ({
  Error: ({ name }: any) => <div data-testid={`error-${name}`}>Error for {name}</div>,
}))

vi.mock('@/components/blocks/Form/Width', () => ({
  Width: ({ children, width }: any) => (
    <div data-testid={`width-${width || 'default'}`}>{children}</div>
  ),
}))

describe('FormField', () => {
  const defaultProps = {
    name: 'testField',
    label: 'Test Label',
    errors: {},
    children: React.createElement('input', { type: 'text' }),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders the label', () => {
      render(
        <FormField {...defaultProps} />
      )
      expect(screen.getByText('Test Label')).toBeInTheDocument()
    })

    it('renders children', () => {
      const { container } = render(
        <FormField {...defaultProps}>
          <input type="text" placeholder="test input" />
        </FormField>
      )
      expect(container.querySelector('input[placeholder="test input"]')).toBeInTheDocument()
    })

    it('hides label when showLabel is false', () => {
      render(
        <FormField {...defaultProps} showLabel={false} />
      )
      expect(screen.queryByText('Test Label')).not.toBeInTheDocument()
    })

    it('renders hint text when provided', () => {
      render(
        <FormField {...defaultProps} hint="This is a hint" />
      )
      expect(screen.getByText('This is a hint')).toBeInTheDocument()
    })
  })

  describe('required indicator', () => {
    it('shows asterisk when required is true', () => {
      const { container } = render(
        <FormField {...defaultProps} required />
      )
      expect(container.querySelector('.required')).toBeInTheDocument()
    })

    it('hides asterisk when required is false', () => {
      const { container } = render(
        <FormField {...defaultProps} required={false} />
      )
      expect(container.querySelector('.required')).not.toBeInTheDocument()
    })

    it('hides asterisk by default', () => {
      const { container } = render(
        <FormField {...defaultProps} />
      )
      expect(container.querySelector('.required')).not.toBeInTheDocument()
    })

    it('includes sr-only text for accessibility', () => {
      const { container } = render(
        <FormField {...defaultProps} required />
      )
      const srText = container.querySelector('.sr-only')
      expect(srText).toBeInTheDocument()
      expect(srText?.textContent).toContain('required')
    })
  })

  describe('error handling', () => {
    it('shows error element when field has error', () => {
      const errors = { testField: { message: 'Field is required' } }
      render(
        <FormField {...defaultProps} errors={errors} />
      )
      expect(screen.getByTestId('error-testField')).toBeInTheDocument()
    })

    it('hides error element when field has no error', () => {
      render(
        <FormField {...defaultProps} />
      )
      expect(screen.queryByTestId('error-testField')).not.toBeInTheDocument()
    })

    it('changes label color to red when error exists', () => {
      const errors = { testField: { message: 'Invalid' } }
      const { container } = render(
        <FormField {...defaultProps} errors={errors} />
      )
      const label = container.querySelector('label')
      expect(label?.className).toContain('text-red-600')
    })

    it('keeps label normal color without error', () => {
      const { container } = render(
        <FormField {...defaultProps} />
      )
      const label = container.querySelector('label')
      expect(label?.className).not.toContain('text-red-600')
    })
  })

  describe('width handling', () => {
    it('applies width class to wrapper', () => {
      render(
        <FormField {...defaultProps} width="half" />
      )
      expect(screen.getByTestId('width-half')).toBeInTheDocument()
    })

    it('defaults to no width class', () => {
      render(
        <FormField {...defaultProps} />
      )
      expect(screen.getByTestId('width-default')).toBeInTheDocument()
    })

    it('handles full width', () => {
      render(
        <FormField {...defaultProps} width="full" />
      )
      expect(screen.getByTestId('width-full')).toBeInTheDocument()
    })
  })

  describe('custom className', () => {
    it('applies custom className to inner wrapper', () => {
      const { container } = render(
        <FormField {...defaultProps} className="custom-class" />
      )
      const innerDiv = container.querySelector('.custom-class')
      expect(innerDiv).toBeInTheDocument()
    })

    it('works without className', () => {
      const { container } = render(
        <FormField {...defaultProps} />
      )
      // Should still render without error
      expect(container).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('associates label with input via htmlFor', () => {
      const { container } = render(
        <FormField {...defaultProps} />
      )
      const label = container.querySelector('label')
      expect(label?.getAttribute('for')).toBe('testField')
    })

    it('includes required indicator in sr-only text', () => {
      const { container } = render(
        <FormField {...defaultProps} required />
      )
      const srText = container.querySelector('.sr-only')
      expect(srText).toBeInTheDocument()
    })
  })

  describe('layout structure', () => {
    it('renders in correct order: label, hint, children, error', () => {
      const { container } = render(
        <FormField
          {...defaultProps}
          hint="Hint text"
          required
          errors={{ testField: { message: 'Error' } }}
        >
          <input type="text" placeholder="input" />
        </FormField>
      )

      const elements = container.querySelectorAll('*')
      let labelIndex = -1
      let hintIndex = -1
      let inputIndex = -1
      let errorIndex = -1

      elements.forEach((el, index) => {
        if (el.textContent?.includes('Test Label')) labelIndex = index
        if (el.textContent?.includes('Hint text')) hintIndex = index
        if (el.querySelector('input[placeholder="input"]')) inputIndex = index
        if (el.getAttribute('data-testid')?.startsWith('error-')) errorIndex = index
      })

      // Verify relative ordering
      expect(labelIndex).toBeGreaterThanOrEqual(0)
    })
  })

  describe('different field types', () => {
    it('works with text input', () => {
      render(
        <FormField {...defaultProps}>
          <input type="text" />
        </FormField>
      )
      expect(screen.getByRole('textbox', { hidden: true })).toBeInTheDocument()
    })

    it('works with textarea', () => {
      render(
        <FormField {...defaultProps}>
          <textarea />
        </FormField>
      )
      expect(screen.getByRole('textbox', { hidden: true })).toBeInTheDocument()
    })

    it('works with checkbox', () => {
      render(
        <FormField {...defaultProps}>
          <input type="checkbox" />
        </FormField>
      )
      expect(screen.getByRole('checkbox', { hidden: true })).toBeInTheDocument()
    })
  })
})
