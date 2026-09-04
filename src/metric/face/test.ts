import { describe, expect, it } from 'vitest'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { RECEIPT_BOUNDARY, sealFace, verifyFace, verifyFaceFile, type MetricRow } from '.'

const rows = [
  { key: 'a', claim: 'first', value: '1', command: 'echo 1' },
  { key: 'b', claim: 'second', value: '2', command: 'echo 2' },
  { key: 'c', claim: 'third', value: '3', command: 'echo 3' },
]

describe('metric/face', () => {
  it('seals a row per measurement and folds them to one root', () => {
    const f = sealFace('r', 'd', rows)
    expect(f.rows).toHaveLength(3)
    expect(new Set(f.rows.map((r) => r.receipt)).size).toBe(3)
    expect(f.root).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('verifies from the FILE ALONE — nothing from the emitting tree is needed', () => {
    const f = sealFace('r', 'd', rows)
    const p = join(mkdtempSync(join(tmpdir(), 'erpax-face-')), 'f.json')
    writeFileSync(p, JSON.stringify(f))
    const v = verifyFaceFile(p)
    expect(v.ok).toBe(true)
    expect(v.rows).toBe(3)
  })

  it('a value altered IN TRANSIT fails and names the row', () => {
    const f = sealFace('r', 'd', rows)
    const tampered = { ...f, rows: f.rows.map((r) => (r.key === 'b' ? { ...r, value: '99' } : r)) }
    const v = verifyFace(tampered)
    expect(v.ok).toBe(false)
    expect(v.altered).toEqual(['b'])
  })

  it('a COMMAND altered in transit fails too — the recompute path is part of the claim', () => {
    // Swapping the command while keeping the value is the subtler tamper: the row still reads true
    // and no longer says how to check it.
    const f = sealFace('r', 'd', rows)
    const tampered = { ...f, rows: f.rows.map((r) => (r.key === 'a' ? { ...r, command: 'echo 7' } : r)) }
    expect(verifyFace(tampered).altered).toEqual(['a'])
  })

  it('a row REMOVED changes the root, even though every remaining receipt is untouched', () => {
    const f = sealFace('r', 'd', rows)
    const dropped = { ...f, rows: f.rows.filter((r) => r.key !== 'b') }
    const v = verifyFace(dropped)
    expect(v.ok).toBe(false)
    expect(v.rootComputed).not.toBe(v.rootStated)
  })

  it('one bad row does not condemn the rest — the chain resumes from what is stated', () => {
    const f = sealFace('r', 'd', rows)
    const tampered = { ...f, rows: f.rows.map((r) => (r.key === 'a' ? { ...r, value: '99' } : r)) }
    expect(verifyFace(tampered).altered).toEqual(['a'])
  })

  it('carries the boundary IN THE VERDICT, so it cannot be dropped in transit', () => {
    // Quoting a row because its receipt checked out is the mistake this file exists to prevent.
    const v = verifyFace(sealFace('r', 'd', rows))
    expect(v.boundary).toBe(RECEIPT_BOUNDARY)
    expect(v.boundary).toContain('does not make the figure correct')
  })

  it('refuses a file with no rows rather than passing an empty face', () => {
    const p = join(mkdtempSync(join(tmpdir(), 'erpax-face-')), 'f.json')
    writeFileSync(p, JSON.stringify({ repo: 'r', definition: 'd', root: 'x' }))
    expect(() => verifyFaceFile(p)).toThrow(/carries no rows/)
  })

  it('the receipt covers the row and not itself', () => {
    const f = sealFace('r', 'd', rows)
    const restated: MetricRow[] = f.rows.map((r) => ({ ...r }))
    expect(verifyFace({ ...f, rows: restated }).ok).toBe(true)
  })
})
