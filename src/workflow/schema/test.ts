import { describe, expect, it } from 'vitest'

import { faceOf } from '@/rules/face'

// The file that stood here asserted expect(true).toBe(true) — it passed for every
// possible state of workflow/schema and forbade nothing. What schema actually owes its
// callers is its FACE: import { X } from '@/workflow/schema' breaks the moment the barrel
// stops offering X, and nothing else in the tree reports that.
const OFFERED = [
  "WorkflowDecision",
  "WorkflowEvaluateInput",
  "WorkflowSealDefinition",
  "WorkflowSealResult",
  "WorkflowStepDecisionInput",
  "advanceWorkflowInstance",
  "escalateOverdueInstances",
  "evaluateWorkflowsForDocument",
  "getServiceHandler",
  "listSealedWorkflows",
  "registerServiceHandler",
  "sealWorkflow"
] as const

describe('workflow/schema — the face it owes its callers', () => {
  it('offers every name a caller may import', () => {
    const live = new Set(faceOf('workflow/schema'))
    const lost = OFFERED.filter((n) => !live.has(n))
    expect(lost).toEqual([])
  })

  it('offers 12 name(s) — a silent drop changes the count', () => {
    expect(faceOf('workflow/schema').length).toBeGreaterThanOrEqual(OFFERED.length)
  })

  it('names nothing twice — a duplicated export is an ambiguous import', () => {
    const live = faceOf('workflow/schema')
    expect(new Set(live).size).toBe(live.length)
  })
})
