/**
 * In-process MCP client — same handlers as the over-the-wire plugin,
 * called directly from agent code via `AgentContext.mcp`.
 *
 * Slice DDDDD task 11 (2026-05-11). Closes the loop: external clients
 * (Claude Code, Cursor, IDEs) talk to the Payload MCP plugin over HTTP;
 * internal agents talk to THIS in-process client. Both share one tool
 * surface — there is exactly one handler per tool, used by both paths.
 *
 * @standard MCP 0.6 — Model Context Protocol tools/list + tools/call
 * @standard ISO/IEC 25010:2023 §5.4 reusability
 */

import type { PayloadRequest } from 'payload'
import type { AgentLawState } from '@/agent/types'
import { assertStrictMcpCall, defaultAgentLawState } from '@/agent/strict-apply'
import { actorFromRequest } from '@/access'
import type { ErpaxMcpTool } from './tool-defs'

export interface McpToolDescriptor {
  readonly name: string
  readonly description: string
}

export interface McpClient {
  listTools(): ReadonlyArray<McpToolDescriptor>
  callTool(name: string, args: Record<string, unknown>): Promise<string>
}

export interface InProcessMcpClientOptions {
  /** Law state for strict-apply gates on every tool call. */
  readonly law?: AgentLawState
}

export function createInProcessMcpClient(
  tools: ReadonlyArray<ErpaxMcpTool>,
  req: PayloadRequest,
  options?: InProcessMcpClientOptions,
): McpClient {
  const byName = new Map(tools.map((t) => [t.name, t]))
  const law = options?.law ?? defaultAgentLawState()
  return {
    listTools: () => tools.map((t) => ({ name: t.name, description: t.description })),
    async callTool(name, args) {
      const tool = byName.get(name)
      if (!tool) throw new Error(`unknown MCP tool: ${name}`)
      assertStrictMcpCall(law, name, args, undefined, { actor: actorFromRequest(req) })
      const out = await tool.handler(args, req)
      return out.content.map((c) => c.text).join('\n')
    },
  }
}
