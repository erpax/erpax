/**
 * `authenticatedOrPublished` access predicate tests — auth users get full
 * access (`true`); anonymous callers are filtered to published rows only.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.3 information-access-restriction
 * @see docs/STANDARDS.md §4.4 §7
 */

import type { Access } from 'payload'

import { describe, it, expect } from 'vitest'

import { wherePublished } from '@/scope'

import { authenticatedOrPublished, controlsApplied } from '@/authenticated/or/published'

// Minimal `{ req: { user } }`-shaped arg — only the field the predicate reads.
function args(user: unknown): Parameters<Access>[0] {
  return { req: { user } } as unknown as Parameters<Access>[0]
}

describe('authenticatedOrPublished', () => {
  it('grants full access (true) to authenticated callers', () => {
    expect(authenticatedOrPublished(args({ id: 1, email: 'ceci@psg.bg' }))).toBe(true)
  })

  it('restricts anonymous callers to the published Where filter', () => {
    expect(authenticatedOrPublished(args(null))).toEqual(wherePublished)
    expect(authenticatedOrPublished(args(undefined))).toEqual(wherePublished)
  })

  it('anonymous filter targets published version status only', () => {
    expect(authenticatedOrPublished(args(null))).toEqual({
      _status: { equals: 'published' },
    })
  })

  it('declares access, access-rights and access-restriction controls', () => {
    expect(controlsApplied).toEqual(['5.15', '5.18', '8.3'])
  })
})
