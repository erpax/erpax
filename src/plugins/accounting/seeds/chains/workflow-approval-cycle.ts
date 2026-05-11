/**
 * Workflow approval cycle — canonical seed (Slice OOOO).
 *
 * WorkflowDefinition created → match → instance spawned → step decisions
 *  → finalised. Demonstrates the BPMN-style multi-step approval pattern
 * the maintainer wired in HHHH and the runner consumed in KKKK.
 *
 * @standard ISO/IEC 19510:2013 BPMN-2.0
 * @standard SOX §404 multi-step-approval
 * @standard ISO 27002 §5.4 segregation-of-duties
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)

const matchDefinition: ChainStepImpl = async (payload, ctx, state) => {
  const def = await payload.create({
    collection: 'workflow-definitions',
    data: {
      tenant: ctx.tenantId,
      name: `Chain Workflow ${ts()}`,
      version: 1,
      targetCollection: 'expense-reports',
      triggerEvent: 'beforeApprove',
      steps: [
        { order: 1, name: 'Manager approval', kind: 'approval', assigneeMode: 'manager_of_submitter', slaHours: 48 },
        { order: 2, name: 'Finance approval', kind: 'approval', assigneeMode: 'role', assigneeRole: 'accountant', slaHours: 72 },
      ],
      isActive: true,
      effectiveFrom: new Date().toISOString(),
      onTimeoutBehavior: 'escalate',
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.definitionId = def.id
  return null  // silent step
}

const spawn: ChainStepImpl = async (payload, ctx, state) => {
  const inst = await payload.create({
    collection: 'workflow-instances',
    data: {
      tenant: ctx.tenantId,
      instanceId: crypto.randomUUID(),
      definition: state.definitionId,
      definitionVersion: 1,
      targetCollection: 'expense-reports',
      targetId: 'chain-test-expense',
      submittedBy: ctx.userId,
      submittedAt: new Date().toISOString(),
      currentStep: 0,
      status: 'awaiting_action',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string; instanceId: string }
  state.instanceId = inst.id
  return 'workflow:spawned'
}

const stepDecision: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'workflow-instances',
    id: state.instanceId as string,
    data: {
      stepHistory: [
        { stepIndex: 0, stepName: 'Manager approval', assignee: ctx.userId, decision: 'approved', decidedAt: new Date().toISOString() },
      ],
      currentStep: 1,
      status: 'in_progress',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'workflow:step-decided'
}

const finalise: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'workflow-instances',
    id: state.instanceId as string,
    data: {
      stepHistory: [
        { stepIndex: 0, stepName: 'Manager approval', assignee: ctx.userId, decision: 'approved', decidedAt: new Date().toISOString() },
        { stepIndex: 1, stepName: 'Finance approval', assignee: ctx.userId, decision: 'approved', decidedAt: new Date().toISOString() },
      ],
      finalOutcome: 'approved',
      completedAt: new Date().toISOString(),
      status: 'completed',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'workflow:finalised'
}

export const workflowApprovalCycleImpls: ChainImpls = [
  matchDefinition, spawn, stepDecision, finalise,
]
