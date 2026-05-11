/**
 * BG public-holiday calendar — non-banking days the value-date /
 * settlement-date / due-date arithmetic must skip.
 *
 * Source: Кодекс на труда (Labour Code) art.154 + per-year decree from
 * the Council of Ministers. Fixed-date holidays are evergreen; the
 * Easter-anchored ones (Good Friday, Easter Monday) shift annually and
 * use the Orthodox Easter date (Julian-derived calculation).
 *
 * Returns ISO-8601 `YYYY-MM-DD` strings. Always 13 days per year (10
 * fixed + 3 Orthodox Easter); when a fixed date falls on a weekend the
 * Council typically declares the next Monday a substitute holiday — that
 * substitution is applied here so `isBgBusinessDay` round-trips cleanly.
 *
 * @standard ISO-3166-1:2020 BG country-code
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO-19011:2018 audit-trail business-day-evidence
 * @compliance Кодекс на труда чл.154 official-holidays
 * @see ../../config/country-specifics.ts (BG.fiscalYearStartMonth)
 */

/**
 * Fixed-date BG holidays. `(month, day)` tuples — same every year unless
 * the Council of Ministers decrees a substitute (handled below).
 */
const BG_FIXED_HOLIDAYS: ReadonlyArray<readonly [number, number, string]> = [
  [1, 1, 'Нова година'],
  [3, 3, 'Ден на Освобождението'],
  [5, 1, 'Ден на труда'],
  [5, 6, 'Гергьовден / Ден на храбростта'],
  [5, 24, 'Ден на българската просвета и култура'],
  [9, 6, 'Ден на Съединението'],
  [9, 22, 'Ден на Независимостта'],
  [12, 24, 'Бъдни вечер'],
  [12, 25, 'Рождество Христово'],
  [12, 26, 'Втори ден на Коледа'],
]

/**
 * Compute Orthodox Easter for a given year using the Meeus / Gauss-style
 * Julian-derived algorithm. Returns ISO-8601 `YYYY-MM-DD`.
 */
function orthodoxEaster(year: number): string {
  const a = year % 4
  const b = year % 7
  const c = year % 19
  const d = (19 * c + 15) % 30
  const e = (2 * a + 4 * b - d + 34) % 7
  const julianMonth = Math.floor((d + e + 114) / 31) // 3 = March, 4 = April
  const julianDay = ((d + e + 114) % 31) + 1
  // Convert Julian → Gregorian: add (year/100 difference) days. For the
  // 21st century the offset is 13.
  const offset = year < 2100 ? 13 : year < 2200 ? 14 : 15
  const julianDate = Date.UTC(year, julianMonth - 1, julianDay)
  const gregorianDate = new Date(julianDate + offset * 86_400_000)
  const yyyy = gregorianDate.getUTCFullYear()
  const mm = String(gregorianDate.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(gregorianDate.getUTCDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

/**
 * Return the list of BG public holidays for a given fiscal year as
 * ISO-8601 `YYYY-MM-DD` strings, sorted ascending.
 */
export function bgHolidaysForYear(year: number): ReadonlyArray<string> {
  const dates = new Set<string>()

  for (const [month, day] of BG_FIXED_HOLIDAYS) {
    const iso = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    dates.add(iso)
    // Council substitute rule: if a fixed holiday falls on Sat/Sun, the
    // following Monday is declared a substitute. (1 May 2022 → 2 May 2022
    // Monday is the canonical example.)
    const dow = new Date(iso + 'T00:00:00Z').getUTCDay()
    if (dow === 0 /* Sun */) {
      dates.add(addDaysIso(iso, 1))
    } else if (dow === 6 /* Sat */) {
      dates.add(addDaysIso(iso, 2))
    }
  }

  // Orthodox Easter Friday + Monday (Sunday itself is already a weekend).
  const easter = orthodoxEaster(year)
  dates.add(addDaysIso(easter, -2)) // Велики петък (Good Friday)
  dates.add(easter) // Великден (Easter Sunday)
  dates.add(addDaysIso(easter, 1)) // Светли понеделник (Easter Monday)

  return [...dates].sort()
}

/**
 * True when `date` (ISO-8601 `YYYY-MM-DD`) is a BG business day —
 * weekday AND not a public holiday.
 */
export function isBgBusinessDay(date: string): boolean {
  const d = new Date(date + 'T00:00:00Z')
  if (Number.isNaN(d.getTime())) return false
  const dow = d.getUTCDay()
  if (dow === 0 || dow === 6) return false
  const year = d.getUTCFullYear()
  return !bgHolidaysForYear(year).includes(date)
}

/**
 * Return the next BG business day on/after `date`. Used by SEPA-CT
 * value-date / due-date arithmetic — payment runs scheduled on a
 * Saturday land on Monday.
 */
export function nextBgBusinessDay(date: string): string {
  let cursor = date
  while (!isBgBusinessDay(cursor)) {
    cursor = addDaysIso(cursor, 1)
  }
  return cursor
}

function addDaysIso(iso: string, days: number): string {
  const ms = new Date(iso + 'T00:00:00Z').getTime() + days * 86_400_000
  return new Date(ms).toISOString().slice(0, 10)
}
