/**
 * positions — the harmonic job ladder, SEEDED from etrima's real positions and
 * harmonised with the occupation standards. The old system ALREADY carried the
 * standards as opaque columns: `code_nkpd` = Bulgarian НКПД (a national extension of
 * ISCO-08), `code_nkid` = NKID (national extension of NACE). Harmonising is surfacing
 * them as typed references — not inventing them ([[standard]] · [[manufacturing]]).
 *
 * DERIVED: each position's ISCO-08 unit-group is the FIRST FOUR digits of its real
 * 8-digit НКПД code (Управител промишленост `1120`7023 → ISCO 1120; Програмист
 * `2514`6001 → ISCO 2514; Секционен майстор `8152`2002 → ISCO 8152); the monthly pay
 * and seat counts are the real values, span 510→1435 BGN at the supervisory band.
 *
 * Reference-based + minimal-text: `nkpd`/`isco` are the keys; `titleKey` is a localized
 * i18n key (the НКПД titles are Bulgarian — never a stored text column). The related
 * API (`./standards` ESCO_API) resolves an ISCO code to its occupation + competencies
 * across 27 languages — so a seeded position auto-localizes from the source of truth.
 *
 * @standard ISCO-08 (ILO) occupation unit-group — the 4-digit global anchor
 * @standard Bulgarian НКПД-2011 (national extension of ISCO-08) — the 8-digit code
 * @standard SFIA 8 responsibility-levels (1..7) — the autonomy axis (positions service)
 * @audit derived from etrima_production.positions — codes + pay not re-typed
 */
import { PAY_BAND } from './operations'

export interface SeedPosition {
  /** 8-digit Bulgarian НКПД code (the national reference key). */
  readonly nkpd: string
  /** ISCO-08 unit group = nkpd[0..4] (the global standard anchor / ESCO key). */
  readonly isco: string
  /** localized i18n key for the title (НКПД titles are Bulgarian) — not stored text. */
  readonly titleKey: string
  /** SFIA 8 responsibility level 1..7 (the autonomy axis). */
  readonly sfiaLevel: number
  /** real monthly pay, BGN. */
  readonly payMonthly: number
  /** budgeted headcount (etrima `seats`). */
  readonly seats: number
}

/** The supervisory→specialist ladder, real codes + pay (the full 50 extend this shape). */
export const POSITIONS: readonly SeedPosition[] = [
  { nkpd: '11207023', isco: '1120', titleKey: 'pos.industry-manager', sfiaLevel: 7, payMonthly: 1435, seats: 1 },
  { nkpd: '12107058', isco: '1210', titleKey: 'pos.executive-director', sfiaLevel: 7, payMonthly: 960, seats: 1 },
  { nkpd: '13216007', isco: '1321', titleKey: 'pos.dept-head-industry', sfiaLevel: 6, payMonthly: 950, seats: 1 },
  { nkpd: '12316002', isco: '1231', titleKey: 'pos.admin-head', sfiaLevel: 6, payMonthly: 860, seats: 0 },
  { nkpd: '25146001', isco: '2514', titleKey: 'pos.programmer', sfiaLevel: 4, payMonthly: 750, seats: 2 },
  { nkpd: '13215004', isco: '1321', titleKey: 'pos.workshop-head', sfiaLevel: 5, payMonthly: 710, seats: 1 },
  { nkpd: '31153033', isco: '3115', titleKey: 'pos.sewing-machine-technician', sfiaLevel: 3, payMonthly: 650, seats: 1 },
  { nkpd: '81522002', isco: '8152', titleKey: 'pos.section-master', sfiaLevel: 4, payMonthly: 600, seats: 6 },
  { nkpd: '41312025', isco: '4131', titleKey: 'pos.warehouse-manager', sfiaLevel: 3, payMonthly: 550, seats: 1 },
  { nkpd: '81822004', isco: '8182', titleKey: 'pos.boiler-operator', sfiaLevel: 2, payMonthly: 550, seats: 2 },
  { nkpd: '31193023', isco: '3119', titleKey: 'pos.clothing-technologist', sfiaLevel: 4, payMonthly: 546, seats: 4 },
  { nkpd: '75432005', isco: '7543', titleKey: 'pos.clothing-grader', sfiaLevel: 3, payMonthly: 510, seats: 6 },
]

/** The ISCO-08 unit group from an НКПД code — the standard anchor is the first 4 digits. */
export const iscoOf = (nkpd: string): string => nkpd.slice(0, 4)

/** A position's harmonic = pay relative to the band floor — its rung on the rate ladder ([[allocation]]). */
export const positionHarmonic = (p: SeedPosition): number => p.payMonthly / PAY_BAND.floor
