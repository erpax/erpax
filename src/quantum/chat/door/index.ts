/**
 * quantum/chat/door — an MCP area's tools, opened from the chat. See SKILL.md.
 *
 * The chat is the working surface, so an area's doors open here too — in-process, through the
 * area's own handlers, never a second implementation — and the reply folds into the session like
 * any other turn. Two areas are wired: the exact-amplitude register (erpax.quantum.*) and the gate
 * registry formulated as crosses (erpax.gate.*).
 *
 * Its own atom because [[rules]]/concentration said so: it pushed `quantum/chat/routing` past the
 * 500-line hub ceiling, and the README's own ledger reported the red before anyone else did.
 */
import { type ChatSession, sessionAppend } from '@/quantum/chat/routing'

export type ChatArea = 'quantum' | 'gate'

export interface DoorTurn {
  readonly session: ChatSession
  readonly tool: string
  readonly result: Record<string, unknown>
  /** The message folded into the session — the figures a reader checks, as one line. */
  readonly line: string
}

const list = (v: unknown): string => (Array.isArray(v) ? v.join(',') : String(v))

interface AreaSpec {
  readonly load: () => Promise<ReadonlyArray<{ name: string; handler: (a: Record<string, unknown>, extra: never) => unknown }>>
  readonly defaultDoor: string
  readonly line: (door: string, r: Record<string, unknown>) => string
}

/** Each area: how to load its tools, its default door, and the one line the session keeps. */
const AREAS: Record<ChatArea, AreaSpec> = {
  quantum: {
    load: () => import('@/agents/mcp/tool/quantum').then((m) => m.buildQuantumTools()),
    defaultDoor: 'bell',
    line: (door, r) =>
      door === 'shots'
        ? `shots=${r.shots}|enumerated=${r.enumerated}|sampled=${r.sampled}|support=${list(r.support)}|outcomes=${list(r.outcomes)}`
        : door === 'orbit'
          ? `qubits=${r.qubits}|states=${r.states}|product=${r.product}|entangled=${r.entangled}|closed=${r.closed}|receipt=${r.receipt}`
          : `amplitudes=[${list(r.amplitudes)}]|halvings=${r.halvings}|normalised=${r.normalised}|support=${list(r.support)}`,
  },
  gate: {
    load: () => import('@/agents/mcp/tool/gate').then((m) => m.buildGateTools()),
    defaultDoor: 'verdicts',
    line: (door, r) =>
      door === 'verdicts'
        ? `sealed=${r.sealed}|red=${r.red}/${r.total}`
        : door === 'cross'
          ? `${r.a}×${r.b}|shared=${r.shared}|lift=${r.lift}|theorem=${r.theorem}`
          : `pairs=${r.pairs}|theorems=${list(r.theorems)}`,
  },
}

/**
 * Ask an MCP area from the chat: `door` is the tool's last segment (`erpax.<area>.<door>`),
 * `args` are the area's own. The default door of `quantum` is the Bell state; of `gate`, every
 * guardian's verdict. A refused call folds nothing into the session.
 */
export async function chatDoor(
  session: ChatSession,
  ask: { readonly area?: ChatArea; readonly door?: string; readonly args?: Record<string, unknown> } = {},
): Promise<DoorTurn> {
  const area = ask.area ?? 'quantum'
  const spec = AREAS[area]
  const door = ask.door ?? spec.defaultDoor
  const name = `erpax.${area}.${door}`
  const tool = (await spec.load()).find((t) => t.name === name)
  if (!tool) throw new Error(`chatDoor: no door ${name}`)
  const out = (await tool.handler(ask.args ?? {}, {} as never)) as { content: { text: string }[] }
  const result = JSON.parse(out.content[0]!.text) as Record<string, unknown>
  const message = `${area}.${door}[${spec.line(door, result)}]`
  return { session: sessionAppend(session, message), tool: name, result, line: message }
}
