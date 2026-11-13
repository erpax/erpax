/**
 * vendors — the purchase side of `parties`.
 *
 * Vendors used to be a collection. It differed from `customers` by one field group, so the two were
 * merged into `parties` with a role; what remains here is the VIEW: the filter that selects the
 * parties you buy from, and the saved list an operator opens. The atoms beneath this folder (vendor
 * quotes, scorecards) still describe the purchase side and reference a party.
 *
 * @standard EN-16931:2017 §BG-4 seller
 * @accounting US-GAAP ASC-405 liabilities
 * @see ../parties/index.ts
 */
import { partyPresets, whereRole } from '@/parties'

/** The filter that selects vendors among the parties. */
export const vendorsWhere = () => whereRole('vendor')

/** The saved list that stands where the Vendors collection stood. */
export const vendorsPreset = () => partyPresets().find((p) => p.title === 'Vendors')!
