/**
 * Accounting Calculations — shared math primitives (sum, percentage, etc.).
 *
 * Operate on integer-cents per the project's Money convention; do not
 * introduce floating-point arithmetic for monetary amounts.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard IEEE-754-2019 binary-floating-point avoid-for-money
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @see src/standards/_money/
 * @see docs/STANDARDS.md §4.2
 */

/**
 * Calculate total from items array
 */
export const calculateArrayTotal = (items: Array<Record<string, unknown>>, fieldName: string): number => {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + ((item?.[fieldName] as number) || 0), 0);
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (value: number, total: number): number => {
  return total !== 0 ? (value / total) * 100 : 0;
};

/**
 * Calculate variance
 */
export const calculateVariance = (actual: number, budget: number): number => {
  return actual - budget;
};

/**
 * Calculate variance percentage
 */
export const calculateVariancePercent = (actual: number, budget: number): number => {
  return budget !== 0 ? ((actual - budget) / budget) * 100 : 0;
};

/**
 * Determine variance type (favorable/unfavorable)
 */
export const determineVarianceType = (
  variance: number,
  accountType?: 'revenue' | 'expense',
): 'favorable' | 'unfavorable' | 'neutral' => {
  if (variance === 0) return 'neutral';

  // For revenue: positive variance is favorable
  // For expense: negative variance is favorable
  if (accountType === 'revenue') {
    return variance > 0 ? 'favorable' : 'unfavorable';
  } else if (accountType === 'expense') {
    return variance < 0 ? 'favorable' : 'unfavorable';
  }

  // Default: positive is unfavorable
  return variance > 0 ? 'unfavorable' : 'favorable';
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
 * Calculate declining balance depreciation
 */
export const calculateDecliningBalanceDepreciation = (
  bookValue: number,
  depreciationRate: number,
): number => {
  return bookValue * (depreciationRate / 100);
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
 * Calculate aging bucket for a date
 */
export const calculateAgingBucket = (transactionDate: Date, asOfDate: Date): string => {
  const diffDays = Math.floor((asOfDate.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'current';
  if (diffDays <= 30) return '30';
  if (diffDays <= 60) return '60';
  if (diffDays <= 90) return '90';
  return '90plus';
};

/**
 * Calculate trend direction
 */
export const calculateTrendDirection = (
  firstValue: number,
  lastValue: number,
): 'upward' | 'downward' | 'stable' => {
  if (lastValue > firstValue * 1.05) return 'upward';
  if (lastValue < firstValue * 0.95) return 'downward';
  return 'stable';
};

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
 * Calculate standard deviation
 */
export const calculateStandardDeviation = (values: number[], mean: number): number => {
  if (values.length === 0) return 0;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
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
 * Calculate net profit margin
 */
export const calculateNetProfitMargin = (netIncome: number, revenue: number): number => {
  return revenue !== 0 ? (netIncome / revenue) * 100 : 0;
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

/**
 * Calculate current ratio
 */
export const calculateCurrentRatio = (currentAssets: number, currentLiabilities: number): number => {
  return calculateRatio(currentAssets, currentLiabilities);
};

/**
 * Calculate debt-to-equity ratio
 */
export const calculateDebtToEquity = (totalDebt: number, totalEquity: number): number => {
  return calculateRatio(totalDebt, totalEquity);
};
