import type { Payload } from 'payload'

/**
 * @deprecated The original seedCurrent wrote to the now-retired Ledger kernel
 * slugs (`accounts`, `equations`, `entries`, `statements`) with kernel-shaped
 * fields (code/type/name; debit/credit on `entries`).
 *
 * Canonical replacement targets the accounting plugin instead:
 *   • `gl-accounts`    — fields: accountNumber, accountName, accountType, normalBalance
 *   • `journal-entries` — fields: entryNumber, entryDate, lines[{glAccount,debit,credit,...}]
 *   (no separate `entries` collection — they're a `lines[]` array on the entry)
 *
 * Until that replacement seeder is written, importing this stub returns an
 * empty result with success=false. Safe to delete once the plugin-shaped
 * seeder lands.
 */
export type CurrentSeedResult = {
  success: boolean
  errors: string[]
  message: string
}

export async function seedCurrent(_payload: Payload, _tenantName: string): Promise<CurrentSeedResult> {
  return {
    success: false,
    errors: [
      'seedCurrent is retired pending a plugin-shaped rewrite (gl-accounts/journal-entries).',
    ],
    message: 'See top-of-file deprecation notice.',
  }
}

export async function testCurrentSeed(_payload: Payload): Promise<CurrentSeedResult> {
  return seedCurrent(_payload, 'unused')
}
