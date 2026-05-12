/**
 * Accounting plugin collections — Payload collection definitions.
 *
 * @standard SAF-T:2.0 master-data
 * @standard ISO-20022:2013 financial-messaging
 * @accounting IFRS-16 general-ledger
 */

import GLAccounts from './gl-accounts'
import JournalEntries from './journal-entries'
import GLPostings from './gl-postings'

// Export GL core collections
export { GLAccounts, JournalEntries, GLPostings }

// Collections array for plugin.ts
export const collections = [GLAccounts, JournalEntries, GLPostings]
