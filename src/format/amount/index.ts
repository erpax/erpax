/**
 * Format integer cents as a fixed-2-decimal string — the monetary wire form
 * shared by every XML export serializer (Peppol UBL, ISO-20022, EDIFACT, SAF-T).
 * One definition, not four. Money is integer cents in-system; emitted as decimal.
 */
export const formatAmount = (cents: number): string => (cents / 100).toFixed(2)

/** Display face — `$` + the canonical two-decimal amount (moved from the dashboard
 * hub: a leaf utility in the hub closed the widget↔dashboard import cycle). */
export const formatCurrency = (cents: number): string => `$${formatAmount(cents)}`
