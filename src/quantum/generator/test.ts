/**
 * quantum/generator — manifest pre-existing addresses by collapse.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { manifest, sameManifest } from '@/quantum/generator'

describe('quantum/generator — generate all, manifest one', () => {
  it('manifest is deterministic — same content ⇒ same uuid', () => {
    expect(manifest('merge')).toBe(manifest('merge'))
    expect(manifest('merge')).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('sameManifest holds merge law — no duplicate identities', () => {
    expect(sameManifest('a', 'a')).toBe(true)
    expect(sameManifest('a', 'b')).toBe(false)
  })
})
