import { describe, it, expect } from 'vitest'
import { deriveLotState } from '@/lots'
import Lots from '@/lots'

// Helper: call the hook with only the data arg (the rest are unused by deriveLotState).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const derive = (data: Record<string, unknown>): Record<string, unknown> =>
  deriveLotState({ data } as any) as Record<string, unknown>

describe('lots', () => {
  // ── deriveLotState: state derivation from watermarks ──────────────────────

  it('defaults to "opened" when no watermarks are set', () => {
    expect(derive({}).status).toBe('opened')
  })

  it('confirms when confirmedAt is present', () => {
    expect(derive({ confirmedAt: '2024-01-01' }).status).toBe('confirmed')
  })

  it('producing when startedAt is present (overrides confirmed)', () => {
    expect(derive({ confirmedAt: '2024-01-01', startedAt: '2024-01-02' }).status).toBe('producing')
  })

  it('finished when finishedAt is present', () => {
    expect(derive({ startedAt: '2024-01-01', finishedAt: '2024-01-03' }).status).toBe('finished')
  })

  it('shipped when unitsShipped > 0', () => {
    expect(derive({ finishedAt: '2024-01-03', unitsShipped: 5 }).status).toBe('shipped')
  })

  it('delivered when unitsDelivered > 0 (overrides shipped)', () => {
    expect(derive({ unitsShipped: 5, unitsDelivered: 3 }).status).toBe('delivered')
  })

  it('closed when closedAt is set (highest-priority terminal)', () => {
    expect(derive({ confirmedAt: '2024-01-01', closedAt: '2024-02-01' }).status).toBe('closed')
  })

  it('closed overrides delivered (closedAt wins regardless of units)', () => {
    expect(derive({ unitsDelivered: 10, closedAt: '2024-02-01' }).status).toBe('closed')
  })

  it('null/empty string watermarks do not advance the state', () => {
    expect(derive({ confirmedAt: null, startedAt: '' }).status).toBe('opened')
  })

  it('unitsShipped=0 does not advance to shipped (zero is not positive)', () => {
    expect(derive({ finishedAt: '2024-01-03', unitsShipped: 0 }).status).toBe('finished')
  })

  it('canceledAt does not overwrite the horo band (off-ring terminal)', () => {
    const result = derive({ confirmedAt: '2024-01-01', canceledAt: '2024-01-10' })
    // canceledAt is off-ring — the horo band stays at 'confirmed'
    expect(result.status).toBe('confirmed')
  })

  // ── Lots config shape invariants ───────────────────────────────────────────

  it('slug is "lots"', () => {
    expect(Lots.slug).toBe('lots')
  })

  it('has fields array with expected counter and watermark fields', () => {
    const names = (Lots.fields as Array<{ name?: string }>).map((f) => f.name)
    expect(names).toContain('unitsOrdered')
    expect(names).toContain('unitsDelivered')
    expect(names).toContain('confirmedAt')
    expect(names).toContain('closedAt')
    expect(names).toContain('status')
  })

  it('has deriveLotState wired into beforeChange hooks', () => {
    const beforeChange = Lots.hooks?.beforeChange ?? []
    expect(beforeChange).toContain(deriveLotState)
  })
})
