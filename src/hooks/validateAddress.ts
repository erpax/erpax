/**
 * Address-validation Payload hook factory — drop-in `beforeValidate` that
 * enforces the country-specific address format declared in
 * `@/config/address-formats`.
 *
 * **International-first resolution order** (most-specific wins):
 *   1. `data.country` on the address document itself
 *   2. The active tenant's `country` (resolved from `req`)
 *   3. The hook's `fallbackCountry` option (if explicitly passed)
 *   4. The deployment default country (`getRegionalDefaults().country`)
 *
 * Step 2 is what makes erpax a true international app — every tenant's
 * own jurisdiction drives address validation, not a deployment-wide
 * default. The address-validation hook is one of the canonical
 * consumers of `getTenantDefaultsFromReq` from `@/utilities/tenant-context`.
 *
 * Wraps the canonical {@link validateAddress} validator
 * (`@/utilities/address-validation`) for any Payload collection whose
 * document carries an address shape (top-level fields or nested under
 * a configurable path).
 *
 * @standard ISO-19160-4:2017 addressing components-and-conceptual-model
 * @standard UPU-S42 international-postal-addressing
 * @standard ISO-3166-1:2020 country-codes alpha-2 per-tenant-jurisdiction
 * @audit ISO-19011:2018 audit-trail address-validation
 * @compliance GDPR Art.5(1)(c) data-minimisation
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/utilities/address-validation.ts
 * @see src/utilities/tenant-context.ts
 * @see src/config/address-formats.ts
 */

import type { CollectionBeforeValidateHook } from 'payload'
import { type AddressLike, validateAddress } from '@/utilities/address-validation'
import { getTenantDefaultsFromReq } from '@/utilities/tenant-context'

export interface ValidateAddressOptions {
  /**
   * Dot-path on the document where the address lives. Defaults to the top-level
   * (`''`), suitable for the ecommerce plugin's `addresses` collection.
   * Pass `'billingAddress'` / `'shippingAddress'` for nested groups.
   */
  path?: string
  /**
   * Optional explicit fallback country, used only when neither the
   * document nor the request-scoped tenant supplies one. Most callers
   * should leave this unset and let the tenant context cascade decide.
   */
  fallbackCountry?: string
}

function readNested(data: Record<string, unknown>, path: string): unknown {
  if (path === '') return data
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, data)
}

/**
 * Build a `beforeValidate` hook that throws when the document's address
 * fails its country's canonical format.
 */
export function validateAddressHook(
  options: ValidateAddressOptions = {},
): CollectionBeforeValidateHook {
  const path = options.path ?? ''
  return async ({ data, req }) => {
    if (!data) return data
    const target = readNested(data as Record<string, unknown>, path)
    if (!target || typeof target !== 'object') return data

    // International-first: address.country → tenant.country → option → deployment default.
    const targetAddr = target as AddressLike
    let fallback: string | undefined = options.fallbackCountry
    if (
      (typeof targetAddr.country !== 'string' || targetAddr.country.length === 0) &&
      req &&
      'payload' in req
    ) {
      try {
        const tenantDefaults = await getTenantDefaultsFromReq(
          req as Parameters<typeof getTenantDefaultsFromReq>[0],
        )
        fallback = tenantDefaults.country
      } catch {
        /* leave fallback as the option default */
      }
    }

    const result = validateAddress(targetAddr, fallback)
    if (!result.valid) {
      throw new Error(result.errors.join(' '))
    }
    return data
  }
}
