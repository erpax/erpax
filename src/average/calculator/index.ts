/**
 * Arithmetic mean of a number array, zero-guarded (empty ⇒ 0, never NaN).
 * The shared collapse of the repeated `sum/length` reduce across the
 * receivables / payables / multi-currency analytics services.
 */
export function calculateAverage(values: number[]): number {
  if (values.length === 0) return 0
  return values.reduce((sum, val) => sum + val, 0) / values.length
}

/** Arithmetic mean rounded to the nearest integer (zero-guarded). */
export function calculateAverageRounded(values: number[]): number {
  if (values.length === 0) return 0
  return Math.round(values.reduce((sum, val) => sum + val, 0) / values.length)
}
