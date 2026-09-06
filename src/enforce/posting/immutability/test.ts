import { describe, it, expect } from 'vitest'
import type { Field } from 'payload'
import GLPostings from '@/journal/entries/gl/postings'
import { enforcePostingImmutability } from './index'

/**
 * The hook's LOGIC is proven in src/hooks/test.ts, against the barrel that re-exports it — it is not
 * restated here. What is proven here is the thing no test covered: whether the hook and the collection it
 * guards actually AGREE.
 */

const fieldNames = (fields: readonly Field[]): string[] =>
  fields.flatMap((f) => ('name' in f && f.name ? [f.name] : []))

const beforeChange = () => GLPostings.hooks?.beforeChange ?? []
const isWired = () => beforeChange().some((h) => h === enforcePostingImmutability)
/** A hook array holds FUNCTIONS: JSON.stringify renders them `null`. Read the name. */
const hookNames = () => beforeChange().map((h) => h.name)

describe('enforce/posting/immutability — the hook and the collection must agree', () => {
  it('the collection carries postedDate — the seal this hook reads', () => {
    expect(fieldNames(GLPostings.fields)).toContain('postedDate')
    // Written also asserting the auto-set hook's source names the field. It cannot: autoSetTimestamp is a
    // CLOSURE, so 'postedDate' lives in a captured variable and never appears in the function text. The
    // field's existence is the observable fact; how it gets stamped is that hook's own business.
    expect(hookNames()).toHaveLength(4)
  })

  /**
   * THE LAW, and it is an implication rather than a snapshot — so it passes today (unwired), passes after a
   * correct wiring, and fails ONLY on a wrong one.
   *
   * The hook refuses an admin edit unless `data.adminOverride === true`, and refuses that unless
   * `adminOverrideHistory` carries a reason. gl-postings has NEITHER field. So wiring it as the collection
   * stands makes a posted row immutable for EVERYONE — the documented admin path the hook itself implements
   * becomes unreachable, and the only way to correct a posted entry is a reversal.
   *
   * That may be the right policy! It is not a thing to discover after wiring.
   */
  it('wired ⇒ the collection carries the override fields, or admins are locked out too', () => {
    const names = fieldNames(GLPostings.fields)
    const hasOverride = names.includes('adminOverride') && names.includes('adminOverrideHistory')
    expect(isWired() && !hasOverride).toBe(false)
  })

  /**
   * IT IS WIRED NOW. This test previously pinned the gap — "the control exists, is tested, and guards
   * nothing" — and it was right to: the hook was written, proven, and installed on no collection, so a
   * posted row in an open period was mutable by anyone who could edit it.
   *
   * It was wired together with the two fields the implication above demands, because wiring it alone
   * would have made a posted row immutable for EVERYONE and left reversal as the only correction. The
   * previous author wrote that warning into this file before the wiring existed; it is the reason this
   * change is a pair and not a one-liner.
   */
  it('is wired — a posted row is refused, and the period lock still guards a different door', () => {
    expect(isWired()).toBe(true)
    // the period lock is a DIFFERENT control: it stops postings INTO a locked period, never edits TO a
    // posted row. Both are required; neither substitutes for the other.
    expect(hookNames()).toContain('validateNotLocked')
  })

  it('runs BEFORE the period lock — a posted row is refused before anything else mutates data', () => {
    expect(hookNames()[0]).toBe('enforcePostingImmutability')
  })

  it('refuses a posted row for a non-admin, with the reason a reader can act on', async () => {
    await expect(
      (enforcePostingImmutability as never as (a: unknown) => Promise<unknown>)({
        operation: 'update',
        data: {},
        originalDoc: { postedDate: '2026-01-01' },
        req: { user: { id: 'u1', roles: ['staff'] } },
      }),
    ).rejects.toThrow(/Cannot modify posted GL posting/)
  })
})
