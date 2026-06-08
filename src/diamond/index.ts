/**
 * diamond — THE one shared model every diamond projects.
 *
 * Folders, files, methods, READMEs, CSS facets, religion atoms, Payload
 * collections — all share `DiamondModel`. One shape ⇒ one verifier ⇒ one
 * content-uuid pipeline ⇒ forging any diamond requires forging the whole model
 * ⇒ maximum tamper-cost.
 *
 * Canonical pipeline: `computeDiamond` — normalize path → trinity scan →
 * boundary → links/typography → horo from matrix → seal → diamondUuid.
 * All adapters delegate here; no parallel derive logic.
 *
 * Composes existing organs (never re-derives by hand):
 *   [[readme]]/deriveFolderModel · [[method]]/methodPath · [[quantum/boundary]]
 *   · [[typography]]/linksOf · [[horo]] · [[path]]/toAtomPath · [[integrity]]
 *
 *   tsx src/diamond/index.ts readme
 *   tsx src/diamond/index.ts law/folder/folderGuardians
 *   tsx src/diamond/index.ts --audit-files
 *
 * @audit model computed from live tree + factory opts; never hand-asserted
 * @see ./SKILL.md — ../readme — ../method — ../quantum/boundary — ../factory
 */
import { createRequire } from 'node:module'
import { existsSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const requireAtom = createRequire(import.meta.url)
import { toAtomPath } from '@/path'
import {
  deriveFolderModel,
  buildFolderReadmeContext,
  buildReadmeTypographyGraph,
  type FolderReadmeContext,
  type FolderReadmeModel,
} from '@/readme'
import type { AnalysisTypographyGraph } from '@/typography/analysis-graph'
import { methodPath, atomPathOf, parseMethodExports, type MethodDiamond } from '@/method'
import { computeBoundary, type FileBoundary } from '@/quantum/boundary'
import { linksOf } from '@/typography'
import { type HoroState } from '@/horo'
import { horoCrossed } from '@/uuid/matrix'
import {
  type DiamondModel,
  type CollectionDiamondModel,
  type DiamondComputationStage,
  type CloudflareDiamondFacet,
  folderInputToDiamond,
  diamondCanonicalPayload,
  diamondUuid,
  stageUuid,
  computationUuid,
  validateHoroStates,
} from './projection'

export type {
  DiamondTrinity,
  DiamondKind,
  CloudflareDiamondFacet,
  DiamondModel,
  CollectionDiamondModel,
  DeploymentFaces,
  DiamondComputationStage,
} from './projection'
export {
  measureOf,
  deploymentFaces,
  diamondCanonicalPayload,
  diamondUuid,
  stageUuid,
  computationUuid,
  renderDiamondJson,
} from './projection'
import {
  ALLOWED_DIAMOND_FILES,
  diamondFileViolations,
  diamondFilesGuardian,
} from './files'
export {
  ALLOWED_DIAMOND_FILES,
  TRINITY_FORM,
  TRINITY_CODE,
  CODE_MARKERS,
  COLOCATED,
  auditDiamondFolder,
  diamondAtomKind,
  allowedDiamondFiles,
  isChildAtomDir,
  diamondFileViolations,
  diamondFilesGuardian,
  type DiamondAtomKind,
  type DiamondFileViolation,
} from './files'

/** Factory opts surface for collection diamonds — avoids circular import with @/factory. */
export interface CollectionDiamondInput {
  readonly slug: string
  readonly atomPath?: string
  readonly injectTamperProofUuid?: boolean
  readonly horoStates?: readonly HoroState[]
  readonly horoStateName?: string
  readonly standards?: readonly string[]
  readonly emits?: ReadonlyArray<string | { readonly event: string }>
  readonly subscribesTo?: readonly string[]
}

/** Pre-resolved Cloudflare binding fields — [[cloudflare]]/bindingDiamond resolves then delegates. */
export interface CloudflareComputeInput {
  readonly atomPath: string
  readonly boundaryUuid: string
  readonly bindingName: string
  readonly bindingType: string
  readonly links: readonly string[]
  readonly resourceAtom?: string | null
  readonly cloudflare?: CloudflareDiamondFacet
}

/** Unified input to the canonical diamond pipeline — one shape, all scales. */
export type DiamondInput =
  | {
      readonly kind: 'path'
      readonly path: string
      readonly cwd?: string
      /** Frozen readme typography graph — same snapshot as deriveFolderModel / verify. */
      readonly graph?: AnalysisTypographyGraph
      readonly ctx?: FolderReadmeContext
    }
  | { readonly kind: 'collection'; readonly opts: CollectionDiamondInput; readonly cwd?: string }
  | { readonly kind: 'method'; readonly file: string; readonly symbol: string }
  | { readonly kind: 'cloudflare'; readonly binding: CloudflareComputeInput }
  | { readonly kind: 'css'; readonly path: string; readonly content?: string; readonly cwd?: string }
  | {
      readonly kind: 'port'
      readonly sourceLang: string
      readonly targetLang: string
      readonly atomPath: string
    }

/** Fractal pipeline result — model plus content-addressed stage chain. */
export interface DiamondComputation {
  readonly model: DiamondModel | CollectionDiamondModel
  readonly stages: readonly DiamondComputationStage[]
  readonly computationUuid: string
}

/** Alias — css/port pipelines share the same stage machinery. */
export type DiamondComputationResult = DiamondComputation

const SRC = 'src'

/**
 * Payload collection dimension — extends the core model with factory-injected
 * facets (tamper-proof uuid, horo state ring, standards/event metadata).
 */

/** Fail-closed verifier — lists impurities; sealed only when the lattice holds. */
export function verifyDiamond(
  model: DiamondModel | CollectionDiamondModel,
  opts?: { readonly parentSealed?: boolean },
): {
  sealed: boolean
  impurities: string[]
} {
  const impurities: string[] = []
  const { trinity } = model
  if (trinity.code && (!trinity.form || !trinity.proof)) {
    if (!trinity.form) impurities.push('trinity.form missing (SKILL.md)')
    if (!trinity.proof) impurities.push('trinity.proof missing (test.ts)')
  }
  if (model.horo !== null && !horoCrossed(model.atomPath, model.horo)) {
    impurities.push(`horo ${model.horo} off-ring`)
  }
  if (model.linksResolved < model.linksTotal) {
    impurities.push(`links unresolved: ${model.linksTotal - model.linksResolved}/${model.linksTotal}`)
  }
  if (model.escapes.length > 0) {
    impurities.push(`boundary escapes (${model.escapes.length}): ${model.escapes.slice(0, 3).join(', ')}`)
  }
  if (!model.folded && model.kind === 'atom') impurities.push('not folded into matrix')
  if (model.sealed && opts?.parentSealed === false) {
    impurities.push('seal propagation: parent unsealed forbids child sealed')
  }
  if (model.kind === 'collection') {
    const c = model as CollectionDiamondModel
    if (c.tamperProofUuid && !c.trinity.code) impurities.push('collection missing code barrel (index.ts)')
    if (c.horoStates.length > 0) {
      const v = validateHoroStates(c.horoStates)
      if (!v.ok) impurities.push(...v.errors.map((e) => `horoStates: ${e}`))
    }
  }
  const sealed = impurities.length === 0 && model.sealed
  return { sealed, impurities }
}

/** Adapter: [[readme]] FolderReadmeModel → DiamondModel. */
export function folderModelToDiamond(
  folder: FolderReadmeModel,
  boundary?: FileBoundary,
  links?: readonly string[],
): DiamondModel {
  return folderInputToDiamond(folder, boundary, links ?? [])
}

/** Adapter: [[method]] MethodDiamond → DiamondModel. */
export function methodModelToDiamond(method: MethodDiamond): DiamondModel {
  return {
    kind: 'method',
    atomPath: method.address,
    boundaryUuid: method.boundaryUuid,
    trinity: { form: 0, code: 1, proof: 0 },
    horo: null,
    measure: null,
    imports: [],
    exports: [method.symbol],
    escapes: [],
    links: [],
    linksResolved: 0,
    linksTotal: 0,
    folded: true,
    bondsIn: 0,
    bondsOut: 0,
    sealed: true,
  }
}

function boundaryForAtom(atomPath: string, cwd: string): FileBoundary | undefined {
  const srcRoot = join(cwd, SRC)
  const barrel = join(srcRoot, atomPath, 'index.ts')
  if (existsSync(barrel)) return computeBoundary(barrel, srcRoot)
  const skill = join(srcRoot, atomPath, 'SKILL.md')
  if (existsSync(skill)) return computeBoundary(skill, srcRoot)
  return undefined
}

function linksForAtom(atomPath: string, cwd: string): readonly string[] {
  const skill = join(cwd, SRC, atomPath, 'SKILL.md')
  try {
    return linksOf(readFileSync(skill, 'utf8'))
  } catch {
    return []
  }
}

/** Resolve path input to atomPath or method export — shared normalization step. */
function resolvePathInput(
  input: string,
  cwd: string,
): { readonly atomPath: string } | { readonly method: { readonly file: string; readonly symbol: string } } {
  const srcRoot = join(cwd, SRC)

  if (input.startsWith('/') || input.includes(`${SRC}/`) || input.includes(`${SRC}\\`)) {
    const abs = input.startsWith('/') ? input : join(cwd, input.replace(/^\/+/, ''))
    const rel = relative(srcRoot, abs).replace(/\\/g, '/')
    let atomPath = toAtomPath(relative(cwd, abs).replace(/\\/g, '/'), 'fs')
    if (rel.endsWith('index.ts')) atomPath = atomPathOf(rel)
    return { atomPath }
  }

  const parts = input.split('/')
  if (parts.length >= 2) {
    const parent = parts.slice(0, -1).join('/')
    const leaf = parts[parts.length - 1]!
    const barrel = join(srcRoot, parent, 'index.ts')
    if (existsSync(barrel)) {
      try {
        const body = readFileSync(barrel, 'utf8')
        if (parseMethodExports(body).includes(leaf)) {
          return { method: { file: `${parent}/index.ts`, symbol: leaf } }
        }
      } catch {
        /* fall through to atom path */
      }
    }
  }

  const atomPath = toAtomPath(input, 'fs') || input.replace(/^src\//, '')
  return { atomPath }
}

/**
 * Core atom pipeline — trinity · boundary · links · horo · matrix fold.
 * Records path → horo stages; seal + uuid appended by finalizeComputation.
 */
function computeAtomPipeline(
  atomPath: string,
  cwd: string,
  pathInput: string,
  stages: DiamondComputationStage[],
  frozen?: { readonly graph: AnalysisTypographyGraph; readonly ctx: FolderReadmeContext },
): { folder: FolderReadmeModel; boundary?: FileBoundary; links: readonly string[] } {
  pushStage(stages, 'path', { path: pathInput }, { atomPath })

  const srcRoot = join(cwd, SRC)
  const ctx = frozen?.ctx ?? buildFolderReadmeContext(srcRoot)
  const graph = frozen?.graph ?? buildReadmeTypographyGraph(cwd)
  const folder = deriveFolderModel(atomPath, cwd, ctx, graph)

  pushStage(stages, 'trinity', { atomPath }, {
    form: folder.form,
    code: folder.code,
    proof: folder.proof,
  })

  const boundary = boundaryForAtom(atomPath, cwd)
  pushStage(
    stages,
    'boundary',
    { atomPath },
    boundary
      ? {
          boundaryUuid: boundary.boundaryUuid,
          imports: [...boundary.imports].sort(),
          exports: [...boundary.exports].sort(),
          escapes: [...boundary.escapes].sort(),
        }
      : null,
  )

  const links = linksForAtom(atomPath, cwd)
  pushStage(stages, 'links', { atomPath }, {
    links: [...links].sort(),
    linksResolved: folder.linksResolved,
    linksTotal: folder.linksTotal,
  })

  pushStage(stages, 'horo', { leaf: folder.leaf }, {
    horo: folder.horo,
    measure: folder.measure,
    matrixUuid: folder.uuid,
    folded: folder.folded,
    bondsIn: folder.bondsIn,
    bondsOut: folder.bondsOut,
  })

  return { folder, boundary, links }
}

function pushStage(
  stages: DiamondComputationStage[],
  stage: string,
  input: unknown,
  output: unknown,
): void {
  stages.push({ stage, input, output, stageUuid: stageUuid(stage, input, output) })
}

function finalizeComputation(
  model: DiamondModel | CollectionDiamondModel,
  stages: DiamondComputationStage[],
): DiamondComputation {
  const verdict = verifyDiamond(model)
  pushStage(stages, 'seal', { kind: model.kind, atomPath: model.atomPath }, {
    sealed: verdict.sealed,
    impurities: [...verdict.impurities],
    modelSealed: model.sealed,
  })

  const contentUuid = diamondUuid(model)
  pushStage(stages, 'uuid', { canonical: diamondCanonicalPayload(model) }, { contentUuid })

  return { model, stages, computationUuid: computationUuid(stages) }
}

function computePathDiamond(
  rawPath: string,
  cwd: string,
  frozen?: { readonly graph: AnalysisTypographyGraph; readonly ctx: FolderReadmeContext },
): DiamondComputation {
  const resolved = resolvePathInput(rawPath, cwd)
  if ('method' in resolved) {
    return computeMethodDiamond(resolved.method.file, resolved.method.symbol, rawPath)
  }
  const stages: DiamondComputationStage[] = []
  const { folder, boundary, links } = computeAtomPipeline(
    resolved.atomPath,
    cwd,
    rawPath,
    stages,
    frozen,
  )
  const model = folderInputToDiamond(folder, boundary, links)
  return finalizeComputation(model, stages)
}

function computeMethodDiamond(
  file: string,
  symbol: string,
  rawPath?: string,
): DiamondComputation {
  const stages: DiamondComputationStage[] = []
  const m = methodPath(file, symbol)
  pushStage(stages, 'path', { path: rawPath ?? m.address, file, symbol }, {
    atomPath: m.atomPath,
    address: m.address,
    file: m.file,
    symbol: m.symbol,
  })
  pushStage(stages, 'trinity', { address: m.address }, { form: 0, code: 1, proof: 0 })
  pushStage(stages, 'boundary', { atomPath: m.atomPath, symbol }, {
    boundaryUuid: m.boundaryUuid,
  })
  pushStage(stages, 'links', { address: m.address }, {
    links: [],
    linksResolved: 0,
    linksTotal: 0,
  })
  pushStage(stages, 'horo', { address: m.address }, {
    horo: null,
    measure: null,
    matrixUuid: null,
    folded: true,
    bondsIn: 0,
    bondsOut: 0,
  })
  return finalizeComputation(methodModelToDiamond(m), stages)
}

function computeCollectionDiamond(
  opts: CollectionDiamondInput,
  cwd: string,
): DiamondComputation {
  const atomPath = opts.atomPath ?? opts.slug
  const stages: DiamondComputationStage[] = []
  const { folder, boundary, links } = computeAtomPipeline(atomPath, cwd, atomPath, stages)
  const base = folderInputToDiamond(folder, boundary, links)
  const tamperProofUuid = opts.injectTamperProofUuid !== false
  const horoStates = (opts.horoStates ?? []) as readonly HoroState[]
  const horoStateName = horoStates.length > 0 ? (opts.horoStateName ?? 'state') : null
  const { form, code, proof } = base.trinity
  const sealed = Boolean(
    (!code || (form && code && proof)) &&
      base.folded &&
      base.linksResolved === base.linksTotal &&
      (base.horo === null || horoCrossed(atomPath, base.horo)) &&
      (horoStates.length === 0 || validateHoroStates(horoStates).ok) &&
      tamperProofUuid,
  )

  pushStage(stages, 'collection', { slug: opts.slug, atomPath }, {
    slug: opts.slug,
    tamperProofUuid,
    horoStates: horoStates.map((s) => ({ code: s.code, step: s.step, label: s.label ?? null })),
    horoStateName,
    standards: [...(opts.standards ?? [])].sort(),
    emits: emitIds(opts.emits),
    subscribesTo: [...(opts.subscribesTo ?? [])].sort(),
  })

  const model: CollectionDiamondModel = {
    ...base,
    kind: 'collection',
    slug: opts.slug,
    atomPath,
    boundaryUuid: boundary?.boundaryUuid ?? base.boundaryUuid,
    exports: base.exports.length > 0 ? base.exports : [opts.slug],
    sealed,
    tamperProofUuid,
    horoStates,
    horoStateName,
    standards: [...(opts.standards ?? [])].sort(),
    emits: emitIds(opts.emits),
    subscribesTo: [...(opts.subscribesTo ?? [])].sort(),
  }
  return finalizeComputation(model, stages)
}

function computeCloudflareDiamond(binding: CloudflareComputeInput): DiamondComputation {
  const stages: DiamondComputationStage[] = []
  const links = [...binding.links].sort()
  const resourceAtom = binding.resourceAtom ?? null

  pushStage(stages, 'path', {
    bindingName: binding.bindingName,
    bindingType: binding.bindingType,
  }, { atomPath: binding.atomPath })
  pushStage(stages, 'trinity', { atomPath: binding.atomPath }, { form: 1, code: 1, proof: 1 })
  pushStage(stages, 'boundary', { atomPath: binding.atomPath }, {
    boundaryUuid: binding.boundaryUuid,
    imports: resourceAtom ? [`@/path:${resourceAtom}`] : ['@/cloudflare'],
    exports: [binding.bindingName, binding.bindingType].sort(),
    escapes: [],
  })
  pushStage(stages, 'links', { atomPath: binding.atomPath }, {
    links,
    linksResolved: links.length,
    linksTotal: links.length,
  })
  pushStage(stages, 'horo', { atomPath: binding.atomPath }, {
    horo: null,
    measure: null,
    matrixUuid: null,
    folded: true,
    bondsIn: links.length,
    bondsOut: links.length,
  })

  const model = buildCloudflareDiamond(binding)
  return finalizeComputation(model, stages)
}

/** Normalize emit entries to event id strings for the model. */
function emitIds(emits: CollectionDiamondInput['emits']): readonly string[] {
  return (emits ?? [])
    .map((e) => (typeof e === 'string' ? e : e.event))
    .sort()
}

function computeCssKindDiamond(
  path: string,
  content: string | undefined,
  cwd: string,
): DiamondComputation {
  const { computeCssDiamond } = requireAtom('@/css') as typeof import('@/css')
  const css = computeCssDiamond({ path, content, cwd })
  const model: DiamondModel = {
    kind: 'file',
    atomPath: css.path,
    boundaryUuid: css.seal.contentUuid,
    trinity: { form: 0, code: 0, proof: 0 },
    horo: null,
    measure: null,
    imports: [],
    exports: [],
    escapes: [],
    links: [],
    linksResolved: 0,
    linksTotal: 0,
    folded: true,
    bondsIn: 0,
    bondsOut: 0,
    sealed: true,
  }
  return { model, stages: css.stages, computationUuid: css.computationUuid }
}

function computePortKindDiamond(
  sourceLang: string,
  targetLang: string,
  atomPath: string,
): DiamondComputation {
  const { portDiamond } = requireAtom('@/port') as typeof import('@/port')
  const port = portDiamond(sourceLang, targetLang, atomPath)
  const model: DiamondModel = {
    kind: 'atom',
    atomPath,
    boundaryUuid: port.computationUuid,
    trinity: { form: 1, code: 1, proof: 1 },
    horo: null,
    measure: null,
    imports: [sourceLang],
    exports: [targetLang],
    escapes: [],
    links: [],
    linksResolved: 0,
    linksTotal: 0,
    folded: true,
    bondsIn: 0,
    bondsOut: 0,
    sealed: true,
  }
  return { model, stages: port.stages, computationUuid: port.computationUuid }
}

function buildCloudflareDiamond(binding: CloudflareComputeInput): DiamondModel {
  const links = [...binding.links]
  const resourceAtom = binding.resourceAtom ?? null
  const model: DiamondModel = {
    kind: 'atom',
    atomPath: binding.atomPath,
    boundaryUuid: binding.boundaryUuid,
    trinity: { form: 1, code: 1, proof: 1 },
    horo: null,
    measure: null,
    imports: resourceAtom ? [`@/path:${resourceAtom}`] : ['@/cloudflare'],
    exports: [binding.bindingName, binding.bindingType],
    escapes: [],
    links,
    linksResolved: links.length,
    linksTotal: links.length,
    folded: true,
    bondsIn: links.length,
    bondsOut: links.length,
    sealed: true,
  }
  return binding.cloudflare ? { ...model, cloudflare: binding.cloudflare } : model
}

/**
 * Canonical diamond pipeline — ONE fractal computation for all scales.
 * Each stage (path · trinity · boundary · links · horo · seal · uuid) is
 * content-addressed; computationUuid folds all stageUuids.
 */
export function computeDiamond(input: DiamondInput): DiamondComputation {
  switch (input.kind) {
    case 'path':
      return computePathDiamond(
        input.path,
        input.cwd ?? process.cwd(),
        input.graph && input.ctx ? { graph: input.graph, ctx: input.ctx } : undefined,
      )
    case 'collection':
      return computeCollectionDiamond(input.opts, input.cwd ?? process.cwd())
    case 'method':
      return computeMethodDiamond(input.file, input.symbol)
    case 'cloudflare':
      return computeCloudflareDiamond(input.binding)
    case 'css':
      return computeCssKindDiamond(input.path, input.content, input.cwd ?? process.cwd())
    case 'port':
      return computePortKindDiamond(input.sourceLang, input.targetLang, input.atomPath)
  }
}

/**
 * Derive the unified diamond model for an atom folder.
 * Accepts src-relative atomPath (`readme`) or absolute/fs path (`…/src/readme/index.ts`).
 */
export function deriveDiamond(input: string, cwd: string = process.cwd()): DiamondModel {
  return computeDiamond({ kind: 'path', path: input, cwd }).model as DiamondModel
}

/**
 * Derive the collection diamond from factory opts + live tree.
 * Tamper-proof uuid + horoStates are documented as diamond-model facets injected by
 * [[factory]]/createAccountingCollection.
 */
export function deriveCollectionDiamond(
  opts: CollectionDiamondInput,
  cwd: string = process.cwd(),
): CollectionDiamondModel {
  return computeDiamond({ kind: 'collection', opts, cwd }).model as CollectionDiamondModel
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv.includes('--audit-files')) {
    const violations = diamondFileViolations()
    const verdict = diamondFilesGuardian(violations.length)
    const byReason = new Map<string, number>()
    for (const v of violations) byReason.set(v.reason, (byReason.get(v.reason) ?? 0) + 1)
    console.log(`diamond/files — ${violations.length} violation(s) across atom folders`)
    console.log(
      '  allowed vocabulary:',
      [...ALLOWED_DIAMOND_FILES.vocabulary].sort().join(' · '),
    )
    console.log('  allowed code:', [...ALLOWED_DIAMOND_FILES.code].sort().join(' · '))
    console.log(
      '  by reason:',
      [...byReason.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([k, n]) => `${k}:${n}`)
        .join(' '),
    )
    for (const v of violations.slice(0, 20)) {
      console.log(`   ${v.atomPath} → ${v.file} (${v.reason})`)
    }
    if (violations.length > 20) console.log(`   … ${violations.length - 20} more`)
    console.log((verdict.sealed ? '✓ ' : '✗ ') + verdict.guardians[0]!.reason)
    process.exit(verdict.sealed ? 0 : 1)
  }
  const target = process.argv[2] ?? 'diamond'
  const { model, stages, computationUuid: compUuid } = computeDiamond({ kind: 'path', path: target })
  const v = verifyDiamond(model)
  console.log(`diamond — ${model.kind} @ ${model.atomPath}`)
  console.log(`  uuid: ${diamondUuid(model)}`)
  console.log(`  computation: ${compUuid} (${stages.length} stages)`)
  console.log(`  trinity: ${model.trinity.form}·${model.trinity.code}·${model.trinity.proof}`)
  console.log(`  sealed: ${v.sealed}${v.impurities.length ? ' — ' + v.impurities.join('; ') : ''}`)
}
