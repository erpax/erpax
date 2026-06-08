import { describe, it, expect } from 'vitest'
import {
  strongerTypeForTextField,
  detectMistypedTextFields,
  checkTextFieldsAreStronglyTyped,
} from './checks'

describe('strict typing — text fields that are really another type (computed static break)', () => {
  it('maps an unambiguous name to its stronger type', () => {
    expect(strongerTypeForTextField('totalAmount')).toBe('number')
    expect(strongerTypeForTextField('qty')).toBe('number')
    expect(strongerTypeForTextField('itemCount')).toBe('number')
    expect(strongerTypeForTextField('dueAt')).toBe('date')
    expect(strongerTypeForTextField('issueDate')).toBe('date')
    expect(strongerTypeForTextField('contactEmail')).toBe('email')
    expect(strongerTypeForTextField('isActive')).toBe('checkbox')
  })

  it('does NOT false-positive on legitimate text names', () => {
    for (const ok of ['name', 'account', 'accountNumber', 'reference', 'emailTemplate', 'amountWords', 'format', 'context', 'island', 'createdAt']) {
      expect(strongerTypeForTextField(ok)).toBeNull()
    }
  })

  it('detects a mistyped field in a collection source, and honours // text-ok', () => {
    const bad = `fields: [\n  { name: 'totalAmount',\n    type: 'text' },\n  { name: 'dueAt',\n    type: 'text' },\n]`
    expect(detectMistypedTextFields(bad)).toEqual([
      { name: 'totalAmount', want: 'number' },
      { name: 'dueAt', want: 'date' },
    ])
    // opt-out comment on the type line suppresses it
    const optedOut = `{ name: 'legacyAmount',\n  type: 'text', // text-ok: imported as string }`
    expect(detectMistypedTextFields(optedOut)).toEqual([])
    // an honest text field is untouched
    expect(detectMistypedTextFields(`{ name: 'reference', type: 'text', unique: true }`)).toEqual([])
  })

  it('the live corpus passes the gate — every text field is honestly text (green by construction)', () => {
    const r = checkTextFieldsAreStronglyTyped({ repoRoot: process.cwd() })
    if (r.severity !== 'pass') console.error('mistyped text fields:', r.offenders)
    expect(r.severity).toBe('pass')
  })
})
