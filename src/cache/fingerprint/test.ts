import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, utimesSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { corpusFingerprint, memoByFingerprint, memoByFingerprintOnDisk, clearFingerprintMemos } from './index'

// The fingerprint memo — verified on a hermetic fixture tree (never the real corpus).
describe('cache/fingerprint — reuse the whole-corpus scan, never re-derive', () => {
  const fixture = (): string => {
    const dir = mkdtempSync(join(tmpdir(), 'fp-'))
    const a = join(dir, 'src', 'alpha')
    mkdirSync(a, { recursive: true })
    writeFileSync(join(a, 'index.ts'), 'export const a = 1\n')
    return dir
  }

  it('an unchanged tree fingerprints identically — a stable hit key', () => {
    const cwd = fixture()
    try {
      expect(corpusFingerprint(cwd)).toBe(corpusFingerprint(cwd))
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('memoByFingerprint runs compute ONCE per fingerprint — siblings reuse', () => {
    const cwd = fixture()
    clearFingerprintMemos()
    try {
      let ran = 0
      const call = (): number => memoByFingerprint('demo', cwd, () => ++ran)
      expect(call()).toBe(1)
      expect(call()).toBe(1) // reuse — compute did not run again
      expect(ran).toBe(1)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('an edit bumps the mtime ⇒ the memo re-derives (never serves stale data)', () => {
    const cwd = fixture()
    clearFingerprintMemos()
    try {
      let ran = 0
      const call = (): number => memoByFingerprint('demo', cwd, () => ++ran)
      call()
      // bump the newest mtime into the future — the fingerprint changes
      utimesSync(join(cwd, 'src', 'alpha', 'index.ts'), new Date(), new Date(Date.now() + 10_000))
      expect(call()).toBe(2) // re-derived
      expect(ran).toBe(2)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('memoByFingerprintOnDisk shares across processes — a fresh memo reads the written file', () => {
    const cwd = fixture()
    mkdirSync(join(cwd, 'node_modules'), { recursive: true })
    clearFingerprintMemos()
    try {
      let ran = 0
      // first "process" computes and writes the disk cache
      expect(memoByFingerprintOnDisk('serial', cwd, () => ({ n: ++ran }))).toEqual({ n: 1 })
      // simulate a SEPARATE process: no in-process memo, but the disk file resonates ⇒ no recompute
      clearFingerprintMemos()
      expect(memoByFingerprintOnDisk('serial', cwd, () => ({ n: ++ran }))).toEqual({ n: 1 })
      expect(ran).toBe(1) // compute ran once across both "processes"
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('cwd is part of the key — a fixture tree never collides with another', () => {
    const a = fixture()
    const b = fixture()
    clearFingerprintMemos()
    try {
      memoByFingerprint('demo', a, () => 'A')
      expect(memoByFingerprint('demo', b, () => 'B')).toBe('B') // different cwd ⇒ own entry
    } finally {
      rmSync(a, { recursive: true, force: true })
      rmSync(b, { recursive: true, force: true })
    }
  })
})
