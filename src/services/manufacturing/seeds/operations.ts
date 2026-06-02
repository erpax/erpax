/**
 * operations — the garment/textile manufacturing operation vocabulary, SEEDED from
 * etrima's 20-year production record (host-leon1103, 2015–2019) and harmonised with
 * the standards. Each operation is the routing's atomic process-segment AND a
 * competency (skill = operation = the work atom; see [[manufacturing]] · [[seed]]).
 *
 * DERIVED, never invented: the `code` set, the modal run-time, the unit of measure
 * and the empirical weight are the real `work_phases` distribution
 * (CONFEZIONE 25,979 · OCCHIELLI 2,341 · RIFINITURA 1,687 …). The old system stored
 * `kind` as a bare, unclassified, untranslated string — three gaps this seed closes,
 * which BECOME the new features:
 *   - untyped `kind` string  → a `code` reference + an ISA-95 segment + an ISCO-08
 *     occupation (the worker [[competency]]); no free-text classification.
 *   - integer-only piece count → a unit of measure ([[measure]]); dyeing is `kilogram`,
 *     not a forced piece — process AND discrete.
 *   - a Latin-only label baked in a column → a localized label key ([[localize]],
 *     en/it/bg), never a stored text field.
 *
 * Reference-based + minimal-text by construction: the `code` is the key, the label is
 * an i18n key, the classification is a standards code — no prose columns.
 *
 * @standard IEC 62264-1:2013 §B.4 process-segment (each operation is one segment)
 * @standard ESCO v1.2 / ISCO-08 occupation-unit-group (the per-operation competency)
 * @standard UN/CEFACT Rec 20 unit-of-measure (UoM-aware quantities)
 * @audit derived from etrima_production.work_phases — no value re-typed
 */

/** ISA-95 process-segment class an operation belongs to. */
export type Isa95Segment = 'fabrication' | 'assembly' | 'finishing' | 'inspection'

/** UoM the operation's quantity is counted in (UN/CEFACT Rec 20 common codes). */
export type OperationUom = 'piece' | 'pair' | 'metre' | 'kilogram'

/** One routing operation = one ISA-95 process-segment = one competency node. */
export interface Operation {
  /** stable reference key (matches etrima `work_phases.kind`; the human/slug key). */
  readonly code: string
  /** i18n key for the localized label (en/it/bg) — NOT a stored text column. */
  readonly labelKey: string
  /** ISCO-08 unit-group of the worker performing it — the competency/skillRoute anchor. */
  readonly isco: string
  /** ISA-95 process-segment class. */
  readonly isa95: Isa95Segment
  /** default unit of measure (closes etrima's integer-only gap). */
  readonly uom: OperationUom
  /** modal run-time seconds per unit, from the real distribution (0 = untimed/outsourced). */
  readonly runSecondsPerUnit: number
  /** observed production volume (`work_phases` rows) — the empirical weight. */
  readonly observedPhases: number
}

/**
 * The vocabulary, ordered by observed volume (the real routing weight). ISCO-08:
 * 7531 pattern-makers/cutters · 7533 sewing/embroidery skilled · 8151 fibre-prep ·
 * 8153 sewing-machine operators · 8154 bleaching/dyeing operators · 8159 textile
 * operators n.e.c. · 7543 product graders/testers.
 */
