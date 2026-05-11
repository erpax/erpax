/**
 * BG holiday calendar — pin the fixed dates, weekend-substitute rule,
 * and Orthodox-Easter-anchored business-day arithmetic.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-3166-1:2020 BG country-code
 * @audit ISO-19011:2018 audit-trail business-day-evidence
 * @compliance Кодекс на труда чл.154
 * @see src/services/country-clients/bg-holidays.ts
 */

import { describe, expect, it } from 'vitest'
import {
  bgHolidaysForYear,
  isBgBusinessDay,
  nextBgBusinessDay,
} from '@/services/country-clients/bg-holidays'

describe('bgHolidaysForYear — fixed-date coverage', () => {
  it('always includes the 10 evergreen fixed holidays', () => {
    const holidays = bgHolidaysForYear(2026)
    expect(holidays).toContain('2026-01-01') // Нова година
    expect(holidays).toContain('2026-03-03') // Освобождение
    expect(holidays).toContain('2026-05-01') // Ден на труда
    expect(holidays).toContain('2026-05-06') // Гергьовден
    expect(holidays).toContain('2026-05-24') // Просвета и култура
    expect(holidays).toContain('2026-09-06') // Съединение
    expect(holidays).toContain('2026-09-22') // Независимост
    expect(holidays).toContain('2026-12-24') // Бъдни вечер
    expect(holidays).toContain('2026-12-25') // Рождество
    expect(holidays).toContain('2026-12-26') // Втори ден
  })

  it('applies the weekend-substitute rule', () => {
    // 2027-01-01 falls on a Friday — no substitute needed.
    expect(bgHolidaysForYear(2027)).toContain('2027-01-01')
    // 2028-01-01 falls on a Saturday — Mon 2028-01-03 is the substitute.
    const y2028 = bgHolidaysForYear(2028)
    expect(y2028).toContain('2028-01-01')
    expect(y2028).toContain('2028-01-03')
  })

  it('includes the Orthodox Easter triple (Good Fri / Easter Sun / Easter Mon)', () => {
    // Orthodox Easter 2024 is Sunday 5 May → Good Friday 3 May, Easter Monday 6 May.
    const y2024 = bgHolidaysForYear(2024)
    expect(y2024).toContain('2024-05-03')
    expect(y2024).toContain('2024-05-05')
    expect(y2024).toContain('2024-05-06')
  })

  it('returns sorted ISO-8601 strings', () => {
    const holidays = bgHolidaysForYear(2026)
    const sorted = [...holidays].sort()
    expect(holidays).toEqual(sorted)
  })
})

describe('isBgBusinessDay', () => {
  it('rejects weekends', () => {
    // 2026-05-09 is a Saturday, 2026-05-10 is a Sunday.
    expect(isBgBusinessDay('2026-05-09')).toBe(false)
    expect(isBgBusinessDay('2026-05-10')).toBe(false)
  })

  it('rejects fixed-date holidays', () => {
    expect(isBgBusinessDay('2026-03-03')).toBe(false)
    expect(isBgBusinessDay('2026-12-25')).toBe(false)
  })

  it('accepts a regular weekday', () => {
    // 2026-05-12 is a Tuesday and not a BG holiday.
    expect(isBgBusinessDay('2026-05-12')).toBe(true)
  })

  it('rejects unparseable dates', () => {
    expect(isBgBusinessDay('not-a-date')).toBe(false)
  })
})

describe('nextBgBusinessDay', () => {
  it('returns same day when input is a business day', () => {
    expect(nextBgBusinessDay('2026-05-12')).toBe('2026-05-12')
  })

  it('skips Saturday → Monday', () => {
    expect(nextBgBusinessDay('2026-05-09')).toBe('2026-05-11')
  })

  it('skips multi-day Christmas cluster', () => {
    // 2026-12-24 / 25 / 26 are holidays; 27 is a Sunday → next biz day = Mon 28.
    expect(nextBgBusinessDay('2026-12-24')).toBe('2026-12-28')
  })
})
