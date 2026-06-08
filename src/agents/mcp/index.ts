/**
 * agents/mcp — the atom's public face (its content-uuid contract).
 *
 * The import convention ([[tamper]]/import) is: anything importing the MCP atom
 * reaches its INDEX (`@/agents/mcp`), never a deep internal file
 * (`@/agents/mcp/in-process-client`, `@/agents/mcp/tool-defs`). This index
 * re-exports the surface external callers (e.g. the dashboard's `mcp` DataSource)
 * consume: the in-process MCP client (one tool surface, two callers — agents and
 * the dashboard) and the `ErpaxMcpTool` descriptor type / builder.
 *
 * @audit re-exports only; the truth lives in ./in-process-client and ./tool-defs
 * @standard MCP 0.6 — Model Context Protocol tools/list + tools/call
 * @see ./in-process-client -- ./tool-defs
 */

export { createInProcessMcpClient } from './in-process-client'
export type { McpClient, McpToolDescriptor } from './in-process-client'
export type { ErpaxMcpTool } from './tool-defs'
export { buildErpaxMcpTools } from './tool-defs'
export type { ErpaxMcpResource } from './resource-defs'
export { ERPAX_MCP_RESOURCES } from './resource-defs'
export type { ErpaxMcpPrompt } from './prompt-defs'
export { ERPAX_MCP_PROMPTS } from './prompt-defs'
