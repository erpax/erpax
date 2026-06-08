/**
 * diamond/projection — pure model projection (no readme import).
 *
 * Shared by @/diamond and @/readme computed faces — breaks the circular
 * dependency diamond ↔ readme while keeping one DiamondModel shape.
 *
 * @see ./index.ts — ../readme
 */
import { uuid, jcsCanonicalize } from '@/integrity'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { HORO_DIGITS, HORO_MEASURE, validateHoroStates, type HoroState } from '@/horo'
import { nodeOf, UUID_MATRIX_NODES } from '@/uuid/matrix'

/** Trinity completeness — form (SKILL.md) · code (index.ts) · proof (test.ts). */
export interface DiamondTrinity {
  readonly form: 0 | 1
  readonly code: 0 | 1
  readonly proof: 0 | 1
}

export type DiamondKind = 'atom' | 'file' | 'method' | 'collection'

export interface CloudflareDiamondFacet {
  readonly bindingType: string
  readonly bindingName: string
  readonly modelId?: string
  readonly rag?: boolean
  readonly workerFace?: boolean
}

export interface DiamondModel {
  readonly kind: DiamondKind
  readonly atomPath: string
  readonly boundaryUuid: string | null
  readonly trinity: DiamondTrinity
  readonly horo: number | null
  readonly measure: string | null
  readonly imports: readonly string[]
  readonly exports: readonly string[]
  readonly escapes: readonly string[]
  readonly links: readonly string[]
  readonly linksResolved: number
  readonly linksTotal: number
  readonly folded: boolean
  readonly bondsIn: number
  readonly bondsOut: number
  readonly sealed: boolean
  readonly cloudflare?: CloudflareDiamondFacet
}

export interface CollectionDiamondModel extends DiamondModel {
  readonly kind: 'collection'
  readonly slug: string
  readonly tamperProofUuid: boolean
  readonly horoStates: readonly HoroState[]
  readonly horoStateName: string | null
  readonly standards: readonly string[]
  readonly emits: readonly string[]
  readonly subscribesTo: readonly string[]
}

export interface DeploymentFaces {
  readonly worker: boolean
  readonly plugin: boolean
  readonly pwa: boolean
}

/** One fractal step in the diamond pipeline — each stage is itself content-addressed. */
export interface DiamondComputationStage {
  readonly stage: string
  readonly input: unknown
  readonly output: unknown
  readonly stageUuid: string
}

/** Content-uuid of one pipeline stage — uuid(jcs({ stage, input, output })). */
export function stageUuid(stage: string, input: unknown, output: unknown): string {
  return uuid(jcsCanonicalize({ stage, input, output }))
}

/**
 * Fold of all stage uuids — uuid(jcs([{ stage, stageUuid }, …])).
 * Deterministic chain seal; `contentUuid` on the model remains diamondUuid(model).
 */
export function computationUuid(stages: readonly DiamondComputationStage[]): string {
  return uuid(
    jcsCanonicalize(stages.map((s) => ({ stage: s.stage, stageUuid: s.stageUuid }))),
  )
}

/** Folder-derived fields — adapter input without importing FolderReadmeModel. */
export interface FolderDiamondInput {
  readonly atomPath: string
  readonly uuid: string | null
  readonly form: 0 | 1
  readonly code: 0 | 1
  readonly proof: 0 | 1
  readonly horo: number | null
  readonly measure: string | null
  readonly folded: boolean
  readonly linksResolved: number
  readonly linksTotal: number
  readonly bondsIn: number
  readonly bondsOut: number
  readonly sealed: boolean
}

const WORKER_EXPORT =
  /(?:Gate|Guardian|Confirm|generate|derive|render|compute|audit|execute|cron|Worker|folderViolations|folderGuardians|typographyGuardian)/i

const pathUnder = (atomPath: string, root: string): boolean =>
  atomPath === root || atomPath.startsWith(`${root}/`)

const pathUnderAny = (atomPath: string, roots: ReadonlySet<string>): boolean => {
  for (const r of roots) {
    if (pathUnder(atomPath, r)) return true
  }
  return false
}

/** Worker roots — scanned from matrix paths + live barrels (never hand-listed). */
let workerRootsCache: ReadonlySet<string> | undefined
const workerRoots = (): ReadonlySet<string> => {
  if (workerRootsCache) return workerRootsCache
  const roots = new Set<string>()
  const src = join(process.cwd(), 'src')
  for (const n of UUID_MATRIX_NODES) {
    const paths: string[] = n.path ? [n.path] : []
    for (const p of paths) {
      if (p.includes('/')) continue
      try {
        const body = readFileSync(join(src, p, 'index.ts'), 'utf8')
        if (WORKER_EXPORT.test(body)) roots.add(p)
      } catch {
        /* no code barrel at this matrix path */
      }
    }
  }
  workerRootsCache = roots
  return roots
}

