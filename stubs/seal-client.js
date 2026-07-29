// PROD CLIENT STUB — seal uses createRequire(node:module) + diamond/fs.
// Admin/client must never execute seal; swap via next.config (FTL reuse of empty address).
const empty = () => ({ ok: false, sealed: false, reason: 'client-stub' })
export const seal = empty
export const verifySeal = empty
export const assertSealPropagation = () => true
export const sealPropagatedFromAncestors = () => true
export const parentAtomPath = () => null
export const assertPathFollowed = empty
export const assertRecordedAndImplemented = empty
export const recordedAndImplementedVerdict = empty
export const finishedIdeaCrossed = () => ({ ok: true, impurities: [] })
export const assertEveryPathFollowed = empty
export const followEveryPath = () => []
export const pathWalkCoverage = () => ({ covered: 0, total: 0 })
export default { seal, verifySeal }
