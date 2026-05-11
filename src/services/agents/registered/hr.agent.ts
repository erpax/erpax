/**
 * HrAgent — owns the H2R_HIRE_TO_RETIRE chain (employees, payroll, recruiting, leave, performance, time).
 * Slice GGGGG (2026-05-11).
 *
 * @standard ISO IAS-19 employee-benefits + IAS-26 retirement-benefits
 * @feature hr_core
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '../types'
import type { SpecChainStep } from '@/services/spec-generator'

export const HrAgent: DomainAgent = {
  id: 'hr',
  ownsCollections: ['employees', 'payroll-runs', 'payroll', 'performance-reviews', 'leave-requests', 'recruiting-pipeline', 'time-entries', 'departments', 'job-positions'],
  subscribesTo: ['employee:hired', 'payroll:posted', 'employee:terminated'],
  emits: ['employee:hired', 'employee:terminated', 'payroll:posted', 'leave:approved'],
  async onChainStep(ctx, step: SpecChainStep) {
    const collection = step.note?.match(/\bcollection=([\w-]+)/)?.[1]
    const action = step.note?.match(/\baction=([\w-]+)/)?.[1]
    if (!collection || !this.ownsCollections.includes(collection)) return []
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: collection, subjectId: 'pending', action: action ?? 'unknown', chainId: step.chainId, chainStepId: `${String(step.stepIndex).padStart(2, '0')}-${collection}-${action ?? 'step'}` } }]
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'hr-handled-event' } }]
  },
}
