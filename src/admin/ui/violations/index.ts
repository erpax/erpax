export {
  ViolationMonitorProvider,
  useViolationMonitor,
  type ViolationMonitorContextValue,
  type ViolationMonitorProviderProps,
  type ViolationEvent,
  type ViolationScanSnapshot,
  type ImproveResult,
} from './ViolationMonitorProvider'
export { default as ViolationMonitorPanel } from './ViolationMonitorPanel'
// Client component — type space only.
export type * from './AdminViolationDashboard'

/** @index-cross.foldback child=admin/ui/violations parent=admin/ui — this cross folds back into its parent. */
