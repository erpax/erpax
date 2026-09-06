/**
 * consistency — the barrel. Matter lives in the child atoms; a hub re-exports and holds none itself.
 *
 * @see ./SKILL.md
 */
// A CLIENT child is named in the TYPE space only. Re-exporting one at runtime from a barrel the
// server config imports pulls its `.scss` into the boot graph and `tsx src/run/load/index.ts` dies
// on the extension — the mistake this corpus made once already with admin/ui.
export type * from './apply'
