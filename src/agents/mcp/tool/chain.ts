/**
 * UUID-chain MCP tool family — Slice TTTTTTTTT-cut1 (2026-05-11).
 *
 * Per user 'implement in mcp and erpax in sync'. Surfaces
 * Conservation Law 60 (binding-uuid IS the blockchain leaf) as MCP
 * tools so external clients can compute + verify chain leaves
 * against the same primitives the in-process surface uses.
 *
 *   erpax.chain.computeLeafUuid  — derive a leaf-uuid from (prev, payload, ts)
 *   erpax.chain.forgeGenesis      — compute the first link of a chain
 *   erpax.chain.forgeLink         — compute a successor link
 *   erpax.chain.verifyOne         — recompute one link's leaf-uuid + compare
 *
 * @standard MCP 0.6 + ISO/IEC 23257-1 blockchain reference architecture
 * @audit Conservation Law 60 binding-uuid-is-blockchain-leaf
 * @feature uuid_chain
 * @see /src/services/uuid-chain/index.ts
 */
import { z } from 'zod'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import {
  GENESIS_PREV_UUID,
  computeChainLinkUuid, forgeGenesisLink, forgeChainLink,
} from '@/uuid/chain'
import type { ContentUuid } from '@/integrity/content-uuid'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const I18N: Record<string, LocalizedString> = {
  computeLeafUuid: {
    en: 'Compute a chain leaf-uuid from (prevUuid, payloadUuid, occurredAt, tenant). Deterministic; federation peers compute byte-equal results for byte-equal inputs. Law 60: binding-uuid IS the blockchain leaf.',
    bg: 'Изчислява uuid на лист от верига от (prevUuid, payloadUuid, occurredAt, tenant). Детерминистично; федерационни партньори получават byte-equal резултат.',
    de: 'Berechnet eine chain-leaf-uuid aus (prevUuid, payloadUuid, occurredAt, tenant). Deterministisch; Föderationspeers liefern byte-equale Ergebnisse.',
    fr: 'Calcule une leaf-uuid de chaîne à partir de (prevUuid, payloadUuid, occurredAt, tenant). Déterministe ; pairs fédérés produisent des résultats byte-equal.',
  },
  forgeGenesis: {
    en: 'Forge the genesis link of a fresh chain. prev = GENESIS_PREV_UUID sentinel; depth = 0. Caller persists the returned link via whatever store (audit-events row, DO state, IPFS, blockchain anchor).',
    bg: 'Създава genesis lid за нова верига. prev = GENESIS_PREV_UUID; depth = 0.',
    de: 'Erzeugt das Genesis-Link einer neuen Chain. prev = GENESIS_PREV_UUID; depth = 0.',
    fr: 'Forge le maillon genesis d\'une nouvelle chaîne. prev = GENESIS_PREV_UUID ; depth = 0.',
  },
  forgeLink: {
    en: 'Forge a successor chain link. Advances depth by 1; binds (prev, payload) under the tenant via Law 57 KvBinding math then mixes in occurredAt to keep replays distinct.',
    bg: 'Създава наследник в верига. Увеличава depth с 1; обвързва (prev, payload) под наемателя.',
    de: 'Erzeugt einen Folgekettenglied. Erhöht depth um 1; bindet (prev, payload) unter dem Tenant.',
    fr: 'Forge un maillon successeur. Incrémente depth de 1 ; lie (prev, payload) sous le tenant.',
  },
  verifyOne: {
    en: 'Recompute one link\'s leaf-uuid from its (prev, payload, occurredAt, tenant) and compare to the stored leaf-uuid. Returns ok + reason. The verifier is O(1) per link; tamperer pays exponential cost (Law 55).',
    bg: 'Преизчислява uuid на един лист от (prev, payload, occurredAt, tenant) и сравнява със съхранения. Връща ok + причина.',
    de: 'Berechnet ein Link-leaf-uuid neu und vergleicht mit dem gespeicherten. Liefert ok + Begründung.',
    fr: 'Recalcule l\'leaf-uuid d\'un maillon et compare au stocké. Retourne ok + raison.',
  },
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.chain.${k}`, v)
}

export function buildChainTools(): ReadonlyArray<ErpaxMcpTool> {
  const tCompute = makeToolI18n('erpax.chain.computeLeafUuid')
  const tGenesis = makeToolI18n('erpax.chain.forgeGenesis')
  const tForge = makeToolI18n('erpax.chain.forgeLink')
  const tVerify = makeToolI18n('erpax.chain.verifyOne')

  return [
    {
      name: 'erpax.chain.computeLeafUuid',
      description: tCompute.desc(I18N.computeLeafUuid!),
      parameters: {
        prevUuid: z.string().describe('Predecessor leaf-uuid (or GENESIS_PREV_UUID sentinel for the first link).'),
        payloadUuid: z.string().describe('Content-uuid of the payload this link attests to.'),
        occurredAt: z.string().describe('ISO 8601 timestamp the link was forged.'),
        tenantId: z.string(),
      },
      async handler(args, _req) {
        const leafUuid = computeChainLinkUuid({
          prevUuid: args.prevUuid as ContentUuid<unknown>,
          payloadUuid: args.payloadUuid as ContentUuid<unknown>,
          occurredAt: String(args.occurredAt),
          tenantId: String(args.tenantId),
        })
        return json({ leafUuid })
      },
    },
    {
      name: 'erpax.chain.forgeGenesis',
      description: tGenesis.desc(I18N.forgeGenesis!),
      parameters: {
        payloadUuid: z.string(),
        tenantId: z.string(),
        occurredAt: z.string().optional(),
      },
      async handler(args, _req) {
        const link = forgeGenesisLink({
          payloadUuid: args.payloadUuid as ContentUuid<unknown>,
          tenantId: String(args.tenantId),
          occurredAt: args.occurredAt as string | undefined,
        })
        return json(link)
      },
    },
    {
      name: 'erpax.chain.forgeLink',
      description: tForge.desc(I18N.forgeLink!),
      parameters: {
        prevUuid: z.string(),
        prevDepth: z.number().int().min(0),
        payloadUuid: z.string(),
        tenantId: z.string(),
        occurredAt: z.string().optional(),
      },
      async handler(args, _req) {
        const link = forgeChainLink({
          prevUuid: args.prevUuid as ContentUuid<unknown>,
          prevDepth: Number(args.prevDepth),
          payloadUuid: args.payloadUuid as ContentUuid<unknown>,
          tenantId: String(args.tenantId),
          occurredAt: args.occurredAt as string | undefined,
        })
        return json(link)
      },
    },
    {
      name: 'erpax.chain.verifyOne',
      description: tVerify.desc(I18N.verifyOne!),
      parameters: {
        leafUuid: z.string().describe('The stored leaf-uuid to verify.'),
        prevUuid: z.string(),
        payloadUuid: z.string(),
        occurredAt: z.string(),
        tenantId: z.string(),
      },
      async handler(args, _req) {
        const expected = computeChainLinkUuid({
          prevUuid: args.prevUuid as ContentUuid<unknown>,
          payloadUuid: args.payloadUuid as ContentUuid<unknown>,
          occurredAt: String(args.occurredAt),
          tenantId: String(args.tenantId),
        })
        const ok = expected === args.leafUuid
        return json({
          ok,
          stored: args.leafUuid,
          expected,
          reason: ok
            ? 'recomputed leaf-uuid matches stored value'
            : `recomputed leaf uuid '${expected}' ≠ stored '${args.leafUuid}'`,
          genesisSentinel: GENESIS_PREV_UUID,
        })
      },
    },
  ]
}
