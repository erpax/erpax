/**
 * self/improve/tip — the feed scanner, as a barrel over its three parts.
 *
 * A hub holds no matter ([[rules]]/concentration): the 655-line file this replaces
 * was a vocabulary, a scanner and a planner in one scroll.
 *
 *   model  what a gap IS · the thresholds · what makes a tip precise
 *   audit  the scan: which gaps are real, scored unblock / (cost × risk)
 *   plan   one gap becomes one executable tip — or is refused as vague
 *
 * HARD LAW: agents doubt prose; FTL compute is the seal. Every tip must call or
 * prove under `src/quantum/ftl` (or a sibling compute).
 *
 *   tsx src/self/improve/tip/plan/index.ts
 *   pnpm erpax tip
 *
 * @see ./SKILL.md
 */
export {
  atomPath,
  ADMIN_TTFB_MS_RESIDUAL,
  ADMIN_TTFB_MS_OK,
  VAGUE_TIP_RE,
  CONCRETE_CODE_RE,
  CONCRETE_PROOF_RE,
} from './model'
export type { GapKind, GapScore, SelfDevGap, SelfDevAudit, TrinityTip, TipEmitOpts } from './model'
export { scoreGap, secretNamesPresent, auditSelfDevGaps } from './audit'
export { planTrinity, isPreciseTip, emitNextTip, formatNextTip } from './plan'

/** @index-cross.foldback child=self/improve/tip parent=self/improve — this cross folds back into its parent. */
