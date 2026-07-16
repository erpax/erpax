import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { bareAsks, assertAsksBounded } from './index'

const collection = (body: string): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-ask-'))
  mkdirSync(join(cwd, 'src/thing'), { recursive: true })
  writeFileSync(join(cwd, 'src/thing/index.ts'), `const C = {\n  slug: 'things',\n  fields: [\n${body}\n  ],\n}\n`)
  return cwd
}

describe('rules/ask — a question the law already answers is not a question', () => {
  it('flags a required field with nothing computed for it — the human types', () => {
    const cwd = collection("    { name: 'reference', type: 'text', required: true },")
    const r = bareAsks(cwd)
    expect(r.bare.map((b) => b.field)).toEqual(['reference'])
    expect(r.required).toBe(1)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a predefined value is NOT an ask — the user confirms', () => {
    // a VAT rate is fixed by ЗДДС; a currency is the tenant's — derivations wearing a question's clothes
    const cwd = collection("    { name: 'currency', type: 'text', required: true, defaultValue: 'BGN' },")
    const r = bareAsks(cwd)
    expect(r.bare).toHaveLength(0)
    expect(r.answered).toBe(1)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a computed value is NOT an ask — readOnly means the system already knows', () => {
    const cwd = collection("    { name: 'unp', type: 'text', required: true, admin: { readOnly: true } },")
    expect(bareAsks(cwd).bare).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('nor is a HIDDEN computed value — `disabled: true` is stamped by a hook, never typed', () => {
    // financial-statements.generatedAt is auto-stamped and disabled; the scan read it as a bare ask
    const cwd = collection("    { name: 'generatedAt', type: 'date', required: true, admin: { disabled: true } },")
    expect(bareAsks(cwd).bare).toHaveLength(0)
    expect(bareAsks(cwd).answered).toBe(1)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('an OPTIONAL field is not an ask — nothing is demanded', () => {
    const cwd = collection("    { name: 'note', type: 'textarea' },")
    const r = bareAsks(cwd)
    expect(r.required).toBe(0)
    expect(r.bare).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('separates the irreducible ask from the answered one in the same collection', () => {
    const cwd = collection(
      "    { name: 'quantity', type: 'number', required: true },\n" + // the user's INTENT — must stay
        "    { name: 'currency', type: 'text', required: true, defaultValue: 'BGN' },", // the law's — computed
    )
    const r = bareAsks(cwd)
    expect(r.bare.map((b) => b.field)).toEqual(['quantity'])
    expect(r.answered).toBe(1)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the gate ratchets — the asks may not grow', () => {
    const cwd = collection("    { name: 'reference', type: 'text', required: true },")
    expect(() => assertAsksBounded(cwd, 1)).not.toThrow()
    expect(() => assertAsksBounded(cwd, 0)).toThrow(/bare ask/)
    rmSync(cwd, { recursive: true, force: true })
  })
})
