/**
 * Minimal uuid-substrate compile probe for gateTypecheck — no self-import of index.ts.
 */
import { guardian } from '@/guardian'
import { seal } from '@/seal'

export const UUID_SUBSTRATE_PROBE = seal([guardian({ axis: 'probe', violations: 0, baseline: 0 })]).sealed
