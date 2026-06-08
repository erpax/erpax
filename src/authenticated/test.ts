/**
 * `authenticated` access predicate tests — grants iff `req.user` exists.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.5 secure-authentication
 * @see docs/STANDARDS.md §4.4 §7
 */

import type { AccessArgs } from 'payload'

import { describe, it, expect } from 'vitest'

import type { User } from '@/types'

import { authenticated, controlsApplied } from '@/authenticated'

// Minimal `{ req: { user } }`-shaped arg — only the field the predicate reads.
function args(user: Partial<User> | null | undefined): AccessArgs<User> {
  return { req: { user } } as unknown as AccessArgs<User>
}

describe('authenticated', () => {
  it('denies anonymous callers (no user)', () => {
    expect(authenticated(args(null))).toBe(false)
    expect(authenticated(args(undefined))).toBe(false)
  })

  it('grants authenticated callers (user present)', () => {
    expect(authenticated(args({ id: '1', email: 'ceci@psg.bg' }))).toBe(true)
  })

  it('declares access, identity and authentication controls', () => {
    expect(controlsApplied).toEqual(['5.15', '5.16', '8.5'])
  })
})
