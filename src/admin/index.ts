/**
 * admin — the barrel. Matter lives in the child atoms; a hub re-exports and holds none itself.
 *
 * @see ./SKILL.md
 */
// A CLIENT child is named in the TYPE space only. Re-exporting one at runtime from a barrel the
// server config imports pulls its `.scss` into the boot graph and `tsx src/run/load/index.ts` dies
// on the extension — the mistake this corpus made once already with admin/ui.
export type * from './bar'
export type * from './ui'
// The panel components are named in the TYPE space only: a runtime re-export from a barrel the
// server config imports pulls their JSX and styles into the boot graph ([[run]]/load).
export type * from './BatchActionsBar'
export type * from './GLAccountDetailDialog'
export type * from './GLAccountDialog'
export type * from './GLAccountFilters'
export type * from './GLAccountManagement'
export type * from './GLAccountTree'
export type * from './TenantDialog'
export type * from './TenantFilters'
export type * from './TenantManagement'
export type * from './TenantTable'
