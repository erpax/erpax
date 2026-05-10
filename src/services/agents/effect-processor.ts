/**
 * Effect processor — the only place AgentEffect side effects fire.
 *
 * Slice DDDDD task 3 (2026-05-11). Routes each effect kind to its
 * substrate layer:
 *
 *   create / update → ctx.payload (Payload data layer)
 *   notify          → ctx.emit('notification:<channel>') (event bus → PPPP subscriber)
 *   escalate        → ctx.emit('escalation:raised')      (event bus → audit chain + notification)
 *   audit           → ctx.audit                          (Merkle audit chain, QQQQ)
 *   emit            → ctx.emit                           (event bus, NNNN)
 *   capture         → ctx.capture                        (multimedia evidence, CCCCC-cut2)
 *
 * Persistence is the substrate's job — the processor never creates
 * rows directly for `notify` / `escalate`; it surfaces them as domain
 * events so the existing notification subscriber and the audit chain
 * pick them up. This keeps the processor pure (no schema coupling)
 * and means new notification channels / escalation policies don't
 * require changes here.
 *
 * Exhaustiveness is enforced at compile-time via the `never` check
 * in the switch's default branch; the runtime throw is belt-and-
 * braces for non-TS callers.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.5 testability
 * @standard ISO/IEC 12207 software-life-cycle (single substrate seam)
 */

import type { AgentContext, AgentEffect } from './types'

/** Mustache-style placeholder substitution. */
function compose(template: string, vars: Record<string, unknown>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => String(vars[k] ?? ''))
}

export async function processEffect(eff: AgentEffect, ctx: AgentContext): Promise<void> {
  switch (eff.kind) {
    case 'create':
      await ctx.payload.create({
        collection: eff.collection,
        data: eff.data as Record<string, unknown>,
        overrideAccess: true,
      } as never)
      return

    case 'update':
      await ctx.payload.update({
        collection: eff.collection,
        id: eff.id,
        data: eff.patch as Record<string, unknown>,
        overrideAccess: true,
      } as never)
      return

    case 'notify': {
      const body = compose(ctx.t(eff.templateKey, ctx.locale) ?? eff.templateKey, eff.vars)
      ctx.emit({
        id: `notification:${eff.channel}`,
        tenantId: ctx.tenantId,
        payload: { channel: eff.channel, body, templateKey: eff.templateKey, vars: eff.vars },
        emittedAt: new Date().toISOString(),
      })
      return
    }

    case 'escalate': {
      const description = compose(ctx.t(eff.templateKey, ctx.locale) ?? eff.templateKey, eff.vars)
      ctx.emit({
        id: 'escalation:raised',
        tenantId: ctx.tenantId,
        payload: { severity: eff.severity, description, templateKey: eff.templateKey, vars: eff.vars },
        emittedAt: new Date().toISOString(),
      })
      return
    }

    case 'audit':
      ctx.audit(eff.leaf)
      return

    case 'emit':
      ctx.emit(eff.event)
      return

    case 'capture':
      ctx.capture(eff.frame)
      return

    default: {
      const _exhaustive: never = eff
      throw new Error(`unknown effect kind: ${(_exhaustive as { kind: string }).kind}`)
    }
  }
}

/** Process a sequence of effects in order. */
export async function processEffects(
  effects: ReadonlyArray<AgentEffect>,
  ctx: AgentContext,
): Promise<void> {
  for (const e of effects) await processEffect(e, ctx)
}
