/**
 * plugins/mcp/tools — the erpax tool families handed to the gateway, not built beside it.
 *
 * `buildErpaxMcpTools` produced every `erpax.<area>.<leg>` trinity, an in-process client exercised
 * them, a test asked the FACTORY whether a name was offered and reported green — and the live
 * `/api/mcp` served 844 generated CRUD tools and not one of them. The plugin has a door for custom
 * tools (`mcp.tools`) and nothing walked through it, so every agent that reached the gateway was
 * handed a surface the corpus does not describe and every surface the corpus describes was
 * reachable only by importing it. That is the bypass, and this atom is the door being used.
 *
 * Two facts of the wire are decided here, in the open: a name on the wire may not carry a dot
 * (Anthropic's tool-name grammar is `[A-Za-z0-9_-]`, so `erpax.gate.coil` crosses as
 * `erpax_gate_coil` and the dotted name stays the corpus's address), and whether the families ride
 * at all is a mode — full mode (local, `ERPAX_MCP_SEED=0`) carries them, the lean Worker seed does
 * not unless `ERPAX_MCP_TOOLS=1` opts in, because the same isolate limit that made the seed exists.
 *
 * @standard MCP 0.6 — tools/list and tools/call are the surface a client sees
 * @see ./SKILL.md · src/payload.config.ts · src/agent/mcp-surface.ts
 */
import type { PayloadRequest } from 'payload'
import type { z } from 'zod'
import { mcpSeedMode, type McpEnv } from '@/plugins/mcp/seed'

/** The plugin's own custom-tool shape (`mcp.tools[]` in @payloadcms/plugin-mcp). */
export interface GatewayTool {
  readonly name: string
  readonly description: string
  readonly parameters: z.ZodRawShape
  handler(args: Record<string, unknown>, req: PayloadRequest, _extra: unknown): Promise<{ content: Array<{ text: string; type: 'text' }> }>
}

/** What the corpus builds: the same contract, named by its dotted address. */
export interface CorpusTool {
  readonly name: string
  readonly description: string
  readonly parameters: z.ZodRawShape
  handler(args: Record<string, unknown>, req: PayloadRequest): Promise<{ content: Array<{ text: string; type: 'text' }> }>
}

/** The grammar a tool name must satisfy on the wire. */
export const WIRE_NAME = /^[A-Za-z0-9_-]{1,128}$/

/** `erpax.gate.coil` → `erpax_gate_coil`; refuses a name the wire grammar would still reject. */
export function wireName(name: string): string {
  const wire = name.replace(/\./g, '_')
  if (!WIRE_NAME.test(wire)) throw new Error(`tool name not expressible on the wire: ${name}`)
  return wire
}

/** Whether the families ride the gateway in this environment — full mode yes; the lean seed only by opt-in. */
export function customToolsEnabled(env: McpEnv = process.env): boolean {
  if (env.ERPAX_MCP_TOOLS === '0' || env.ERPAX_MCP_TOOLS === 'false') return false
  if (env.ERPAX_MCP_TOOLS === '1' || env.ERPAX_MCP_TOOLS === 'true') return true
  return mcpSeedMode(env) === 'full'
}

/**
 * The corpus tools as the plugin wants them: wire-named, description carrying the dotted address so
 * a client can still cite the atom, handler widened to the plugin's three-argument call. Two
 * corpus tools that collapse to one wire name are a collision the gateway must not hide — refused.
 */
export function gatewayTools(tools: readonly CorpusTool[], env: McpEnv = process.env): GatewayTool[] {
  if (!customToolsEnabled(env)) return []
  const seen = new Map<string, string>()
  return tools.map((t) => {
    const name = wireName(t.name)
    const prior = seen.get(name)
    if (prior !== undefined && prior !== t.name) throw new Error(`wire-name collision: ${prior} and ${t.name} both cross as ${name}`)
    seen.set(name, t.name)
    return {
      name,
      description: `[${t.name}] ${t.description}`,
      parameters: t.parameters,
      handler: (args, req) => t.handler(args, req),
    }
  })
}
