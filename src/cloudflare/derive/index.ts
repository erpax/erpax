/**
 * cloudflare/derive — the binding functions that need the CORPUS, kept out of the Worker face.
 *
 * These derive a content-addressed diamond for a Cloudflare binding, and to do it they call
 * `computeDiamond`, which scans `src/` from disk. That is build-time work: a Worker has no
 * filesystem and cannot run any of it.
 *
 * It used to live in `../bindings`, one value-import away from the runtime surface — and the
 * whole barrel paid for it. Measured with esbuild over the published closure:
 *
 *     kvGet · kvPut · r2Get · r2Put      5,836 KB · 73 atoms
 *     @/cloudflare/constants alone            0 KB ·  1 atom
 *
 * because `bindings.ts → @/diamond → @/readme/compute → @/rules` drags the entire gate registry,
 * 58 `node:fs` imports and a TypeScript compiler behind the simplest call in the package. Here,
 * a consumer who needs a binding diamond asks for it and a Worker never pays.
 *
 * @see ../bindings — the runtime surface, which imports `DiamondModel` as a TYPE only
 */
import {
  type DiamondModel,
  type DeploymentFaces,
  computeDiamond,
  deploymentFaces,
  diamondUuid,
} from '@/diamond'
import { toAtomPath, atomPathUuid } from '@/path'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseWranglerBindings } from '../wrangler'
import { filterAiBindings } from '../ai'
import {
  type CloudflareBindingInput,
  type CloudflareBindingType,
  type WranglerBindingEntry,
  bindingAtomPath,
  bindingBoundaryUuid,
  TYPE_FACE,
  TYPE_LINKS,
} from '../bindings'
import type { SealedCloudflareConfig } from '../seal'

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

/*
 * `deriveWranglerDiamonds` and its CLI came from ../wrangler, which kept a VALUE import of
 * `diamondUuid` for the CLI alone — enough to hold the whole corpus inside the runtime barrel.
 * The parsing half (stripJsoncComments · parseWranglerBindings) stays there and is pure.
 */
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

/*
 * The AI half, same shape: `aiBindingDiamond` and everything built on it derive diamonds and
 * read `wrangler.jsonc` from disk. ../ai keeps the runtime — aiRun, the seal/decrypt pair, the
 * binding filters — and no longer names a DiamondModel at all.
 */
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

