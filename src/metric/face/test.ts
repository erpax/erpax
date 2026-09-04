import { describe, expect, it } from 'vitest'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import { ERPAX_PROTOCOL, RECEIPT_BOUNDARY, sealFace, verifyFace, verifyFaceFile, type MetricRow } from '.'

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

  it('a face sealed by ANOTHER formula reads different-convention, never tampering', () => {
    // A sibling's survey reported this corpus's face as tampered — all fourteen rows and the root —
    // because our preimages differ. Every row failing at once is the signature of another formula;
    // tampering changes one row or two. Without this verdict a checker built to stop false reports
    // emits one.
    const theirs = {
      repo: 'other',
      protocol: { ...ERPAX_PROTOCOL, id: 'millennium/metric-face/1', covers: ['key', 'claim', 'value'] },
      definition: 'd',
      rows: rows.map((r) => ({
        ...r,
        // their formula: toUuid(key + LF + claim + LF + value), unchained
        receipt: createHash('sha256').update(`${r.key}\n${r.claim}\n${r.value}`).digest('hex').slice(0, 36),
      })),
      root: 'not-ours',
    }
    const v = verifyFace(theirs as never)
    expect(v.state).toBe('different-convention')
    expect(v.ok).toBe(false)
    // and it does NOT accuse: no row is named as altered
    expect(v.altered).toEqual([])
  })

  it('infers the same for an UNDECLARED face where every row fails', () => {
    const f = sealFace('r', 'd', rows)
    const undeclared = { ...f, protocol: undefined, rows: f.rows.map((r) => ({ ...r, receipt: 'x' })) }
    expect(verifyFace(undeclared as never).state).toBe('different-convention')
  })

  it('one bad row is still ALTERED — the discriminator must not launder real tampering', () => {
    const f = sealFace('r', 'd', rows)
    const tampered = { ...f, rows: f.rows.map((r) => (r.key === 'b' ? { ...r, value: '99' } : r)) }
    const v = verifyFace(tampered)
    expect(v.state).toBe('altered')
    expect(v.altered).toEqual(['b'])
  })

  it('declares its own formula, so a checker reads it instead of guessing', () => {
    const f = sealFace('r', 'd', rows)
    expect(f.protocol?.id).toBe('erpax/metric-face/1')
    expect(f.protocol?.covers).toContain('command')
    expect(f.protocol?.chained).toBe(true)
  })

  it('the receipt covers the row and not itself', () => {
    const f = sealFace('r', 'd', rows)
    const restated: MetricRow[] = f.rows.map((r) => ({ ...r }))
    expect(verifyFace({ ...f, rows: restated }).ok).toBe(true)
  })
})
