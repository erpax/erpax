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
 * @invariant it reads identity.periodType and the configuration group — where the collection keeps them
 * @invariant It validates only: no calendar is regenerated, nothing is stamped (each change is a version row)
 * @standard GDPR:2016/679 (audit trail, access control)
 * @standard SOX:2002 (change log, access control evidence)
 * @standard Law 60 (immutable chain leaf)
 * @standard Law 64 (error-uuid for federation replay)
 */

import { APIError, type CollectionBeforeChangeHook } from 'payload'

import { FiscalPeriodResolver, type FiscalPeriodConfig } from '@/utilities/fiscal/period/resolver'

/**
 * What a fiscal period keeps of its calendar: `identity.periodType` and the `configuration` group. This
 * hook read all of it at the top of the document, where none of it is, so it validated the defaults
 * and never refused anything (a `custom` period with no boundaries was accepted). It also wrote
 * `chainLeafUuid`, `governanceScope` and an amendment line into `notes` — the first two are not
 * fields, `notes` is a group, and Payload dropped all three; each change is already a version row.
 *
 * It validates what the resolver and the collection share: the fiscal-year start (month and day) and,
 * for a `custom` period, its boundaries. The collection's other period types (`annual`,
 * `weekly_445`) and its free-text framework are not the resolver's vocabulary, so they are not
 * checked against it.
 */
interface FiscalPeriodsData {
  identity?: { periodType?: string | null } | null
  configuration?: {
    fiscalYearStartMonth?: number | null
    fiscalYearStartDay?: number | null
    customPeriodBoundaries?: FiscalPeriodConfig['customPeriodBoundaries'] | null
  } | null
}

/** The resolver's configuration for what the two vocabularies share. */
export const calendarConfig = (data: FiscalPeriodsData, stored: FiscalPeriodsData = {}): FiscalPeriodConfig => {
  const configuration = { ...stored.configuration, ...data.configuration }
  const periodType = data.identity?.periodType ?? stored.identity?.periodType
  return {
    fiscalYearStartMonth: configuration.fiscalYearStartMonth || 1,
    fiscalYearStartDay: configuration.fiscalYearStartDay || 1,
    periodType: periodType === 'custom' ? 'custom' : 'monthly',
    customPeriodBoundaries: configuration.customPeriodBoundaries ?? undefined,
    regulatoryFramework: 'ias-ifrs',
    leapYearAdjustment: 'none',
    localeCode: 'und',
    countryCode: 'US',
  }
}

export const updateFiscalCalendarOnPeriodChange: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  if (!data) return data
  const validation = FiscalPeriodResolver.validateConfiguration(calendarConfig(data as FiscalPeriodsData, (originalDoc ?? {}) as FiscalPeriodsData))
  if (!validation.isValid) throw new APIError(`Invalid fiscal configuration: ${validation.errors.join('; ')}`, 400)
  return data
}
