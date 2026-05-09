import type { Payload } from 'payload'

/**
 * @deprecated Wrote to the retired Ledger kernel slugs (`accounts`, `equations`,
 * `entries`, `statements`). Replacement seeder must target plugin slugs:
 *   • `gl-accounts`
 *   • `journal-entries` (with inline `lines[{ glAccount, debit, credit, ... }]`)
 *
 * Until the replacement lands, this stub returns success=false. Safe to
 * delete once the plugin-shaped seeder is written.
 */
export interface SeedResult {
  success: boolean
  errors: string[]
  message: string
  // legacy fields kept for old test harnesses; populated empty
  tenantId?: string
  userId?: string
  accountantId?: string
  viewerId?: string
  accounts?: Record<string, string>
  items?: Record<string, string>
  addresses?: Record<string, string>
}

export async function seedComprehensive(_payload: Payload, _opts?: unknown): Promise<SeedResult> {
  return {
    success: false,
    errors: ['seedComprehensive is retired pending a plugin-shaped rewrite.'],
    message: 'See deprecation notice in seedCurrent.ts',
    accounts: {},
    items: {},
    addresses: {},
  }
}
