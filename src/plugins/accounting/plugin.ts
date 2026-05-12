/**
 * Accounting plugin factory — Payload plugin setup.
 * 
 * Registers:
 * - Collections (GL Accounts, Journals, Statements, Tax, Cost Centers)
 * - Hooks (beforeChange, afterChange, audit trail)
 * - Validators (business rules, compliance)
 * - Access control (role-based read/write/delete)
 * 
 * @standard SAF-T:2.0 plugin-registration
 * @standard ISO-20022:2013 accounting-master-data
 * @accounting IFRS-16 general-ledger
 */

import type { Config } from 'payload';
import { collections } from './collections';
import { hooks } from './hooks';

/**
 * Accounting plugin — initializes all GL, journal, statement, and tax domains.
 * 
 * Usage in payload.config.ts:
 *   import { accountingPlugin } from '@/plugins/accounting';
 *   
 *   export default buildConfig({
 *     plugins: [accountingPlugin()],
 *   });
 */
export function accountingPlugin() {
  return (incomingConfig: Config): Config => {
    return {
      ...incomingConfig,
      collections: [...(incomingConfig.collections || []), ...collections],
      hooks: {
        ...incomingConfig.hooks,
        ...hooks,
      },
    };
  };
}

export default accountingPlugin;
