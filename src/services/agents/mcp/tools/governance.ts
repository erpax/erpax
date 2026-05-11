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
import { makeToolI18n, registerToolI18n, type LocalizedString } from '../i18n'
import type { ErpaxMcpTool } from '../tool-defs'
import {
  establishGovernance, attestWithinGovernance, governanceHasCapability,
  verifyGovernance,
} from '@/services/uuid-governance'
import type { ChainLink, LinkStore } from '@/services/uuid-chain'
import type { ContentUuid } from '@/services/integrity/content-uuid'
import { SLOT_TAGS, CAPABILITIES, type SlotTag } from '@/services/uuid-format'
import { assertTenantMatch } from './_guards'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const SLOT_ENUM = z.enum([
  'currency', 'locale', 'country', 'user', 'tenant', 'role',
  'chainLeaf', 'share', 'auditEvent', 'query', 'rateQuote',
  'signature', 'envelope', 'kvBinding', 'collectionRow', 'error',
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
  verify: {
    en: 'Walk a governance scope end-to-end (Slice GGGGGGGGGG — 2026-05-11). Caller passes the scope + the full ChainLink[] from genesis to HEAD; the tool builds an in-memory LinkStore, walks the chain backwards recomputing every leaf-uuid (Law 60 verifier — O(N) cost), AND decodes the rootUuid to read back the declared capabilities (Law 61). Returns { ok, verifiedLeaves, headDepth, capabilities, firstFailureLeaf?, firstFailureReason? }. Asymmetric: verification O(N); tamper exponential per Law 55.',
    bg: 'Обхожда scope за самоуправление от край до край. Подайте scope + всички ChainLink от genesis до HEAD; инструментът ги верифицира и декодира capabilities от rootUuid.',
    de: 'Durchläuft einen Governance-Scope vollständig (Slice GGGGGGGGGG). Der Aufrufer übergibt Scope + ChainLink[] von Genesis bis HEAD; das Tool verifiziert die Kette und dekodiert die Capabilities aus der rootUuid.',
    fr: 'Parcourt un scope de gouvernance de bout en bout (Slice GGGGGGGGGG). Le caller passe le scope + ChainLink[] de genesis à HEAD ; l\'outil vérifie la chaîne et décode les capacités depuis rootUuid.',
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
  const tVerify = makeToolI18n('erpax.governance.verify')

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
      async handler(args, req) {
        assertTenantMatch(String(args.tenantId), req)
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
      async handler(args, req) {
        const scope = args.scope as { tenantId?: unknown } | undefined
        assertTenantMatch(String(scope?.tenantId ?? ''), req)
        const result = attestWithinGovernance({
          scope: args.scope as never,
          attestation: args.attestation,
          occurredAt: args.occurredAt as string | undefined,
        })
        return json(result)
      },
    },
    {
      name: 'erpax.governance.verify',
      description: tVerify.desc(I18N.verify!),
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
        links: z.array(z.object({
          leafUuid: z.string(),
          prevUuid: z.string(),
          payloadUuid: z.string(),
          depth: z.number().int().min(0),
          occurredAt: z.string(),
          tenantId: z.string(),
        })).describe('Chain links from genesis (depth=0) to HEAD. Order is not required; the verifier walks by prevUuid lookup.'),
        maxDepth: z.number().int().min(1).optional().describe('Optional verification cap — defaults to the scope.chainDepth.'),
      },
      async handler(args, req) {
        const scope = args.scope as { tenantId?: unknown } | undefined
        assertTenantMatch(String(scope?.tenantId ?? ''), req)
        // Build an in-memory LinkStore. Caller-supplied; the tool itself
        // doesn't reach into any backing collection. Same pattern as
        // establish/attest — caller owns persistence; the tool computes.
        const supplied = (args.links as ReadonlyArray<ChainLink<unknown>>) ?? []
        const byUuid = new Map<string, ChainLink<unknown>>()
        for (const link of supplied) {
          byUuid.set(String(link.leafUuid), link)
        }
        const store: LinkStore<unknown> = {
          async getLink(leafUuid) {
            return byUuid.get(String(leafUuid as ContentUuid<ChainLink<unknown>>)) ?? null
          },
        }
        const result = await verifyGovernance({
          scope: args.scope as never,
          store: store as never,
          maxDepth: args.maxDepth as number | undefined,
        })
        return json(result)
      },
    },
  ]
}
