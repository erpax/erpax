/**
 * Fiscal config resolver — the СУПТО branch of the config cascade.
 *
 * Nothing in the fiscalization path is a hardcoded constant: whether the
 * fiscal-device regime applies, the receipt currency, and the VAT bands all
 * resolve through the cascade **deployment → country → tenant → device**
 * (mirrors `tenant-context.resolveRequestConfig`, but keyed by a tenant id from
 * a domain event rather than a request's user).
 *
 *   - **applies**  — does the tenant's jurisdiction mandate a fiscal device?
 *                    Derived from `tenant.config.identity.country` →
 *                    `COUNTRY_SPECIFICS[country].fiscalDeviceRegime`. A tenant
 *                    outside such a jurisdiction has NO касов бон obligation —
 *                    so "no device" there means *out of regime* (skip), not a
 *                    bypass. Only an in-regime tenant with no device is a
 *                    compliance misconfiguration.
 *   - **currency** — device override → tenant reporting currency → country.
 *   - **rates**    — device tax-group rates → country VAT bands.
 *   - **deviceNumber** — the tenant's active ФУ individual number.
 *
 * @standard BG Наредба-Н-18 §СУПТО fiscal-device-regime
 * @standard ISO-3166-1:2020 country-codes (jurisdiction) · ISO-4217:2015 currency
 * @see src/utilities/tenant-context.ts · src/config/country-specifics.ts · src/collections/FiscalDevices/index.ts
 */

import type { Payload, PayloadRequest } from 'payload'
import { COUNTRY_SPECIFICS } from '@/config/country-specifics'
import { getTenantDefaults } from '@/config/regional-defaults'

export interface FiscalContext {
  /** Does the tenant's jurisdiction mandate a fiscal-device regime? */
  readonly applies: boolean
  /** The regime identifier (e.g. `naredba-n-18`), when one applies. */
  readonly regime?: string
  /** Resolved jurisdiction (ISO 3166-1 alpha-2). */
  readonly country: string
  /** Resolved receipt currency (device → tenant → country). */
  readonly currency: string
  /** Standard VAT rate (%) — device standard group → country default. */
  readonly standardRate: number
  /** Reduced VAT rates (%) in this jurisdiction. */
  readonly reducedRates: ReadonlyArray<number>
  /** The tenant's active ФУ individual number, if registered. */
  readonly deviceNumber?: string
  /** Per-device active tax groups (group letter → rate), if configured. */
  readonly taxGroups?: ReadonlyArray<{ group?: string; rate?: number }>
}

interface TenantConfigLike {
  country?: unknown
  config?: {
    identity?: { country?: unknown }
    currency?: { reportingCurrency?: unknown }
  } | null
}

interface DeviceLike {
  individualNumber?: unknown
  currency?: unknown
  taxGroups?: ReadonlyArray<{ group?: string; rate?: number }> | null
}

const str = (v: unknown): string | undefined => (typeof v === 'string' && v ? v : undefined)

/** Resolve the tenant's jurisdiction (config.identity.country → legacy country → ''). */
function tenantCountry(t: TenantConfigLike | null): string {
  return str(t?.config?.identity?.country) ?? str(t?.country) ?? ''
}

/**
 * Resolve the fiscal context for a tenant (and its active device). Performs at
 * most two reads (tenant doc + first active device). Never throws — callers
 * (the membrane) decide what `applies` + `deviceNumber` mean for their flow.
 */
export async function resolveFiscalContext(
  payload: Payload,
  args: { tenant: string; req?: PayloadRequest },
): Promise<FiscalContext> {
  const { tenant, req } = args

  let tenantDoc: TenantConfigLike | null = null
  if (tenant) {
    try {
      tenantDoc = (await payload.findByID({
        collection: 'tenants' as never,
        id: tenant,
        depth: 0,
        overrideAccess: true,
        req,
      })) as unknown as TenantConfigLike
    } catch {
      tenantDoc = null
    }
  }

  const country = tenantCountry(tenantDoc)
  const specifics = country ? COUNTRY_SPECIFICS[country.toUpperCase()] : undefined
  const regime = specifics?.fiscalDeviceRegime
  const applies = Boolean(regime)

  // Active device for the tenant (the ФУ this tenant issues on).
  let device: DeviceLike | undefined
  if (tenant) {
    try {
      const found = await payload.find({
        collection: 'fiscal-devices' as never,
        where: { tenant: { equals: tenant }, status: { equals: 'active' } } as never,
        limit: 1,
        overrideAccess: true,
        req,
      })
      device = found.docs[0] as DeviceLike | undefined
    } catch {
      device = undefined
    }
  }

  // Currency: device override → tenant reporting currency → country-derived.
  const tenantCurrency = str(tenantDoc?.config?.currency?.reportingCurrency)
  const countryCurrency = getTenantDefaults(country || undefined).currency
  const currency = str(device?.currency) ?? tenantCurrency ?? countryCurrency

  // Standard rate: device standard group (Б/20% slot) → country default → 20.
  const taxGroups = device?.taxGroups ?? undefined
  const deviceStandard = taxGroups?.find((g) => g.group === 'Б' && typeof g.rate === 'number')?.rate
  const standardRate = deviceStandard ?? specifics?.defaultVatRate ?? 20

  return {
    applies,
    regime,
    country,
    currency,
    standardRate,
    reducedRates: specifics?.reducedVatRates ?? [],
    deviceNumber: str(device?.individualNumber),
    taxGroups,
  }
}
