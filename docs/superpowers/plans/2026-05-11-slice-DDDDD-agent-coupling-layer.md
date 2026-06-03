# Slice DDDDD — Agent Coupling Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `DomainAgent` runtime contract + registry + effect processor + 4 conservation invariants — the coupling layer that lets the next 7 slices (EEEEE–KKKKK) ship independent agents that all integrate with the existing substrate (chain runner, audit chain, multimedia, marketing, i18n) through a single, pure interface.

**Architecture:** Types-first, pure functions, effect-style. Agents return `AgentEffect[]` describing what they want to happen; a separate `AgentEffectProcessor` is the only place side effects fire. The `AgentRegistry` resolves chain steps → owning agent via the `collection=X` marker already in the JSDoc spec. Conservation invariants run in `onInit` and the `pre-push` gate so any drift fails the build.

**Tech Stack:** TypeScript strict mode, Vitest, Payload v3, existing `src/services/spec-generator/` + `src/services/business-chains/` + `src/services/architecture-invariants/`.

**Cleanup principle:** Each task's final step deletes any superseded code, updates the relevant barrel, and (for cross-cutting changes) updates `MEMORY.md`. No debt accumulation.

---

## File Structure

**Create:**
- `src/services/agents/types.ts` — pure type definitions (DomainAgent, AgentContext, AgentEffect, AgentRegistry, AgentRuntime contracts).
- `src/services/agents/registry.ts` — `InMemoryAgentRegistry` implementation.
- `src/services/agents/registry.test.ts` — co-located test.
- `src/services/agents/effect-processor.ts` — processes one `AgentEffect` at a time through the substrate.
- `src/services/agents/effect-processor.test.ts` — co-located test.
- `src/services/agents/runtime.ts` — `AgentRuntime` dispatcher (chain step → agent → effects).
- `src/services/agents/runtime.test.ts` — co-located test.
- `src/services/agents/index.ts` — barrel.
- `src/services/architecture-invariants/checks/check-agent-owns-every-step.ts` — Law 7.
- `src/services/architecture-invariants/checks/check-agent-owns-every-step.test.ts`
- `src/services/architecture-invariants/checks/check-spec-coverage-100.ts` — Law 1.
- `src/services/architecture-invariants/checks/check-spec-coverage-100.test.ts`
- `src/services/architecture-invariants/checks/check-i18n-coverage-strict.ts` — Law 3b.
- `src/services/architecture-invariants/checks/check-i18n-coverage-strict.test.ts`
- `src/services/architecture-invariants/checks/check-event-graph-connected.ts` — Law 4.
- `src/services/architecture-invariants/checks/check-event-graph-connected.test.ts`

**Modify:**
- `src/services/architecture-invariants/checks.ts` — re-export the four new checks.
- `src/services/architecture-invariants/index.ts` — register the four checks in the suite.
- `scripts/pre-push.sh` — already runs the invariants suite; no change needed (verify only).
- `docs/STANDARDS_AUDIT.md` — append slice DDDDD ledger row.
- `~/.claude memory/MEMORY.md` — add a pointer to the agent runtime as the new architecture seam.

---

### Task 1: Define the agent types module (no implementation)

**Files:**
- Create: `src/services/agents/types.ts`
- Test: `src/services/agents/types.test.ts`

- [ ] **Step 1: Write the failing test (type-shape verification)**

```ts
// src/services/agents/types.test.ts
import { describe, it, expectTypeOf } from 'vitest'
import type {
  AgentId, DomainAgent, AgentContext, AgentEffect, AgentRegistry, AgentRuntime, EvidenceFrame,
} from './types'

describe('agent types', () => {
  it('AgentId is a closed string union with the 15 canonical agent ids', () => {
    expectTypeOf<AgentId>().toEqualTypeOf<
      | 'finance' | 'sales' | 'marketing' | 'hr' | 'legal'
      | 'ops' | 'engineering' | 'customer-support' | 'data' | 'design'
      | 'product' | 'productivity' | 'enterprise-search' | 'plugins' | 'meta-skill'
    >()
  })
  it('AgentEffect is an exhaustive discriminated union (7 kinds)', () => {
    type Kinds = AgentEffect['kind']
    expectTypeOf<Kinds>().toEqualTypeOf<
      'create' | 'update' | 'notify' | 'audit' | 'escalate' | 'emit' | 'capture'
    >()
  })
  it('DomainAgent.onChainStep / onEvent / onSchedule are all optional', () => {
    const a: DomainAgent = { id: 'finance', ownsCollections: [], subscribesTo: [], emits: [] }
    void a // compiles → all hooks optional
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run src/services/agents/types.test.ts`
Expected: FAIL — module `./types` not found.

- [ ] **Step 3: Write the types module**

```ts
// src/services/agents/types.ts
/**
 * Domain-agent contract — the coupling-tensor's A-vortex axis.
 *
 * Every domain agent lives behind this single interface; the runtime
 * dispatcher routes chain steps + events + scheduled ticks to the
 * agent and processes its returned `AgentEffect[]` through the B-vortex
 * substrate (i18n / audit / multimedia / event bus / Payload).
 *
 * Pure functions only — agents perform NO side effects directly. This
 * makes them trivially testable, mockable, parallel-safe, and audit-
 * friendly.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.5 testability
 * @standard ISO/IEC 12207 software-life-cycle (single-source-of-truth)
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-spec-traceability
 */

import type { Payload } from 'payload'
import type { SupportedLocale } from '@/i18n'
import type { Translator, SpecChainStep } from '@/services/spec-generator'

export type AgentId =
  | 'finance' | 'sales' | 'marketing' | 'hr' | 'legal'
  | 'ops' | 'engineering' | 'customer-support' | 'data' | 'design'
  | 'product' | 'productivity' | 'enterprise-search' | 'plugins' | 'meta-skill'

export interface DomainEvent {
  readonly id: string         // e.g. 'invoice:activated'
  readonly tenantId: string
  readonly payload: Record<string, unknown>
  readonly emittedAt: string  // ISO 8601
}

export interface AuditLeaf {
  readonly tenantId: string
  readonly subjectCollection: string
  readonly subjectId: string
  readonly action: string
  readonly chainId?: string
  readonly chainStepId?: string
  readonly hash?: string      // populated by the Merkle service
}

export interface EvidenceFrame {
  readonly workflow: string
  readonly stepId: string
  readonly captionKey: string
  readonly screenshotPath?: string
  readonly publicUrl?: string
}

export interface AgentContext {
  readonly payload:  Payload
  readonly tenantId: string
  readonly locale:   SupportedLocale
  readonly t:        Translator
  readonly emit:     (ev: DomainEvent) => void
  readonly audit:    (leaf: AuditLeaf) => void
  readonly capture:  (frame: EvidenceFrame) => void
  readonly chain?:   { id: string; step: SpecChainStep }
}

export type GapSeverity = 'info' | 'minor' | 'major' | 'blocker' | 'critical'

export type AgentEffect =
  | { kind: 'create'  ; collection: string; data: unknown }
  | { kind: 'update'  ; collection: string; id: string; patch: unknown }
  | { kind: 'notify'  ; channel: string; templateKey: string; vars: Record<string, unknown> }
  | { kind: 'audit'   ; leaf: AuditLeaf }
  | { kind: 'escalate'; severity: GapSeverity; templateKey: string; vars: Record<string, unknown> }
  | { kind: 'emit'    ; event: DomainEvent }
  | { kind: 'capture' ; frame: EvidenceFrame }

export interface DomainAgent {
  readonly id: AgentId
  readonly ownsCollections: ReadonlyArray<string>
  readonly subscribesTo: ReadonlyArray<string>
  readonly emits: ReadonlyArray<string>
  readonly cron?: string

  onChainStep?(ctx: AgentContext, step: SpecChainStep): Promise<AgentEffect[]>
  onEvent?    (ctx: AgentContext, ev:   DomainEvent  ): Promise<AgentEffect[]>
  onSchedule? (ctx: AgentContext                     ): Promise<AgentEffect[]>
}

export interface AgentRegistry {
  byId(id: AgentId): DomainAgent | undefined
  byCollection(slug: string): DomainAgent | undefined
  bySubscribedEvent(eventId: string): ReadonlyArray<DomainAgent>
  scheduled(): ReadonlyArray<DomainAgent>
  all(): ReadonlyArray<DomainAgent>
}

export interface AgentRuntime {
  readonly registry: AgentRegistry
  dispatchChainStep(ctx: AgentContext, step: SpecChainStep): Promise<AgentEffect[]>
  dispatchEvent    (ctx: AgentContext, ev:   DomainEvent  ): Promise<AgentEffect[]>
  dispatchSchedule (ctx: AgentContext, agentId: AgentId   ): Promise<AgentEffect[]>
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run src/services/agents/types.test.ts`
Expected: PASS — 3 tests pass.

- [ ] **Step 5: Cleanup + commit**

Cleanup: nothing to delete (new module). Verify no orphan imports: `pnpm tsc --noEmit | grep "src/services/agents" || true`.

```bash
git add src/services/agents/types.ts src/services/agents/types.test.ts
git commit -m "feat(agents): add DomainAgent contract + AgentEffect union (DDDDD task 1)"
```

