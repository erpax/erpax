/**
 * HrAgent — owns the H2R_HIRE_TO_RETIRE chain (employees, payroll, recruiting, leave, performance, time).
 * Slice GGGGG (2026-05-11).
 *
 * @standard ISO IAS-19 employee-benefits + IAS-26 retirement-benefits
 * @feature hr_core
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent'
import type { SpecChainStep } from '@/spec/generator'
import { ownedChainStepAudit } from '../step'
import { planTrainingEffects, TRAINING_EMIT, TRAINING_TRIGGER } from './training'

export const HrAgent: DomainAgent = {
  id: 'hr',
  ownsCollections: ['employees', 'payroll-runs', 'payroll', 'performance-reviews', 'leave-requests', 'recruiting-pipeline', 'time-entries', 'departments', 'job-positions'],
  subscribesTo: ['employee:hired', 'payroll:posted', 'employee:terminated', TRAINING_TRIGGER],
  emits: ['employee:hired', 'employee:terminated', 'payroll:posted', 'leave:approved', TRAINING_EMIT],
  async onChainStep(ctx, step: SpecChainStep) {
    return ownedChainStepAudit(ctx, step, this.ownsCollections)
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    // The auto-train loop: an assessed actor → priced training plan, broadcast + audited + nudged.
    if (ev.id === TRAINING_TRIGGER) return planTrainingEffects(ev)
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'hr-handled-event' } }]
  },
}