export const measureOf = (digit: number | null): string | null => {
  if (digit === null) return null
  const i = HORO_DIGITS.indexOf(digit as (typeof HORO_DIGITS)[number])
  return i >= 0 ? HORO_MEASURE[i]! : String(digit)
}

/** Which deployment faces materialise — path · kind · matrix scan · exports (never hand-listed roots). */
export function deploymentFaces(model: DiamondModel | CollectionDiamondModel): DeploymentFaces {
  const p = model.atomPath
  const root = p.split('/')[0] ?? p
  const node = nodeOf(p) ?? nodeOf(root)

  const pwa =
    root === 'public' ||
    root === 'pwa' ||
    p.startsWith('public/') ||
    p.startsWith('pwa/')

  const plugin =
    !pwa &&
    (root === 'plugin' ||
      root === 'plugins' ||
      root === 'tenants' ||
      root === 'vitepress' ||
      p.startsWith('plugins/') ||
      p.includes('multi-tenant') ||
      node?.dim === 'plugins' ||
      model.exports.some((e) => /plugin/i.test(e)))

  const worker =
    !pwa &&
    !plugin &&
    (model.kind === 'method' ||
      model.cloudflare?.workerFace === true ||
      p.endsWith('/hooks') ||
      p.includes('/hook') ||
      p.startsWith('cloudflare/') ||
      pathUnderAny(p, workerRoots()) ||
      model.exports.some((e) => WORKER_EXPORT.test(e)))

  return { worker, plugin, pwa }
}

/** Adapter: folder completeness fields → DiamondModel (atom kind). */
export function folderInputToDiamond(
  folder: FolderDiamondInput,
  boundary?: { readonly boundaryUuid?: string; readonly imports?: readonly string[]; readonly exports?: readonly string[]; readonly escapes?: readonly string[] },
  links: readonly string[] = [],
): DiamondModel {
  return {
    kind: 'atom',
    atomPath: folder.atomPath,
    boundaryUuid: folder.uuid ?? boundary?.boundaryUuid ?? null,
    trinity: { form: folder.form, code: folder.code, proof: folder.proof },
    horo: folder.horo,
    measure: folder.measure,
    imports: boundary?.imports ?? [],
    exports: boundary?.exports ?? [],
    escapes: boundary?.escapes ?? [],
    links,
    linksResolved: folder.linksResolved,
    linksTotal: folder.linksTotal,
    folded: folder.folded,
    bondsIn: folder.bondsIn,
    bondsOut: folder.bondsOut,
    sealed: folder.sealed,
  }
}

/** Canonical payload for content-addressing — excludes derived `sealed` flag. */
export function diamondCanonicalPayload(
  model: DiamondModel | CollectionDiamondModel,
): Record<string, unknown> {
  const base: Record<string, unknown> = {
    kind: model.kind,
    atomPath: model.atomPath,
    boundaryUuid: model.boundaryUuid,
    trinity: model.trinity,
    horo: model.horo,
    measure: model.measure,
    imports: [...model.imports].sort(),
    exports: [...model.exports].sort(),
    escapes: [...model.escapes].sort(),
    links: [...model.links].sort(),
    linksResolved: model.linksResolved,
    linksTotal: model.linksTotal,
    folded: model.folded,
    bondsIn: model.bondsIn,
    bondsOut: model.bondsOut,
  }
  if (model.cloudflare) {
    base.cloudflare = model.cloudflare
  }
  if (model.kind === 'collection') {
    const c = model as CollectionDiamondModel
    base.slug = c.slug
    base.tamperProofUuid = c.tamperProofUuid
    base.horoStates = c.horoStates.map((s) => ({ code: s.code, step: s.step, label: s.label ?? null }))
    base.horoStateName = c.horoStateName
    base.standards = [...c.standards].sort()
    base.emits = [...c.emits].sort()
    base.subscribesTo = [...c.subscribesTo].sort()
  }
  return base
}

/** Content-uuid of the canonical model — same diamond ⇒ same uuid everywhere. */
export function diamondUuid(model: DiamondModel | CollectionDiamondModel): string {
  return uuid(jcsCanonicalize(diamondCanonicalPayload(model)))
}

/** Machine-readable diamond snapshot — JCS-canonical JSON with content-uuid seal. */
export function renderDiamondJson(
  model: DiamondModel | CollectionDiamondModel,
  stages?: readonly DiamondComputationStage[],
): string {
  const payload: Record<string, unknown> = {
    _generated: 'src/readme/index.ts',
    _doNotEdit: 'run pnpm readme to regenerate; pnpm computed:check to verify',
    ...diamondCanonicalPayload(model),
    contentUuid: diamondUuid(model),
  }
  if (stages && stages.length > 0) {
    payload.stages = stages.map((s) => ({ stage: s.stage, stageUuid: s.stageUuid }))
    payload.computationUuid = computationUuid(stages)
  }
  return jcsCanonicalize(payload) + '\n'
}

export { validateHoroStates }
