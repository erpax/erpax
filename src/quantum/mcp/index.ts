/**
 * quantum/mcp — trinity tool surface: corpus projection, trust-native gate on every call.
 *
 * The door exposes exactly what exists — add an atom or skill and tools manifest with
 * no hand-list. Every call passes access · sandbox · receipt.
 *
 *   tsx src/quantum/mcp/index.ts
 *
 * @audit gate law is pure; tool drift checked via rebuild-from-source in integration
 * @see ../../agents/mcp — ../../access — ./SKILL.md
 */

import { recordPathVisit, type PathCanonicalEntry } from '@/path'
/** No MCP call escapes the gate — access · sandbox · receipt in one move. */
export function mcpCallGated(opts: {
  access: boolean
  sandbox: boolean
  receipt: boolean
}): boolean {
  return opts.access && opts.sandbox && opts.receipt
}

/** Tool surface is a pure projection — never more or less than corpus + collections. */
export function projectionMatchesCorpus(liveToolCount: number, corpusToolCount: number): boolean {
  return liveToolCount === corpusToolCount
}

/** Canonical ledger hook — record quantum/mcp path step (append-only). */
export function recordMcpOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/mcp', { kind: 'mcp.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log(
    'quantum/mcp — gated=' +
      mcpCallGated({ access: true, sandbox: true, receipt: true }) +
      ' · projection=' +
      projectionMatchesCorpus(10, 10),
  )
}
