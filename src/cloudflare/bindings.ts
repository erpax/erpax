/**
 * Cloudflare binding diamonds — every Wrangler binding type projects DiamondModel.
 *
 * Law: all bindings Cloudflare provides have diamonds. Each entry in wrangler.jsonc
 * derives a content-addressed diamond (boundaryUuid) entangled with [[path]] atom
 * paths and uuid-sealed secrets ([[seal]]).
 *
 * @see ./wrangler.ts · ./seal.ts · ../diamond · ../path
 */
import { uuid, jcsCanonicalize } from '@/integrity'
import {
  type DiamondModel,
  type DeploymentFaces,
  computeDiamond,
  deploymentFaces,
  diamondUuid,
} from '@/diamond'
import { toAtomPath, atomPathUuid } from '@/path'
import type { SealedCloudflareConfig } from './seal'

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

const TYPE_LINKS: Readonly<Record<CloudflareBindingType, readonly string[]>> = {
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

const TYPE_FACE: Readonly<Record<CloudflareBindingType, CloudflareBindingFace>> = {
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

/** Map binding face to `DeploymentFaces` booleans (backend ⇒ worker+plugin substrate). */
export function bindingDeploymentFaces(
  type: CloudflareBindingType,
  model: DiamondModel,
): DeploymentFaces {
  const base = deploymentFaces(model)
  const face = TYPE_FACE[type]
  return {
    worker: base.worker || face === 'worker' || face === 'backend' || face === 'seal',
    plugin: base.plugin || face === 'plugin' || face === 'backend',
    pwa: base.pwa || face === 'pwa',
  }
}

/**
 * Derive the unified DiamondModel for one Cloudflare binding.
 * Every binding type Wrangler exposes maps through this single function.
 */
export function bindingDiamond(input: CloudflareBindingInput): DiamondModel {
  const atomPath = bindingAtomPath(input.type, input.bindingName)
  const boundaryUuid = bindingBoundaryUuid(input)
  const links = [...TYPE_LINKS[input.type]]
  const resourceAtom =
    input.resourcePath && toAtomPath(input.resourcePath, 'cloudflare')
      ? toAtomPath(input.resourcePath, 'cloudflare')
      : null

  return computeDiamond({
    kind: 'cloudflare',
    binding: {
      atomPath,
      boundaryUuid,
      bindingName: input.bindingName,
      bindingType: input.type,
      links,
      resourceAtom,
    },
  }).model as DiamondModel
}

/** Alias — quantum-merge vocabulary from prior directive. */
export const cloudflareBindingDiamond = bindingDiamond

/**
 * Merge a Cloudflare resource path with a sealed config and binding diamond.
 * Path + seal + binding entangle at content-uuid scale (fail-closed on empty path).
 */
export async function mergeCloudflareBinding(args: {
  readonly path: string
  readonly binding: CloudflareBindingInput
  readonly sealedConfig: SealedCloudflareConfig
}): Promise<{
  readonly atomPath: string
  readonly pathUuid: string
  readonly diamond: DiamondModel
  readonly diamondUuid: string
  readonly boundaryUuid: string
  readonly sealedContentUuid: string
}> {
  const atomPath = toAtomPath(args.path, 'cloudflare')
  if (!atomPath) {
    throw new Error('mergeCloudflareBinding: path did not resolve to an atom (fail-closed)')
  }
  const diamond = bindingDiamond({
    ...args.binding,
    resourcePath: args.path,
  })
  return {
    atomPath,
    pathUuid: atomPathUuid(args.path, 'cloudflare'),
    diamond,
    diamondUuid: diamondUuid(diamond),
    boundaryUuid: diamond.boundaryUuid!,
    sealedContentUuid: args.sealedConfig.contentUuid,
  }
}

function sortConfigKeys(config: Readonly<Record<string, unknown>>): Record<string, unknown> {
  return Object.fromEntries(
    Object.keys(config)
      .sort()
      .map((k) => [k, config[k]]),
  )
}

/** Derive diamonds for every binding entry in parsed wrangler config text. */
export function deriveWranglerBindingDiamonds(
  entries: readonly WranglerBindingEntry[],
): DiamondModel[] {
  return entries.map((entry) =>
    bindingDiamond({
      type: entry.type,
      bindingName: entry.bindingName,
      config: entry.config,
    }),
  )
}
