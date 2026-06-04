/**
 * Template builder — derives a template's `tenant` + `compliance` from the
 * live country-context so the two agree on country + reporting currency by
 * construction. Extracted from `./templates.ts` so `./bg-nss.ts` can build a
 * template without a circular import.
 *
 * @see ./templates.ts
 * @see ./bg-nss.ts
 */

import { resolveCountryContext } from '@/country/context'
import { resolveTenantCompliance } from '@/accounting/seeds/template/compliance'
import type { IndustryTemplate, SeedAccount, SeedTransaction } from '@/accounting/seeds/template/types'

export interface BuildTemplateArgs {
  readonly id: string
  readonly label: string
  readonly description: string
  readonly country: string
  readonly standards: ReadonlyArray<string>
  readonly chartOfAccounts: ReadonlyArray<SeedAccount>
  readonly sampleTransactions?: ReadonlyArray<SeedTransaction>
  /** Per-tenant reporting-currency override; defaults to the country currency. */
  readonly reportingCurrency?: string
}

export function buildTemplate(args: BuildTemplateArgs): IndustryTemplate {
  const ctx = resolveCountryContext({ country: args.country })
  const compliance = resolveTenantCompliance({
    country: args.country,
    reportingCurrency: args.reportingCurrency,
  })
  return {
    id: args.id,
    label: args.label,
    description: args.description,
    standards: args.standards,
    chartOfAccounts: args.chartOfAccounts,
    sampleTransactions: args.sampleTransactions,
    tenant: {
      country: ctx.country,
      reportingCurrency: compliance.reportingCurrency,
      accountingStandard: ctx.profile.accountingStandard,
      fiscalYearStartMonth: ctx.helpers.fiscalYearStartMonth(),
    },
    compliance,
  }
}
