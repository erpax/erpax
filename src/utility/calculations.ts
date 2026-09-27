import { exactAbs, exactCeil, exactFloor, exactMax, exactMin } from '@/algebra'

/**
 * Calculate percentage
 */
export const calculatePercentage = (value: number, total: number): number => {
  return total !== 0 ? (value / total) * 100 : 0;
};

/**
 * Calculate variance percentage
 */
export const calculateVariancePercent = (actual: number, budget: number): number => {
  return budget !== 0 ? ((actual - budget) / budget) * 100 : 0;
};

/**
 * Calculate book value
 */
export const calculateBookValue = (cost: number, accumulatedDepreciation: number): number => {
  return cost - accumulatedDepreciation;
};

/**
 * Calculate depreciable base
 */
export const calculateDepreciableBase = (cost: number, residualValue: number): number => {
  return cost - residualValue;
};

/**
 * Calculate straight-line depreciation
 */
export const calculateStraightLineDepreciation = (
  depreciableBase: number,
  usefulLifeYears: number,
): number => {
  return usefulLifeYears > 0 ? depreciableBase / usefulLifeYears : 0;
};

/**
 * Calculate declining balance depreciation.
 *
 * Per-period expense = book value × (rate / 100). Caller supplies an
 * application-level rate (e.g. 1.5× straight-line for 150% DB, 2× for
 * double declining — see calculateDoubleDecliningBalanceDepreciation
 * for the canonical 2/N derivation).
 *
 * @accounting IFRS IAS-16 §62 depreciation-methods diminishing-balance
 * @accounting US-GAAP ASC-360-10-35 depreciation declining-balance
 */
export const calculateDecliningBalanceDepreciation = (
  bookValue: number,
  depreciationRate: number,
): number => {
  return bookValue * (depreciationRate / 100);
};

/**
 * Calculate double declining balance (DDB) depreciation for a period.
 *
 * Rate = 2 / usefulLifeYears applied to current book value. The final
 * period's expense is floored so book value never crosses below the
 * residual value (the canonical DDB stop rule per IAS 16 / ASC 360).
 *
 * @accounting IFRS IAS-16 §62 depreciation-methods double-declining-balance
 * @accounting US-GAAP ASC-360-10-35-7 declining-balance
 */
export const calculateDoubleDecliningBalanceDepreciation = (
  bookValue: number,
  usefulLifeYears: number,
  residualValue = 0,
): number => {
  if (usefulLifeYears <= 0) return 0;
  const rate = 2 / usefulLifeYears;
  const raw = bookValue * rate;
  // Stop rule: don't depreciate below residual.
  const headroom = bookValue - residualValue;
  if (headroom <= 0) return 0;
  return raw > headroom ? headroom : raw;
};

/**
 * Calculate sum-of-years-digits (SYD) depreciation for a single year.
 *
 * Year fraction = (usefulLife - currentYear + 1) / Σ(1..usefulLife).
 * `currentYearOneIndexed` is 1 in the first year, 2 in the second, etc.
 * Returns 0 outside the useful-life window.
 *
 * @accounting IFRS IAS-16 §62 depreciation-methods sum-of-years-digits
 * @accounting US-GAAP ASC-360-10-35 depreciation
 */
export const calculateSumOfYearsDigitsDepreciation = (
  depreciableBase: number,
  usefulLifeYears: number,
  currentYearOneIndexed: number,
): number => {
  if (usefulLifeYears <= 0) return 0;
  if (currentYearOneIndexed < 1 || currentYearOneIndexed > usefulLifeYears) return 0;
  // Σ(1..n) = n(n+1)/2 — exact, integer-safe for typical lives.
  const sumOfYears = (usefulLifeYears * (usefulLifeYears + 1)) / 2;
  const numerator = usefulLifeYears - currentYearOneIndexed + 1;
  return depreciableBase * (numerator / sumOfYears);
};

