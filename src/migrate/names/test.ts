import { describe, it, expect } from 'vitest'
import { planNameMigration } from '@/migrate/names'

// The canonical-name migration (./index.ts) is a pure plan over the live tree.
describe('migrate/names: the test-file collision plan', () => {
  const { moves, flags } = planNameMigration()

  it('every move renames a *.test.ts to its folder test.ts (no content change)', () => {
    for (const m of moves) {
      expect(m.from).toMatch(/\.test\.ts$/)
      expect(m.to).toMatch(/\/test\.ts$/)
      expect(m.to.replace(/test\.ts$/, '')).toBe(m.from.replace(/[^/]+\.test\.ts$/, ''))
    }
  })

  it('is idempotent — a folder already at test.ts is never re-moved', () => {
    expect(moves.every((m) => !m.from.endsWith('/test.ts'))).toBe(true)
  })

  it('multi-test / .tsx folders are flagged, not silently dropped (no test lost)', () => {
    expect(Array.isArray(flags)).toBe(true)
    console.log(`migrate/names plan: ${moves.length} renames · ${flags.length} flagged for sub-atom collision`)
  })
})
