import { describe, it, expect } from 'vitest'
import {
  planTrinity,
  emitNextTip,
  formatNextTip,
  auditSelfDevGaps,
  scoreGap,
  isPreciseTip,
  VAGUE_TIP_RE,
  ADMIN_TTFB_MS_OK,
  ADMIN_TTFB_MS_RESIDUAL,
  type SelfDevGap,
} from './tip'

function gap(partial: Partial<SelfDevGap> & Pick<SelfDevGap, 'kind'>): SelfDevGap {
  const factors = partial.factors ?? { unblock: 40, cost: 2, risk: 1 }
  return {
    kind: partial.kind,
    factors,
    score: partial.score ?? scoreGap(factors),
    where: partial.where ?? `src/${partial.kind}`,
    file: partial.file ?? `src/${partial.kind}/index.ts:1:1`,
    prose: partial.prose ?? `${partial.kind} gap`,
    research: partial.research ?? `settle ${partial.kind}`,
    secretGated: partial.secretGated ?? false,
  }
}

const quiet = {
  lean: true as const,
  leftoverPull: 0,
  dryProofOk: true,
  mcpFuseReady: false,
  skipAdminBoot: true,
}

describe('self/improve/tip — scored feed-scanner', () => {
  it('scoreGap = unblock/(cost×risk) — higher unblock wins; higher cost/risk loses', () => {
    expect(scoreGap({ unblock: 100, cost: 1, risk: 1 })).toBeGreaterThan(
      scoreGap({ unblock: 100, cost: 5, risk: 2 }),
    )
    expect(scoreGap({ unblock: 50, cost: 1, risk: 1 })).toBeGreaterThan(
      scoreGap({ unblock: 10, cost: 1, risk: 1 }),
    )
  })

  it('ranks cheap high-unblock math above costly dry-proof when math is large', () => {
    const audit = auditSelfDevGaps({
      ...quiet,
      mathCount: 200,
      mathFile: 'src/shared/Money.tsx:65',
      purifyHits: 0,
      dryProofOk: false,
    })
    expect(audit.heaviest?.kind).toBe('math')
    expect(audit.gaps.filter((g) => g.kind === 'math')).toHaveLength(1)
  })

  it('planTrinity is precise for every gap kind', () => {
    const kinds = ['leftover', 'math', 'purify', 'dry-proof', 'doctor', 'mcp-fuse', 'admin-boot'] as const
    for (const kind of kinds) {
      const t = planTrinity(gap({ kind }))
      const p = isPreciseTip(t)
      expect(p.ok, `${kind}: ${p.reasons.join('; ')}`).toBe(true)
      expect(t.form.includes('\n')).toBe(false)
      expect(VAGUE_TIP_RE.test(t.form)).toBe(false)
    }
  })

  it('REFUSES vague non-tips', () => {
    expect(
      isPreciseTip({
        form: 'Continue improving the corpus somehow',
        code: 'do various things',
        proof: 'it looks better',
      }).ok,
    ).toBe(false)
  })

  it('emitNextTip refuses empty noise (no scored gaps)', () => {
    const tip = emitNextTip({ ...quiet, mathCount: 0, purifyHits: 0 })
    expect(tip.accepted).toBe(false)
    expect(tip.refuseReason).toMatch(/empty|no scored/i)
  })

  it('emitNextTip accepts a concrete math tip', () => {
    const tip = emitNextTip({
      ...quiet,
      mathCount: 12,
      mathFile: 'src/shared/AuditedTimestamp.tsx:51',
      purifyHits: 0,
    })
    expect(tip.accepted).toBe(true)
    expect(tip.gap.kind).toBe('math')
    expect(tip.code).toMatch(/AuditedTimestamp|src\//)
    expect(tip.proof).toMatch(/hostMathViolations\(\)\.length === 0/)
    expect(formatNextTip(tip)).toMatch(/FORM/)
  })

  it('encodes admin-boot TTFB residual after stubs — profile not chunk shave', () => {
    const audit = auditSelfDevGaps({
      lean: true,
      leftoverPull: 0,
      mathCount: 0,
      purifyHits: 0,
      dryProofOk: true,
      mcpFuseReady: false,
      skipAdminBoot: false,
      adminTtfbMs: ADMIN_TTFB_MS_RESIDUAL,
    })
    const boot = audit.gaps.find((g) => g.kind === 'admin-boot')
    expect(boot).toBeTruthy()
    expect(boot!.file).toBe('src/quantum/ftl/admin.ts')
    expect(boot!.factors.cost).toBe(2) // profile-cheap — not a full SSR rewrite
    expect(boot!.prose).toMatch(/TTFB/)
    expect(boot!.prose).toMatch(/chunk shaving low ROI|client stubs/)

    const tip = planTrinity(boot!)
    expect(isPreciseTip(tip).ok).toBe(true)
    expect(tip.form).toMatch(/SSR|Worker boot|TTFB/)
    expect(tip.code).toMatch(/adminBootShell|quantum\/ftl\/admin/)
    expect(tip.proof).toMatch(new RegExp(`TTFB\\s*[≤<]\\s*${ADMIN_TTFB_MS_OK}`))
  })

  it('omits admin-boot when TTFB already ok', () => {
    const audit = auditSelfDevGaps({
      lean: true,
      leftoverPull: 0,
      mathCount: 0,
      dryProofOk: true,
      mcpFuseReady: false,
      adminTtfbMs: 800,
    })
    expect(audit.gaps.some((g) => g.kind === 'admin-boot')).toBe(false)
  })

  it('mcp-fuse omitted when secret names absent; present when ready', () => {
    const skip = auditSelfDevGaps({ ...quiet, mathCount: 0 })
    expect(skip.gaps.some((g) => g.kind === 'mcp-fuse')).toBe(false)

    const ready = auditSelfDevGaps({ ...quiet, mathCount: 0, mcpFuseReady: true })
    expect(ready.gaps.some((g) => g.kind === 'mcp-fuse')).toBe(true)
  })

  it('external stop is sovereign', () => {
    const tip = emitNextTip({
      ...quiet,
      mathCount: 5,
      mathFile: 'src/x.ts:1',
      stopped: true,
    })
    expect(tip.continuation.continue).toBe(false)
    expect(tip.continuation.stoppedExternally).toBe(true)
  })
})
