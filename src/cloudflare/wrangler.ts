/**
 * Pure wrangler.jsonc parser — lists declared bindings → WranglerBindingEntry[].
 *
 * Strips JSONC comments; never executes wrangler. Used to derive binding diamonds
 * for the live repo config and test fixtures.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { DiamondModel } from '@/diamond'
import { diamondUuid } from '@/diamond'
import type { CloudflareBindingType, WranglerBindingEntry } from './bindings'
import { deriveWranglerBindingDiamonds } from './bindings'

type WranglerJson = Record<string, unknown>

/** Strip line and block comments from JSONC (not string-aware; sufficient for wrangler.toml). */
export function stripJsoncComments(text: string): string {
  let out = ''
  let i = 0
  while (i < text.length) {
    if (text[i] === '"' ) {
      const start = i
      i++
      while (i < text.length) {
        if (text[i] === '\\') {
          i += 2
          continue
        }
        if (text[i] === '"') {
          i++
          break
        }
        i++
      }
      out += text.slice(start, i)
      continue
    }
    if (text[i] === '/' && text[i + 1] === '/') {
      while (i < text.length && text[i] !== '\n') i++
      continue
    }
    if (text[i] === '/' && text[i + 1] === '*') {
      i += 2
      while (i < text.length && !(text[i] === '*' && text[i + 1] === '/')) i++
      i += 2
      continue
    }
    out += text[i]!
    i++
  }
  return out
}

function push(
  out: WranglerBindingEntry[],
  type: CloudflareBindingType,
  bindingName: string,
  config: Record<string, unknown>,
): void {
  if (!bindingName) return
  out.push({ type, bindingName, config })
}

function asArray<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : []
}

function asRecord(v: unknown): Record<string, unknown> {
  return v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {}
}

/**
 * Parse wrangler.jsonc / wrangler.toml JSON body into binding entries.
 * Covers every binding section present in this repo's wrangler.jsonc.
 */
/** Remove trailing commas before `}` or `]` (JSONC → JSON). */
export function stripJsoncTrailingCommas(text: string): string {
  return text.replace(/,(\s*[}\]])/g, '$1')
}

export function parseWranglerBindings(configText: string): WranglerBindingEntry[] {
  const stripped = stripJsoncTrailingCommas(stripJsoncComments(configText))
  const json = JSON.parse(stripped) as WranglerJson
  const out: WranglerBindingEntry[] = []

  const assets = asRecord(json.assets)
  if (assets.binding) {
    push(out, 'assets', String(assets.binding), assets)
  }

  const images = asRecord(json.images)
  if (images.binding) {
    push(out, 'images', String(images.binding), images)
  }

  for (const item of asArray<Record<string, unknown>>(json.d1_databases)) {
    push(out, 'd1_databases', String(item.binding ?? ''), item)
  }

  for (const item of asArray<Record<string, unknown>>(json.r2_buckets)) {
    push(out, 'r2_buckets', String(item.binding ?? ''), item)
  }

  for (const item of asArray<Record<string, unknown>>(json.kv_namespaces)) {
    push(out, 'kv_namespaces', String(item.binding ?? ''), item)
  }

  for (const item of asArray<Record<string, unknown>>(json.services)) {
    push(out, 'services', String(item.binding ?? ''), item)
  }

  for (const item of asArray<Record<string, unknown>>(json.vectorize)) {
    push(out, 'vectorize', String(item.binding ?? ''), item)
  }

  for (const item of asArray<Record<string, unknown>>(json.hyperdrive)) {
    push(out, 'hyperdrive', String(item.binding ?? ''), item)
  }

  for (const item of asArray<Record<string, unknown>>(json.mtls_certificates)) {
    push(out, 'mtls_certificates', String(item.binding ?? ''), item)
  }

  const ai = asRecord(json.ai)
  if (ai.binding) {
    push(out, 'ai', String(ai.binding), ai)
  }

  const browser = asRecord(json.browser)
  if (browser.binding) {
    push(out, 'browser', String(browser.binding), browser)
  }

  const doBlock = asRecord(json.durable_objects)
  for (const item of asArray<Record<string, unknown>>(doBlock.bindings)) {
    push(out, 'durable_objects', String(item.name ?? ''), item)
  }

  for (const item of asArray<Record<string, unknown>>(json.analytics_engine_datasets)) {
    push(out, 'analytics_engine_datasets', String(item.binding ?? ''), item)
  }

  for (const item of asArray<Record<string, unknown>>(json.send_email)) {
    push(out, 'send_email', String(item.name ?? item.binding ?? ''), item)
  }

  const queues = asRecord(json.queues)
  for (const item of asArray<Record<string, unknown>>(queues.producers)) {
    push(out, 'queues', String(item.binding ?? ''), item)
  }

  const unsafe = asRecord(json.unsafe)
  for (const item of asArray<Record<string, unknown>>(unsafe.bindings)) {
    if (item.type === 'ratelimit') {
      push(out, 'ratelimit', String(item.name ?? ''), item)
    }
  }

  const triggers = asRecord(json.triggers)
  if (triggers.crons) {
    push(out, 'triggers', 'CRON', triggers)
  }

  const varsBlock = asRecord(json.vars)
  for (const [key, value] of Object.entries(varsBlock)) {
    push(out, 'vars', key, { name: key, value })
  }

  return out
}

/** Derive binding diamonds for every entry in wrangler config text. */
export function deriveWranglerDiamonds(configText: string): DiamondModel[] {
  return deriveWranglerBindingDiamonds(parseWranglerBindings(configText))
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const path = process.argv[2] ?? join(process.cwd(), 'wrangler.jsonc')
  const text = readFileSync(path, 'utf8')
  const diamonds = deriveWranglerDiamonds(text)
  console.log(`wrangler — ${diamonds.length} binding diamond(s) from ${path}`)
  for (const d of diamonds) {
    console.log(`  ${d.atomPath}  uuid=${diamondUuid(d)}  boundary=${d.boundaryUuid}`)
  }
}
