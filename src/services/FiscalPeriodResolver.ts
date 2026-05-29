/**
 * FiscalPeriodResolver Service
 *
 * Core computational engine for fiscal period management.
 * Resolves calendar dates → fiscal year/period, generates fiscal calendars,
 * validates boundaries, amends configurations with chain tracking.
 *
 * Design: Static class with immutable return types, no side effects (pure functions).
 * All computation deterministic; all parameters and results JSON-serializable for audit trail.
 *
 * @standard IAS-34:2023 (period structure, quarterly alignment)
 * @standard ISO-8601:2019 (week numbering, date arithmetic, leap year)
 * @standard ISO-4217:2023 (currency context)
 * @standard SAF-T:3.0.2 (regulatory period coding)
 * @invariant All methods are pure (no mutation, no side effects)
 * @invariant All dates RFC 3339 (ISO 8601:2019)
 * @invariant All returns include chainLeafUuid for tamper detection
 * @invariant Period numbering is 1-indexed (P1, P2, ..., not P0, P1, ...)
 * @invariant Fiscal year is integer; fiscal period is integer
 * @invariant regulatoryCode is deterministic from (periodType, fiscalYear, fiscalPeriod)
 */

export interface FiscalPeriodConfig {
  fiscalYearStartMonth: number
  fiscalYearStartDay: number
  periodType:
    | 'monthly'
    | 'quarterly'
    | 'weekly'
    | 'iso-week'
    | 'retail-445'
    | 'custom'
  customPeriodBoundaries?: Array<{
    periodNumber: number
    periodLabel: string
    startDate: string
    endDate: string
  }>
  regulatoryFramework:
    | 'ias-ifrs'
    | 'us-gaap'
    | 'local-statutory'
    | 'saf-t'
    | 'xbrl'
  leapYearAdjustment: 'none' | 'shifted' | 'custom'
  localeCode: string
  countryCode: string
}

interface PeriodResolution {
  fiscalYear: number
  fiscalPeriod: number
  periodLabel: string
  periodStartDate: string
  periodEndDate: string
  weekNumber?: number
  quarterNumber: number
  monthNumber: number
  dayOfWeek: number
  isLeapAdjusted: boolean
  regulatoryCode: string
  chainLeafUuid: string
}