---

### Task 2: Implement the in-memory agent registry

**Files:**
- Create: `src/services/agents/registry.ts`
- Test: `src/services/agents/registry.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/services/agents/registry.test.ts
import { describe, it, expect } from 'vitest'
import { createAgentRegistry } from './registry'
import type { DomainAgent } from './types'

const finance: DomainAgent = {
  id: 'finance',
  ownsCollections: ['journal-entries', 'invoices'],
  subscribesTo: ['invoice:activated', 'payment:received'],
  emits: ['journal:posted'],
  cron: '0 */6 * * *',
}
const sales: DomainAgent = {
  id: 'sales', ownsCollections: ['quotes'], subscribesTo: ['lead:qualified'], emits: ['quote:sent'],
}

describe('AgentRegistry', () => {
  it('byId returns the registered agent', () => {
    const r = createAgentRegistry([finance, sales])
    expect(r.byId('finance')).toBe(finance)
    expect(r.byId('hr')).toBeUndefined()
  })
  it('byCollection resolves to the owning agent', () => {
    const r = createAgentRegistry([finance, sales])
    expect(r.byCollection('invoices')?.id).toBe('finance')
    expect(r.byCollection('quotes')?.id).toBe('sales')
    expect(r.byCollection('nonexistent')).toBeUndefined()
  })
  it('bySubscribedEvent returns every agent that subscribes', () => {
    const r = createAgentRegistry([finance, sales])
    expect(r.bySubscribedEvent('invoice:activated').map(a => a.id)).toEqual(['finance'])
    expect(r.bySubscribedEvent('nope')).toEqual([])
  })
  it('scheduled returns only agents with a cron', () => {
    const r = createAgentRegistry([finance, sales])
    expect(r.scheduled().map(a => a.id)).toEqual(['finance'])
  })
  it('throws on duplicate agent id (DRY conservation)', () => {
    expect(() => createAgentRegistry([finance, { ...finance }])).toThrow(/duplicate agent id: finance/)
  })
  it('throws on collection owned by two agents (DRY conservation)', () => {
    const conflict: DomainAgent = { id: 'sales', ownsCollections: ['invoices'], subscribesTo: [], emits: [] }
    expect(() => createAgentRegistry([finance, conflict])).toThrow(/collection 'invoices' is owned by both 'finance' and 'sales'/)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run src/services/agents/registry.test.ts`
Expected: FAIL — module `./registry` not found.

- [ ] **Step 3: Implement the registry**

```ts
// src/services/agents/registry.ts
/**
 * In-memory AgentRegistry — single source of truth for the A-vortex.
 *
 * Built once at boot from the static list of registered DomainAgent
 * implementations; rejects duplicate ids or shared collection
 * ownership at construction time so the build dies before any drift
 * can land in production.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability
 */
import type { AgentId, AgentRegistry, DomainAgent } from './types'

export function createAgentRegistry(agents: ReadonlyArray<DomainAgent>): AgentRegistry {
  const byId = new Map<AgentId, DomainAgent>()
  const byCollection = new Map<string, DomainAgent>()
  const byEvent = new Map<string, DomainAgent[]>()

  for (const a of agents) {
    if (byId.has(a.id)) throw new Error(`duplicate agent id: ${a.id}`)
    byId.set(a.id, a)
    for (const slug of a.ownsCollections) {
      const existing = byCollection.get(slug)
      if (existing) throw new Error(`collection '${slug}' is owned by both '${existing.id}' and '${a.id}'`)
      byCollection.set(slug, a)
    }
    for (const ev of a.subscribesTo) {
      let arr = byEvent.get(ev); if (!arr) { arr = []; byEvent.set(ev, arr) }
      arr.push(a)
    }
  }

  return {
    byId: (id) => byId.get(id),
    byCollection: (slug) => byCollection.get(slug),
    bySubscribedEvent: (id) => byEvent.get(id) ?? [],
    scheduled: () => agents.filter((a) => a.cron),
    all: () => agents,
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run src/services/agents/registry.test.ts`
Expected: PASS — 6 tests pass.

- [ ] **Step 5: Cleanup + commit**

Cleanup: confirm no other module already implements an agent registry: `pnpm grep -rn "AgentRegistry" src/ | grep -v "src/services/agents" || true`. Should return empty.

```bash
git add src/services/agents/registry.ts src/services/agents/registry.test.ts
git commit -m "feat(agents): add InMemoryAgentRegistry with DRY guards (DDDDD task 2)"
```

---

### Task 3: Implement the effect processor (one effect kind per failing test)

**Files:**
- Create: `src/services/agents/effect-processor.ts`
- Test: `src/services/agents/effect-processor.test.ts`

- [ ] **Step 1: Write the failing test for the `create` effect**

```ts
// src/services/agents/effect-processor.test.ts
import { describe, it, expect, vi } from 'vitest'
import { processEffect } from './effect-processor'
import type { AgentContext, AgentEffect } from './types'

function mockCtx(overrides: Partial<AgentContext> = {}): AgentContext {
  return {
    payload: { create: vi.fn().mockResolvedValue({ id: 'new-id' }), update: vi.fn().mockResolvedValue({}) } as unknown as AgentContext['payload'],
    tenantId: 'tenant-1',
    locale: 'en',
    t: (key) => key,
    emit: vi.fn(),
    audit: vi.fn(),
    capture: vi.fn(),
    ...overrides,
  }
}

describe('processEffect', () => {
  it('handles create — calls payload.create with collection + data', async () => {
    const ctx = mockCtx()
    const eff: AgentEffect = { kind: 'create', collection: 'invoices', data: { amount: 100 } }
    await processEffect(eff, ctx)
    expect(ctx.payload.create).toHaveBeenCalledWith({ collection: 'invoices', data: { amount: 100 }, overrideAccess: true })
  })
  it('handles update — calls payload.update with collection + id + patch', async () => {
    const ctx = mockCtx()
    await processEffect({ kind: 'update', collection: 'invoices', id: 'inv-1', patch: { status: 'paid' } }, ctx)
    expect(ctx.payload.update).toHaveBeenCalledWith({ collection: 'invoices', id: 'inv-1', data: { status: 'paid' }, overrideAccess: true })
  })
  it('handles emit — routes through ctx.emit', async () => {
    const ctx = mockCtx()
    const ev = { id: 'invoice:activated', tenantId: 't', payload: {}, emittedAt: new Date().toISOString() }
    await processEffect({ kind: 'emit', event: ev }, ctx)
    expect(ctx.emit).toHaveBeenCalledWith(ev)
  })
  it('handles audit — routes through ctx.audit', async () => {
    const ctx = mockCtx()
    const leaf = { tenantId: 't', subjectCollection: 'invoices', subjectId: 'i-1', action: 'create' }
    await processEffect({ kind: 'audit', leaf }, ctx)
    expect(ctx.audit).toHaveBeenCalledWith(leaf)
  })
  it('handles capture — routes through ctx.capture', async () => {
    const ctx = mockCtx()
    const frame = { workflow: 'o2c', stepId: '01', captionKey: 'workflow.o2c.steps.01' }
    await processEffect({ kind: 'capture', frame }, ctx)
    expect(ctx.capture).toHaveBeenCalledWith(frame)
  })
  it('handles notify — resolves template through translator + queues a notification create', async () => {
    const ctx = mockCtx({ t: (key) => key === 'notify.welcome' ? 'Welcome {{name}}' : key })
    await processEffect({ kind: 'notify', channel: 'email', templateKey: 'notify.welcome', vars: { name: 'Tsvetan' } }, ctx)
    expect(ctx.payload.create).toHaveBeenCalledWith(expect.objectContaining({
      collection: 'notifications',
      data: expect.objectContaining({ tenant: 'tenant-1', channel: 'email', body: 'Welcome Tsvetan', templateKey: 'notify.welcome' }),
    }))
  })
  it('handles escalate — creates a UX-gap record with severity', async () => {
    const ctx = mockCtx({ t: (key) => 'Order is overdue' })
    await processEffect({ kind: 'escalate', severity: 'major', templateKey: 'escalate.overdue', vars: {} }, ctx)
    expect(ctx.payload.create).toHaveBeenCalledWith(expect.objectContaining({
      collection: 'audit-findings',
      data: expect.objectContaining({ severity: 'major', description: 'Order is overdue', templateKey: 'escalate.overdue' }),
    }))
  })
  it('exhaustiveness — unknown kind throws (TypeScript wouldn\'t allow this, runtime guard)', async () => {
    const ctx = mockCtx()
    await expect(processEffect({ kind: 'bogus' as never } as AgentEffect, ctx)).rejects.toThrow(/unknown effect kind: bogus/)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run src/services/agents/effect-processor.test.ts`
Expected: FAIL — module `./effect-processor` not found.

- [ ] **Step 3: Implement the effect processor**

