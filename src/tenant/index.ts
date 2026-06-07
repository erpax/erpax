/**
 * tenant — the atom's public face (its content-uuid contract).
 *
 * The import convention ([[tamper]]/import) is: anything importing the tenant atom
 * reaches its INDEX (`@/tenant`), never a deep internal file. This index re-exports
 * the tenant-resolution helper the write path needs — `tenantIdFromRelation`
 * (normalise a Payload relationship value, which may be an id or a populated
 * document, to the tenant id string) — so callers seal against the face.
 *
 * @audit re-exports only; the truth lives in ./remote/secret
 * @see ./remote/secret -- ./SKILL.md
 */

export { tenantIdFromRelation } from './remote/secret'