/**
 * Calculate units-of-activity (UOA, a.k.a. units-of-production) depreciation.
 *
 * Per-unit expense = depreciableBase / totalUnitsExpected.
 * Period expense = perUnit × unitsProducedThisPeriod, capped so cumulative
 * units never exceed totalUnitsExpected (canonical UOA stop rule).
 *
 * @accounting IFRS IAS-16 §62 depreciation-methods units-of-production
 * @accounting US-GAAP ASC-360-10-35 depreciation activity-method
 */
export const calculateUnitsOfActivityDepreciation = (
  depreciableBase: number,
  totalUnitsExpected: number,
  unitsProducedThisPeriod: number,
  unitsProducedToDate = 0,
): number => {
  if (totalUnitsExpected <= 0 || unitsProducedThisPeriod <= 0) return 0;
  const perUnit = depreciableBase / totalUnitsExpected;
  const remainingUnits = exactMax(0, totalUnitsExpected - unitsProducedToDate);
  const billableUnits = exactMin(unitsProducedThisPeriod, remainingUnits);
  return perUnit * billableUnits;
};

/**
 * Calculate weighted average cost per unit
 */
export const calculateWeightedAverageCost = (
  openingQuantity: number,
  openingUnitCost: number,
  purchasedQuantity: number,
  purchasedUnitCost: number,
): number => {
  const totalCost = openingQuantity * openingUnitCost + purchasedQuantity * purchasedUnitCost;
  const totalQuantity = openingQuantity + purchasedQuantity;
  return totalQuantity > 0 ? totalCost / totalQuantity : 0;
};

/**
 * Canonical aging buckets — consumed by AR/AP aging and bank-reconciliation
 * outstanding-item aging. Per the finance:reconciliation skill:
 *
 *   current  : 0-30 days  (within normal processing cycle)
 *   aging    : 31-60 days (investigate)
 *   overdue  : 61-90 days (escalate)
 *   stale    : 90+ days   (controller / management review)
 *
 * @audit ISO-19011:2018 audit-trail aging-of-outstanding-items
 */
export type AgingBucketKey = 'current' | 'aging' | 'overdue' | 'stale';

/**
 * Bucket an item's age in days into the canonical four buckets.
 * Negative ages (future-dated) map to `current` so report rows still
 * surface — caller can filter if needed.
 */
export const bucketAgeDays = (ageDays: number): AgingBucketKey => {
  if (ageDays <= 30) return 'current';
  if (ageDays <= 60) return 'aging';
  if (ageDays <= 90) return 'overdue';
  return 'stale';
};

/**
 * Days between two dates, floored to whole days. `to − from`.
 * Single source of truth for "how old is this item" — consumed by:
 *   • bank-reconciliation.service.ts aging
 *   • parties/aging.ts (re-exported)
 *   • receivables / payables aging via parties barrel
 *
 * Accepts `Date | string` so callers don't have to pre-convert ISO strings.
 *
 * @standard ISO-8601-1:2019 date-time days-between-arithmetic
 */
export const daysBetween = (
  from: Date | string,
  to: Date | string,
): number => exactFloor(msBetween(from, to) / MS_PER_DAY);

/**
 * The calendar day in milliseconds, at ONE address.
 *
 * It stood at eleven: nine files spelled out `1000 * 60 * 60 * 24` twenty-two times and
 * `lease/service` declared its own `86_400_000` in a second notation the first spelling cannot even
 * be grepped alongside. [[rules]]/copy saw exactly one of those, because its 40-node floor compares
 * whole BODIES and an inline product is far below it.
 *
 * Module-private on purpose: a caller asks for DAYS, never for the divisor. Exporting it would
 * invite the twelfth address.
 *
 * @standard ISO 80000-3 — time, the day as a unit
 */
const MS_PER_DAY = 86_400_000;

/** The signed millisecond difference, accepting `Date | string` so callers never pre-convert. */
const msBetween = (from: Date | string, to: Date | string): number =>
  (to instanceof Date ? to : new Date(to)).getTime() - (from instanceof Date ? from : new Date(from)).getTime();