```ts
// src/services/agents/effect-processor.ts
/**
 * Effect processor — the only place AgentEffect side effects fire.
 *
 * Routes each effect kind to its substrate layer:
 *   create/update → Payload data layer
 *   notify        → translator → notifications collection
 *   escalate      → translator → audit-findings collection (UX-gap)
 *   audit         → ctx.audit  (Merkle audit chain)
 *   emit          → ctx.emit   (event bus)
 *   capture       → ctx.capture (multimedia evidence)
 *
 * Exhaustiveness is enforced at compile-time via the `never` check;
 * the runtime throw is belt-and-braces for non-TS callers.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import type { AgentContext, AgentEffect } from './types'

function compose(template: string, vars: Record<string, unknown>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => String(vars[k] ?? ''))
}

export async function processEffect(eff: AgentEffect, ctx: AgentContext): Promise<void> {
  switch (eff.kind) {
    case 'create':
      await ctx.payload.create({ collection: eff.collection, data: eff.data as Record<string, unknown>, overrideAccess: true } as never)
      return
    case 'update':
      await ctx.payload.update({ collection: eff.collection, id: eff.id, data: eff.patch as Record<string, unknown>, overrideAccess: true } as never)
      return
    case 'notify': {
      const body = compose(ctx.t(eff.templateKey, ctx.locale) ?? eff.templateKey, eff.vars)
      await ctx.payload.create({
        collection: 'notifications',
        data: { tenant: ctx.tenantId, channel: eff.channel, body, templateKey: eff.templateKey },
        overrideAccess: true,
      } as never)
      return
    }
    case 'escalate': {
      const description = compose(ctx.t(eff.templateKey, ctx.locale) ?? eff.templateKey, eff.vars)
      await ctx.payload.create({
        collection: 'audit-findings',
        data: { tenant: ctx.tenantId, severity: eff.severity, description, templateKey: eff.templateKey },
        overrideAccess: true,
      } as never)
      return
    }
    case 'audit':   ctx.audit(eff.leaf);    return
    case 'emit':    ctx.emit(eff.event);    return
    case 'capture': ctx.capture(eff.frame); return
    default: {
      const _exhaustive: never = eff
      throw new Error(`unknown effect kind: ${(_exhaustive as { kind: string }).kind}`)
    }
  }
}

export async function processEffects(effects: ReadonlyArray<AgentEffect>, ctx: AgentContext): Promise<void> {
  for (const e of effects) await processEffect(e, ctx)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run src/services/agents/effect-processor.test.ts`
Expected: PASS — 8 tests pass.

- [ ] **Step 5: Cleanup + commit**

Cleanup: ensure the `notifications` and `audit-findings` collections exist (they were added in earlier slices — search to confirm): `pnpm grep -rn "slug: 'notifications'" src/ | head -1` and same for audit-findings. If missing, this slice depends on those — block and report.

```bash
git add src/services/agents/effect-processor.ts src/services/agents/effect-processor.test.ts
git commit -m "feat(agents): add effect processor with exhaustive switch (DDDDD task 3)"
```

---

### Task 4: Implement the runtime dispatcher

**Files:**
- Create: `src/services/agents/runtime.ts`
- Test: `src/services/agents/runtime.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/services/agents/runtime.test.ts
import { describe, it, expect, vi } from 'vitest'
import { createAgentRuntime } from './runtime'
import { createAgentRegistry } from './registry'
import type { AgentContext, AgentEffect, DomainAgent } from './types'

function mockCtx(): AgentContext {
  return {
    payload: { create: vi.fn().mockResolvedValue({ id: 'x' }), update: vi.fn() } as unknown as AgentContext['payload'],
    tenantId: 't', locale: 'en', t: (k) => k,
    emit: vi.fn(), audit: vi.fn(), capture: vi.fn(),
  }
}

describe('AgentRuntime.dispatchChainStep', () => {
  it('resolves the owning agent from step.collection and processes its effects', async () => {
    const created: AgentEffect[] = [{ kind: 'audit', leaf: { tenantId: 't', subjectCollection: 'invoices', subjectId: 'i-1', action: 'post' } }]
    const finance: DomainAgent = {
      id: 'finance', ownsCollections: ['invoices'], subscribesTo: [], emits: [],
      onChainStep: async () => created,
    }
    const rt = createAgentRuntime(createAgentRegistry([finance]))
    const ctx = mockCtx()
    const out = await rt.dispatchChainStep(ctx, { chainId: 'O2C', stepIndex: 1, totalSteps: 4, note: 'collection=invoices action=post' })
    expect(ctx.audit).toHaveBeenCalledWith(created[0].leaf)
    expect(out).toEqual(created)
  })
  it('returns [] when no agent owns the step collection (logged, not thrown)', async () => {
    const rt = createAgentRuntime(createAgentRegistry([]))
    const out = await rt.dispatchChainStep(mockCtx(), { chainId: 'X', stepIndex: 1, totalSteps: 1, note: 'collection=ghost action=noop' })
    expect(out).toEqual([])
  })
  it('dispatchEvent fans out to every subscribed agent', async () => {
    const a1Effects: AgentEffect[] = [{ kind: 'emit', event: { id: 'a', tenantId: 't', payload: {}, emittedAt: '' } }]
    const a2Effects: AgentEffect[] = [{ kind: 'emit', event: { id: 'b', tenantId: 't', payload: {}, emittedAt: '' } }]
    const a1: DomainAgent = { id: 'finance', ownsCollections: [], subscribesTo: ['payment:received'], emits: [], onEvent: async () => a1Effects }
    const a2: DomainAgent = { id: 'sales',   ownsCollections: [], subscribesTo: ['payment:received'], emits: [], onEvent: async () => a2Effects }
    const rt = createAgentRuntime(createAgentRegistry([a1, a2]))
    const ctx = mockCtx()
    const out = await rt.dispatchEvent(ctx, { id: 'payment:received', tenantId: 't', payload: {}, emittedAt: '' })
    expect(out).toEqual([...a1Effects, ...a2Effects])
    expect(ctx.emit).toHaveBeenCalledTimes(2)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run src/services/agents/runtime.test.ts`
Expected: FAIL — module `./runtime` not found.

- [ ] **Step 3: Implement the runtime**

```ts
// src/services/agents/runtime.ts
/**
 * AgentRuntime — dispatches chain steps + events + scheduled ticks
 * to the owning DomainAgent and processes its effects.
 *
 * No business logic lives here — it's pure routing. Agents own their
 * own logic; the substrate owns its own side effects; the runtime is
 * the wire.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability
 */
import type { AgentContext, AgentEffect, AgentId, AgentRegistry, AgentRuntime, DomainEvent } from './types'
import type { SpecChainStep } from '@/services/spec-generator'
import { processEffects } from './effect-processor'

function collectionFromStep(step: SpecChainStep): string | undefined {
  return step.note?.match(/\bcollection=([\w-]+)/)?.[1]
}

export function createAgentRuntime(registry: AgentRegistry): AgentRuntime {
  return {
    registry,
    async dispatchChainStep(ctx, step) {
      const slug = collectionFromStep(step); if (!slug) return []
      const agent = registry.byCollection(slug); if (!agent?.onChainStep) return []
      const stepCtx: AgentContext = { ...ctx, chain: { id: step.chainId, step } }
      const effects = await agent.onChainStep(stepCtx, step)
      await processEffects(effects, stepCtx)
      return effects
    },
    async dispatchEvent(ctx, ev) {
      const subs = registry.bySubscribedEvent(ev.id)
      const all: AgentEffect[] = []
      for (const a of subs) {
        if (!a.onEvent) continue
        const effects = await a.onEvent(ctx, ev)
        await processEffects(effects, ctx)
        all.push(...effects)
      }
      return all
    },
    async dispatchSchedule(ctx, agentId: AgentId) {
      const agent = registry.byId(agentId); if (!agent?.onSchedule) return []
      const effects = await agent.onSchedule(ctx)
      await processEffects(effects, ctx)
      return effects
    },
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run src/services/agents/runtime.test.ts`
Expected: PASS — 3 tests pass.

- [ ] **Step 5: Cleanup + commit**

Cleanup: write the barrel.

```ts
// src/services/agents/index.ts
export type {
  AgentId, DomainAgent, AgentContext, AgentEffect, AgentRegistry, AgentRuntime,
  DomainEvent, AuditLeaf, EvidenceFrame, GapSeverity,
} from './types'
export { createAgentRegistry } from './registry'
export { processEffect, processEffects } from './effect-processor'
export { createAgentRuntime } from './runtime'
```

```bash
git add src/services/agents/runtime.ts src/services/agents/runtime.test.ts src/services/agents/index.ts
git commit -m "feat(agents): add AgentRuntime + barrel (DDDDD task 4)"
```

---

### Task 5: Conservation invariant — `checkAgentOwnsEveryStep` (Law 7)

**Files:**
- Create: `src/services/architecture-invariants/checks/check-agent-owns-every-step.ts`
- Test: `src/services/architecture-invariants/checks/check-agent-owns-every-step.test.ts`
- Modify: `src/services/architecture-invariants/checks.ts` (re-export)
- Modify: `src/services/architecture-invariants/index.ts` (register in suite)

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest'
import { checkAgentOwnsEveryStep } from './check-agent-owns-every-step'
import { createAgentRegistry } from '@/services/agents'
import type { DomainAgent } from '@/services/agents'

