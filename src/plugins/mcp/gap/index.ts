/**
 * gap — an MCP call the API could not serve becomes a Payload document.
 *
 * Agents work through Payload (AGENTS.md, "Agents work through Payload"). When a tool call fails,
 * the gap is recorded as a `memories` document with `kind: 'emerging_gap'`, owned by the calling
 * agent and scoped to its tenant, so the next development starts from data instead of from an
 * agent editing code by hand. Wired as the MCP plugin's `hooks.afterToolCall`
 * (payloadcms.com/docs/plugins/mcp, "MCP plugin hooks"); it returns the response unchanged.
 *
 * The hook is the prompt `feel think emote aware`, run by the prompt interpreter (src/utilities/prompt;
 * Prompt.lean proves this program halts at `feel` on a successful call and records and broadcasts a
 * failed one).
 */
import type { PayloadRequest } from 'payload'

import { feel, type State } from '@/utilities/affect'
import { aware, emote, gapOf, run, type Lexicon, type Recording } from '@/utilities/prompt'

/** The part of an MCP tool response this hook reads. */
export interface ToolResponse {
  readonly isError?: boolean
  readonly content?: ReadonlyArray<{ readonly type: string; readonly text?: string }>
}

/** What `afterToolCall` receives. */
export interface ToolCall<R extends ToolResponse = ToolResponse> {
  input: unknown
  req: PayloadRequest
  response: R
  toolName: string
}

/** The text of an error response, as the client saw it. */
export const errorText = (response: ToolResponse): string =>
  (response.content ?? [])
    .map((part) => part.text ?? '')
    .filter(Boolean)
    .join('\n')

/** The gap program's memory: the call it reads, how it felt, and what it recorded. */
export interface GapMemory extends Recording {
  call: ToolCall
  felt?: State
}

/** The hook, as a prompt. */
export const GAP = 'feel think emote aware'

/**
 * The words of the affect loop: the response is FELT (pleasant when it succeeded, and a pleasant feeling
 * has nothing to push, so the program halts); the THOUGHT reads the error into a gap; the EMOTION pushes
 * it out as a memory; AWARENESS broadcasts it to the tenant's chat room.
 */
export const gapLexicon: Lexicon<GapMemory> = {
  feel: (_req, m) => {
    m.felt = feel(!m.call.response.isError)
    if (m.felt.pleasant) return false
  },
  think: (req, m) => {
    m.gap = gapOf(req, {
      key: m.call.toolName,
      title: `${m.call.toolName} could not serve the request`,
      payload: { tool: m.call.toolName, input: m.call.input as Record<string, unknown>, error: errorText(m.call.response) },
      rationale: 'Recorded by the MCP afterToolCall hook: the API could not do what an agent asked.',
    })
  },
  emote,
  aware,
}

/** `hooks.afterToolCall`: run the gap program, and return the response unchanged whatever it wrote. */
export const recordGap = async <R extends ToolResponse>(call: ToolCall<R>): Promise<R> => {
  try {
    await run<GapMemory>(GAP, gapLexicon, call.req, { call })
  } catch (error) {
    call.req.payload.logger.warn({ err: error, msg: `[mcp] could not record the gap for ${call.toolName}` })
  }
  return call.response
}
