import { describe, it, expect } from 'vitest'
import type { AgentEffect } from '@/agent/types'
import { ownedChainStepAudit } from './index'

const ctx = { tenantId: 't1' } as never

/** AgentEffect is a UNION; only the audit variant carries a leaf. Narrow, never assume. */
const auditLeaf = (e: AgentEffect | undefined) => {
  expect(e?.kind).toBe('audit')
  return (e as Extract<AgentEffect, { kind: 'audit' }>).leaf
}

const step = (note: string | undefined, extra: Record<string, unknown> = {}) =>
  ({ note, chainId: 'c1', stepIndex: 3, ...extra }) as never

describe('agents/registered/step — the handler eleven agents shared', () => {
  it('claims a step whose collection this agent owns', async () => {
    const out = await ownedChainStepAudit(ctx, step('collection=forms action=submit'), ['forms'])
    expect(out).toHaveLength(1)
    expect(auditLeaf(out[0]).subjectCollection).toBe('forms')
    expect(auditLeaf(out[0]).action).toBe('submit')
    expect(auditLeaf(out[0]).chainStepId).toBe('03-forms-submit')
  })

  // The ownership check is the whole point: an agent that answered for every collection would make
  // eleven agents each claim every step.
  it('returns nothing for a collection it does not own', async () => {
    expect(await ownedChainStepAudit(ctx, step('collection=invoices action=post'), ['forms'])).toEqual([])
  })

  it('returns nothing when the note names no collection', async () => {
    expect(await ownedChainStepAudit(ctx, step('action=post'), ['forms'])).toEqual([])
    expect(await ownedChainStepAudit(ctx, step(undefined), ['forms'])).toEqual([])
    expect(await ownedChainStepAudit(ctx, step(''), ['forms'])).toEqual([])
  })

  it('falls back to `unknown` when the note names no action, and says so in the id', async () => {
    const out = await ownedChainStepAudit(ctx, step('collection=forms'), ['forms'])
    expect(auditLeaf(out[0]).action).toBe('unknown')
    expect(auditLeaf(out[0]).chainStepId).toBe('03-forms-step')
  })

  it('pads the step index, so ids sort in chain order rather than lexically', async () => {
    const out = await ownedChainStepAudit(ctx, step('collection=forms action=a', { stepIndex: 7 }), ['forms'])
    expect(String(auditLeaf(out[0])?.chainStepId ?? '')).toMatch(/^07-/)
  })

  it('carries the tenant through — an audit leaf with no tenant is unattributable', async () => {
    const out = await ownedChainStepAudit(ctx, step('collection=forms action=a'), ['forms'])
    expect(auditLeaf(out[0]).tenantId).toBe('t1')
  })
})