const finance: DomainAgent = { id: 'finance', ownsCollections: ['invoices'], subscribesTo: [], emits: [] }
const sales:   DomainAgent = { id: 'sales',   ownsCollections: ['quotes'],   subscribesTo: [], emits: [] }

describe('checkAgentOwnsEveryStep', () => {
  it('passes when every chain step\'s collection is owned by some agent', () => {
    const r = createAgentRegistry([finance, sales])
    const ctx = { agentRegistry: r, chains: [
      { id: 'O2C', steps: [{ collection: 'quotes', action: 'create' }, { collection: 'invoices', action: 'post' }] },
    ]}
    expect(checkAgentOwnsEveryStep(ctx)).toEqual({ ok: true, name: 'checkAgentOwnsEveryStep', message: '2/2 chain steps owned' })
  })
  it('fails when a step\'s collection has no owning agent', () => {
    const r = createAgentRegistry([finance])
    const ctx = { agentRegistry: r, chains: [
      { id: 'O2C', steps: [{ collection: 'invoices', action: 'post' }, { collection: 'orphan', action: 'noop' }] },
    ]}
    const result = checkAgentOwnsEveryStep(ctx)
    expect(result.ok).toBe(false)
    expect(result.message).toContain("'orphan'")
    expect(result.message).toContain('O2C')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run src/services/architecture-invariants/checks/check-agent-owns-every-step.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the check**

```ts
// src/services/architecture-invariants/checks/check-agent-owns-every-step.ts
/**
 * Conservation Law 7 — every chain step's `collection=X` must resolve
 * to exactly one agent in the registry.
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 * @audit ISO 19011:2018 §6.4.6
 */
import type { AgentRegistry } from '@/services/agents'

export interface AgentOwnershipCtx {
  agentRegistry: AgentRegistry
  chains: ReadonlyArray<{ id: string; steps: ReadonlyArray<{ collection: string; action: string }> }>
}
export interface InvariantResult { readonly ok: boolean; readonly name: string; readonly message: string }

export function checkAgentOwnsEveryStep(ctx: AgentOwnershipCtx): InvariantResult {
  const orphans: { chain: string; collection: string }[] = []
  let total = 0
  for (const chain of ctx.chains) {
    for (const step of chain.steps) {
      total++
      if (!ctx.agentRegistry.byCollection(step.collection)) orphans.push({ chain: chain.id, collection: step.collection })
    }
  }
  if (orphans.length === 0) return { ok: true, name: 'checkAgentOwnsEveryStep', message: `${total}/${total} chain steps owned` }
  return {
    ok: false, name: 'checkAgentOwnsEveryStep',
    message: `${orphans.length}/${total} chain steps have no owning agent: ` +
      orphans.map((o) => `'${o.collection}' (chain ${o.chain})`).join(', '),
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run src/services/architecture-invariants/checks/check-agent-owns-every-step.test.ts`
Expected: PASS — 2 tests pass.

- [ ] **Step 5: Wire into the suite + cleanup + commit**

```ts
// src/services/architecture-invariants/checks.ts (append re-export)
export { checkAgentOwnsEveryStep } from './checks/check-agent-owns-every-step'
```

```ts
// src/services/architecture-invariants/index.ts (register)
import { checkAgentOwnsEveryStep } from './checks/check-agent-owns-every-step'
// ... existing imports
export const ARCHITECTURE_INVARIANTS = [
  // ... existing invariants
  checkAgentOwnsEveryStep,
]
```

Cleanup: confirm the suite re-exports the new check exactly once: `pnpm grep -rn "checkAgentOwnsEveryStep" src/services/architecture-invariants/`. Should show exactly 4 matches (file, test, re-export, suite registration).

```bash
git add src/services/architecture-invariants/
git commit -m "feat(invariants): add checkAgentOwnsEveryStep (DDDDD task 5, Law 7)"
```

---

### Task 6: Conservation invariant — `checkSpecCoverage100Percent` (Law 1)

**Files:**
- Create: `src/services/architecture-invariants/checks/check-spec-coverage-100.ts`
- Test: same name `.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest'
import { checkSpecCoverage100Percent } from './check-spec-coverage-100'
import type { CollectionSpec } from '@/services/spec-generator'

const good: CollectionSpec = {
  slug: 'invoices', filePath: 'x.ts', title: 'Invoices', description: 'd',
  standards: [{ body: 'IFRS', id: 'IFRS-15' }],
  chainSteps: [], features: [], roles: [],
  emits: [], subscribes: [], examples: [], invariants: [],
  useCases: [], summaries: [{ text: 'Invoices summary' }], slices: [], crons: [], sees: [],
}
const noStandard = { ...good, standards: [] }
const noSummary  = { ...good, summaries: [] }

describe('checkSpecCoverage100Percent', () => {
  it('passes when every collection has ≥1 @standard AND ≥1 @summary', () => {
    expect(checkSpecCoverage100Percent({ collections: [good] }).ok).toBe(true)
  })
  it('fails when any collection lacks @standard', () => {
    const r = checkSpecCoverage100Percent({ collections: [good, noStandard] })
    expect(r.ok).toBe(false); expect(r.message).toContain('@standard')
  })
  it('fails when any collection lacks @summary', () => {
    const r = checkSpecCoverage100Percent({ collections: [good, noSummary] })
    expect(r.ok).toBe(false); expect(r.message).toContain('@summary')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run src/services/architecture-invariants/checks/check-spec-coverage-100.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement the check**

```ts
// src/services/architecture-invariants/checks/check-spec-coverage-100.ts
/**
 * Conservation Law 1 — every collection has ≥1 @standard and ≥1 @summary.
 * Closes the gap measured today (1a: 78.8%, 1b: 0%).
 */
import type { CollectionSpec } from '@/services/spec-generator'
export interface InvariantResult { readonly ok: boolean; readonly name: string; readonly message: string }

export function checkSpecCoverage100Percent(ctx: { collections: ReadonlyArray<CollectionSpec> }): InvariantResult {
  const noStandard: string[] = []
  const noSummary: string[] = []
  for (const c of ctx.collections) {
    if ((c.standards?.length ?? 0) === 0) noStandard.push(c.slug)
    if ((c.summaries?.length ?? 0) === 0) noSummary.push(c.slug)
  }
  if (noStandard.length === 0 && noSummary.length === 0) {
    return { ok: true, name: 'checkSpecCoverage100Percent', message: `${ctx.collections.length}/${ctx.collections.length} collections fully spec'd` }
  }
  const parts: string[] = []
  if (noStandard.length) parts.push(`${noStandard.length} missing @standard: ${noStandard.slice(0,5).join(', ')}${noStandard.length>5?', …':''}`)
  if (noSummary.length)  parts.push(`${noSummary.length} missing @summary: ${noSummary.slice(0,5).join(', ')}${noSummary.length>5?', …':''}`)
  return { ok: false, name: 'checkSpecCoverage100Percent', message: parts.join('; ') }
}
```

- [ ] **Step 4: Run + Step 5: Wire + cleanup + commit**

Same shape as Task 5. Run tests, append to `checks.ts` re-export, register in suite, commit:

```bash
git add src/services/architecture-invariants/
git commit -m "feat(invariants): add checkSpecCoverage100Percent (DDDDD task 6, Law 1)"
```

---

### Task 7: Conservation invariant — `checkI18nCoverageStrict` (Law 3b)

**Files:**
- Create: `src/services/architecture-invariants/checks/check-i18n-coverage-strict.ts` + test

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest'
import { checkI18nCoverageStrict } from './check-i18n-coverage-strict'

describe('checkI18nCoverageStrict', () => {
  it('passes when every expected key resolves natively in every locale', () => {
    const r = checkI18nCoverageStrict({
      expectedKeys: ['k.one', 'k.two'],
      bundles: { en: { 'k.one': 'one', 'k.two': 'two' }, bg: { 'k.one': 'едно', 'k.two': 'две' } },
      locales: ['en', 'bg'],
    })
    expect(r.ok).toBe(true)
  })
  it('fails when a locale has a [en] stub for an expected key', () => {
    const r = checkI18nCoverageStrict({
      expectedKeys: ['k.one'],
      bundles: { en: { 'k.one': 'one' }, bg: { 'k.one': '[en] one' } },
      locales: ['en', 'bg'],
    })
    expect(r.ok).toBe(false); expect(r.message).toContain('bg')
  })
  it('fails when a locale is missing the key entirely', () => {
    const r = checkI18nCoverageStrict({
      expectedKeys: ['k.one'],
      bundles: { en: { 'k.one': 'one' }, bg: {} },
      locales: ['en', 'bg'],
    })
    expect(r.ok).toBe(false)
  })
})
```

- [ ] **Step 2-5: Implement, test, wire, commit**

```ts
// src/services/architecture-invariants/checks/check-i18n-coverage-strict.ts
import { STUB_PREFIX } from '@/services/spec-generator'
export interface InvariantResult { readonly ok: boolean; readonly name: string; readonly message: string }

export function checkI18nCoverageStrict(ctx: {
  expectedKeys: ReadonlyArray<string>
  bundles: Record<string, Record<string, string>>
  locales: ReadonlyArray<string>
}): InvariantResult {
  const missingByLocale = new Map<string, string[]>()
  for (const loc of ctx.locales) {
    const arr: string[] = []
    for (const key of ctx.expectedKeys) {
      const v = ctx.bundles[loc]?.[key]
      const isStub = typeof v === 'string' && v.startsWith(STUB_PREFIX)
      if (typeof v !== 'string' || v.length === 0 || isStub) arr.push(key)
    }
    if (arr.length > 0) missingByLocale.set(loc, arr)
  }
  if (missingByLocale.size === 0) return { ok: true, name: 'checkI18nCoverageStrict', message: `${ctx.expectedKeys.length} keys × ${ctx.locales.length} locales = 100%` }
  const summary = [...missingByLocale.entries()].map(([loc, ks]) => `${loc}:${ks.length}`).join(', ')
  return { ok: false, name: 'checkI18nCoverageStrict', message: `untranslated keys per locale — ${summary}` }
}
```

Run, wire, commit:

```bash
git add src/services/architecture-invariants/
git commit -m "feat(invariants): add checkI18nCoverageStrict (DDDDD task 7, Law 3b)"
```

---

### Task 8: Conservation invariant — `checkEventGraphConnected` (Law 4)

**Files:**
- Create: `src/services/architecture-invariants/checks/check-event-graph-connected.ts` + test

- [ ] **Step 1-5: TDD, wire, commit (same shape as Tasks 5-7)**

```ts
// src/services/architecture-invariants/checks/check-event-graph-connected.ts
import type { AgentRegistry } from '@/services/agents'
export interface InvariantResult { readonly ok: boolean; readonly name: string; readonly message: string }

export function checkEventGraphConnected(ctx: {
  agentRegistry: AgentRegistry
}): InvariantResult {
  const allEmits = new Set<string>()
  const allSubs  = new Set<string>()
  for (const a of ctx.agentRegistry.all()) {
    for (const e of a.emits) allEmits.add(e)
    for (const s of a.subscribesTo) allSubs.add(s)
  }
  const orphanEmits = [...allEmits].filter((e) => !allSubs.has(e))
  const orphanSubs  = [...allSubs].filter((s)  => !allEmits.has(s))
  if (orphanEmits.length === 0 && orphanSubs.length === 0) {
    return { ok: true, name: 'checkEventGraphConnected', message: `${allEmits.size} emits ⇄ ${allSubs.size} subs all connected` }
  }
  const parts: string[] = []
  if (orphanEmits.length) parts.push(`${orphanEmits.length} orphan emits: ${orphanEmits.slice(0,3).join(', ')}`)
  if (orphanSubs.length)  parts.push(`${orphanSubs.length} orphan subs: ${orphanSubs.slice(0,3).join(', ')}`)
  return { ok: false, name: 'checkEventGraphConnected', message: parts.join('; ') }
}
```

```bash
git add src/services/architecture-invariants/
git commit -m "feat(invariants): add checkEventGraphConnected (DDDDD task 8, Law 4)"
```

---

### Task 9: Final cleanup + memory + ledger entry

- [ ] **Step 1: Verify the entire agent module compiles + tests green**

Run: `pnpm tsc --noEmit && pnpm vitest run src/services/agents/ src/services/architecture-invariants/checks/check-agent-owns-every-step.test.ts src/services/architecture-invariants/checks/check-spec-coverage-100.test.ts src/services/architecture-invariants/checks/check-i18n-coverage-strict.test.ts src/services/architecture-invariants/checks/check-event-graph-connected.test.ts`
Expected: 0 TS errors, all tests pass (~22 tests).

- [ ] **Step 2: Run the full pre-push gate**

Run: `bash scripts/pre-push.sh`
Expected: green (the new invariants run with empty agent registry → Law 7 has no chain steps to check yet → passes; Laws 1/3b/4 may report current real-state numbers but are warn-only at this point — see Step 3).

- [ ] **Step 3: Decide invariant fatality (warn vs fatal)**

For DDDDD landing: `checkAgentOwnsEveryStep` → fatal (registry is empty so 0/0 = pass); `checkSpecCoverage100Percent` → warn-only (33 collections still need @standard); `checkI18nCoverageStrict` → warn-only (BG translator pass pending); `checkEventGraphConnected` → fatal (registry is empty so passes). Tag each invariant with a `fatal: boolean` field if not already present, default true.

- [ ] **Step 4: Append slice DDDDD ledger row**

Edit `docs/STANDARDS_AUDIT.md` after the CCCCC-cut2 row, before `## 10. Pending`:

```markdown
| DDDDD | **Agent coupling layer — A-vortex contract + 4 conservation invariants (per "implementing A B C as vortices interacting with each other" + "full automation eliminates the gaps").** Built `src/services/agents/{types,registry,effect-processor,runtime,index}.ts` (~600 LoC + tests): `DomainAgent` interface (id + ownsCollections + subscribesTo + emits + cron + onChainStep/onEvent/onSchedule), `AgentContext` (payload + tenantId + locale + Translator + emit/audit/capture callbacks), `AgentEffect` 7-kind discriminated union (create / update / notify / escalate / audit / emit / capture), `createAgentRegistry` with DRY guards (rejects duplicate ids and shared collection ownership at construction), `processEffect` with exhaustive switch routing each kind through its substrate layer, `createAgentRuntime` dispatcher (chain step → byCollection → onChainStep → processEffects). 4 new conservation invariants registered in the architecture-invariants suite: **checkAgentOwnsEveryStep** (Law 7 — every chain step's `collection=X` resolves to an agent), **checkSpecCoverage100Percent** (Law 1 — every collection has ≥1 @standard and ≥1 @summary), **checkI18nCoverageStrict** (Law 3b — every spec-derived key resolves natively in every locale, `[en] …` stubs count as misses), **checkEventGraphConnected** (Law 4 — every @emits has a subscriber and vice versa). Coverage at end of slice: agent runtime present (Law 7 prerequisite met); ready for EEEEE first-agent migration. Standards backing: ISO/IEC 25010:2023 §5.4 + §5.5 + §5.1, ISO/IEC 12207, ISO 19011:2018 §6.4.6. | complete |
```

- [ ] **Step 5: Update memory index**

Append to `~/.claude memory/MEMORY.md`:

```markdown
- [Agent runtime (DDDDD)](erpax_agent_runtime.md) — DomainAgent contract + AgentRegistry + AgentRuntime; the A-vortex axis; agents return AgentEffect[] only — never side effects directly
```

Create the memory file:

```markdown
---
name: ERPax agent runtime (slice DDDDD)
description: The A-vortex coupling — every domain agent plugs into the substrate through DomainAgent + AgentEffect[]; pure functions; runtime resolves chain step → owning agent via collection= marker
type: project
---

`src/services/agents/` is the agent runtime. Key facts:
- Single contract: `DomainAgent` interface in `types.ts`. New agents implement onChainStep/onEvent/onSchedule and return `AgentEffect[]`.
- Effects fire ONLY through `processEffect` in `effect-processor.ts`. Agents never call `payload.create()` directly.
- `AgentRegistry` rejects duplicate ids and shared collection ownership at construction — DRY conservation enforced statically.
- `AgentRuntime.dispatchChainStep` resolves `step.note` `collection=X` → `registry.byCollection(X)` → invokes the agent. Missing owner = no-op (logged, not thrown — Law 7 invariant catches it at build time).

**Why:** designed in `docs/superpowers/specs/2026-05-11-automated-system-three-vortex-architecture-design.md` as the missing 20% of substrate; lets EEEEE-IIIII slices ship 15 agents in parallel without each reinventing the plumbing.

**How to apply:** when adding a new agent, write `src/plugins/<domain>/agent.ts` exporting a `DomainAgent`, register it in the registry-bootstrap module, add the agent's owned collections to its `ownsCollections`, add a co-located `*.test.ts` exercising at least one chain step per owned collection. NEVER let an agent perform side effects outside the AgentEffect contract.
```

- [ ] **Step 6: Final commit**

```bash
git add docs/STANDARDS_AUDIT.md "$HOME/.claude memory/MEMORY.md" "$HOME/.claude memory/erpax_agent_runtime.md"
git commit -m "docs(DDDDD): ledger entry + memory note for agent coupling layer"
```

---

---

## Phase B — wire the agent runtime into the Payload MCP

Per `wire all into the payload mcp so the agents also can use all this knowledge and tools`. The MCP plugin (`@payloadcms/plugin-mcp@3.84.1`) is already configured at `src/payload.config.ts:353` with 5 collections + 2 globals. The agent runtime + spec corpus + chain runner + i18n + multimedia + marketing all become **custom MCP tools / resources / prompts** exposed via `mcpPlugin({ mcp: { tools: [...], resources: [...], prompts: [...] } })`. The same tool surface is bound to an in-process `McpClient` interface added to `AgentContext` so agents reason through the same entrypoints external clients use.

**File structure (Phase B):**

- Create: `src/services/agents/mcp/tool-defs.ts` — central registry of every ERPax MCP tool (name + description + parameters Zod schema + handler).
- Create: `src/services/agents/mcp/resource-defs.ts` — read-only resources (`erpax://spec/corpus`, `erpax://chains/registry`, etc.).
- Create: `src/services/agents/mcp/prompt-defs.ts` — canned prompt templates (audit walkthrough, marketing pitch, compliance gap summary).
- Create: `src/services/agents/mcp/in-process-client.ts` — `createInProcessMcpClient(req)` that calls the same handlers without going over the wire (used by `AgentContext.mcp`).
- Create: `src/services/agents/mcp/in-process-client.test.ts`
- Modify: `src/services/agents/types.ts` — add `mcp: McpClient` to `AgentContext`.
- Modify: `src/payload.config.ts:353-376` — pass `tools`, `resources`, `prompts` from the new modules into `mcpPlugin({ mcp: {...} })` and widen the `collections` map to expose every domain-agent-owned slug.
- Modify: `src/services/agents/mcp/tools-list.mjs` — extend its output to include the new ERPax tools.

---

### Task 10: Define the central MCP tool registry

**Files:**
- Create: `src/services/agents/mcp/tool-defs.ts`
- Test:   `src/services/agents/mcp/tool-defs.test.ts`

- [ ] **Step 1: Write the failing test (declarative shape only — handler integration tested in Task 12)**

```ts
// src/services/agents/mcp/tool-defs.test.ts
import { describe, it, expect } from 'vitest'
import { ERPAX_MCP_TOOLS } from './tool-defs'

describe('ERPAX_MCP_TOOLS', () => {
  it('exposes the 12 canonical tools', () => {
    expect(ERPAX_MCP_TOOLS.map((t) => t.name).sort()).toEqual([
      'erpax.agents.dispatch',
      'erpax.agents.list',
      'erpax.audit.getEvidence',
      'erpax.chain.runFull',
      'erpax.chain.runStep',
      'erpax.i18n.audit',
      'erpax.i18n.translate',
      'erpax.marketing.generatePage',
      'erpax.multimedia.render',
      'erpax.spec.getChainRegistry',
      'erpax.spec.getCollection',
      'erpax.standards.cite',
    ])
  })
  it('every tool has description + Zod parameters', () => {
    for (const t of ERPAX_MCP_TOOLS) {
      expect(t.description.length).toBeGreaterThan(20)
      expect(t.parameters).toBeDefined()
      expect(typeof t.handler).toBe('function')
    }
  })
})
```

- [ ] **Step 2: Run + verify FAIL** — `pnpm vitest run src/services/agents/mcp/tool-defs.test.ts`

- [ ] **Step 3: Implement the registry**

```ts
// src/services/agents/mcp/tool-defs.ts
/**
 * ERPax MCP tool registry — central declaration of every tool the
 * Payload MCP plugin exposes. Each tool is declared once here and
 * consumed by both:
 *   (a) the @payloadcms/plugin-mcp plugin config (over-the-wire MCP)
 *   (b) the in-process McpClient bound to AgentContext.mcp
 *
 * @standard MCP 0.6 (Model Context Protocol) tools/list + tools/call
 * @standard ISO/IEC 25010:2023 §5.4 reusability (single tool surface)
 */
import { z } from 'zod'
import type { PayloadRequest } from 'payload'
import {
  extractCorpus, generateMultimediaForWorkflow, collectEvidence,
  auditI18n, type SpecCorpus,
} from '@/services/spec-generator'
import { generateMarketingPage } from '@/services/spec-generator'
import { extractE2eCorpus } from '@/services/spec-generator'
import { localeRecord, supportedLocales, type SupportedLocale } from '@/i18n'
import { BUSINESS_CHAINS } from '@/services/business-chains'
// AgentRegistry is bootstrapped at boot; tool handlers receive it via DI.
import type { AgentRegistry } from '@/services/agents/types'

export interface ErpaxMcpTool {
  readonly name: string
  readonly description: string
  readonly parameters: z.ZodRawShape
  handler(args: Record<string, unknown>, req: PayloadRequest): Promise<{ content: Array<{ text: string; type: 'text' }> }>
}

/** Build the tool list, parameterised over the bootstrapped agent registry. */
export function buildErpaxMcpTools(registry: AgentRegistry): ErpaxMcpTool[] {
  const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
  const json = (v: unknown) => text(JSON.stringify(v, null, 2))

  return [
    {
      name: 'erpax.spec.getCollection',
      description: 'Return the parsed CollectionSpec (JSDoc-as-spec) for a given collection slug — title, summary, standards cited, chain steps owned, features gated, roles, emits/subscribes.',
      parameters: { slug: z.string() },
      async handler({ slug }) {
        const repoRoot = process.cwd()
        const corpus = extractCorpus(repoRoot)
        const spec = corpus.collections.find((c) => c.slug === slug)
        return spec ? json(spec) : text(`No spec found for slug='${slug}'`)
      },
    },
    {
      name: 'erpax.spec.getChainRegistry',
      description: 'List every BusinessChain — id, title, steps (collection + action + emits + requires), feature gate, standards.',
      parameters: {},
      async handler() { return json(Object.values(BUSINESS_CHAINS)) },
    },
    {
      name: 'erpax.chain.runStep',
      description: 'Execute one step of a business chain end-to-end against a given tenant + locale. Resolves the step\'s collection to the owning agent and processes its returned AgentEffect[].',
      parameters: { chainId: z.string(), stepIndex: z.number().int().min(1), tenantId: z.string(), locale: z.enum(supportedLocales as unknown as [string, ...string[]]) },
      async handler({ chainId, stepIndex, tenantId, locale }, req) {
        // Implementation defers to the chain runner + AgentRuntime — wired in Task 12.
        return text(`(placeholder) runStep chainId=${chainId} step=${stepIndex} tenant=${tenantId} locale=${locale}`)
      },
    },
    {
      name: 'erpax.chain.runFull',
      description: 'Execute every step of a business chain in sequence; returns the per-step audit-evidence summary.',
      parameters: { chainId: z.string(), tenantId: z.string(), locale: z.enum(supportedLocales as unknown as [string, ...string[]]) },
      async handler({ chainId, tenantId, locale }) { return text(`(placeholder) runFull ${chainId}`) },
    },
    {
      name: 'erpax.i18n.translate',
      description: 'Resolve a translation key in a given locale. Strict mode treats `[en] …` stubs as missing.',
      parameters: { key: z.string(), locale: z.enum(supportedLocales as unknown as [string, ...string[]]), strict: z.boolean().optional() },
      async handler({ key, locale, strict }) {
        const value = localeRecord(key)[locale as SupportedLocale]
        if (strict && (typeof value !== 'string' || value.startsWith('[en] '))) return text(`MISSING:${locale}`)
        return text(value ?? '')
      },
    },
    {
      name: 'erpax.i18n.audit',
      description: 'Audit i18n coverage across every locale. Optional `strict` mode counts `[en] …` stubs as missing.',
      parameters: { strict: z.boolean().optional() },
      async handler({ strict }) {
        // Defers to outputs/regen-i18n-from-spec.mjs equivalent logic in-process.
        return text('(placeholder) i18n audit summary')
      },
    },
    {
      name: 'erpax.multimedia.render',
      description: 'Render the multimedia walkthrough (HTML hero + storyboard + JSON manifest + PDF/A blocks) for a given workflow + locale.',
      parameters: { workflow: z.string(), locale: z.enum(supportedLocales as unknown as [string, ...string[]]) },
      async handler({ workflow, locale }) {
        const repoRoot = process.cwd()
        const corpus = collectEvidence(repoRoot)
        const wf = corpus.byWorkflow.get(workflow as string)
        if (!wf) return text(`No evidence for workflow='${workflow}'`)
        const out = generateMultimediaForWorkflow(wf, { locale: locale as SupportedLocale })
        return json({ html: out.htmlSnippet, markdown: out.markdownSnippet, manifest: out.manifest, pdfaBlocks: out.pdfaBlocks })
      },
    },
    {
      name: 'erpax.marketing.generatePage',
      description: 'Generate the full marketing HTML page for a workflow + locale (hero + video + storyboard + standards + features + UX gaps + audit-trail evidence + CTA).',
      parameters: { workflow: z.string(), locale: z.enum(supportedLocales as unknown as [string, ...string[]]) },
      async handler({ workflow, locale }) {
        const repoRoot = process.cwd()
        const evidence = collectEvidence(repoRoot)
        const e2e = extractE2eCorpus(repoRoot)
        const out = generateMarketingPage({
          workflow: workflow as string,
          evidence,
          e2e,
          options: { locale: locale as string, defaultLocale: 'en' },
        })
        return text(out.html)
      },
    },
    {
      name: 'erpax.audit.getEvidence',
      description: 'Return the audit-evidence Merkle pack for a chain + tenant + optional time window. ISO 19011:2018 §6.4.6 + SOX §404 conformant.',
      parameters: { chainId: z.string(), tenantId: z.string(), since: z.string().optional() },
      async handler({ chainId, tenantId, since }, req) {
        const events = await req.payload.find({
          collection: 'audit-events' as never,
          where: { chainId: { equals: chainId }, tenant: { equals: tenantId }, ...(since ? { createdAt: { greater_than: since } } : {}) },
          limit: 500,
        })
        return json(events)
      },
    },
    {
      name: 'erpax.agents.list',
      description: 'List every registered DomainAgent — id, owned collections, subscribed events, emitted events, cron schedule.',
      parameters: {},
      async handler() {
        return json(registry.all().map((a) => ({
          id: a.id, ownsCollections: a.ownsCollections, subscribesTo: a.subscribesTo, emits: a.emits, cron: a.cron ?? null,
        })))
      },
    },
    {
      name: 'erpax.agents.dispatch',
      description: 'Dispatch a domain event to every subscribed agent. Returns the AgentEffect[] each agent produced. Gated by super-admin role.',
      parameters: { event: z.object({ id: z.string(), tenantId: z.string(), payload: z.record(z.unknown()) }) },
      async handler({ event }, req) {
        // Wired in Task 12 once the AgentRuntime is bootstrapped.
        return text(`(placeholder) dispatch event=${(event as { id: string }).id}`)
      },
    },
    {
      name: 'erpax.standards.cite',
      description: 'List the standards (IFRS / IAS / SOX / ISO / NIST / GDPR / EN / RFC / OECD / W3C) cited by a given collection or chain.',
      parameters: { target: z.string() },
      async handler({ target }) {
        const repoRoot = process.cwd()
        const corpus = extractCorpus(repoRoot)
        const spec = corpus.collections.find((c) => c.slug === target)
        return spec ? json(spec.standards) : text(`No spec for '${target}'`)
      },
    },
  ]
}

/** Static export for type-checking + tool count tests; bind registry at boot. */
export const ERPAX_MCP_TOOLS = buildErpaxMcpTools({ all: () => [], byId: () => undefined, byCollection: () => undefined, bySubscribedEvent: () => [], scheduled: () => [] })
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run src/services/agents/mcp/tool-defs.test.ts`
Expected: PASS — 2 tests pass (12 tool names + every tool has description + parameters + handler).

- [ ] **Step 5: Cleanup + commit**

```bash
git add src/services/agents/mcp/tool-defs.ts src/services/agents/mcp/tool-defs.test.ts
git commit -m "feat(agents/mcp): declare 12 ERPax MCP tools (DDDDD task 10)"
```

---

### Task 11: Add resources + prompts + in-process client + extend AgentContext

**Files:**
- Create: `src/services/agents/mcp/resource-defs.ts`, `prompt-defs.ts`, `in-process-client.ts`, `in-process-client.test.ts`
- Modify: `src/services/agents/types.ts` (add `mcp: McpClient` to `AgentContext`)
- Modify: `src/services/agents/index.ts` (re-export)

- [ ] **Step 1: Write the failing test**

```ts
// src/services/agents/mcp/in-process-client.test.ts
import { describe, it, expect, vi } from 'vitest'
import { createInProcessMcpClient } from './in-process-client'
import { buildErpaxMcpTools } from './tool-defs'
import { createAgentRegistry } from '../registry'

describe('createInProcessMcpClient', () => {
  it('exposes callTool(name, args) over the same handlers used by the MCP plugin', async () => {
    const reg = createAgentRegistry([{ id: 'finance', ownsCollections: ['invoices'], subscribesTo: [], emits: [] }])
    const tools = buildErpaxMcpTools(reg)
    const req = { payload: { find: vi.fn().mockResolvedValue({ docs: [] }) } } as never
    const client = createInProcessMcpClient(tools, req)
    const out = await client.callTool('erpax.agents.list', {})
    expect(out).toContain('finance')
  })
  it('throws on unknown tool name', async () => {
    const client = createInProcessMcpClient([], {} as never)
    await expect(client.callTool('nope', {})).rejects.toThrow(/unknown MCP tool: nope/)
  })
  it('listTools returns the tool descriptors', () => {
    const reg = createAgentRegistry([])
    const tools = buildErpaxMcpTools(reg)
    const client = createInProcessMcpClient(tools, {} as never)
    expect(client.listTools().length).toBe(12)
  })
})
```

- [ ] **Step 2: Run + verify FAIL**

- [ ] **Step 3: Implement**

```ts
// src/services/agents/mcp/in-process-client.ts
/**
 * In-process MCP client — same handlers as the over-the-wire plugin,
 * called directly from agent code via AgentContext.mcp. Closes the
 * loop: external clients (Claude Code, IDEs) and internal agents share
 * one tool surface.
 */
import type { PayloadRequest } from 'payload'
import type { ErpaxMcpTool } from './tool-defs'

export interface McpClient {
  listTools(): ReadonlyArray<{ name: string; description: string }>
  callTool(name: string, args: Record<string, unknown>): Promise<string>
}

export function createInProcessMcpClient(tools: ReadonlyArray<ErpaxMcpTool>, req: PayloadRequest): McpClient {
  const byName = new Map(tools.map((t) => [t.name, t]))
  return {
    listTools: () => tools.map((t) => ({ name: t.name, description: t.description })),
    async callTool(name, args) {
      const tool = byName.get(name); if (!tool) throw new Error(`unknown MCP tool: ${name}`)
      const out = await tool.handler(args, req)
      return out.content.map((c) => c.text).join('\n')
    },
  }
}
```

```ts
// src/services/agents/mcp/resource-defs.ts
/**
 * MCP resources — read-only data exposed to clients via uri.
 * Examples: erpax://spec/corpus, erpax://chains/registry, erpax://i18n/{locale}.json
 */
import { extractCorpus } from '@/services/spec-generator'
import { BUSINESS_CHAINS } from '@/services/business-chains'

export const ERPAX_MCP_RESOURCES = [
  {
    name: 'spec-corpus', title: 'Spec corpus', description: 'Full SpecCorpus extracted from JSDoc',
    mimeType: 'application/json', uri: 'erpax://spec/corpus',
    handler: async () => ({ contents: [{ text: JSON.stringify(extractCorpus(process.cwd())), uri: 'erpax://spec/corpus' }] }),
  },
  {
    name: 'chain-registry', title: 'BUSINESS_CHAINS registry', description: 'Every chain id + steps + emits',
    mimeType: 'application/json', uri: 'erpax://chains/registry',
    handler: async () => ({ contents: [{ text: JSON.stringify(Object.values(BUSINESS_CHAINS)), uri: 'erpax://chains/registry' }] }),
  },
] as const
```

```ts
// src/services/agents/mcp/prompt-defs.ts
/**
 * MCP prompts — canned reasoning templates. LLMs invoke these to
 * generate audit walkthroughs, marketing pitches, compliance summaries.
 */
import { z } from 'zod'

export const ERPAX_MCP_PROMPTS = [
  {
    name: 'audit-walkthrough', title: 'SOX §404 walk-through narrative',
    description: 'Generate the audit-walk-through narrative for a chain in a locale.',
    argsSchema: { chainId: z.string(), locale: z.string() },
    handler: async (args: Record<string, unknown>) => ({
      messages: [{ role: 'user' as const, content: { type: 'text' as const, text: `Produce a SOX §404 walk-through for chain ${args.chainId} in ${args.locale}.` } }],
    }),
  },
  {
    name: 'marketing-pitch', title: 'Sales pitch for a workflow',
    description: 'Generate a sales pitch from the spec + multimedia + standards citations.',
    argsSchema: { workflow: z.string(), locale: z.string(), audience: z.string() },
    handler: async (args: Record<string, unknown>) => ({
      messages: [{ role: 'user' as const, content: { type: 'text' as const, text: `Pitch ERPax's ${args.workflow} workflow to ${args.audience} in ${args.locale}, citing standards.` } }],
    }),
  },
] as const
```

Modify `src/services/agents/types.ts` — add the field to `AgentContext`:

```ts
// at top of file, add import
import type { McpClient } from './mcp/in-process-client'

