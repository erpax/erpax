/**
 * INCOTERMS 2020 — International Commercial Terms code list (ICC).
 *
 * 11 three-letter codes split into two families:
 *   - 7 multimodal (apply to any mode of transport): EXW FCA CPT CIP DAP DPU DDP
 *   - 4 sea / inland waterway only: FAS FOB CFR CIF
 *
 * Each code is a contractual allocation of cost + risk + insurance + customs
 * obligations between seller and buyer. Used by VendorQuotes, Carriers,
 * TrackingEvents, CustomsDeclarations, and the shipping/logistics flows.
 *
 * @standard ICC INCOTERMS 2020 publication-no-723E
 * @standard ISO 6346 freight-container-code (related)
 * @see https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/
 */

/** Canonical INCOTERMS 2020 set. */
export const INCOTERMS_2020 = [
  'EXW', 'FCA', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP',  // multimodal
  'FAS', 'FOB', 'CFR', 'CIF',                        // sea / inland waterway
] as const

export type Incoterm2020 = (typeof INCOTERMS_2020)[number]

/** Family classification — drives the UI grouping. */
export const INCOTERM_FAMILY: Readonly<Record<Incoterm2020, 'multimodal' | 'sea_only'>> = {
  EXW: 'multimodal', FCA: 'multimodal', CPT: 'multimodal', CIP: 'multimodal',
  DAP: 'multimodal', DPU: 'multimodal', DDP: 'multimodal',
  FAS: 'sea_only',   FOB: 'sea_only',   CFR: 'sea_only',   CIF: 'sea_only',
} as const

/** Human-readable label per code (English). */
export const INCOTERM_LABEL: Readonly<Record<Incoterm2020, string>> = {
  EXW: 'EXW — Ex Works (named place of delivery)',
  FCA: 'FCA — Free Carrier (named place of delivery)',
  CPT: 'CPT — Carriage Paid To (named place of destination)',
  CIP: 'CIP — Carriage and Insurance Paid To (named place of destination)',
  DAP: 'DAP — Delivered at Place (named place of destination)',
  DPU: 'DPU — Delivered at Place Unloaded (named place of destination)',
  DDP: 'DDP — Delivered Duty Paid (named place of destination)',
  FAS: 'FAS — Free Alongside Ship (named port of shipment)',
  FOB: 'FOB — Free On Board (named port of shipment)',
  CFR: 'CFR — Cost and Freight (named port of destination)',
  CIF: 'CIF — Cost, Insurance and Freight (named port of destination)',
} as const

/** Payload select options for Field-factory consumption. */
export const INCOTERM_OPTIONS: ReadonlyArray<{ label: string; value: Incoterm2020 }> =
  INCOTERMS_2020.map((value) => ({ label: INCOTERM_LABEL[value], value }))

/** Validate an incoming code. */
export const isIncoterm2020 = (value: unknown): value is Incoterm2020 =>
  typeof value === 'string' && (INCOTERMS_2020 as ReadonlyArray<string>).includes(value)
