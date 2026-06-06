// workers — public face (seal). Re-exports the atom's public members from its internals
// so importers couple to `@/workers`, never to a deep file past the index.
// @see ./SKILL.md
export { translations } from './translations'