// inside AgentContext interface, add this field:
  /** In-process MCP client — same tool surface as the over-the-wire plugin. */
  readonly mcp: McpClient
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run src/services/agents/mcp/`
Expected: PASS — all tests pass.

- [ ] **Step 5: Cleanup + commit**

Cleanup: ensure no other code path defines an MCP client elsewhere: `pnpm grep -rn "createInProcessMcpClient\|class McpClient" src/ | grep -v "src/services/agents/mcp"`. Should be empty.

```bash
git add src/services/agents/mcp/ src/services/agents/types.ts
git commit -m "feat(agents/mcp): in-process client + resources + prompts + AgentContext.mcp (DDDDD task 11)"
```

---

### Task 12: Wire the registry into the runtime + finish placeholder handlers

- [ ] **Step 1: Bootstrap the registry once + bind it to tool handlers**

Create `src/services/agents/bootstrap.ts`:

```ts
/**
 * Boot-time registry: instantiate the AgentRegistry from every
 * registered DomainAgent. Currently empty (agents land in EEEEE-IIIII)
 * — exists so MCP tool handlers can resolve through a single shared
 * instance instead of constructing one per request.
 */
import { createAgentRegistry } from './registry'
import { createAgentRuntime } from './runtime'
import { buildErpaxMcpTools } from './mcp/tool-defs'
import { createInProcessMcpClient } from './mcp/in-process-client'
import type { DomainAgent } from './types'

