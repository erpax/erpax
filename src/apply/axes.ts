/**
 * apply/axes — the clean-scan axis literals, extracted to a LEAF so no importer reads them mid-cycle.
 *
 * `wave.ts` spreads `CLEAN_SCAN_AXES` at module top level (`WAVE_SEAL_AXES = [...CLEAN_SCAN_AXES, …]`). When it
 * lived in `clean.ts` — which imports the 225-file tangle (@/agent · @/quantum · @/rules · @/law/folder) — the
 * spread ran before `clean.ts` finished initialising, and the binding was in its dead zone: a fatal cycle use
 * ([[rules]]/cycle), which crashed the entire `erpax` CLI on load. This module has NO imports, so it is fully
 * initialised before any tangle member runs — the binding can never be undefined when read. clean.ts re-exports
 * these for compatibility; wave.ts imports them from here. The tangle may remain; the fatal edge is cut.
 */

/** Scan axes — coordinated with rules ratchet + doctor stray-ts line. */
export const CLEAN_SCAN_AXES = [
  'stray-ts',
  'not-allowed',
  'bypass-math',
  'word-matter',
  'logic-concentration',
] as const

export type CleanScanAxis = (typeof CLEAN_SCAN_AXES)[number]
