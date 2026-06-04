/**
 * Shared testing infrastructure barrel — config-discovery, seed factories,
 * isolated environments, parallel runners, snapshots.
 *
 * Internal files (`config-discovery`, `config-discovery-types`,
 * `test-seed-factory`, `test-setup`) inherit these standards.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
 * @standard ISO/IEC/IEEE-29119-4:2021 test-techniques
 * @standard JSON-Schema 2020-12 schema-validation
 * @rfc 8259 json
 * @audit ISO-19011:2018 audit-trail seed-cleanup
 * @see docs/STANDARDS.md §7
 */

export {
  TestSeedFactory,
  TransactionalSeedFactory,
  SEED_VALIDATION_REGISTRY,
  type SeedContext,
  type SeedResult,
  type CleanupResult,
  type SeedHooks,
  type CleanupStrategy,
  type SeedUiCategory,
  type SeedConstructor,
  registerSeedCategory,
  getSeedCategoryRegistry,
  getSeedsByCategory,
} from '@/testing/test-seed-factory'

export {
  IsolatedTestEnvironment,
  ParallelTestRunner,
  SeedSnapshot,
  setupTestEnvironment,
  setupVitestEnvironment,
} from '@/testing/test-setup'

export {
  PayloadConfigDiscovery,
  type Collection,
  type Field,
  type Payload,
  type CollectionMetadata,
  type ValidationError,
  type DataValidationResult,
  // Singleton convenience helpers (canonical entry points for tests)
  initializeDiscovery,
  getDiscovery,
  resetDiscovery,
  // Advanced Type Validation & Coercion Exports
  coerceValue,
  validateFieldType,
  createFieldValidator,
  registerCustomValidator,
  getCustomFieldValidator,
  getFieldValidator,
  type FieldType,
  type CoercionResult,
  type ValidationResult,
  type FieldTypeValidator,
  type AccessConfig,
  type RelationshipInfo,
} from '@/testing/config-discovery'