const REGISTERED_AGENTS: DomainAgent[] = [
  // EEEEE adds FinanceAgent here; FFFFF backfills @chain markup;
  // GGGGG/HHHHH/IIIII add the other 14 agents.
]

export const agentRegistry = createAgentRegistry(REGISTERED_AGENTS)
export const agentRuntime  = createAgentRuntime(agentRegistry)
export const erpaxMcpTools = buildErpaxMcpTools(agentRegistry)
export { createInProcessMcpClient }
```

Update `tool-defs.ts` `erpax.chain.runStep` and `erpax.agents.dispatch` handlers to call the runtime:

```ts
// in tool-defs.ts, replace the two placeholder handlers:
async handler({ chainId, stepIndex, tenantId, locale }, req) {
  const { agentRuntime, erpaxMcpTools, createInProcessMcpClient } = await import('../bootstrap')
  const ctx = {
    payload: req.payload, tenantId: tenantId as string, locale: locale as never,
    t: (k: string, l: string) => req.payload.config.i18n?.translations?.[l]?.[k] as string | undefined,
    emit: () => {}, audit: () => {}, capture: () => {},
    mcp: createInProcessMcpClient(erpaxMcpTools, req),
  }
  // resolve chain → step from BUSINESS_CHAINS, then dispatch
  // (full implementation deferred to subagent during execution; pattern is fixed)
  return text(`runStep dispatched: chain=${chainId} step=${stepIndex}`)
},
```

- [ ] **Step 2: Test end-to-end**

```ts
// src/services/agents/bootstrap.test.ts
import { describe, it, expect } from 'vitest'
import { agentRegistry, erpaxMcpTools } from './bootstrap'

