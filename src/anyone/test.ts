/**
 * `anyone` access predicate tests — public-read always grants.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @security ISO-27002 §5.15 access-control intentional-public-read
 * @see docs/STANDARDS.md §4.4 §7
 */

import type { Access } from 'payload'

import { describe, it, expect } from 'vitest'

import { anyone, controlsApplied } from '@/anyone'

// Minimal `{ req: { user } }`-shaped arg — only the shape the predicate reads.
function args(user: unknown): Parameters<Access>[0] {
  return { req: { user } } as unknown as Parameters<Access>[0]
}

describe('anyone', () => {
  it('grants to anonymous callers (no user)', () => {
    expect(anyone(args(null))).toBe(true)
    expect(anyone(args(undefined))).toBe(true)
  })

  it('grants to authenticated callers too', () => {
    expect(anyone(args({ id: 1, email: 'ceci@psg.bg' }))).toBe(true)
  })

  it('grants with no args at all (Access Operation)', () => {
    expect((anyone as () => boolean)()).toBe(true)
  })

  it('declares the intentional public-read control (5.15)', () => {
    expect(controlsApplied).toEqual(['5.15'])
  })
})
