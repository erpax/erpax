/**
 * Accounting plugin — general ledger, journals, statements, tax, cost centers.
 * 
 * Public API for all accounting domain logic:
 * - Types: GL account, journal entry, financial statement
 * - Collections: registered with Payload
 * - Services: business logic (post, reverse, close, report)
 * - Validators: compliance & business rules
 * - Hooks: React hooks + Payload lifecycle
 * - Components: shadcn-based UI
 * - Access: role-based read/write
 * 
 * @standard SAF-T:2.0 general-ledger
 * @standard ISO-20022:2013 financial-messaging
 * @accounting IFRS-16 complete
 * @audit ISO-19011:2018 audit-trail
 */

// Re-export plugin factory
export { accountingPlugin, default } from './plugin';

// Re-export all public types
export * from './types';

// Re-export all validators
export * from './validators';

// Re-export all services
export * from './services';

// Re-export all access rules
export * from './access';

// Re-export all hooks
export * from './hooks';

// Re-export all components
export * from './components';

// Re-export collections (for manual registration if needed)
export * from './collections';