/**
 * Whole days between two instants, rounded UP — the AP/AR reading.
 *
 * This corpus computes day differences TWO ways and has done so silently. `daysBetween` floors,
 * which is what [[party]]/aging uses for its buckets; every AP and AR site ceils. For any partial
 * day they differ by one, and one day moves an invoice between the 0–30 and 31–60 aging buckets —
 * so the same question, "how overdue is this", has had two answers depending on which module was
 * asked, and the answer reaches a financial report.
 *
 * Both roundings are kept and named rather than silently unified: which one is correct for aging is
 * an accounting-policy decision, not a refactor. What is fixed here is that each now has ONE
 * address, so the choice is visible at the call site instead of buried in a divisor.
 */
export const daysBetweenCeil = (from: Date | string, to: Date | string): number =>
  exactCeil(msBetween(from, to) / MS_PER_DAY);

/**
 * Days a date is overdue as of an instant — never negative.
 *
 * `exactMax(0, …)` is the whole difference between "overdue" and "until due", and it was written out
 * at every AP/AR site. A bill that is not yet due is zero days overdue, not minus-five.
 */
export const daysOverdue = (dueDate: Date | string, asOfDate: Date | string = new Date()): number =>
  exactMax(0, daysBetweenCeil(dueDate, asOfDate));

/**
 * The UNROUNDED day difference — a fraction, for callers that divide it again.
 *
 * `lease/service` needs this: it converts days into payment periods by dividing by
 * `AVG_DAYS_PER_YEAR / PERIODS_PER_YEAR`, so flooring first would lose the part of a day that
 * decides whether a period is begun. Rounding belongs at the END of a calculation, never in the
 * middle — which is why this exists rather than the lease re-declaring the divisor.
 */
export const daysExact = (from: Date | string, to: Date | string): number =>
  msBetween(from, to) / MS_PER_DAY;

/** A date offset by whole days — the inverse operation to a difference, and the same one divisor. */
export const addDays = (date: Date | string, days: number): Date =>
  new Date((date instanceof Date ? date : new Date(date)).getTime() + days * MS_PER_DAY);

/**
 * Whole days between two instants regardless of order — the distance, never signed.
 *
 * This cannot be composed from {@link daysBetween}: `exactFloor(exactAbs(ms))` and
 * `exactAbs(exactFloor(ms))` disagree for any negative partial day (−0.5 day gives 0 and 1), so a
 * caller reaching for `exactAbs(daysBetween(a, b))` would get a different tolerance than
 * `bank/reconciliation` has always used. The absolute value belongs INSIDE the floor, which is why
 * this is its own name rather than a wrapper.
 */
export const daysApart = (a: Date | string, b: Date | string): number =>
  exactFloor(exactAbs(msBetween(a, b)) / MS_PER_DAY);

/** Whole days left until a deadline, floored at zero — a passed deadline has none remaining. */
export const daysRemaining = (deadline: Date | string, asOfDate: Date | string = new Date()): number =>
  exactMax(0, daysBetweenCeil(asOfDate, deadline));

/** Days remaining until a date — the signed complement of {@link daysOverdue}. */
export const daysUntil = (dueDate: Date | string, asOfDate: Date | string = new Date()): number =>
  daysBetweenCeil(asOfDate, dueDate);

/**
 * Calculate trend growth rate
 */
export const calculateGrowthRate = (
  firstValue: number,
  lastValue: number,
  periods: number,
): number => {
  if (firstValue === 0 || periods === 0) return 0;
  return ((lastValue - firstValue) / firstValue) / periods;
};

/**
 * Calculate financial ratio
 */
export const calculateRatio = (numerator: number, denominator: number): number => {
  return denominator !== 0 ? numerator / denominator : 0;
};

/**
 * Calculate gross profit margin
 */
export const calculateGrossProfitMargin = (revenue: number, cogs: number): number => {
  return revenue !== 0 ? ((revenue - cogs) / revenue) * 100 : 0;
};

/**
 * Calculate ROA (Return on Assets)
 */
export const calculateROA = (netIncome: number, totalAssets: number): number => {
  return totalAssets !== 0 ? (netIncome / totalAssets) * 100 : 0;
};

/**
 * Calculate ROE (Return on Equity)
 */
export const calculateROE = (netIncome: number, totalEquity: number): number => {
  return totalEquity !== 0 ? (netIncome / totalEquity) * 100 : 0;
};
