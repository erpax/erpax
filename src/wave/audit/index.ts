/** wave/audit — the double-wire reciprocal of [[audit]]/wave: the wave machinery's audit face. */
export {
  auditWaves,
  measureAuditDimensions,
  sequenceOf,
  trendOf,
  type AuditTrend,
  type AuditWaveEntry,
} from '@/audit/wave'
export const atomPath = 'wave/audit' as const

/** @index-cross.foldback child=wave/audit parent=wave — this cross folds back into its parent. */
