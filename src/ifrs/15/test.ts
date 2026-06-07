import { describe, it, expect } from 'vitest'
import {
  isRecognitionTiming,
  isOverTimeMeasurement,
  isOutputMethodKind,
  isInputMethodKind,
  isVariableConsiderationMethod,
} from '@/ifrs/15'

// IFRS 15 / ASC 606 — the canonical enum guards. The five-step model's
// classification unions cannot drift: each guard accepts exactly the
// standard's members and narrows unknown input safely.
describe('ifrs/15 — five-step model enum guards', () => {
  it('isRecognitionTiming accepts the §31/§38 timings, rejects all else', () => {
    expect(isRecognitionTiming('point_in_time')).toBe(true)
    expect(isRecognitionTiming('over_time')).toBe(true)
    expect(isRecognitionTiming('continuous')).toBe(false)
    expect(isRecognitionTiming(undefined)).toBe(false)
    expect(isRecognitionTiming(42)).toBe(false)
  })

  it('isOverTimeMeasurement accepts the two §35 measurement methods', () => {
    expect(isOverTimeMeasurement('output_method')).toBe(true)
    expect(isOverTimeMeasurement('input_method')).toBe(true)
    expect(isOverTimeMeasurement('cost_to_cost')).toBe(false)
    expect(isOverTimeMeasurement(null)).toBe(false)
  })

  it('isOutputMethodKind accepts the five output measures', () => {
    for (const k of [
      'units_delivered',
      'units_produced',
      'milestones',
      'time_elapsed',
      'survey_of_work',
    ]) {
      expect(isOutputMethodKind(k)).toBe(true)
    }
    expect(isOutputMethodKind('cost_to_cost')).toBe(false)
  })

  it('isInputMethodKind accepts the five input measures', () => {
    for (const k of [
      'cost_to_cost',
      'labor_hours',
      'machine_hours',
      'resources_consumed',
      'time_passed',
    ]) {
      expect(isInputMethodKind(k)).toBe(true)
    }
    expect(isInputMethodKind('units_delivered')).toBe(false)
  })

  it('isVariableConsiderationMethod accepts the §53 estimation methods', () => {
    expect(isVariableConsiderationMethod('expected_value')).toBe(true)
    expect(isVariableConsiderationMethod('most_likely_amount')).toBe(true)
    expect(isVariableConsiderationMethod('average')).toBe(false)
    expect(isVariableConsiderationMethod({})).toBe(false)
  })

  it('output and input method kinds are disjoint surfaces', () => {
    // time_elapsed is an output kind; time_passed is an input kind — not interchangeable.
    expect(isOutputMethodKind('time_elapsed')).toBe(true)
    expect(isInputMethodKind('time_elapsed')).toBe(false)
    expect(isInputMethodKind('time_passed')).toBe(true)
    expect(isOutputMethodKind('time_passed')).toBe(false)
  })
})
