/**
 * Cloudflare Workers AI bindings — first-class diamonds at every scale.
 *
 * Parses `ai` + RAG stack (vectorize, AI_CACHE KV, AI batch queue, ANALYTICS_AI,
 * AI gateway vars) from wrangler config. Wires agent worker face, path `ai://`,
 * and [[secret]] seal/decryptIfUuid for API keys.
 *
 * @standard Cloudflare Workers AI binding
 * @see ./bindings.ts · ./wrangler.ts · ../agent · ../secret · ../path
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  bindingDiamond,
  type CloudflareBindingInput,
  type WranglerBindingEntry,
} from './bindings'
import { parseWranglerBindings } from './wrangler'
import type { DiamondModel } from '@/diamond'
import { toAtomPath } from '@/path'
import {
  decryptIfUuid,
  identityUuidForContent,
  sealSecret,
  type SealedBlob,
} from '@/secret'

/** Wrangler `ai` block shape — `{ binding = "AI" }` (Workers AI runtime). */
export interface WranglerAiBlock {
  readonly binding: string
}

/** Wrangler `vectorize` entry — RAG index (`index_name`, `binding`). */
export interface WranglerVectorizeEntry {
  readonly binding: string
  readonly index_name: string
}

/** AI-adjacent binding types in the RAG / inference stack. */
export const AI_STACK_BINDING_TYPES = [
  'ai',
  'vectorize',
  'kv_namespaces',
  'queues',
  'analytics_engine_datasets',
  'vars',
  'ratelimit',
] as const

export const AI_GATEWAY_VAR_KEYS = ['AI_GATEWAY_URL', 'AI_GATEWAY_ID'] as const

/** Content-identity for sealing an AI API key / gateway credential. */
export function aiSecretIdentity(bindingName: string, modelId?: string): Record<string, unknown> {
  return {
    purpose: 'cloudflare-ai',
    binding: bindingName,
    modelId: modelId ?? '*',
  }
}

export function sealCloudflareAiSecret(
  plaintext: string,
  bindingName: string,
  modelId?: string,
  options?: { sealKey?: Buffer },
): { readonly sealed: SealedBlob; readonly contextUuid: string } {
  const identity = aiSecretIdentity(bindingName, modelId)
  const contextUuid = identityUuidForContent(identity)
  return { sealed: sealSecret(plaintext, contextUuid, options), contextUuid }
}

export function decryptCloudflareAiSecretIfUuid(
  sealed: SealedBlob,
  presentedUuid: string,
  bindingName: string,
  modelId?: string,
  options?: { sealKey?: Buffer },
): string {
  const identity = aiSecretIdentity(bindingName, modelId)
  return decryptIfUuid(sealed, presentedUuid, identity, options)
}

/** True when a parsed wrangler entry is part of the AI / RAG inference stack. */
export function isAiRelatedBinding(entry: WranglerBindingEntry): boolean {
  if (entry.type === 'ai' || entry.type === 'vectorize') return true
  if (/AI/i.test(entry.bindingName)) return true
  if (entry.type === 'vars' && AI_GATEWAY_VAR_KEYS.includes(entry.bindingName as never)) return true
  return false
}

export function filterAiBindings(entries: readonly WranglerBindingEntry[]): WranglerBindingEntry[] {
  return entries.filter(isAiRelatedBinding)
}

/** Normalize a Workers AI model id or served atom to canonical path segments. */
export function aiModelAtomPath(modelOrPath: string): string {
  return toAtomPath(`ai://${modelOrPath}`, 'cloudflare')
}

/** Agent atoms consume CF AI on the worker deployment face. */
export function agentAiWorkerFace(atomPath: string): {
  readonly worker: true
  readonly aiBinding: string
  readonly servesAtom: string
} {
  return {
    worker: true,
    aiBinding: 'AI',
    servesAtom: atomPath,
  }
}

/** Derive DiamondModel for a Workers AI or vectorize binding (content-uuid sealed). */
export function aiBindingDiamond(input: CloudflareBindingInput): DiamondModel {
  const modelId =
    input.type === 'vectorize'
      ? String((input.config as { index_name?: string }).index_name ?? input.bindingName)
      : input.type === 'ai'
        ? 'workers-ai-runtime'
        : undefined
  const resourcePath =
    input.type === 'ai'
      ? 'ai://@cf/workers-ai'
      : modelId
        ? `ai://${modelId}`
        : undefined
  const base = bindingDiamond(resourcePath ? { ...input, resourcePath } : input)
  const links = [...new Set([...base.links, 'agent', 'ai', 'innovation'])]
  return {
    ...base,
    links,
    linksResolved: links.length,
    linksTotal: links.length,
    cloudflare: {
      bindingType: input.type,
      bindingName: input.bindingName,
      modelId,
      rag: input.type === 'vectorize',
      workerFace: true,
    },
  }
}

/** All AI-stack diamonds from wrangler config text. */
export function deriveAiBindingDiamonds(configText: string): DiamondModel[] {
  return filterAiBindings(parseWranglerBindings(configText)).map((entry) =>
    aiBindingDiamond({
      type: entry.type,
      bindingName: entry.bindingName,
      config: entry.config,
    }),
  )
}

/** Parse live repo wrangler.jsonc — AI bindings only. */
export function loadRepoAiBindings(cwd: string = process.cwd()): WranglerBindingEntry[] {
  const text = readFileSync(join(cwd, 'wrangler.jsonc'), 'utf8')
  return filterAiBindings(parseWranglerBindings(text))
}

/** Verify every AI binding has a sealed diamond with boundaryUuid (uuid-only gate). */
export function verifyAiBindingDiamonds(configText: string): {
  readonly ok: boolean
  readonly count: number
  readonly broken: readonly string[]
} {
  const entries = filterAiBindings(parseWranglerBindings(configText))
  const broken: string[] = []
  for (const entry of entries) {
    const input: CloudflareBindingInput = {
      type: entry.type,
      bindingName: entry.bindingName,
      config: entry.config,
    }
    const model = aiBindingDiamond(input)
    if (!model.boundaryUuid || !model.sealed) {
      broken.push(`${entry.type}/${entry.bindingName}`)
    }
    if (!model.cloudflare?.workerFace) {
      broken.push(`${entry.type}/${entry.bindingName}: missing workerFace facet`)
    }
  }
  return { ok: broken.length === 0 && entries.length > 0, count: entries.length, broken }
}

/** Extra debit/credit lines for cloudflare / cloudflare/ai folder README accounting. */
export function cloudflareAiAccountingExtras(cwd: string = process.cwd()): {
  readonly aiBindingCount: number
  readonly wranglerBindingCount: number
  readonly aiDebitAccount: string
  readonly wranglerDebitAccount: string
} {
  const text = readFileSync(join(cwd, 'wrangler.jsonc'), 'utf8')
  const all = parseWranglerBindings(text)
  const ai = filterAiBindings(all)
  return {
    aiBindingCount: ai.length,
    wranglerBindingCount: all.length,
    aiDebitAccount: '[[asset]]/[[cloudflare]]/ai/bindings',
    wranglerDebitAccount: '[[asset]]/[[cloudflare]]/wrangler/bindings',
  }
}
