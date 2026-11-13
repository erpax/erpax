/**
 * maintenance/requests — the reported stage of `maintenance-work-orders`.
 *
 * A maintenance request used to be its own collection, promoted into a work order by triage. It
 * shared nearly half its fields with the work order — the same subject, place, asset and priority
 * — and described the same job before anyone had planned it. So it is now a stage of the work
 * order: new, triaged, on hold, rejected or duplicate. What remains here is the VIEW: the filter
 * that selects the documents still at the request stage, and the saved list an operator opens.
 *
 * @standard ISO-41001:2018 §8.1 facility-management operational-planning
 * @see ../work/orders/index.ts
 */
import { maintenancePresets, requestStages } from '@/maintenance/work/orders'

/** The filter that selects requests among the work orders. */
export const requestsWhere = () => ({ status: { in: requestStages() } })

/** The saved list that stands where the Maintenance Requests collection stood. */
export const requestsPreset = () => maintenancePresets().find((p) => p.title === 'Requests')!
