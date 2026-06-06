/**
 * agent/access — an [[agent]] does everything BOTH ways: through the [[mcp]] gateway and through the
 * filesystem. The two are EQUIVALENT — the same content reaches the same content-[[uuid]] regardless of
 * modality, because both are content-addressed. The modality is the PATH, not the identity.
 *
 * They differ only in TRUST. MCP is trust-native: every call passes the [[sandbox]] (capability +
 * allowlist + credential-broker) and emits a [[receipt]] (uuid-chained audit). fs is direct — no broker,
 * no receipt, just the bytes. So an agent trained on both can choose: the gateway when the act must be
 * scoped and audited (remote, multi-tenant, on someone else's behalf), the filesystem when it is its
 * own local work. Same truth, two doors; the choice is the trust, not the result.
 *
 *   tsx src/agent/access/index.ts
 *
 * @audit the reached uuid is content-addressed (modality-free); trustNative marks the MCP door only
 * @see ../../mcp -- ../../sandbox -- ../../receipt -- ../../uuid/matrix -- ./SKILL.md
 */
import { toUuid } from '@/uuid/matrix'

export type Modality = 'mcp' | 'fs'
export const MODALITIES: readonly Modality[] = ['mcp', 'fs'] as const

/** The content-uuid an agent reaches for `content` via `modality`. Content-addressed, so the modality
 *  is the path, not the identity — same content, same uuid, whether through the gateway or the fs. */
export const reachVia = (content: string, _modality: Modality): string => toUuid(Buffer.from(content, 'utf8'))

/** The both-sides law: do everything both ways, and MCP ≡ fs — same content, same uuid. */
export const equivalent = (content: string): boolean => reachVia(content, 'mcp') === reachVia(content, 'fs')

/** MCP is trust-native (sandbox + receipt on every call); fs is direct. The modality is the choice of trust. */
export const trustNative = (m: Modality): boolean => m === 'mcp'

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('agent/access — the agent does everything via MCP and via fs (same truth, two doors):')
  for (const m of MODALITIES) console.log('  reach("x", ' + m + ') = ' + reachVia('x', m).slice(0, 12) + '… · trust-native=' + trustNative(m))
  console.log('  MCP ≡ fs (same content-uuid): ' + equivalent('any content'))
}
