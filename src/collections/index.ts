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

// ===== ACCOUNTING COLLECTIONS (60+ canonical collections) =====
// Fully integrated GL, banking, reconciliation, tax, and compliance domains.
// Per Phase 11 canonical migration from src/plugins/accounting/ → src/collections/accounting/
// See src/collections/accounting/index.ts for complete standards coverage (IFRS/US-GAAP/SOX/SAF-T)
export * from './accounting'
