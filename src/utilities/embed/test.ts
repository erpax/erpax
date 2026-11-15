import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { admit, charge, stale } from '@/utilities/embed'

const upTo = (n: number) => Array.from({ length: n + 1 }, (_, i) => i)

describe('embed — the twin of Embed.lean', () => {
  it('relies on theorems Embed.lean proves', () => {
    const lean = readFileSync(join(import.meta.dirname, '..', 'verify', 'lean', 'Embed.lean'), 'utf8')
    for (const name of ['unchanged_text_is_not_stale', 'changed_or_missing_is_stale', 'admitted_never_passes_the_quota', 'refused_leaves_the_count', 'more_quota_never_refuses_more', 'nothing_is_admitted_within_quota'])
      expect(lean, name).toContain(`theorem ${name}`)
  })

  it('embeds again only when the content key changed or is missing', () => {
    for (const k of upTo(5)) {
      expect(stale(String(k), String(k))).toBe(false)
      expect(stale(null, String(k))).toBe(true)
      for (const s of upTo(5)) if (s !== k) expect(stale(String(s), String(k))).toBe(true)
    }
  })

  it('admits a charge only within the quota, and a refusal leaves the count', () => {
    for (const u of upTo(12)) for (const c of upTo(12)) for (const q of upTo(12)) {
      if (u <= q) expect(charge(u, c, q)).toBeLessThanOrEqual(q)
      if (!admit(u, c, q)) expect(charge(u, c, q)).toBe(u)
      if (q < 12 && admit(u, c, q)) expect(admit(u, c, q + 1)).toBe(true)
      if (u <= q) expect(admit(u, 0, q)).toBe(true)
    }
  })
})
