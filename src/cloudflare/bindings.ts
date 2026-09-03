/**
 * Cloudflare bindings — the RUNTIME surface: types, names, atom paths, boundary uuids.
 *
 * The diamond DERIVATION lives in ./derive. A value import of @/diamond here is what put the
 * whole gate registry — and a TypeScript compiler — inside every Worker that calls kvGet:
 * @/diamond → @/readme/compute → @/rules, 5,836 KB behind the simplest call in the package.
 *
 * Law: all bindings Cloudflare provides have diamonds. Each entry in wrangler.jsonc
 * derives a content-addressed diamond (boundaryUuid) entangled with [[path]] atom
 * paths and uuid-sealed secrets ([[seal]]).
 *
 * @see ./wrangler.ts · ./seal.ts · ../diamond · ../path
 */
import { uuid, jcsCanonicalize } from '@/integrity'
import { toAtomPath } from '@/path'

/** Every Wrangler binding section Cloudflare documents (plus repo-specific unsafe bindings). */
export const CLOUDFLARE_BINDING_TYPES = [
  'd1_databases',
  'r2_buckets',
  'kv_namespaces',
  'durable_objects',
  'services',
  'analytics_engine_datasets',
  'queues',
  'hyperdrive',
  'vectorize',
  'ai',
  'browser',
  'secrets',
  'vars',
  'assets',
  'images',
  'send_email',
  'ratelimit',
  'mtls_certificates',
  'triggers',
] as const

export type CloudflareBindingType = (typeof CLOUDFLARE_BINDING_TYPES)[number]

/** One declared binding from wrangler config. */
export interface WranglerBindingEntry {
  readonly type: CloudflareBindingType
  readonly bindingName: string
  readonly config: Readonly<Record<string, unknown>>
}

/** Input to `bindingDiamond` — type, env binding name, and wrangler entry config. */
export interface CloudflareBindingInput {
  readonly type: CloudflareBindingType
  readonly bindingName: string
  readonly config: Readonly<Record<string, unknown>>
  /** Optional resource path (R2 key, worker route) for path-merge entanglement. */
  readonly resourcePath?: string
}

/** Primary deployment face per binding type (worker · plugin · pwa · seal · backend). */
export type CloudflareBindingFace =
  | 'worker'
  | 'plugin'
  | 'pwa'
  | 'seal'
  | 'backend'

/** Atoms linked to a binding type (TYPE_LINKS leaf names + single-word paths). */
export function atomsLinkedByBindingType(type: CloudflareBindingType): readonly string[] {
  return TYPE_LINKS[type]
}

/** Read by ./diamond, the child that derives binding diamonds. */
export const TYPE_LINKS: Readonly<Record<CloudflareBindingType, readonly string[]>> = {
  d1_databases: ['database', 'cloudflare', 'diamond', 'path'],
  r2_buckets: ['storage', 'cloudflare', 'pwa', 'path'],
  kv_namespaces: ['storage', 'cloudflare', 'worker', 'path'],
  durable_objects: ['worker', 'cloudflare', 'diamond', 'integrity'],
  services: ['worker', 'cloudflare', 'plugin'],
  analytics_engine_datasets: ['worker', 'cloudflare', 'audit'],
  queues: ['worker', 'cloudflare', 'process'],
  hyperdrive: ['database', 'cloudflare', 'plugin'],
  vectorize: ['worker', 'cloudflare', 'ai'],
  ai: ['worker', 'cloudflare', 'ai'],
  browser: ['worker', 'cloudflare', 'pwa'],
  secrets: ['seal', 'cloudflare', 'integrity'],
  vars: ['seal', 'cloudflare', 'worker'],
  assets: ['pwa', 'cloudflare', 'public'],
  images: ['pwa', 'cloudflare', 'worker'],
  send_email: ['worker', 'cloudflare', 'process'],
  ratelimit: ['worker', 'cloudflare', 'access'],
  mtls_certificates: ['worker', 'cloudflare', 'seal', 'integrity'],
  triggers: ['worker', 'cloudflare', 'cron'],
}

/** Read by ./diamond, the child that derives binding diamonds. */
export const TYPE_FACE: Readonly<Record<CloudflareBindingType, CloudflareBindingFace>> = {
  d1_databases: 'backend',
  r2_buckets: 'pwa',
  kv_namespaces: 'worker',
  durable_objects: 'worker',
  services: 'worker',
  analytics_engine_datasets: 'worker',
  queues: 'worker',
  hyperdrive: 'backend',
  vectorize: 'worker',
  ai: 'worker',
  browser: 'worker',
  secrets: 'seal',
  vars: 'seal',
  assets: 'pwa',
  images: 'pwa',
  send_email: 'worker',
  ratelimit: 'worker',
  mtls_certificates: 'seal',
  triggers: 'worker',
}

/** Canonical atom path for a binding diamond: `cloudflare/<type>/<bindingName>`. */
export function bindingAtomPath(type: CloudflareBindingType, bindingName: string): string {
  const slug = type.replace(/_/g, '-')
  return `cloudflare/${slug}/${bindingName}`
}

/** Content-uuid boundary for one binding declaration. */
export function bindingBoundaryUuid(input: CloudflareBindingInput): string {
  const payload = {
    type: input.type,
    bindingName: input.bindingName,
    config: sortConfigKeys(input.config),
    resourcePath: input.resourcePath
      ? toAtomPath(input.resourcePath, 'cloudflare')
      : undefined,
  }
  return uuid(jcsCanonicalize(payload))
}

/** Primary deployment face label for SKILL tables. */
export function cloudflareBindingFace(type: CloudflareBindingType): CloudflareBindingFace {
  return TYPE_FACE[type]
}

function sortConfigKeys(config: Readonly<Record<string, unknown>>): Record<string, unknown> {
  return Object.fromEntries(
    Object.keys(config)
      .sort()
      .map((k) => [k, config[k]]),
  )
}

