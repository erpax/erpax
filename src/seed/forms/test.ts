import { describe, it, expect } from 'vitest'
import type { Field } from 'payload'
import { formOf, survives } from '@/seed/forms'

const of = (fields: Field[]) => formOf({ slug: 'risk-register', fields })

describe('formOf — a collection\'s field list as a form-builder form', () => {
  it('carries the types the form builder has a block for, with name, label, required and a static default', () => {
    const { form, kept } = of([
      { name: 'title', type: 'text', required: true },
      { name: 'riskScore', type: 'number', defaultValue: 0 },
      { name: 'isMaterial', type: 'checkbox', defaultValue: false },
      { name: 'identifiedOn', type: 'date' },
      { name: 'owner', type: 'email' },
      { name: 'notes', type: 'textarea' },
    ])
    expect(form.title).toBe('Risk register')
    expect(form.fields.map((b) => b.blockType)).toEqual(['text', 'number', 'checkbox', 'date', 'email', 'textarea'])
    expect(form.fields[0]).toEqual({ blockType: 'text', name: 'title', blockName: 'title', label: 'Title', required: true, width: 100 })
    expect(form.fields[1]).toMatchObject({ name: 'riskScore', label: 'Risk Score', required: false, defaultValue: 0 })
    expect(form.fields[2]).toMatchObject({ defaultValue: false })
    expect(kept).toBe(6)
  })
  it('a select and a radio keep their options, strings and objects alike', () => {
    const { form } = of([
      { name: 'severity', type: 'select', options: ['low', { label: 'Very high', value: 'very-high' }] },
      { name: 'kind', type: 'radio', options: ['a'] },
    ])
    expect(form.fields[0]).toMatchObject({ blockType: 'select', options: [{ label: 'Low', value: 'low' }, { label: 'Very high', value: 'very-high' }] })
    expect(form.fields[1]).toMatchObject({ blockType: 'radio', options: [{ label: 'A', value: 'a' }] })
  })
  it('a group flattens into its fields; rows, collapsibles and unnamed tabs add no segment', () => {
    const { form, report } = of([
      { name: 'metrics', type: 'group', fields: [{ name: 'onTime', type: 'number' }] },
      { type: 'row', fields: [{ name: 'a', type: 'text' }] },
      { type: 'tabs', tabs: [{ label: 'T', fields: [{ name: 'b', type: 'text' }] }, { name: 'meta', fields: [{ name: 'c', type: 'text' }] }] },
    ])
    expect(form.fields.map((b) => b.name)).toEqual(['metrics_onTime', 'a', 'b', 'meta_c'])
    expect(report.map((r) => r.path)).toEqual(['metrics.onTime', 'a', 'b', 'meta.c'])
  })
})

describe('formOf — it says what a form cannot carry', () => {
  it('a reference, repeating rows and JSON are lost, each with its reason', () => {
    const { form, report, lost } = of([
      { name: 'vendor', type: 'relationship', relationTo: 'parties' },
      { name: 'lines', type: 'array', fields: [{ name: 'x', type: 'text' }] },
      { name: 'meta', type: 'json' },
      { name: 'entries', type: 'join', collection: 'x', on: 'y' } as unknown as Field,
    ])
    expect(form.fields).toEqual([])
    expect(lost).toBe(4)
    expect(report.map((r) => [r.path, r.fate, r.missing[0]])).toEqual([
      ['vendor', 'lost', 'a reference to another document'],
      ['lines', 'lost', 'repeating rows'],
      ['meta', 'lost', 'structured JSON'],
      ['entries', 'lost', 'a computed list of related documents'],
    ])
  })
  it('a field whose rules go beyond "required" is degraded, and names each rule it loses', () => {
    const { report, degraded } = of([
      { name: 'reference', type: 'text', required: true, unique: true },
      { name: 'rate', type: 'number', min: 0, max: 100 },
      { name: 'currency', type: 'text', validate: (() => true) as never },
      { name: 'tags', type: 'select', hasMany: true, options: ['a'] },
      { name: 'when', type: 'date', defaultValue: () => new Date().toISOString() },
      { name: 'total', type: 'number', admin: { readOnly: true } },
      { name: 'body', type: 'richText' },
    ])
    expect(degraded).toBe(7)
    const missing = Object.fromEntries(report.map((r) => [r.path, r.missing]))
    expect(missing.reference).toEqual(['unique'])
    expect(missing.rate).toEqual(['min / max'])
    expect(missing.currency).toEqual(['a validate function'])
    expect(missing.tags).toEqual(['multiple values'])
    expect(missing.when).toEqual(['a computed default'])
    expect(missing.total).toEqual(['read-only'])
    expect(missing.body).toEqual(['rich-text formatting (stored as plain text)'])
  })
  it('survives only when every field is kept whole', () => {
    expect(survives(of([{ name: 'title', type: 'text', required: true }]))).toBe(true)
    expect(survives(of([{ name: 'title', type: 'text', unique: true }]))).toBe(false)
    expect(survives(of([{ name: 'vendor', type: 'relationship', relationTo: 'parties' }]))).toBe(false)
  })
})
