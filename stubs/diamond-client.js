// PROD CLIENT STUB — diamond pulls createRequire + node:fs.
// Browser admin never derives diamonds; FTL precomputed address is the stub.
export function computeDiamond() {
  return { ok: false, model: null, reason: 'client-stub' }
}
export function deriveDiamond() {
  return { path: '', sealed: false }
}
export function verifyDiamond() {
  return { ok: false }
}
export function deriveCollectionDiamond() {
  return { path: '', sealed: false }
}
export function folderModelToDiamond(m) {
  return m
}
export function methodModelToDiamond(m) {
  return m
}
export default {}