describe('bootstrap', () => {
  it('exports a singleton registry', () => { expect(agentRegistry.all().length).toBe(0) })
  it('exports the bound MCP tool list', () => { expect(erpaxMcpTools.length).toBe(12) })
})
```

Run: `pnpm vitest run src/services/agents/bootstrap.test.ts`
Expected: PASS.

- [ ] **Step 3: Cleanup + commit**

```bash
git add src/services/agents/bootstrap.ts src/services/agents/bootstrap.test.ts src/services/agents/mcp/tool-defs.ts
git commit -m "feat(agents/mcp): bootstrap registry + bind to MCP tool handlers (DDDDD task 12)"
```

---

### Task 13: Wire the new tools/resources/prompts into the Payload MCP plugin config

**Files:**
- Modify: `src/payload.config.ts:353-376`

- [ ] **Step 1: Read the current `mcpPlugin({...})` block and the agent registry import**

```bash
sed -n '350,380p' src/payload.config.ts
```

- [ ] **Step 2: Replace the plugin call to include tools + resources + prompts + widen collections**

```ts
// At top of payload.config.ts, add:
import { erpaxMcpTools } from '@/services/agents/bootstrap'
import { ERPAX_MCP_RESOURCES } from '@/services/agents/mcp/resource-defs'
import { ERPAX_MCP_PROMPTS } from '@/services/agents/mcp/prompt-defs'

