/**
 * Runtime guards for the IFRS 15 / ASC 606 enums.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @see ./types.ts
 */

import type {
  RecognitionTiming,
  OverTimeMeasurement,
  OutputMethodKind,
  InputMethodKind,
  VariableConsiderationMethod,
} from '@/ifrs/15/types'

const TIMING = new Set<RecognitionTiming>(['point_in_time', 'over_time'])
const MEASUREMENT = new Set<OverTimeMeasurement>(['output_method', 'input_method'])
const OUTPUT_KINDS = new Set<OutputMethodKind>([
  'units_delivered',
  'units_produced',
  'milestones',
  'time_elapsed',
  'survey_of_work',
])
const INPUT_KINDS = new Set<InputMethodKind>([
  'cost_to_cost',
  'labor_hours',
  'machine_hours',
  'resources_consumed',
  'time_passed',
])
const VC_METHODS = new Set<VariableConsiderationMethod>([
  'expected_value',
  'most_likely_amount',
])

/** Type-narrowing guard for {@link RecognitionTiming}. */
export const isRecognitionTiming = (s: unknown): s is RecognitionTiming =>
  typeof s === 'string' && TIMING.has(s as RecognitionTiming)

/** Type-narrowing guard for {@link OverTimeMeasurement}. */
export const isOverTimeMeasurement = (s: unknown): s is OverTimeMeasurement =>
  typeof s === 'string' && MEASUREMENT.has(s as OverTimeMeasurement)

/** Type-narrowing guard for {@link OutputMethodKind}. */
export const isOutputMethodKind = (s: unknown): s is OutputMethodKind =>
  typeof s === 'string' && OUTPUT_KINDS.has(s as OutputMethodKind)

/** Type-narrowing guard for {@link InputMethodKind}. */
export const isInputMethodKind = (s: unknown): s is InputMethodKind =>
  typeof s === 'string' && INPUT_KINDS.has(s as InputMethodKind)

/** Type-narrowing guard for {@link VariableConsiderationMethod}. */
export const isVariableConsiderationMethod = (
  s: unknown,
): s is VariableConsiderationMethod =>
  typeof s === 'string' && VC_METHODS.has(s as VariableConsiderationMethod)