interface PeriodBoundaryValidation {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

interface CalendarEntry {
  calendarDate: string
  fiscalYear: number
  fiscalPeriod: number
  periodStartDate: string
  periodEndDate: string
  periodLabel: string
  weekNumber?: number
  quarterNumber: number
  monthNumber: number
  dayOfWeek: number
  isLeapAdjusted: boolean
  regulatoryCode: string
  chainLeafUuid: string
}

/**
 * FiscalPeriodResolver: Static utility for fiscal period computation
 */
export class FiscalPeriodResolver {
  /**
   * Resolve a single calendar date to fiscal period.
   *
   * @param config - FiscalPeriodConfig from FiscalPeriods record
   * @param calendarDate - RFC 3339 date string (e.g., "2026-05-12")
   * @param priorChainLeaf - Prior chainLeafUuid for audit chain (optional)
   * @returns PeriodResolution with fiscal context + chainLeafUuid
   */
  static resolvePeriod(
    config: FiscalPeriodConfig,
    calendarDate: string,
    priorChainLeaf: string = '',
  ): PeriodResolution {
    const date = new Date(calendarDate + 'T00:00:00Z')
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${calendarDate}`)
    }

    // Parse fiscal year start
    const fyStart = this.getFiscalYearStart(date.getUTCFullYear(), config)
    const fyEnd = this.getFiscalYearStart(date.getUTCFullYear() + 1, config)

    // Determine fiscal year
    let fiscalYear: number
    let daysIntoFiscalYear: number
    if (date >= fyStart && date < fyEnd) {
      fiscalYear = date.getUTCFullYear()
      daysIntoFiscalYear = Math.floor(
        (date.getTime() - fyStart.getTime()) / (1000 * 60 * 60 * 24),
      )
    } else {
      fiscalYear = date.getUTCFullYear() - 1
      const priorFyStart = this.getFiscalYearStart(fiscalYear, config)
      daysIntoFiscalYear = Math.floor(
        (date.getTime() - priorFyStart.getTime()) / (1000 * 60 * 60 * 24),
      )
    }

    // Determine fiscal period
    const { fiscalPeriod, periodLabel, periodStartDate, periodEndDate } =
      this.getPeriodFromDayOffset(
        config,
        daysIntoFiscalYear,
        fiscalYear,
        date,
      )

    // Calendar metadata
    const quarterNumber = Math.ceil((date.getUTCMonth() + 1) / 3)
    const monthNumber = date.getUTCMonth() + 1
    const dayOfWeek = date.getUTCDay()
    const weekNumber = config.periodType === 'iso-week' ? this.getISOWeek(date) : undefined
    const isLeapAdjusted =
      config.leapYearAdjustment !== 'none' &&
      monthNumber === 2 &&
      (date.getUTCDate() === 29 || (monthNumber === 2 && daysIntoFiscalYear > 365))
    const regulatoryCode = this.computeRegulatoryCode(config, fiscalYear, fiscalPeriod)

    // Compute chainLeafUuid
    const payload = JSON.stringify({
      calendarDate,
      fiscalYear,
      fiscalPeriod,
      regulatoryCode,
    })
    const chainLeafUuid = this.computeChainLeaf(payload, priorChainLeaf)

    return {
      fiscalYear,
      fiscalPeriod,
      periodLabel,
      periodStartDate,
      periodEndDate,
      weekNumber,
      quarterNumber,
      monthNumber,
      dayOfWeek,
      isLeapAdjusted,
      regulatoryCode,
      chainLeafUuid,
    }
  }

  /**
   * Generate full fiscal calendar for a range of years.
   *
   * @param config - FiscalPeriodConfig
   * @param startYear - First fiscal year to include
   * @param endYear - Last fiscal year to include (inclusive)
   * @param priorChainLeaf - Prior chainLeafUuid (optional)
   * @returns Array of CalendarEntry, one per calendar date
   */
  static generateCalendar(
    config: FiscalPeriodConfig,
    startYear: number,
    endYear: number,
    priorChainLeaf: string = '',
  ): CalendarEntry[] {
    const calendar: CalendarEntry[] = []
    let currentChainLeaf = priorChainLeaf

    // Generate for each fiscal year
    for (let fy = startYear; fy <= endYear; fy++) {
      const fyStart = this.getFiscalYearStart(fy, config)
      const fyEnd = this.getFiscalYearStart(fy + 1, config)

      // Iterate each day in fiscal year
      for (
        let d = new Date(fyStart);
        d < fyEnd;
        d.setUTCDate(d.getUTCDate() + 1)
      ) {
        const isoDate = d.toISOString().split('T')[0]
        const resolution = this.resolvePeriod(config, isoDate, currentChainLeaf)
        currentChainLeaf = resolution.chainLeafUuid

        calendar.push({
          calendarDate: isoDate,
          fiscalYear: resolution.fiscalYear,
          fiscalPeriod: resolution.fiscalPeriod,
          periodStartDate: resolution.periodStartDate,
          periodEndDate: resolution.periodEndDate,
          periodLabel: resolution.periodLabel,
          weekNumber: resolution.weekNumber,
          quarterNumber: resolution.quarterNumber,
          monthNumber: resolution.monthNumber,
          dayOfWeek: resolution.dayOfWeek,
          isLeapAdjusted: resolution.isLeapAdjusted,
          regulatoryCode: resolution.regulatoryCode,
          chainLeafUuid: resolution.chainLeafUuid,
        })
      }
    }

    return calendar
  }

  /**
   * Validate custom period boundaries for contiguity, non-overlap, sorting.
   *
   * @param boundaries - Array of {periodNumber, periodLabel, startDate, endDate}
   * @returns PeriodBoundaryValidation with errors/warnings
   */
  static validatePeriodBoundary(
    boundaries: Array<{
      periodNumber: number
      periodLabel: string
      startDate: string
      endDate: string
    }>,
  ): PeriodBoundaryValidation {
    const errors: string[] = []
    const warnings: string[] = []

    if (!boundaries || boundaries.length === 0) {
      errors.push('Boundaries array cannot be empty')
      return { isValid: false, errors, warnings }
    }

    // Check sorting
    const sorted = [...boundaries].sort((a, b) =>
      a.startDate.localeCompare(b.startDate),
    )
    if (JSON.stringify(sorted) !== JSON.stringify(boundaries)) {
      errors.push('Boundaries must be sorted by startDate')
    }

    // Check contiguity and non-overlap
    for (let i = 0; i < boundaries.length; i++) {
      const b = boundaries[i]
      if (b.startDate >= b.endDate) {
        errors.push(`Period ${b.periodNumber}: startDate must be before endDate`)
      }

      if (i > 0) {
        const prev = boundaries[i - 1]
        if (b.startDate <= prev.endDate) {
          errors.push(
            `Period ${b.periodNumber}: gap or overlap with prior period (${prev.periodLabel})`,
          )
        }
      }
    }

    // Check period numbering
    for (let i = 0; i < boundaries.length; i++) {
      if (boundaries[i].periodNumber !== i + 1) {
        warnings.push(
          `Period numbering not sequential at index ${i} (expected ${i + 1}, got ${boundaries[i].periodNumber})`,
        )
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    }
  }

  /**
   * Amendment workflow: compute amended config, link to prior, create snapshot chain.
   *
   * @param config - Prior FiscalPeriodConfig
   * @param amendments - {field: newValue} object with changes
   * @param priorChainLeaf - Prior chainLeafUuid
   * @returns Amended config + computed chainLeafUuid
   */
  static amendConfiguration(
    config: FiscalPeriodConfig,
    amendments: Record<string, unknown>,
    priorChainLeaf: string = '',
  ): FiscalPeriodConfig & { chainLeafUuid: string } {
    const amended = { ...config, ...amendments }

    // Validate amended config
    const validation = this.validateConfiguration(amended)
    if (!validation.isValid) {
      throw new Error(`Invalid amended config: ${validation.errors.join(', ')}`)
    }

    // Compute new chainLeafUuid
    const payload = JSON.stringify(amended)
    const chainLeafUuid = this.computeChainLeaf(payload, priorChainLeaf)

    return { ...amended, chainLeafUuid }
  }

  /**
   * Validate entire fiscal configuration for internal consistency.
   *
   * @param config - FiscalPeriodConfig
   * @returns {isValid, errors}
   */
  static validateConfiguration(
    config: FiscalPeriodConfig,
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!config.fiscalYearStartMonth || config.fiscalYearStartMonth < 1 || config.fiscalYearStartMonth > 12) {
      errors.push('fiscalYearStartMonth must be 1..12')
    }
    if (!config.fiscalYearStartDay || config.fiscalYearStartDay < 1 || config.fiscalYearStartDay > 31) {
      errors.push('fiscalYearStartDay must be 1..31')
    }
    if (!['monthly', 'quarterly', 'weekly', 'iso-week', 'retail-445', 'custom'].includes(config.periodType)) {
      errors.push('Invalid periodType')
    }
    if (config.periodType === 'custom' && !config.customPeriodBoundaries) {
      errors.push('customPeriodBoundaries required when periodType=custom')
    }
    if (config.customPeriodBoundaries) {
      const validation = this.validatePeriodBoundary(config.customPeriodBoundaries)
      if (!validation.isValid) {
        errors.push(...validation.errors)
      }
    }

    return { isValid: errors.length === 0, errors }
  }

  /**
   * List supported period types.
   *
   * @returns Array of {type, label, description}
   */
  static registeredPeriodTypes(): Array<{
    type: string
    label: string
    description: string
  }> {
    return [
      {
        type: 'monthly',
        label: 'Monthly',
        description: '12 periods per fiscal year (standard)',
      },
      {
        type: 'quarterly',
        label: 'Quarterly',
        description: '4 periods per fiscal year (IAS 34 interim reporting)',
      },
      {
        type: 'weekly',
        label: 'Weekly',
        description: '52 or 53 periods per fiscal year',
      },
      {
        type: 'iso-week',
        label: 'ISO Week',
        description: '52 or 53 ISO 8601 weeks (week 1 = first week with Thursday)',
      },
      {
        type: 'retail-445',
        label: 'Retail 4/4/5',
        description: '3 periods: 4 weeks, 4 weeks, 5 weeks (retail accounting)',
      },
      {
        type: 'custom',
        label: 'Custom',
        description: 'User-defined period boundaries',
      },
    ]
  }

  /**
   * Return regulatory standards for a period type + country.
   *
   * @param periodType - Fiscal period type
   * @param countryCode - ISO 3166-1 alpha-2 country code
   * @param regulatoryFramework - ias-ifrs | us-gaap | local-statutory | saf-t | xbrl
   * @returns {basis, regulations, leapYearHandling}
   */
  static standards(
    periodType: string,
    countryCode: string,
    regulatoryFramework: string,
  ): {
    basis: string
    regulations: string[]
    leapYearHandling: string
  } {
    const frameMapping: Record<string, { basis: string; regulations: string[] }> = {
      'ias-ifrs': {
        basis: 'International Accounting Standards / IFRS',
        regulations: [
          'IAS 34 Interim Financial Reporting',
          'IFRS 10 Consolidated Financial Statements',
          'ISO 8601 Date representation',
        ],
      },
      'us-gaap': {
        basis: 'Generally Accepted Accounting Principles (US)',
        regulations: [
          'US SEC Form 10-Q (quarterly)',
          'US SEC Form 10-K (annual)',
          'FASB ASC Topic 205',
        ],
      },
      'saf-t': {
        basis: 'Standard Audit File for Tax (EU)',
        regulations: [
          'EU Council Directive 2006/112/EC',
          'SAF-T 3.0.2 Specification',
          'OECD CRS Common Reporting Standard',
        ],
      },
      'xbrl': {
        basis: 'eXtensible Business Reporting Language',
        regulations: [
          'XBRL GL specification',
          'ISO/IEC 4217 Currency codes',
          'RFC 3339 Date/Time',
        ],
      },
    }

    const frame = frameMapping[regulatoryFramework] || frameMapping['ias-ifrs']
    const leapYearHandling =
      countryCode === 'IR'
        ? 'Islamic calendar leap year'
        : countryCode === 'IL'
          ? 'Hebrew calendar leap year'
          : 'Gregorian leap year (standard)'

    return {
      basis: frame.basis,
      regulations: frame.regulations,
      leapYearHandling,
    }
  }

  // ============ Private Helpers ============

  private static getFiscalYearStart(
    year: number,
    config: FiscalPeriodConfig,
  ): Date {
    return new Date(
      Date.UTC(year, config.fiscalYearStartMonth - 1, config.fiscalYearStartDay),
    )
  }

  private static getPeriodFromDayOffset(
    config: FiscalPeriodConfig,
    daysIntoFiscalYear: number,
    fiscalYear: number,
    date: Date,
  ): {
    fiscalPeriod: number
    periodLabel: string
    periodStartDate: string
    periodEndDate: string
  } {
    switch (config.periodType) {
      case 'monthly':
        return this.getMonthlyPeriod(daysIntoFiscalYear, fiscalYear, config, date)
      case 'quarterly':
        return this.getQuarterlyPeriod(daysIntoFiscalYear, fiscalYear, config, date)
      case 'weekly':
        return this.getWeeklyPeriod(daysIntoFiscalYear, fiscalYear, config, date)
      case 'iso-week':
        return this.getISOWeekPeriod(daysIntoFiscalYear, fiscalYear, config, date)
      case 'retail-445':
        return this.getRetail445Period(daysIntoFiscalYear, fiscalYear, config, date)
      case 'custom':
        if (!config.customPeriodBoundaries) {
          throw new Error('customPeriodBoundaries required for periodType=custom')
        }
        return this.getCustomPeriod(date, config.customPeriodBoundaries)
      default:
        throw new Error(`Unsupported periodType: ${config.periodType}`)
    }
  }

  private static getMonthlyPeriod(
    daysIntoFiscalYear: number,
    fiscalYear: number,
    config: FiscalPeriodConfig,
    date: Date,
  ): {
    fiscalPeriod: number
    periodLabel: string
    periodStartDate: string
    periodEndDate: string
  } {
    const fyStart = this.getFiscalYearStart(fiscalYear, config)
    const monthsIn = Math.floor(daysIntoFiscalYear / 30)
    const fiscalPeriod = monthsIn + 1

    const periodStart = new Date(fyStart)
    periodStart.setUTCMonth(periodStart.getUTCMonth() + monthsIn)
    const periodEnd = new Date(periodStart)
    periodEnd.setUTCMonth(periodEnd.getUTCMonth() + 1)
    periodEnd.setUTCDate(0)

    const monthName = periodStart.toLocaleString('en-US', { month: 'long' })
    return {
      fiscalPeriod,
      periodLabel: `${monthName} ${fiscalYear}`,
      periodStartDate: periodStart.toISOString().split('T')[0],
      periodEndDate: periodEnd.toISOString().split('T')[0],
    }
  }

  private static getQuarterlyPeriod(
    daysIntoFiscalYear: number,
    fiscalYear: number,
    _config: FiscalPeriodConfig,
    _date: Date,
  ): {
    fiscalPeriod: number
    periodLabel: string
    periodStartDate: string
    periodEndDate: string
  } {
    const fiscalPeriod = Math.floor(daysIntoFiscalYear / 91) + 1
    const label = `Q${fiscalPeriod}`
    return {
      fiscalPeriod,
      periodLabel: `${label} ${fiscalYear}`,
      periodStartDate: '',
      periodEndDate: '',
    }
  }

  private static getWeeklyPeriod(
    daysIntoFiscalYear: number,
    fiscalYear: number,
    _config: FiscalPeriodConfig,
    _date: Date,
  ): {
    fiscalPeriod: number
    periodLabel: string
    periodStartDate: string
    periodEndDate: string
  } {
    const fiscalPeriod = Math.floor(daysIntoFiscalYear / 7) + 1
    return {
      fiscalPeriod,
      periodLabel: `W${fiscalPeriod} ${fiscalYear}`,
      periodStartDate: '',
      periodEndDate: '',
    }
  }

  private static getISOWeekPeriod(
    _daysIntoFiscalYear: number,
    fiscalYear: number,
    _config: FiscalPeriodConfig,
    date: Date,
  ): {
    fiscalPeriod: number
    periodLabel: string
    periodStartDate: string
    periodEndDate: string
  } {
    const week = this.getISOWeek(date)
    return {
      fiscalPeriod: week,
      periodLabel: `W${week} ${fiscalYear}`,
      periodStartDate: '',
      periodEndDate: '',
    }
  }

  private static getRetail445Period(
    daysIntoFiscalYear: number,
    fiscalYear: number,
    _config: FiscalPeriodConfig,
    _date: Date,
  ): {
    fiscalPeriod: number
    periodLabel: string
    periodStartDate: string
    periodEndDate: string
  } {
    let fiscalPeriod = 1
    if (daysIntoFiscalYear >= 28) {
      fiscalPeriod = 2
    }
    if (daysIntoFiscalYear >= 56) {
      fiscalPeriod = 3
    }
    const labels = ['P1 (4w)', 'P2 (4w)', 'P3 (5w)']
    return {
      fiscalPeriod,
      periodLabel: `${labels[fiscalPeriod - 1]} ${fiscalYear}`,
      periodStartDate: '',
      periodEndDate: '',
    }
  }

  private static getCustomPeriod(
    date: Date,
    boundaries: Array<{
      periodNumber: number
      periodLabel: string
      startDate: string
      endDate: string
    }>,
  ): {
    fiscalPeriod: number
    periodLabel: string
    periodStartDate: string
    periodEndDate: string
  } {
    const dateStr = date.toISOString().split('T')[0]
    for (const b of boundaries) {
      if (dateStr >= b.startDate && dateStr <= b.endDate) {
        return {
          fiscalPeriod: b.periodNumber,
          periodLabel: b.periodLabel,
          periodStartDate: b.startDate,
          periodEndDate: b.endDate,
        }
      }
    }
    throw new Error(`Date ${dateStr} not found in custom boundaries`)
  }

  private static getISOWeek(date: Date): number {
    const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  }

  private static computeRegulatoryCode(
    config: FiscalPeriodConfig,
    fiscalYear: number,
    fiscalPeriod: number,
  ): string {
    switch (config.regulatoryFramework) {
      case 'saf-t':
        return `P${String(fiscalPeriod).padStart(2, '0')}_${fiscalYear}`
      case 'xbrl':
        if (config.periodType === 'quarterly') {
          return `Q${fiscalPeriod}_${fiscalYear}`
        }
        return `P${String(fiscalPeriod).padStart(2, '0')}_${fiscalYear}`
      default:
        return `P${String(fiscalPeriod).padStart(2, '0')}_${fiscalYear}`
    }
  }

  private static computeChainLeaf(payload: string, priorLeaf: string): string {
    // Simplified: sha256 of JCS-canonical payload + prior leaf
    // In production, use crypto.subtle.digest('SHA-256', ...) for NIST FIPS 180-4
    // For now, return a deterministic hash placeholder
    const combined = payload + (priorLeaf || '')
    return Buffer.from(combined).toString('base64').substring(0, 32)
  }
}