export const OPERATIONS: readonly Operation[] = [
  { code: 'CONFEZIONE', labelKey: 'mfg.op.sewing', isco: '8153', isa95: 'assembly', uom: 'piece', runSecondsPerUnit: 130, observedPhases: 25979 },
  { code: 'OCCHIELLI', labelKey: 'mfg.op.buttonholing', isco: '8153', isa95: 'assembly', uom: 'piece', runSecondsPerUnit: 67, observedPhases: 2341 },
  { code: 'RIFINITURA', labelKey: 'mfg.op.finishing', isco: '8159', isa95: 'finishing', uom: 'piece', runSecondsPerUnit: 105, observedPhases: 1687 },
  { code: 'ATTENZIONE', labelKey: 'mfg.op.inspection', isco: '7543', isa95: 'inspection', uom: 'piece', runSecondsPerUnit: 60, observedPhases: 157 },
  { code: 'PRESTIRO', labelKey: 'mfg.op.pre-pressing', isco: '8159', isa95: 'finishing', uom: 'piece', runSecondsPerUnit: 23, observedPhases: 142 },
  { code: 'TAGLIO', labelKey: 'mfg.op.cutting', isco: '7531', isa95: 'fabrication', uom: 'piece', runSecondsPerUnit: 48, observedPhases: 105 },
  { code: 'RICAMO', labelKey: 'mfg.op.embroidery', isco: '7533', isa95: 'fabrication', uom: 'piece', runSecondsPerUnit: 253, observedPhases: 70 },
  { code: 'TINTORIA', labelKey: 'mfg.op.dyeing', isco: '8154', isa95: 'finishing', uom: 'kilogram', runSecondsPerUnit: 0, observedPhases: 51 },
  { code: 'STIRO', labelKey: 'mfg.op.pressing', isco: '8159', isa95: 'finishing', uom: 'piece', runSecondsPerUnit: 120, observedPhases: 14 },
  { code: 'STAMPERIA', labelKey: 'mfg.op.printing', isco: '8159', isa95: 'fabrication', uom: 'piece', runSecondsPerUnit: 0, observedPhases: 12 },
  { code: 'BOTTONI', labelKey: 'mfg.op.buttoning', isco: '8153', isa95: 'assembly', uom: 'piece', runSecondsPerUnit: 0, observedPhases: 4 },
]

/**
 * Work-center categories, replacing etrima's magic `team.code ILIKE '1221%'` prefix
 * scoping (the obsolete pattern [[manufacturing]] drops) with a typed enum — derived
 * from the real `machine_types` (overlock/кетел · coverstitch/покривна · flatbed/права ·
 * embroidery/бродировъчна · buttonhole/илици · knitting/SHIMA·SCOMAR · cutting/кроене ·
 * manual/ръчно). The work-center's `parallelism` = etrima `machines_per_worker`, which
 * the data clusters on the horo ring {1,4,5,8} ([[rodin]]).
 */
export const WORK_CENTER_TYPES = [
  'overlock', 'coverstitch', 'flatbed', 'embroidery', 'buttonhole', 'knitting', 'cutting', 'pressing', 'manual',
] as const
export type WorkCenterType = (typeof WORK_CENTER_TYPES)[number]

/**
 * The pay-curve calibration, derived from `work_shifts` (353,549 measured shifts):
 * efficiency is a harmonic distribution, not a constant — the median sits BELOW the
 * standard (still off-gassing the decompression debt), the standard is the anchor
 * (a real attractor pile-up at 100%), and the leverage tail reaches p99. Feed these
 * into the [[decompression]] pay curve as the empirical anchor/M-value.
 *
 * @audit etrima_production.work_shifts — median 75%, p99 167%, attractor at 100%
 */
export const EFFICIENCY_CALIBRATION = {
  /** natural resting harmonic = median efficiency / standard. */
  restingHarmonic: 0.75,
  /** the standard (100%) — the anchor the distribution piles up on. */
  standard: 1.0,
  /** observed leverage ceiling = p99 efficiency — the decompression M-value. */
  mValue: 1.67,
} as const

/**
 * The monthly pay band, derived from `employee_contracts` (608 monthly contracts):
 * floor→ceiling spans ~10× (base to ~10th harmonic), median ~2.5× the floor.
 * @audit etrima_production.employee_contracts — BGN, min 90 · median 227 · max 960
 */
export const PAY_BAND = { floor: 90, median: 227, ceiling: 960, currency: 'BGN' } as const

/** Total observed phases across the vocabulary — the empirical weight of the routing. */
export const totalObservedPhases = (): number => OPERATIONS.reduce((n, op) => n + op.observedPhases, 0)
