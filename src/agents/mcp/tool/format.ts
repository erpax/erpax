/**
 * Structured-uuid MCP tool family — Slice UUUUUUUUU-cut1 (2026-05-11).
 *
 * Per user 'implement in mcp and erpax in sync'. Surfaces the
 * structured uuidv8 format (Conservation Law 61) as MCP tools so
 * external clients can encode + decode + verify uuids carrying
 * embedded slot + capabilities + schema version.
 *
 *   erpax.format.encode  — pack content + slot + capabilities into uuidv8
 *   erpax.format.decode  — extract slot + capabilities + version
 *   erpax.format.verify  — re-encode and compare to a stored uuid
 *
 * @standard RFC 9562 §5.8 uuidv8 + RFC 9562 §4.1 variant
 * @standard MCP 0.6
 * @audit Conservation Law 61 uuid-carries-features
 * @feature uuid_format
 * @see /src/services/uuid-format/index.ts
 */
import { z } from 'zod'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'
import {
  encodeStructured, decodeStructured, verifyStructured,
  SLOT_TAGS, CAPABILITIES,
  type SlotTag,
} from '@/uuid/format'
import { assertTenantMatch } from '@/agents/mcp/tool/_guards'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const SLOT_ENUM = z.enum([
  'currency', 'locale', 'country', 'user', 'tenant', 'role',
  'chainLeaf', 'share', 'auditEvent', 'query', 'rateQuote',
  'signature', 'envelope', 'kvBinding', 'collectionRow', 'error',
])

const I18N: Record<string, LocalizedString> = {
  encode: {
    en: 'Encode a structured uuidv8 (RFC 9562 §5.8) carrying embedded slot tag (4 bits, 16 categories) + capability flags (8 bits — SIGNED/SEALED/ENCRYPTED/FEDERATED/ANCHORED_BLOCKCHAIN/CHAINED/SHARED/TAMPER_PROOF) + schema version (4 bits) + 106-bit sha-256 content digest. The uuid IS self-describing.',
    bg: 'Кодира структуриран uuidv8 с вграден slot tag + capability flags + schema version + 106-битов sha-256 digest. uuid-ът се описва сам.',
    de: 'Kodiert eine strukturierte uuidv8 mit eingebettetem Slot-Tag + Capability-Flags + Schema-Version + 106-Bit sha-256 Digest.',
    fr: 'Encode une uuidv8 structurée avec slot tag + capability flags + schema version + digest sha-256 106 bits intégrés.',
  },
  decode: {
    en: 'Decode a structured uuidv8 — extract slotTag (slot name) + capabilities (flag list) + schemaVersion + the 106-bit content digest. Identity + verification + features fuse into one read.',
    bg: 'Декодира структуриран uuidv8 — извлича slotTag + capabilities + schemaVersion + 106-битов digest. Идентичност + верификация + features се сливат в едно четене.',
    de: 'Dekodiert eine strukturierte uuidv8 — extrahiert slotTag + capabilities + schemaVersion + 106-Bit Digest.',
    fr: 'Décode une uuidv8 structurée — extrait slotTag + capabilities + schemaVersion + digest 106 bits.',
  },
  verify: {
    en: 'Re-encode from (content, slotTag, capabilities, schemaVersion, tenantId) and compare against a supplied uuid. Returns true iff the inputs produce the same uuid. Tampering with ANY input (including a single capability flag) produces a mismatch.',
    bg: 'Прекодира от (content, slotTag, capabilities, schemaVersion, tenantId) и сравнява с подаден uuid. Връща true ако входовете дават същия uuid.',
    de: 'Kodiert aus den Eingaben neu und vergleicht mit der gelieferten uuid. Liefert true iff Eingaben dieselbe uuid produzieren.',
    fr: 'Ré-encode depuis les entrées et compare avec une uuid fournie. Retourne true ssi les entrées produisent la même uuid.',
  },
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.format.${k}`, v)
}

export function buildFormatTools(): ReadonlyArray<ErpaxMcpTool> {
  const tEncode = makeToolI18n('erpax.format.encode')
  const tDecode = makeToolI18n('erpax.format.decode')
  const tVerify = makeToolI18n('erpax.format.verify')

  function slotTagFromName(name: keyof typeof SLOT_TAGS): SlotTag {
    return SLOT_TAGS[name]
  }

  return [
    {
      name: 'erpax.format.encode',
      description: tEncode.desc(I18N.encode!),
      parameters: {
        slot: SLOT_ENUM,
        capabilities: z.array(z.enum([
          'SIGNED', 'SEALED', 'ENCRYPTED', 'FEDERATED',
          'ANCHORED_BLOCKCHAIN', 'CHAINED', 'SHARED', 'TAMPER_PROOF',
        ])).optional().describe('Capability flag names to OR-compose; default empty.'),
        schemaVersion: z.number().int().min(0).max(15),
        content: z.unknown(),
        tenantId: z.string(),
      },
      async handler(args, req) {
        assertTenantMatch(String(args.tenantId), req)
        const slotTag = slotTagFromName(args.slot as keyof typeof SLOT_TAGS)
        let capabilities = 0
        for (const name of (args.capabilities as Array<keyof typeof CAPABILITIES> | undefined) ?? []) {
          capabilities |= CAPABILITIES[name]
        }
        const uuid = encodeStructured({
          slotTag,
          capabilities,
          schemaVersion: Number(args.schemaVersion),
          content: args.content,
          tenantId: String(args.tenantId),
        })
        return json({ uuid, slotTag, capabilities, schemaVersion: args.schemaVersion })
      },
    },
    {
      name: 'erpax.format.decode',
      description: tDecode.desc(I18N.decode!),
      parameters: {
        uuid: z.string(),
      },
      async handler(args, _req) {
        try {
          const parts = decodeStructured(String(args.uuid))
          return json(parts)
        } catch (err) {
          return json({ ok: false, error: err instanceof Error ? err.message : String(err) })
        }
      },
    },
    {
      name: 'erpax.format.verify',
      description: tVerify.desc(I18N.verify!),
      parameters: {
        uuid: z.string(),
        slot: SLOT_ENUM,
        capabilities: z.array(z.enum([
          'SIGNED', 'SEALED', 'ENCRYPTED', 'FEDERATED',
          'ANCHORED_BLOCKCHAIN', 'CHAINED', 'SHARED', 'TAMPER_PROOF',
        ])).optional(),
        schemaVersion: z.number().int().min(0).max(15),
        content: z.unknown(),
        tenantId: z.string(),
      },
      async handler(args, req) {
        assertTenantMatch(String(args.tenantId), req)
        let capabilities = 0
        for (const name of (args.capabilities as Array<keyof typeof CAPABILITIES> | undefined) ?? []) {
          capabilities |= CAPABILITIES[name]
        }
        const ok = verifyStructured({
          uuid: String(args.uuid),
          slotTag: slotTagFromName(args.slot as keyof typeof SLOT_TAGS),
          capabilities,
          schemaVersion: Number(args.schemaVersion),
          content: args.content,
          tenantId: String(args.tenantId),
        })
        return json({ ok, uuid: args.uuid })
      },
    },
  ]
}
