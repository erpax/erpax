/** standard/access — the double-wire reciprocal of access/standard (API access derived from the legal surface). */
export { requiredAccessTier, tierOfAccessFactory, accessComplianceGaps, accessComplianceOverMesh, type AccessTier, type ApiOp } from '@/access/standard'
export const atomPath = 'standard/access' as const

/** @index-cross.foldback child=standard/access parent=standard — this cross folds back into its parent. */
