/**
 * ERPAX Collections Index
 *
 * Organized by logical domain:
 * - Core: Multi-tenancy, users, roles
 *   (`addresses` is provided by `@payloadcms/plugin-ecommerce` and extended
 *   via `addressesCollectionOverride` in src/ecommerce/configureEcommercePlugin.ts)
 * - Content: CMS pages, posts, media, categories
 * - Billing: Invoices, payments, subscriptions
 * - Inventory: Items and product catalog
 * - Ledger: Double-entry accounting (Accounts, Equations, Entries, Statements)
 */

// Core Collections
export { Tenants } from './Tenants'
export { Users } from './Users'
export { Roles } from './Roles'
export { UserRoles } from './UserRoles'

// Content Collections
export { Pages } from './Pages'
export { Posts } from './Posts'
export { Media } from './Media'
export { Categories } from './Categories'

// Billing Collections
export { Invoices } from './Invoices'
export { InvoiceLines } from './InvoiceLines'
export { PaymentMethods } from './PaymentMethods'
export { Payments } from './Payments'
export { SubscriptionPlans } from './SubscriptionPlans'
export { Subscriptions } from './Subscriptions'

// Inventory Collections
export { Items } from './Items'

// Party Masters (sale-side / purchase-side)

// Tax Masters (ISO 3166-2 jurisdictions + EN 16931 tax-codes)

// Fiscal Calendar (period locking — GAAP/IFRS/SOX)

// NOTE: The Ledger kernel (Accounts/Equations/Entries/Statements) was retired.
// Canonical write-model is the accounting plugin (`gl-accounts`, `journal-entries`,
// `gl-postings`) registered via `accountingPlugin()` in `src/plugins/index.ts`.
// All 20 accounting collections have been moved to src/plugins/accounting/collections/
// They are now registered via the accountingPlugin() in src/plugins/index.ts
// This follows conventional Payload plugin patterns with harmonized file locations
// See src/plugins/accounting/ for the complete accounting plugin structure
