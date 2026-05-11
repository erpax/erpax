/**
 * Self-governance MCP tool family — Slice WWWWWWWWW-cut1 (2026-05-11).
 *
 * Per user 'implement in mcp and erpax in sync'. Surfaces the
 * uuid-self-governance layer (Conservation Law 63) as MCP tools.
 *
 *   erpax.governance.establish  — declare a self-governing scope
 *   erpax.governance.attest      — extend the scope's chain
 *   erpax.governance.verify      — walk + verify the scope
 *
 * @standard W3C DID Core 1.0 + W3C VC Data Model 2.0
 * @audit Conservation Law 63 uuid-self-governance
 * @feature uuid_governance
 * @see /src/services/uuid-governance/index.ts
 */
import { z } from 'zod'
import type { PayloadRequest } from 'payload'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '../i18n'
import {
  establishGovernance, attestWithinGovernance, governanceHasCapability,
} from '@/services/uuid-governance'
import { SLOT_TAGS, CAPABILITIES, type SlotTag } from '@/services/uuid-format'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

interface ErpaxMcpTool {
  readonly name: string
  readonly description: string
  readonly parameters: Record<string, z.ZodTypeAny>
  readonly handler: (args: Record<string, unknown>, req: PayloadRequest) => Promise<{ content: Array<{ type: 'text'; text: string }> }>
}

const SLOT_ENUM = z.enum([
  'currency', 'locale', 'country', 'user', 'tenant', 'role',
  'chainLeaf', 'share', 'auditEvent', 'query', 'rateQuote',
  'signature', 'envelope', 'kvBinding', 'collectionRow', 'reserved',
])
const CAP_ENUM = z.enum([
  'SIGNED', 'SEALED', 'ENCRYPTED', 'FEDERATED',
  'ANCHORED_BLOCKCHAIN', 'CHAINED', 'SHARED', 'TAMPER_PROOF',
])

const I18N: Record<string, LocalizedString> = {
  establish: {
    en: 'Establish a self-governance scope: compute the entity\'s structured rootUuid (Law 61) + forge the genesis chain leaf (Law 60). Caller persists the scope and genesis. The entity governs itself within this scope thereafter — no central authority.',
    bg: 'Установява scope за самоуправление: изчислява структурирания rootUuid + създава genesis lid. Обектът се управлява сам в този обхват.',
    de: 'Erstellt einen Self-Governance-Scope: berechnet die strukturierte rootUuid + erzeugt das Genesis-Chain-Link. Die Entität verwaltet sich anschließend selbst.',
    fr: 'Établit un scope d\'auto-gouvernance : calcule la rootUuid structurée + forge le maillon genesis. L\'entité se gouverne ensuite elle-même.',
  },
  attest: {
    en: 'Attest to an event within a governance scope by extending its chain. The new chain leaf\'s prev is the scope\'s current head. Returns the new chain link + updated scope.',
    bg: 'Декларира събитие в scope за самоуправление чрез разширяване на веригата. Връща новия leaf + обновен scope.',
    de: 'Bestätigt ein Event innerhalb eines Governance-Scopes durch Erweiterung der Chain. Liefert neues Link + aktualisierten Scope.',
    fr: 'Atteste un événement dans un scope de gouvernance en étendant sa chaîne. Retourne le nouveau maillon + scope mis à jour.',
  },
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.governance.${k}`, v)
}

function slotTagFromName(name: keyof typeof SLOT_TAGS): SlotTag {
  return SLOT_TAGS[name]
}

export function buildGovernanceTools(): ReadonlyArray<ErpaxMcpTool> {
  const tEstablish = makeToolI18n('erpax.governance.establish')
  const tAttest = makeToolI18n('erpax.governance.attest')

  return [
    {
      name: 'erpax.governance.establish',
      description: tEstablish.desc(I18N.establish!),
      parameters: {
        entity: z.unknown().describe('The entity declaring self-governance (any JCS-serialisable content).'),
        tenantId: z.string(),
        slot: SLOT_ENUM,
        capabilities: z.array(CAP_ENUM).optional(),
        schemaVersion: z.number().int().min(0).max(15).optional(),
        establishedAt: z.string().optional(),
      },
      async handler(args, _req) {
        const scope = establishGovernance({
          entity: args.entity,
          tenantId: String(args.tenantId),
          slotTag: slotTagFromName(args.slot as keyof typeof SLOT_TAGS),
          capabilities: (args.capabilities as Array<keyof typeof CAPABILITIES> | undefined) ?? ['CHAINED'],
          schemaVersion: (args.schemaVersion as number | undefined) ?? 1,
          establishedAt: args.establishedAt as string | undefined,
        })
        return json({
          scope,
          declaredCapabilities: (args.capabilities ?? []),
          hasSigned: governanceHasCapability(scope, 'SIGNED'),
          hasChained: governanceHasCapability(scope, 'CHAINED'),
          hasShared: governanceHasCapability(scope, 'SHARED'),
        })
      },
    },
    {
      name: 'erpax.governance.attest',
      description: tAttest.desc(I18N.attest!),
      parameters: {
        scope: z.object({
          rootUuid: z.string(),
          tenantId: z.string(),
          headLeafUuid: z.string(),
          chainDepth: z.number().int().min(0),
          genesisLeafUuid: z.string(),
          slotName: z.string(),
          capabilities: z.number().int(),
          schemaVersion: z.number().int(),
          establishedAt: z.string(),
        }),
        attestation: z.unknown(),
        occurredAt: z.string().optional(),
      },
      async handler(args, _req) {
        const result = attestWithinGovernance({
          scope: args.scope as never,
          attestation: args.attestation,
          occurredAt: args.occurredAt as string | undefined,
        })
        return json(result)
      },
    },
  ]
}