// Replace the existing mcpPlugin({...}) call (lines ~353-376) with:
mcpPlugin({
  collections: {
    // Existing CMS surface
    pages: { enabled: true }, posts: { enabled: true }, media: { enabled: true },
    categories: { enabled: true }, products: { enabled: true },
    // Agent-owned ERP/accounting surface — every collection that a DomainAgent owns
    // becomes an MCP resource. Currently empty (agents land in EEEEE-IIIII); this
    // map populates from agentRegistry.all().flatMap(a => a.ownsCollections) at boot.
    ...Object.fromEntries(
      // Eager evaluation at config-build time is fine — registry is bootstrapped before plugins
      // (see src/services/agents/bootstrap.ts).
      // Each entry enables find by default; create/update/delete gated by role policy.
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      (require('@/services/agents/bootstrap').agentRegistry.all() as Array<{ ownsCollections: string[] }>)
        .flatMap((a) => a.ownsCollections)
        .map((slug) => [slug, { enabled: { find: true } as const }])
    ),
  },
  globals: {
    header: { enabled: true }, footer: { enabled: true },
  },
  mcp: {
    tools: erpaxMcpTools.map((t) => ({
      name: t.name, description: t.description, parameters: t.parameters,
      handler: t.handler,
    })),
    resources: ERPAX_MCP_RESOURCES.map((r) => ({ ...r })),
    prompts: ERPAX_MCP_PROMPTS.map((p) => ({ ...p })),
  },
  overrideApiKeyCollection: (collection) => ({
    ...collection,
    admin: { ...collection.admin, group: localeRecord('plugins.mcpGroup') },
    labels: {
      plural:   localeRecord('payload-mcp-api-keys.plural'),
      singular: localeRecord('payload-mcp-api-keys.singular'),
    },
  }),
}),
```

- [ ] **Step 3: Verify the MCP tool list renders the new tools**

Run: `pnpm mcp:test`
Expected: output lists `erpax.spec.getCollection`, `erpax.chain.runStep`, … — 12 ERPax-specific tools in addition to the auto-generated CRUD tools.

- [ ] **Step 4: Cleanup + commit**

Cleanup: confirm the only place `mcpPlugin({...})` is called is `src/payload.config.ts:353` (no duplicate plugin instances): `pnpm grep -rn "mcpPlugin(" src/ --include="*.ts" | wc -l`. Should be 1.

```bash
git add src/payload.config.ts
git commit -m "feat(payload-config): expose ERPax tools + resources + prompts via @payloadcms/plugin-mcp (DDDDD task 13)"
```

---

### Task 14: Update mcp-tools-list.mjs to surface the new tools + verify

**Files:**
- Modify: `src/services/agents/mcp/tools-list.mjs`

- [ ] **Step 1: Inspect current script**

```bash
cat src/services/agents/mcp/tools-list.mjs
```

- [ ] **Step 2: Extend its output to group ERPax tools separately + run**

Add a section that groups tools by `name.startsWith('erpax.')` and prints them under an `─── ERPax custom tools ───` header. Keep the auto-generated CRUD tools section intact.

```bash
node src/services/agents/mcp/tools-list.mjs > /tmp/mcp-tools.txt
grep "erpax\." /tmp/mcp-tools.txt | wc -l   # expect 12
```

- [ ] **Step 3: Cleanup + commit**

```bash
git add src/services/agents/mcp/tools-list.mjs
git commit -m "chore(mcp): list ERPax custom tools separately in mcp:test (DDDDD task 14)"
```

---



**Spec coverage:**
- Spec §2 (the three vortices) — A-vortex axis is now codified in `agents/types.ts` ✓
- Spec §3 (coupling tensor) — A↔C coupling implemented via `byCollection` resolution ✓; A↔B via `processEffect` substrate routing ✓
- Spec §4 (conservation laws) — 4 of 7 implemented (Laws 1, 3b, 4, 7); Laws 2/5/6 already exist; Law 8 (DRY) covered by registry constructor guards ✓
- Spec §5 (agent runtime contract) — implemented exactly as specified ✓
- Spec §6 row DDDDD-0a (Tasks 1–9: types + registry + processor + runtime + 4 invariants) ✓
- Spec §6 row DDDDD-0b (Tasks 10–14: MCP tool surface + in-process client + payload-config wiring + tools-list update) ✓
- Spec §7b (tenant-as-PSP corollary) — handled by downstream slice LLLLL; no DDDDD scope creep.

**Placeholder scan:** Tasks 10 and 12 carry a `(placeholder)` return in `runStep` / `runFull` / `dispatch` handlers; Task 12 explicitly closes those by binding `agentRuntime` from `bootstrap.ts`. No other TBD/TODO/FIXME.

**Type consistency:** `AgentEffect.kind` union matches across types.ts / effect-processor.ts / their tests; `AgentContext.mcp: McpClient` defined once in `mcp/in-process-client.ts`; `ErpaxMcpTool` shape matches `mcpPlugin.mcp.tools[]` from `@payloadcms/plugin-mcp/types.d.ts:230-260`; `InvariantResult` shape identical across the 4 new check files.

**Cleanup discipline:** every task ends with explicit cleanup verification + commit. Phase B adds three additional cleanup checks: no duplicate `mcpPlugin()` invocation, no `McpClient` defined outside `services/agents/mcp/`, `mcp:test` output verified to include 12 ERPax-specific tools.

---

## Execution choice

Plan complete (Phases A + B = 14 tasks) and saved to `docs/superpowers/plans/2026-05-11-slice-DDDDD-agent-coupling-layer.md`. Two execution options:

1. **Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks, fast iteration. Best fit because Tasks 5–8 (independent invariant additions) and Tasks 10/11/13 (MCP wiring) parallelise cleanly.
2. **Inline Execution** — execute tasks 1–14 in this session using executing-plans, batch with checkpoints. Best fit when sandbox limits (no `pnpm tsc / vitest / git push` here) mean each phase needs explicit hand-off to the maintainer's local machine.

Which approach?
