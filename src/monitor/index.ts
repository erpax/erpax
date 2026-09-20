/**
 * monitor — hospital bedside vitals facet; corpus violation monitor + improve facet.
 *
 * @audit vitals mapping delegates to medical/device; violations scan @/monitor/violations
 */
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

export { deviceReadingFromMonitor, wireModalityToEmr } from '@/medical/device'

export {
  scanViolationsRealtime,
  fieldEntanglementUnhooked,
  fieldEntanglementUnhookedCount,
  violationEventId,
  violationSnapshotFingerprint,
  resetViolationScanCache,
  improveInRealtime,
  violationImproveClass,
  prioritizeViolations,
  resetImproveReceiptChain,
  HUMAN_GATE_COLLECTIONS,
  runRealtimeImproveCycle,
  RealtimeImproveLoop,
  violationRealtimeEmit,
  appendViolationToLog,
  violationLogAdvance,
  type ViolationEvent,
  type ViolationScanSnapshot,
  type ViolationSource,
  type ViolationSeverity,
  type ImproveClass,
  type ImproveAction,
  type ImproveResult,
  type ImproveInRealtimeOpts,
  type RealtimeImproveLoopOpts,
  type RealtimeImproveCycleResult,
  type ViolationRealtimeEvent,
  type ViolationRealtimeEmitResult,
} from '@/monitor/violations'
