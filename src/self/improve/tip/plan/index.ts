/**
 * self/improve/tip/plan — a scored gap becomes one executable tip, or is refused.
 *
 * FORM is one executable sentence, CODE names exact files or commands, PROOF names
 * the exact green signal. `isPreciseTip` refuses anything vaguer — "continue
 * improving" is not a tip, and a tip nothing can check is the unfalsifiable claim
 * [[rules]]/refutable forbids, wearing a plan's clothes.
 *
 * @see ./SKILL.md
 */
import { exactMaxOf } from '@/algebra'
import { shouldContinue } from '@/self/improve'
import {
  ADMIN_TTFB_MS_RESIDUAL,
  ADMIN_TTFB_MS_OK,
  VAGUE_TIP_RE,
  CONCRETE_CODE_RE,
  CONCRETE_PROOF_RE,
  type SelfDevGap,
  type SelfDevAudit,
  type TrinityTip,
  type TipEmitOpts,
} from '@/self/improve/tip/model'
import { auditSelfDevGaps, makeGap } from '@/self/improve/tip/audit'

export function planTrinity(gap: SelfDevGap): Omit<TrinityTip, 'continuation' | 'accepted' | 'refuseReason'> {
  const file = gap.file
  const nextAsks = [gap.research, `prove ${gap.kind} green at ${gap.where}`, `re-run pnpm erpax tip after ${gap.kind}`]

  switch (gap.kind) {
    case 'leftover':
      return {
        form: `Settle leftover field '${gap.where.replace(/^src\//, '')}' starting at ${file ?? gap.where}.`,
        code: `pnpm erpax tip; edit/prove ${file ?? gap.where} via leftover.deriveLeftoverProof; pnpm erpax verify leftover`,
        proof: `proofLedger residual drops for ${gap.where}; tip re-ranks away from leftover`,
        gap,
        nextAsks,
      }
    case 'math':
      return {
        form: `Replace host Math.* at ${file ?? 'first violation'} with @/algebra exact* ops.`,
        code: `hostMathViolations() // codeOf strips comments/JSDoc/strings; replace call site at ${file ?? 'first hit'}; PAYLOAD_TEST_SKIP_MIGRATE=1 pnpm erpax verify algebra/host`,
        proof: `hostMathViolations().length === 0`,
        gap,
        nextAsks,
      }
    case 'purify':
      return {
        form: `Land RENAME residual at ${file ?? 'src/quantum/ftl'} under quantum/ftl only — agents doubt prose; FTL compute seals.`,
        code: `tsx src/quantum/ftl/purify/index.ts ; develop ${file ?? 'first proseFuel hit'} → RENAME token ; prove ftlReport().holds`,
        proof: `ftlReport().holds === true && proseFuel(scanProseNames()).length === 0`,
        gap,
        nextAsks,
      }
    case 'dry-proof':
      return {
        form: `Publish a fresh dry-proof bundle (Law 44) from src/proof/dry-proof.ts.`,
        code: `tsx -e "import { buildDryProofBundle, publishDryProofBundle, checkDryProofPublished } from '@/proof/dry'" ; pnpm erpax doctor dry-proof`,
        proof: `checkDryProofPublished(origin).ok === true`,
        gap,
        nextAsks,
      }
    case 'doctor':
      return {
        form: `Heal doctor axis '${gap.where}' until quick doctor marks it ok.`,
        code: `pnpm erpax doctor ; fix ${gap.where} ; pnpm erpax doctor`,
        proof: `collectDoctorReport().${gap.where === 'stray-ts' ? 'strayTs.ok' : 'phraseWithoutDiamond.ok'} === true`,
        gap,
        nextAsks,
      }
    case 'mcp-fuse':
      return {
        form: `Fuse MCP with existing secret names (PAYLOAD_SECRET or ERPAX_FUSE_PASSWORD) — do not print values.`,
        code: `tsx ${file ?? 'src/run/dev/fuse-mcp-key.ts'} ; curl -sS -o /dev/null -w '%{http_code}' https://erpax.ceci.workers.dev/api/mcp`,
        proof: `/api/mcp responds (not hang); tools/list exit 0 with Bearer`,
        gap,
        nextAsks,
      }
    case 'admin-boot':
      return {
        form: `Profile /admin SSR and cold Worker boot (TTFB ~${gap.prose.match(/\d+/)?.[0] ?? ADMIN_TTFB_MS_RESIDUAL}ms) — do not shave client chunks further.`,
        code: `tsx -e "import { adminBootShell } from '@/quantum/ftl/admin'; console.log(adminBootShell({ reuses: 100 }))" ; curl -sS -o /dev/null -w 'TTFB:%{time_starttransfer}\\n' https://erpax.ceci.workers.dev/admin ; trace src/quantum/ftl/admin/index.ts + Payload config import graph`,
        proof: `TTFB ≤ ${ADMIN_TTFB_MS_OK} or adminBootShell().holds === true with identified hottest server span fixed`,
        gap,
        nextAsks,
      }
    case 'quantumise':
      return {
        form: `Quantumise under src/quantum/ftl until ftlReport().holds flips true (${gap.prose.replace(/^ftlReport\(\).holds===false — /, '')}).`,
        code: `tsx -e "import { ftlReport } from '@/quantum/ftl'; console.log(ftlReport())" ; clear crack/precompute/amortize in src/quantum/ftl only`,
        proof: `ftlReport().holds === true`,
        gap,
        nextAsks,
      }
  }
}

