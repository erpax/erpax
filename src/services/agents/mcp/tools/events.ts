/**
 * Events MCP tool family — Slice CCCCCCCCC (2026-05-11) extract.
 *
 * Per the Slice ZZZZZZZZ pattern: area-scoped factory + I18N map
 * registered for the i18n-harvester + localized via the translations
 * collection at request time.
 *
 * @standard ISO 19011:2018 §6.4.6 audit-evidence (event-graph traceability)
 * @audit Conservation Law 4 event-graph-closure
 * @see ../i18n.ts makeToolI18n + registerToolI18n
 */
import { z } from 'zod'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '../i18n'
import type { ErpaxMcpTool } from '../tool-defs'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const I18N: Record<string, LocalizedString> = {
  list: {
    en: 'List recent audit-events for a tenant (or all tenants if super-admin). Filtered by eventType / chainId / time window; sorted by createdAt desc.',
    bg: 'Списък с последните audit-events за наемател (или всички наематели за super-admin). Филтрира по eventType / chainId / времеви прозорец.',
    de: 'Listet die letzten audit-events eines Mandanten auf (oder aller Mandanten als Super-Admin). Filterbar nach eventType / chainId / Zeitfenster.',
    fr: 'Liste les audit-events récents d\'un tenant (ou tous les tenants pour un super-admin). Filtrable par eventType / chainId / fenêtre temporelle.',
  },
  emit: {
    en: 'Emit a real DomainEvent through emitDomainEvent — persists to audit-events + drives the subscriber graph + records the Merkle leaf. Use for synthetic testing of the event-driven path.',
    bg: 'Изпраща реален DomainEvent през emitDomainEvent — записва в audit-events, активира субскрайбърите и записва Merkle leaf. За синтетично тестване на потока.',
    de: 'Sendet ein echtes DomainEvent über emitDomainEvent — persistiert zu audit-events, treibt den Subscriber-Graph und protokolliert das Merkle-Leaf.',
    fr: 'Émet un DomainEvent réel via emitDomainEvent — persiste vers audit-events, déclenche le graphe d\'abonnés et enregistre la feuille Merkle.',
  },
  subscribers: {
    en: 'List every registered DomainAgent that subscribes to the given event id (or all subscriptions if no id provided). Surfaces the event-graph closure (Law 4) as data.',
    bg: 'Списък на всеки регистриран DomainAgent, абониран за дадено събитие (или всички абонаменти). Излага затварянето на event-graph (Law 4) като данни.',
    de: 'Listet jeden registrierten DomainAgent, der das angegebene Event abonniert (oder alle Abonnements). Stellt die Event-Graph-Schließung (Law 4) als Daten dar.',
    fr: 'Liste chaque DomainAgent enregistré qui souscrit à l\'événement donné (ou tous les abonnements). Expose la fermeture du graphe d\'événements (Law 4) sous forme de données.',
  },
  replay: {
    en: 'Re-fire a stored audit-event back through the subscriber graph. Useful for testing handler changes against historical traffic. Does NOT re-persist; the original audit-event stays canonical.',
    bg: 'Преизпраща съхранено audit-event обратно през subscriber graph. Полезно за тестване на промени по handler-и срещу исторически трафик. Не персистира повторно.',
    de: 'Schickt ein gespeichertes audit-event erneut durch den Subscriber-Graph. Nützlich für Handler-Tests gegen historischen Traffic. Persistiert nicht erneut.',
    fr: 'Réémet un audit-event stocké via le graphe d\'abonnés. Utile pour tester des changements de handler contre du trafic historique. Ne persiste pas à nouveau.',
  },
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.events.${k}`, v)
}

export function buildEventsTools(registry: { all: () => ReadonlyArray<{ id: string; subscribesTo: ReadonlyArray<string>; ownsCollections?: ReadonlyArray<string>; emits?: ReadonlyArray<string> }>; bySubscribedEvent: (id: string) => ReadonlyArray<{ id: string; ownsCollections?: ReadonlyArray<string>; emits?: ReadonlyArray<string> }> }): ReadonlyArray<ErpaxMcpTool> {
  const tList = makeToolI18n('erpax.events.list')
  const tEmit = makeToolI18n('erpax.events.emit')
  const tSubs = makeToolI18n('erpax.events.subscribers')
  const tReplay = makeToolI18n('erpax.events.replay')

  return [
    {
      name: 'erpax.events.list',
      description: tList.desc(I18N.list!),
      parameters: {
        tenantId: z.string().optional(),
        eventType: z.string().optional(),
        chainId: z.string().optional(),
        limit: z.number().int().min(1).max(500).optional(),
      },
      async handler({ tenantId, eventType, chainId, limit }, req) {
        const where: Record<string, unknown> = {}
        if (typeof tenantId === 'string') where.tenant = { equals: tenantId }
        if (typeof eventType === 'string') where.eventType = { equals: eventType }
        if (typeof chainId === 'string') where.chainId = { equals: chainId }
        const events = await req.payload.find({
          collection: 'audit-events' as never,
          where: Object.keys(where).length > 0 ? where : undefined,
          sort: '-createdAt',
          limit: (limit as number | undefined) ?? 50,
        })
        return json({
          total: events.totalDocs, page: events.page,
          docs: events.docs.map((d: Record<string, unknown>) => ({
            id: d.id, eventType: d.eventType, tenantId: d.tenant,
            chainId: d.chainId, aggregateType: d.aggregateType,
            aggregateId: d.aggregateId, createdAt: d.createdAt,
          })),
        })
      },
    },
    {
      name: 'erpax.events.emit',
      description: tEmit.desc(I18N.emit!),
      parameters: {
        eventType: z.string(),
        tenantId: z.string(),
        aggregateType: z.enum(['invoice', 'bill', 'payment', 'inventory_transfer', 'bank_statement', 'subscription', 'order', 'fixed_asset']),
        aggregateId: z.string(),
        payload: z.record(z.unknown()).optional(),
        label: z.string().optional(),
      },
      async handler({ eventType, tenantId, aggregateType, aggregateId, payload, label }, req) {
        const { emitDomainEvent } = await import('@/services/emit-domain-event')
        const eventId = (globalThis as { crypto?: { randomUUID: () => string } }).crypto?.randomUUID?.() ?? `evt_${Date.now()}`
        await emitDomainEvent(
          req as never,
          {
            eventId, eventType: eventType as never,
            tenantId: tenantId as string,
            aggregateId: aggregateId as string,
            aggregateType: aggregateType as never,
            timestamp: new Date(),
            userId: typeof req?.user === 'object' && req?.user && 'id' in req.user ? (req.user as { id: string }).id : 'system',
            payload: (payload as Record<string, unknown>) ?? {},
          } as never,
          (label as string | undefined) ?? `${eventType}: ${aggregateId}`,
        )
        return json({ ok: true, eventId, eventType, tenantId, aggregateId })
      },
    },
    {
      name: 'erpax.events.subscribers',
      description: tSubs.desc(I18N.subscribers!),
      parameters: { eventId: z.string().optional() },
      async handler({ eventId }) {
        if (typeof eventId === 'string') {
          return json({
            eventId,
            subscribers: registry.bySubscribedEvent(eventId).map((a) => ({
              id: a.id, ownsCollections: a.ownsCollections, emits: a.emits,
            })),
          })
        }
        const byEvent: Record<string, string[]> = {}
        for (const a of registry.all()) {
          for (const ev of a.subscribesTo) (byEvent[ev] ??= []).push(a.id)
        }
        return json({ totalEvents: Object.keys(byEvent).length, byEvent })
      },
    },
    {
      name: 'erpax.events.replay',
      description: tReplay.desc(I18N.replay!),
      parameters: { eventDocId: z.string() },
      async handler({ eventDocId }, req) {
        const doc = (await req.payload.findByID({
          collection: 'audit-events' as never,
          id: eventDocId as string,
        })) as Record<string, unknown>
        if (!doc) return text(`audit-event ${String(eventDocId)} not found`)
        const { agentRuntime } = await import('@/services/agents/bootstrap')
        const { createInProcessMcpClient } = await import('@/services/agents/mcp/in-process-client')
        const { buildErpaxMcpTools } = await import('../tool-defs')
        const tenantId = typeof doc.tenant === 'string' ? doc.tenant : 'unknown'
        const ctx = {
          tenantId, payload: req.payload,
          mcp: createInProcessMcpClient(buildErpaxMcpTools(registry as never), req),
          chain: undefined,
        }
        const effects = await agentRuntime.dispatchEvent(ctx as never, {
          id: doc.eventType as string, tenantId,
          payload: (doc.payload as Record<string, unknown> | undefined) ?? {},
          emittedAt: doc.createdAt as string,
        } as never)
        return json({
          replayed: doc.eventType,
          subscribers: agentRuntime.registry.bySubscribedEvent(doc.eventType as string).map((a) => a.id),
          effectCount: effects.length, effects,
        })
      },
    },
  ]
}
