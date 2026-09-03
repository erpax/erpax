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
import type { WranglerBindingEntry } from './bindings'
import { parseWranglerBindings } from './wrangler'
import { toAtomPath } from '@/path'
import {
  decryptIfUuid,
  identityUuidForContent,
  identityDigestForContent,
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
  const contextDigest = identityDigestForContent(identity)
  return { sealed: sealSecret(plaintext, contextUuid, { ...options, contextDigest }), contextUuid }
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
