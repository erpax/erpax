/**
 * MCP self-testing — Slice AAAAAAA (2026-05-11).
 *
 * Per user 'mcp interacts with itself by testing'. After
 * VVVVVV (discoverable) + WWWWWW (self-built) + XXXXXX (self-
 * standardized) + YYYYYY (self-presented) + ZZZZZZ (self-rebuildable),
 * the MCP layer now interacts with itself by smoke-testing every tool.
 *
 * The mental model: each tool is its own minimum test. Generate a
 * synthetic invocation from the Zod parameter schema → invoke the
 * handler → verify the response is well-formed (text content present,
 * no unhandled exceptions). Failures are localized to the tool.
 *
 *   liveTools.forEach(tool => {
 *     args = synthArgsFromZod(tool.parameters)
 *     try { result = await tool.handler(args, fakeReq) }
 *     verify result.content[0].text exists; classify pass/skip/fail
 *   })
 *
 * Critically, the suite distinguishes:
 *   - **pass**  : handler returned well-formed `{content: [{text, type}]}`
 *   - **skip**  : handler requires Payload `req` (DB / collection access)
 *                  — exercised in integration tests, not the smoke probe
 *   - **fail**  : handler threw an unhandled exception or returned a
 *                  malformed shape
 *
 * **Conservation Law 41** — `checkMcpSelfTestableInvariant`: every
 * MCP tool must either pass the smoke test or be explicitly skipped
 * (db-dependent). New tools that throw on synthetic args fail Law 41
 * and the boot suite.
 *
 * @standard MCP 0.6 — tools/list (self-test extension)
 * @standard ISO/IEC 25010:2023 §5.5 testability
 * @standard ISO/IEC/IEEE 29119-2 — software testing process
 * @audit ISO 19011:2018 §6.4.6 (every test result audit-trailed)
 */

import type { ZodTypeAny, ZodRawShape } from 'zod'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

export type SelfTestVerdict = 'pass' | 'skip' | 'fail'

export interface SelfTestEntry {
  readonly tool: string
  readonly verdict: SelfTestVerdict
  readonly reason?: string
  readonly elapsedMs: number
}

export interface SelfTestSuite {
  readonly ok: boolean                 // = no `fail` entries
  readonly counts: { pass: number; skip: number; fail: number; total: number }
  readonly entries: ReadonlyArray<SelfTestEntry>
}

// ─── Synthetic argument generator (Zod-aware) ──────────────────────

/**
 * Generate a minimum-viable synthetic value for one Zod schema. Used
 * to invoke a handler with shape-correct input. Production property-
 * tests would use fast-check; this is the floor smoke test.
 */
export function synthValueForZod(schema: ZodTypeAny): unknown {
  // ZodOptional / ZodNullable — return undefined.
  const def = (schema as { _def?: { typeName?: string } })._def
  const tn = def?.typeName
  switch (tn) {
    case 'ZodOptional': return undefined
    case 'ZodNullable': return null
    case 'ZodString': return 'probe'
    case 'ZodNumber': return 1
    case 'ZodBoolean': return false
    case 'ZodLiteral': {
      const value = (schema as unknown as { _def: { value: unknown } })._def.value
      return value
    }
    case 'ZodEnum': {
      const opts = (schema as unknown as { _def: { values: ReadonlyArray<string> } })._def.values
      return opts[0]
    }
    case 'ZodArray': {
      const inner = (schema as unknown as { _def: { type: ZodTypeAny } })._def.type
      return [synthValueForZod(inner)]
    }
    case 'ZodObject': {
      const shape = (schema as unknown as { _def: { shape: () => ZodRawShape } })._def.shape()
      const out: Record<string, unknown> = {}
      for (const [k, v] of Object.entries(shape)) out[k] = synthValueForZod(v as ZodTypeAny)
      return out
    }
    case 'ZodRecord': return {}
    case 'ZodUnion': {
      const opts = (schema as unknown as { _def: { options: ReadonlyArray<ZodTypeAny> } })._def.options
      return synthValueForZod(opts[0]!)
    }
    default: return undefined
  }
}

export function synthArgsFromShape(shape: ZodRawShape): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(shape)) out[k] = synthValueForZod(v as ZodTypeAny)
  return out
}

// ─── Detection of DB-dependent handlers (skip set) ─────────────────

/**
 * A handler is DB-dependent if it references the second `req` arg.
 * The smoke probe can't safely hand over a real Payload `req`, so
 * we skip these tools — they are exercised in integration tests.
 */
function handlerRequiresPayloadReq(handler: ErpaxMcpTool['handler']): boolean {
  // Function source contains `req.payload` or arity >= 2 with usage
  // of the second positional. We can't introspect arity reliably for
  // all closures, so we heuristic on source.
  const src = handler.toString()
  return /\breq\s*\.\s*payload\b/.test(src) || /\breq\s*\.\s*user\b/.test(src)
}

// ─── Per-tool smoke test ───────────────────────────────────────────

const FAKE_REQ = {} as never

export async function selfTestOne(tool: ErpaxMcpTool): Promise<SelfTestEntry> {
  if (handlerRequiresPayloadReq(tool.handler)) {
    return { tool: tool.name, verdict: 'skip', reason: 'requires Payload req (db-dependent)', elapsedMs: 0 }
  }
  const t0 = Date.now()
  try {
    const args = synthArgsFromShape(tool.parameters)
    const result = await tool.handler(args, FAKE_REQ)
    const elapsedMs = Date.now() - t0
    if (!result || !Array.isArray(result.content) || result.content.length === 0) {
      return { tool: tool.name, verdict: 'fail', reason: 'malformed result shape (no content[])', elapsedMs }
    }
    const c0 = result.content[0]!
    if (typeof c0.text !== 'string') {
      return { tool: tool.name, verdict: 'fail', reason: 'content[0].text not a string', elapsedMs }
    }
    return { tool: tool.name, verdict: 'pass', elapsedMs }
  } catch (err) {
    return {
      tool: tool.name,
      verdict: 'fail',
      reason: `unhandled exception: ${(err as Error).message?.slice(0, 100) ?? '?'}`,
      elapsedMs: Date.now() - t0,
    }
  }
}

export async function selfTestAll(tools: ReadonlyArray<ErpaxMcpTool>): Promise<SelfTestSuite> {
  const entries: SelfTestEntry[] = []
  for (const tool of tools) entries.push(await selfTestOne(tool))
  const counts = { pass: 0, skip: 0, fail: 0, total: entries.length }
  for (const e of entries) counts[e.verdict]++
  return { ok: counts.fail === 0, counts, entries }
}

// ─── Conservation Law 41 ───────────────────────────────────────────

export interface SelfTestablility {
  readonly ok: boolean
  readonly summary: SelfTestSuite['counts']
  readonly failures: ReadonlyArray<{ tool: string; reason: string }>
}

export async function checkMcpSelfTestable(tools: ReadonlyArray<ErpaxMcpTool>): Promise<SelfTestablility> {
  const suite = await selfTestAll(tools)
  return {
    ok: suite.ok,
    summary: suite.counts,
    failures: suite.entries.filter((e) => e.verdict === 'fail').map((e) => ({ tool: e.tool, reason: e.reason ?? '?' })),
  }
}
