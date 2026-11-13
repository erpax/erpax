/**
 * customers — the sale side of `parties`.
 *
 * Customers used to be a collection. It differed from `vendors` by one field group, so the two were
 * merged into `parties` with a role; what remains here is the VIEW: the filter that selects the
 * parties you sell to, and the saved list an operator opens. The atoms beneath this folder
 * (contracts, quotes, sales orders, projects, KYC) still describe the sale side and reference a party.
 *
 * @standard EN-16931:2017 §BG-7 buyer
 * @accounting IFRS IFRS-9 financial-instruments accounts-receivable
 * @see ../parties/index.ts
 */
import { partyPresets, whereRole } from '@/parties'

/** The filter that selects customers among the parties. */
export const customersWhere = () => whereRole('customer')

/** The saved list that stands where the Customers collection stood. */
export const customersPreset = () => partyPresets().find((p) => p.title === 'Customers')!

export * from './contracts'
