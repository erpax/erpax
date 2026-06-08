/** plugin — dimensional plugin registry barrel. */
export type { DimensionId, DimensionalPlugin, DimensionalCoverageResult } from './dimensions'
export {
  checkDimensionalCoverage,
  dimensionForCollection,
  DIMENSIONAL_PLUGINS,
  totalCollectionCount,
} from './dimensions'
