/**
 * Internal provider barrel — Slice JJJJJJJJJ-cut1 (2026-05-11).
 *
 * Importing this barrel triggers registration of every internal
 * provider via the side-effect of each provider file's bottom-most
 * `registerInternalProvider(...)` call.
 *
 * Cuts 2-N add the remaining roles. As each lands, append its import
 * here. The `checkSelfReferentialClosure` invariant flips from `warn`
 * (partial coverage) to `pass` (full coverage) once every
 * `ExternalRole` in `EXTERNAL_ROLES` has a registered provider.
 *
 * Coverage roadmap (4 of 10 shipped):
 *
 *   ✓ signing-tsp               (./signing.ts)            — Cut 2
 *   ✓ federation-peer           (./federation.ts)         — Cut 2
 *   ✓ notification              (./notification.ts)       — Cut 2
 *   ✓ search-index              (./search.ts)             — Cut 3
 *   ☐ payment-provider          internal-ledger settlement — unmodelled
 *   ☐ ai-inference              (./ai-inference.ts)       — Cut 4
 *   ☐ bank-account              (./bank-account.ts)       — Cut 5
 *   ☐ government-registry       (./government.ts)         — Cut 6
 *   ☐ kms                       (./kms.ts)                — Cut 7
 *   ☐ object-storage            (./object-storage.ts)     — Cut 8
 *
 * @audit Conservation Law 53 self-referential-closure
 */

// Side-effect imports — each provider file calls
// `registerInternalProvider(...)` at module top-level.
import './signing'
import './federation'
import './notification'
import './search'

export { InternalSigningProvider } from './signing'
export type { SigningParams, SigningResult } from './signing'

export { InternalFederationProvider } from './federation'
export type { FederationPushParams, FederationPushResult } from './federation'

export { InternalNotificationProvider } from './notification'
export type {
  NotificationParams as InternalNotificationParams,
  NotificationResult as InternalNotificationResult,
} from './notification'

export { InternalSearchProvider } from './search'
export type { SearchParams, SearchResult } from './search'
