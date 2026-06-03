/**
 * Format integer cents as a fixed-2-decimal string — the monetary wire form
 * shared by every XML export serializer (Peppol UBL, ISO-20022, EDIFACT, SAF-T).
 * One definition, not four. Money is integer cents in-system; emitted as decimal.
 */
export const formatAmount = (cents: number): string => (cents / 100).toFixed(2)
