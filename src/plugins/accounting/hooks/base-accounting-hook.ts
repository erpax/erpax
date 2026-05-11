/**
 * @deprecated DO NOT IMPORT FROM HERE. This file is the carcass of the
 * pre-Slice-CCC "base accounting hook" pattern. Slice KKK established
 * the four exported symbols (`createAccountingHook`, `HookHandler`,
 * `GLPostingData`, `calculateTotal`, `ensureHostId`) had zero callers
 * across `src/`. Slice PPP dropped its only remaining import from
 * `factories/collection-factory.ts`. Slice HHH (2026-05-10) excised
 * every export — `ensureHostId` was renamed `ensureTenant` and was the
 * last symbol; the canonical replacement is `autoPopulateTenant` in
 * `@/hooks/autoPopulateTenant.ts` (used by every collection's
 * `beforeValidate` chain via `multiTenancyField()`).
 *
 * Safe to `git rm src/plugins/accounting/hooks/base-accounting-hook.ts`
 * once the next maintenance pass runs locally — sandbox file-permissions
 * blocked the unlink in this slice.
 *
 * @audit ISO-19011:2018 audit-trail relocation-record
 * @see ./index.ts
 * @see @/hooks/autoPopulateTenant
 */

export {}
