/**
 * commitments/and/contingencies — the disclosed stage of `provisions`.
 *
 * A commitment or contingency used to be its own collection, with a read-only pointer at the
 * provision it became once the outflow turned probable. IAS-37 treats the two as one obligation at
 * two stages — disclosed in the notes, then recognised on the balance sheet — so it is now a stage
 * of the provision row: disclosed, settled or released. What remains here is the VIEW: the filter
 * that selects the rows still off the balance sheet, and the saved list an accountant opens.
 *
 * @accounting IFRS IAS-37 §86-92 disclosure-requirements
 * @accounting US-GAAP ASC-450-20-50 loss-contingency-disclosure
 * @see ../../../fiscal/periods/provisions/index.ts
 */
import { disclosedStages, provisionPresets } from '@/fiscal/periods/provisions'

/** The filter that selects commitments and contingencies among the provisions. */
export const contingenciesWhere = () => ({ status: { in: disclosedStages() } })

/** The saved list that stands where the Commitments & Contingencies collection stood. */
export const contingenciesPreset = () => provisionPresets().find((p) => p.title === 'Commitments & contingencies')!
