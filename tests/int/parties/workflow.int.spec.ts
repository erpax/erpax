/**
 * Unit tests for the shared parties/workflow module.
 *
 * Covers the generic state-machine helpers used by both
 * BillStatusWorkflow (payables) and InvoiceStatusWorkflow (receivables).
 *
 * @standard ISO/IEC-29119:2022 software-testing unit-test-level
 * @audit ISO-19011:2018 audit-trail state-transitions
 * @security ISO-27002 §5.4 segregation-of-duties
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §5 §7
 */

import { describe, it, expect } from 'vitest'
import {
  canTransition,
  transitionOrThrow,
  reachableStates,
  terminalStates,
  type TransitionTable,
} from '@/plugins/parties'

type S = 'draft' | 'sent' | 'partial' | 'paid' | 'overdue' | 'written_off'

const TABLE: TransitionTable<S> = {
  draft: ['sent'],
  sent: ['partial', 'paid', 'overdue'],
  partial: ['paid', 'overdue', 'written_off'],
  overdue: ['partial', 'paid', 'written_off'],
  paid: [], // terminal
  written_off: [], // terminal
}

describe('parties/workflow — canTransition', () => {
  it('allows declared transitions', () => {
    expect(canTransition(TABLE, 'draft', 'sent')).toBe(true)
    expect(canTransition(TABLE, 'sent', 'paid')).toBe(true)
    expect(canTransition(TABLE, 'partial', 'written_off')).toBe(true)
  })

  it('rejects undeclared transitions', () => {
    expect(canTransition(TABLE, 'draft', 'paid')).toBe(false)
    expect(canTransition(TABLE, 'paid', 'sent')).toBe(false) // can't un-pay
    expect(canTransition(TABLE, 'written_off', 'paid')).toBe(false)
  })

  it('rejects self-transitions unless explicitly allowed', () => {
    expect(canTransition(TABLE, 'sent', 'sent')).toBe(false)
    expect(canTransition(TABLE, 'paid', 'paid')).toBe(false)
  })

  it('returns false for unknown source state', () => {
    // @ts-expect-error — intentional invalid state
    expect(canTransition(TABLE, 'unknown', 'sent')).toBe(false)
  })
})

describe('parties/workflow — transitionOrThrow', () => {
  it('returns the new state on a valid transition', () => {
    expect(transitionOrThrow(TABLE, 'draft', 'sent')).toBe('sent')
    expect(transitionOrThrow(TABLE, 'sent', 'partial')).toBe('partial')
  })

  it('throws on an invalid transition with a clear message', () => {
    expect(() => transitionOrThrow(TABLE, 'draft', 'paid')).toThrow(
      /Invalid document status transition: draft → paid/,
    )
  })

  it('lists allowed targets in the error message', () => {
    expect(() => transitionOrThrow(TABLE, 'sent', 'draft')).toThrow(/partial.*paid.*overdue/)
  })

  it('mentions terminal in the error from a terminal state', () => {
    expect(() => transitionOrThrow(TABLE, 'paid', 'sent')).toThrow(/terminal state/)
  })

  it('uses a custom label in the error message', () => {
    expect(() => transitionOrThrow(TABLE, 'draft', 'paid', 'invoice')).toThrow(
      /Invalid invoice status transition/,
    )
  })
})

describe('parties/workflow — reachableStates', () => {
  it('reaches everything in this graph from draft', () => {
    const r = reachableStates(TABLE, 'draft')
    expect(r).toEqual(new Set(['draft', 'sent', 'partial', 'paid', 'overdue', 'written_off']))
  })

  it('only itself reachable from a terminal state', () => {
    expect(reachableStates(TABLE, 'paid')).toEqual(new Set(['paid']))
    expect(reachableStates(TABLE, 'written_off')).toEqual(new Set(['written_off']))
  })

  it('honors directed edges (cannot go back to draft from sent)', () => {
    const r = reachableStates(TABLE, 'sent')
    expect(r.has('draft')).toBe(false)
    expect(r.has('sent')).toBe(true)
  })
})

describe('parties/workflow — terminalStates', () => {
  it('returns states with no outgoing transitions', () => {
    expect(terminalStates(TABLE).sort()).toEqual(['paid', 'written_off'])
  })

  it('returns empty for a fully connected graph', () => {
    const cyclic: TransitionTable<'a' | 'b'> = { a: ['b'], b: ['a'] }
    expect(terminalStates(cyclic)).toEqual([])
  })
})