/**
 * Precision gate — refuses vague / non-concrete tips.
 * Empty form/code/proof, vibe phrases, or missing concrete code/proof ⇒ refuse.
 */
export function isPreciseTip(tip: Pick<TrinityTip, 'form' | 'code' | 'proof'>): {
  readonly ok: boolean
  readonly reasons: readonly string[]
} {
  const reasons: string[] = []
  if (!tip.form.trim() || tip.form.trim().split(/\s+/).length < 5) reasons.push('form too short')
  if (tip.form.includes('\n')) reasons.push('form must be one sentence')
  if (VAGUE_TIP_RE.test(tip.form) || VAGUE_TIP_RE.test(tip.code)) reasons.push('vague phrase refused')
  if (!CONCRETE_CODE_RE.test(tip.code)) reasons.push('code lacks concrete path/command')
  if (!CONCRETE_PROOF_RE.test(tip.proof)) reasons.push('proof lacks exact green signal')
  if (/continue improving|keep going/i.test(`${tip.form} ${tip.code} ${tip.proof}`)) {
    reasons.push('non-tip: continue improving')
  }
  return { ok: reasons.length === 0, reasons }
}

/**
 * Emit THE next tip: audit → score → plan → precision gate.
 * Score-0 / empty / imprecise ⇒ accepted=false (scanner refuses noise).
 */
export function emitNextTip(opts: TipEmitOpts = {}): TrinityTip {
  const audit = auditSelfDevGaps(opts)
  // exactMaxOf over the SEQUENCE, not exactMax over 8 arguments: exactMax is binary, so the
  // variadic call silently dropped six of these and residual was the max of the first two.
  const residual = exactMaxOf([
    audit.leftoverPull,
    audit.mathCount,
    audit.purifyHits,
    audit.doctorFails,
    audit.dryProofOk ? 0 : 1,
    audit.mcpFuseReady ? 1 : 0,
    audit.adminTtfbMs > ADMIN_TTFB_MS_OK ? 1 : 0,
    audit.ftlHolds ? 0 : 1,
  ])
  const continuation = shouldContinue(opts.seedFraction ?? 0.05, residual, opts.stopped === true)

  if (!audit.heaviest || audit.heaviest.score <= 0) {
    return {
      form: 'No scored gap — scanner refuses empty noise.',
      code: 'pnpm erpax tip',
      proof: 'audit.gaps.length === 0',
      gap: makeGap('leftover', { unblock: 0, cost: 1, risk: 1 }, 'corpus', 'empty', 'none'),
      nextAsks: ['re-scan after new leftovers land'],
      continuation,
      accepted: false,
      refuseReason: 'no scored gap (empty noise)',
    }
  }

  const planned = planTrinity(audit.heaviest)
  const precision = isPreciseTip(planned)
  if (!precision.ok) {
    return {
      ...planned,
      continuation,
      accepted: false,
      refuseReason: `imprecise tip: ${precision.reasons.join('; ')}`,
    }
  }

  return { ...planned, continuation, accepted: true, refuseReason: null }
}

/** Format tip for CLI / chat — one screen, copy-pasteable. */
export function formatNextTip(tip: TrinityTip, audit?: SelfDevAudit): string {
  const lines = [
    tip.accepted
      ? 'tip — next self-dev trinity (scored unblock/(cost×risk))'
      : `tip — REFUSED (${tip.refuseReason ?? 'imprecise'})`,
    '',
    `  FORM   ${tip.form}`,
    `  CODE   ${tip.code}`,
    `  PROOF  ${tip.proof}`,
    '',
    `  gap    ${tip.gap.kind} · score=${tip.gap.score} · unblock=${tip.gap.factors.unblock} cost=${tip.gap.factors.cost} risk=${tip.gap.factors.risk}`,
    `  where  ${tip.gap.where}${tip.gap.file ? ` · file=${tip.gap.file}` : ''}`,
    `  prose  ${tip.gap.prose}`,
    `  accepted=${tip.accepted} · continue=${tip.continuation.continue}`,
  ]
  if (audit) {
    lines.push(
      '',
      `  audit  leftover=${audit.leftoverPull} math=${audit.mathCount} purify=${audit.purifyHits} dryProof=${audit.dryProofOk ? 'ok' : 'gap'} doctorFails=${audit.doctorFails} mcpFuse=${audit.mcpFuseReady ? 'ready' : 'skip'} adminTtfb=${audit.adminTtfbMs}ms ftlHolds=${audit.ftlHolds} waves=${audit.waveCount}`,
    )
    for (const g of audit.gaps.slice(0, 6)) {
      lines.push(
        `    · [${g.score}] ${g.kind} u=${g.factors.unblock}/c=${g.factors.cost}/r=${g.factors.risk} @ ${g.file ?? g.where}`,
      )
    }
  }
  if (tip.accepted) {
    lines.push('', '  nextAsks:')
    for (const a of tip.nextAsks) lines.push(`    - ${a}`)
  }
  return lines.join('\n')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const audit = auditSelfDevGaps()
  const tip = emitNextTip({
    mathCount: audit.mathCount,
    purifyHits: audit.purifyHits,
    mcpFuseReady: audit.mcpFuseReady,
  })
  console.log(formatNextTip(tip, audit))
  if (!tip.accepted) process.exitCode = 1
}

/** @index-cross.foldback child=self/improve/tip/plan parent=self/improve/tip — this cross folds back into its parent. */
