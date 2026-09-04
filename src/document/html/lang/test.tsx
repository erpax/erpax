// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { atomAddress } from '@/atom/address'
import { DocumentHtmlLang } from './index'

describe('document/html/lang', () => {
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('document/html/lang')
  })

  it('WCAG 3.1.1 — sets the document language from the active locale', () => {
    render(<DocumentHtmlLang locale="bg" />)
    expect(document.documentElement.lang).toBe('bg')
  })

  it('FOLLOWS a locale change — a stale lang is the failure nobody can see', () => {
    const { rerender } = render(<DocumentHtmlLang locale="bg" />)
    rerender(<DocumentHtmlLang locale="de" />)
    expect(document.documentElement.lang).toBe('de')
  })

  it('renders nothing — it is behaviour, not markup', () => {
    const { container } = render(<DocumentHtmlLang locale="en" />)
    expect(container.innerHTML).toBe('')
  })
})
