/**
 * Level 1 Seeds - Minimal Accounting Seeds
 * Fast setup (<500ms) for unit testing
 */

export {
  MinimalTenantSeed,
  MinimalGLAccountsSeed,
  MinimalUsersSeed,
  MinimalCurrencyRatesSeed,
  MinimalPagesSeed,
  Level1SeedSuite,
  // Fixture constants — re-exported so tests can pin against the same
  // source of truth a seed produces (no parallel literals to drift).
  MINIMAL_TENANT_DATA,
  MINIMAL_GL_ACCOUNTS_DATA,
  MINIMAL_USERS_DATA,
  MINIMAL_CURRENCY_RATES_DATA,
  MINIMAL_PAGES_DATA,
} from './minimal-accounting-seeds';
