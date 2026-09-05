export { ERPAX_LIST_COLUMNS, erpaxMetaOf, type ErpaxCollectionMeta } from './meta'
export {
  CORPUS_JOURNAL_SAMPLE_PATHS,
  CORPUS_ROLLUP_CACHE_TTL_MS,
  clearCorpusEntropyRollupCache,
  getCorpusEntropyRollupCache,
  formatJournalLineEb,
  buildCorpusPathJournalSamples,
  loadCorpusPathJournalSamples,
  loadCorpusDashboardShell,
  computeCorpusDashboardMetrics,
  loadCorpusEntropyRollup,
  type CorpusPathJournalSample,
  type CorpusDashboardMetrics,
  type CorpusDashboardShell,
  type CorpusRollupCacheEntry,
  type LoadCorpusEntropyRollupOpts,
} from './rollup'
export {
  fieldAccessFromComputed,
  fieldVisibleForUpdate,
  fieldVisibleForWrite,
} from './visibility'
export {
  ViolationMonitorProvider,
  ViolationMonitorPanel,
  useViolationMonitor,
  type ViolationMonitorContextValue,
  type ViolationMonitorProviderProps,
  type ViolationEvent,
  type ViolationScanSnapshot,
  type ImproveResult,
} from './violations'

// The child atoms are named in the TYPE space only. They are client components, and Payload
// references an admin component by PATH string rather than by import — a runtime re-export here
// pulls their `.scss` into the server config's module graph and the boot gate dies on it
// ([[run]]/load). Naming them keeps the cross wired without making them reachable.
export type * from './cells'
export type * from './dashboard'
export type * from './fields'
export type * from './nav'
