/**
 * `anyone` access predicate — public/unauthenticated read.
 *
 * @security ISO-27002 §5.15 access-control intentional-public-read
 * @see src/standards/iso-27002/types.ts
 * @see docs/STANDARDS.md §4.4
 */

import type { Access } from 'payload'
import type { Iso27002ControlId } from '../standards/iso-27002'

export const anyone: Access = () => true

/**
 * Canonical ISO 27002 controls this predicate exercises. The auditor's
 * SOC-2 / ISO 27001 evidence pack aggregates these via
 * `aggregateCoverage`. Note: `5.15` is cited even though this predicate
 * GRANTS access — it documents that the deliberate public-read decision
 * is part of the access-control regime.
 */
export const controlsApplied: ReadonlyArray<Iso27002ControlId> = ['5.15'] as const
