/**
 * updateFiscalCalendarOnPeriodChange Hook
 *
 * beforeChange hook for FiscalPeriods collection.
 * When fiscal period configuration is amended, regenerate associated FiscalCalendars,
 * create audit snapshots, emit chain leaf uuid, and validate boundaries.
 *
 * WHAT IT ACTUALLY DOES — validate the amended config, and chain its leaf. That is all, and the claims
 * below now say so ([[rules]]/refutable found four with no proof beside them; two were false).
 *
 * The banner described a seven-step workflow — regenerate the calendar, write FiscalPeriodSnapshots, link
 * supercedes, emit an error-uuid. Steps 3, 4, 5 and 7 do not exist. The file says so itself, at the bottom:
 * "Calendar regeneration and snapshot creation SHOULD happen in afterChange hook". There is no afterChange
 * hook. "Snapshots created before calendar regeneration" was a claim about two things that never happen.
 *
 * THE GAP THIS LEAVES — say it plainly, because it is load-bearing now:
 * fiscal-calendars is written by a SEED and by nothing else. Amending a fiscal period config does NOT
 * regenerate it. validate/fiscal/period/posting READS that calendar to stamp every posting's period, so a
 * config amended after the calendar was generated leaves postings on the OLD structure — silently, because
 * the calendar still resolves. That is the next thing to build, and it is not built.
 *
 * This hook is also attached to no collection: fiscal-periods does not use it, and the @/hooks barrel that
 * re-exports it is imported only by its own test.
 *
 * @invariant An invalid config or boundary set THROWS — never silently corrected
 * @invariant chainLeafUuid = the fold over the amended config, chained to the prior revision
 * @invariant It validates and stamps only: no calendar is regenerated, no snapshot is written
 * @standard GDPR:2016/679 (audit trail, access control)
 * @standard SOX:2002 (change log, access control evidence)
 * @standard Law 60 (immutable chain leaf)
 * @standard Law 64 (error-uuid for federation replay)
 */

import { CollectionBeforeChangeHook } from 'payload'
import { chainLeaf } from '@/merge'
import { FiscalPeriodResolver, type FiscalPeriodConfig } from '@/fiscal/period/resolver'
import { getUser } from '@/auth'

interface FiscalPeriodsData {
  id: string
  entity?: string | { id: string }
  fiscalYearStartMonth?: number
  fiscalYearStartDay?: number
  periodType?: FiscalPeriodConfig['periodType']
  customPeriodBoundaries?: FiscalPeriodConfig['customPeriodBoundaries']
  regulatoryFramework?: FiscalPeriodConfig['regulatoryFramework']
  leapYearAdjustment?: FiscalPeriodConfig['leapYearAdjustment']
  localeCode?: string
  countryCode?: string
  supercedes?: string
  status?: string
  effectiveDate?: string
  governanceScope?: unknown
  chainLeafUuid?: string
  createdBy?: string | { id: string }
  notes?: string
}

export const updateFiscalCalendarOnPeriodChange: CollectionBeforeChangeHook<FiscalPeriodsData> = async (args) => {
  const { data, operation, req } = args

  // Skip if not a change operation or if not enabled
  if (operation !== 'update' && operation !== 'create') {
    return
  }

  // Extract configuration fields
  const config = {
    fiscalYearStartMonth: data.fiscalYearStartMonth || 1,
    fiscalYearStartDay: data.fiscalYearStartDay || 1,
    periodType: data.periodType || 'monthly',
    customPeriodBoundaries: data.customPeriodBoundaries,
    regulatoryFramework: data.regulatoryFramework || 'ias-ifrs',
    leapYearAdjustment: data.leapYearAdjustment || 'none',
    localeCode: data.localeCode || 'und',
    countryCode: data.countryCode || 'US',
  }

  // Validate configuration
  const validation = FiscalPeriodResolver.validateConfiguration(config)
  if (!validation.isValid) {
    throw new Error(`Invalid fiscal configuration: ${validation.errors.join('; ')}`)
  }

  // Detect if this is an amendment (only for update operation)
  const isAmendment = operation === 'update'

  // A second boundary validation lived here, guarded by `isAmendment` — and it was UNREACHABLE.
  // validateConfiguration above already folds validatePeriodBoundary's errors in for a custom periodType, so
  // any invalid boundary has already thrown; nothing could ever reach the copy. The same law stated twice,
  // where the second statement never runs and is free to drift from the first — which is how the audit leaf
  // came to be hand-rolled eight times ([[merge]]/chainLeaf). It is stated once, in the resolver.

  // The amendment's leaf — the fold ([[merge]]/chainLeaf), chained to the config's prior revision. This was
  // the TENTH copy of the base64 stub, and like the ninth it hid from the grep that found the first eight by
  // splitting `.toString('base64')` and `.substring(0, 32)` across two statements. It sat under
  // "@invariant All changes auditable via chainLeafUuid" — auditable by a reversible encoding covering the
  // first 24 bytes of its input, which here is the opening of `periodType`. Every other field of the amended
  // config — the year start, the regulatory framework, the custom boundaries — was past the window, so an
  // amendment to any of them left the audit leaf UNCHANGED.
  data.chainLeafUuid = chainLeaf(
    {
      periodType: config.periodType,
      fiscalYearStartMonth: config.fiscalYearStartMonth,
      fiscalYearStartDay: config.fiscalYearStartDay,
      regulatoryFramework: config.regulatoryFramework,
      customBoundaries: config.customPeriodBoundaries || null,
    },
    args.originalDoc?.chainLeafUuid || '',
  )

  // Store governance scope if not already set (Law 63)
  if (!data.governanceScope) {
    data.governanceScope = {
      entitySelfGoverns: true,
      approvalRequired: true,
      amendmentAuthority: ['super-admin', 'admin'],
      auditLevel: 'full',
    }
  }

  // Prepare user context for audit trail
  const _userId = req.user?.id || 'system'
  const userName = getUser(req)?.email || 'system'

  // Update notes with amendment context if this is an update
  if (isAmendment && operation === 'update') {
    const existingNotes = data.notes || ''
    const timestamp = new Date().toISOString()
    const amendment = `\n\n[AMENDMENT ${timestamp}]\nAmended by: ${userName}\nConfiguration hash: ${data.chainLeafUuid}\nPeriodType: ${config.periodType}`
    data.notes = existingNotes + amendment
  }

  // NOT DONE HERE, and not done anywhere: the calendar is not regenerated and no snapshot is written. The
  // banner claimed both for as long as it existed. fiscal-calendars is written by a seed only, and
  // validate/fiscal/period/posting now READS it to stamp every posting — so amending a config after the
  // calendar was generated silently leaves postings on the old structure. See this atom's SKILL.
  return data
}
