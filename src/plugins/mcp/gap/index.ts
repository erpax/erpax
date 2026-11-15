/**
 * gap — an MCP call the API could not serve becomes a Payload document.
 *
 * Agents work through Payload (AGENTS.md, "Agents work through Payload"). When a tool call fails,
 * the gap is recorded as a `memories` document with `kind: 'emerging_gap'`, owned by the calling
 * agent and scoped to its tenant, so the next development starts from data instead of from an
 * agent editing code by hand. Wired as the MCP plugin's `hooks.afterToolCall`
 * (payloadcms.com/docs/plugins/mcp, "MCP plugin hooks"); it returns the response unchanged.
 */
import type { PayloadRequest, RequiredDataFromCollectionSlug } from 'payload'

import { getUserTenantIDs } from '@/utilities/get/user/tenant/i/ds'

/** The part of an MCP tool response this hook reads. */
export interface ToolResponse {
  readonly isError?: boolean
  readonly content?: ReadonlyArray<{ readonly type: string; readonly text?: string }>
}

/** The text of an error response, as the client saw it. */
export const errorText = (response: ToolResponse): string =>
  (response.content ?? [])
    .map((part) => part.text ?? '')
    .filter(Boolean)
    .join('\n')

/** The `memories` document a failed call becomes (its `uuid` is computed by the collection on write). */
export const gapOf = (args: {
  input: unknown
  req: PayloadRequest
  response: ToolResponse
  toolName: string
}): Omit<RequiredDataFromCollectionSlug<'memories'>, 'uuid'> => {
  const tenant = args.req.user ? getUserTenantIDs(args.req.user)[0] : undefined
  const recordedAt = new Date().toISOString()
  return {
    memoryRef: `MEM-${recordedAt.slice(0, 10)}-${crypto.randomUUID().slice(0, 8)}`,
    recordedAt,
    title: `${args.toolName} could not serve the request`,
    ownerType: 'agent',
    ownerId: String(args.req.user?.id ?? 'anonymous'),
    kind: 'emerging_gap',
    key: args.toolName,
    payload: { tool: args.toolName, input: args.input as Record<string, unknown>, error: errorText(args.response) },
    rationale: 'Recorded by the MCP afterToolCall hook: the API could not do what an agent asked.',
    ...(tenant ? { tenant } : {}),
  }
}

/** `hooks.afterToolCall`: record a failed call, then hand the response on unchanged. */
export const recordGap = async <R extends ToolResponse>(args: {
  input: unknown
  req: PayloadRequest
  response: R
  toolName: string
}): Promise<R> => {
  if (!args.response.isError) return args.response
  try {
    await args.req.payload.create({ collection: 'memories', data: gapOf(args) as RequiredDataFromCollectionSlug<'memories'>, overrideAccess: true, req: args.req })
  } catch (error) {
    args.req.payload.logger.warn({ err: error, msg: `[mcp] could not record the gap for ${args.toolName}` })
  }
  return args.response
}
