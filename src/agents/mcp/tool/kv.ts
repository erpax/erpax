/**
 * KV / uuid-mapping MCP tool family — Slice QQQQQQQQQ-cut1 (2026-05-11).
 *
 * Per user 'implement in mcp and erpax in sync'. Every ERPax service
 * landed in this slice (`src/services/uuid-kv/`) is also exposed as
 * MCP tools so external clients (Claude Code, IDE agents, federation
 * peers) can compute uuids consistently with the in-process surface.
 *
 * Tool family:
 *
 *   erpax.kv.bindingUuid     — content-uuid of a (keyUuid, valueUuid) pair
 *   erpax.kv.resolveKey       — keyUuid for a (slot, key) under a tenant
 *   erpax.kv.freezeRegistry   — content-uuid of an entire map state
 *
 * Tools are localized via the existing `makeToolI18n` pattern so the
 * description honours the requesting locale (Slice ZZZZZZZZ +
 * AAAAAAAAA).
 *
 * @standard MCP 0.6 tools/list + tools/call
 * @audit Conservation Law 8 + 47 + 57 (universal uuid mapping)
 * @feature uuid_kv
 * @see /src/services/uuid-kv/index.ts (the runtime surface this exposes)
 */
import { z } from 'zod'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import {
  computeKvBindingUuid, resolveKeyUuid, toUuidMap,
} from '@/uuid/kv'
import type { ContentUuid } from '@/integrity'
import { assertTenantMatch } from '@/agents/mcp/tool/_guards'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const I18N: Record<string, LocalizedString> = {
  bindingUuid: {
    en: 'Compute the content-uuid of a (keyUuid, valueUuid) pair under a tenant namespace. Same inputs → same uuid; federation peers compare bindings by this uuid alone.',
    bg: 'Изчислява content-uuid на двойка (keyUuid, valueUuid) в namespace на наемател. Идентични входове → идентичен uuid; федерационните партньори сравняват по този uuid.',
    de: 'Berechnet die content-uuid eines (keyUuid, valueUuid)-Paares im Tenant-Namespace. Gleiche Eingaben → gleiche uuid; Föderationspeers vergleichen Bindungen über diese uuid.',
    fr: 'Calcule la content-uuid d\'une paire (keyUuid, valueUuid) dans le namespace tenant. Mêmes entrées → même uuid ; les pairs fédérés comparent les bindings via cette uuid.',
  },
  resolveKey: {
    en: 'Return the keyUuid for a (slot, key) pair under a tenant. Slot name participates in the hash so the same string key in different slots produces distinct uuids — cross-slot collisions are structurally impossible.',
    bg: 'Връща keyUuid за двойка (slot, key) при наемател. Името на slot участва в хеша; еднакъв ключов низ в различни slot-ове произвежда различни uuid-ове.',
    de: 'Liefert die keyUuid für ein (slot, key)-Paar unter einem Tenant. Der Slot-Name fließt in den Hash ein; gleiche Key-Strings in unterschiedlichen Slots erzeugen distinkte uuids.',
    fr: 'Retourne le keyUuid d\'une paire (slot, key) sous un tenant. Le nom de slot participe au hash ; la même clé textuelle dans des slots différents produit des uuids distincts.',
  },
  freezeRegistry: {
    en: 'Compute the content-uuid of an entire string-keyed registry (e.g. PLUGIN_ACCESS_MAP) materialised as a UuidMap. Store at boot, recompute later; mismatch ⇒ post-boot tamper. Closes Finding 3 of the tamper-surface review.',
    bg: 'Изчислява content-uuid на цял низов registry, материализиран като UuidMap. Записва се при boot, преизчислява се по-късно; несъответствие ⇒ post-boot подправяне.',
    de: 'Berechnet die content-uuid einer als UuidMap materialisierten String-Registry. Bei Boot speichern, später neu berechnen; Mismatch ⇒ Post-Boot-Tamper.',
    fr: 'Calcule la content-uuid d\'un registre à clés textuelles matérialisé comme UuidMap. Stocker au boot, recalculer plus tard ; non-correspondance ⇒ tamper post-boot.',
  },
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.kv.${k}`, v)
}

export function buildKvTools(): ReadonlyArray<ErpaxMcpTool> {
  const tBinding = makeToolI18n('erpax.kv.bindingUuid')
  const tResolve = makeToolI18n('erpax.kv.resolveKey')
  const tFreeze = makeToolI18n('erpax.kv.freezeRegistry')

  return [
    {
      name: 'erpax.kv.bindingUuid',
      description: tBinding.desc(I18N.bindingUuid!),
      parameters: {
        keyUuid: z.string().describe('Content-uuid of the key'),
        valueUuid: z.string().describe('Content-uuid of the value'),
        tenantId: z.string().describe('Tenant namespace (use "platform" for cross-tenant)'),
      },
      async handler(args, req) {
        assertTenantMatch(String(args.tenantId), req)
        const bindingUuid = computeKvBindingUuid({
          keyUuid: args.keyUuid as ContentUuid<unknown>,
          valueUuid: args.valueUuid as ContentUuid<unknown>,
          tenantId: String(args.tenantId),
        })
        return json({ bindingUuid })
      },
    },
    {
      name: 'erpax.kv.resolveKey',
      description: tResolve.desc(I18N.resolveKey!),
      parameters: {
        slot: z.string().describe('Slot name (e.g. "currency", "locale", "plugin-access")'),
        key: z.string().describe('Raw string key within the slot'),
        tenantId: z.string().describe('Tenant namespace'),
      },
      async handler(args, req) {
        assertTenantMatch(String(args.tenantId), req)
        const keyUuid = resolveKeyUuid({
          slot: String(args.slot),
          key: String(args.key),
          tenantId: String(args.tenantId),
        })
        return json({ keyUuid })
      },
    },
    {
      name: 'erpax.kv.freezeRegistry',
      description: tFreeze.desc(I18N.freezeRegistry!),
      parameters: {
        slot: z.string().describe('Slot name used for keyUuid namespacing'),
        entries: z.array(z.tuple([z.string(), z.unknown()])).describe('Array of [key, value] pairs to materialise into the UuidMap'),
        tenantId: z.string().describe('Tenant namespace'),
      },
      async handler(args, req) {
        assertTenantMatch(String(args.tenantId), req)
        const entries = args.entries as Array<readonly [string, unknown]>
        const m = toUuidMap({
          slot: String(args.slot),
          entries,
          tenantId: String(args.tenantId),
        })
        const freezeUuid = m.freezeUuid(String(args.tenantId))
        return json({
          freezeUuid,
          size: m.size,
          bindings: [...m].map((b) => ({ keyUuid: b.keyUuid, valueUuid: b.valueUuid })),
        })
      },
    },
  ]
}
