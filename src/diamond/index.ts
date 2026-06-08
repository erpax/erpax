/**
 * diamond — THE one shared model every diamond projects.
 *
 * Folders, files, methods, READMEs, CSS facets, religion atoms, Payload
 * collections — all share `DiamondModel`. One shape ⇒ one verifier ⇒ one
 * content-uuid pipeline ⇒ forging any diamond requires forging the whole model
 * ⇒ maximum tamper-cost.
 *
 * Composes existing organs (never re-derives by hand):
 *   [[readme]]/deriveFolderModel · [[method]]/methodPath · [[quantum/boundary]]
 *   · [[typography]]/linksOf · [[horo]] · [[path]]/toAtomPath · [[integrity]]
 *
 *   tsx src/diamond/index.ts readme
 *   tsx src/diamond/index.ts law/folder/folderGuardians
 *
 * @audit model computed from live tree + factory opts; never hand-asserted
 * @see ./SKILL.md — ../readme — ../method — ../quantum/boundary — ../factory
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { uuid, jcsCanonicalize } from '@/integrity'
import { toAtomPath } from '@/path'
import { deriveFolderModel, buildFolderReadmeContext, type FolderReadmeModel } from '@/readme'
import { methodPath, atomPathOf, parseMethodExports, type MethodDiamond } from '@/method'
import { computeBoundary, type FileBoundary } from '@/quantum/boundary'
import { linksOf } from '@/typography'
import { HORO_DIGITS, HORO_MEASURE, validateHoroStates, type HoroState } from '@/horo'

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

const SRC = 'src'

/** Trinity completeness — form (SKILL.md) · code (index.ts) · proof (test.ts). */
export interface DiamondTrinity {
  readonly form: 0 | 1
  readonly code: 0 | 1
  readonly proof: 0 | 1
}

/** Which scale / quantum dimension this diamond lives at. */
export type DiamondKind = 'atom' | 'file' | 'method' | 'collection'

/**
 * THE one shape — every diamond in every quantum dimension projects this model.
 * Organ-specific views ([[readme]] FolderReadmeModel, [[method]] MethodDiamond,
 * [[quantum/boundary]] FileBoundary) are thin adapters into this interface.
 */
export interface DiamondModel {
  readonly kind: DiamondKind
  /** Src-relative path of diamond folders (e.g. `readme`, `law/folder`). */
  readonly atomPath: string
  /** Matrix node uuid or computed boundary uuid — identity at this scale. */
  readonly boundaryUuid: string | null
  readonly trinity: DiamondTrinity
  readonly horo: number | null
  readonly measure: string | null
  /** Quantum import entanglements (@/ barrels or wikilinks). */
  readonly imports: readonly string[]
  /** Quantum export facets (barrel symbols or atom name). */
  readonly exports: readonly string[]
  /** Deep-import escapes — off-ring entanglements lowering tamper-cost. */
  readonly escapes: readonly string[]
  /** Outgoing wikilink bond targets (typography quantum). */
  readonly links: readonly string[]
  readonly linksResolved: number
  readonly linksTotal: number
  readonly folded: boolean
  readonly bondsIn: number
  readonly bondsOut: number
  /** Derived seal — complete trinity + folded + links + on-ring horo. */
  readonly sealed: boolean
}

/**
 * Three deployment faces of the same diamond — worker · plugin · pwa.
 * All are latent on every diamond; booleans mark which face materialises
 * for this model (computed from path/kind/exports, never hand-listed).
 *
 * @see ./SKILL.md — ../worker — ../plugin — ../pwa
 */
export interface DeploymentFaces {
  /** Autonomous executor — hook, CLI, guardian, agent, MCP handler. */
  readonly worker: boolean
  /** Host extension — Payload plugin, Cursor hook, VitePress plugin, MCP extension. */
  readonly plugin: boolean
  /** Offline installable shell — service worker, manifest, public/ cache. */
  readonly pwa: boolean
}

const WORKER_ROOTS = new Set([
  'confirm',
  'readme',
  'typography',
  'guardian',
  'agent',
  'mcp',
  'run',
  'cron',
  'worker',
  'seal',
  'breath',
])

const PLUGIN_ROOTS = new Set(['plugin', 'plugins', 'vitepress', 'hooks'])

const PWA_ROOTS = new Set(['pwa', 'public'])

const pathUnder = (atomPath: string, root: string): boolean =>
  atomPath === root || atomPath.startsWith(`${root}/`)

const pathUnderAny = (atomPath: string, roots: ReadonlySet<string>): boolean => {
  for (const r of roots) {
    if (pathUnder(atomPath, r)) return true
  }
  return false
}

/** Which deployment faces materialise for this diamond — same model, three host-axis facets. */
export function deploymentFaces(model: DiamondModel | CollectionDiamondModel): DeploymentFaces {
  const p = model.atomPath
  const worker =
    model.kind === 'method' ||
    pathUnderAny(p, WORKER_ROOTS) ||
    p.endsWith('/hooks') ||
    p.includes('/hook')
  const plugin =
    pathUnderAny(p, PLUGIN_ROOTS) ||
    p === 'tenants' ||
    p.includes('multi-tenant') ||
    model.exports.some((e) => /plugin/i.test(e))
  const pwa = pathUnderAny(p, PWA_ROOTS)
  return { worker, plugin, pwa }
}

/**
 * Payload collection dimension — extends the core model with factory-injected
 * facets (tamper-proof uuid, horo state ring, standards/event metadata).
 */
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

const measureOf = (digit: number | null): string | null => {
  if (digit === null) return null
  const i = HORO_DIGITS.indexOf(digit as (typeof HORO_DIGITS)[number])
  return i >= 0 ? HORO_MEASURE[i]! : String(digit)
}

/** Canonical bytes for content-addressing — excludes derived `sealed` flag. */
function canonicalDiamondPayload(model: DiamondModel | CollectionDiamondModel): Record<string, unknown> {
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
  return uuid(jcsCanonicalize(canonicalDiamondPayload(model)))
}

/** Fail-closed verifier — lists impurities; sealed only when the lattice holds. */
export function verifyDiamond(model: DiamondModel | CollectionDiamondModel): {
  sealed: boolean
  impurities: string[]
} {
  const impurities: string[] = []
  const { trinity } = model
  if (trinity.code && (!trinity.form || !trinity.proof)) {
    if (!trinity.form) impurities.push('trinity.form missing (SKILL.md)')
    if (!trinity.proof) impurities.push('trinity.proof missing (test.ts)')
  }
  if (model.horo !== null && !HORO_DIGITS.includes(model.horo as (typeof HORO_DIGITS)[number])) {
    impurities.push(`horo ${model.horo} off-ring`)
  }
  if (model.linksResolved < model.linksTotal) {
    impurities.push(`links unresolved: ${model.linksTotal - model.linksResolved}/${model.linksTotal}`)
  }
  if (model.escapes.length > 0) {
    impurities.push(`boundary escapes (${model.escapes.length}): ${model.escapes.slice(0, 3).join(', ')}`)
  }
  if (!model.folded && model.kind === 'atom') impurities.push('not folded into matrix')
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
    links: links ?? [],
    linksResolved: folder.linksResolved,
    linksTotal: folder.linksTotal,
    folded: folder.folded,
    bondsIn: folder.bondsIn,
    bondsOut: folder.bondsOut,
    sealed: folder.sealed,
  }
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

/**
 * Derive the unified diamond model for an atom folder.
 * Accepts src-relative atomPath (`readme`) or absolute/fs path (`…/src/readme/index.ts`).
 */
export function deriveDiamond(input: string, cwd: string = process.cwd()): DiamondModel {
  const srcRoot = join(cwd, SRC)
  let atomPath: string

  if (input.startsWith('/') || input.includes(`${SRC}/`) || input.includes(`${SRC}\\`)) {
    const abs = input.startsWith('/') ? input : join(cwd, input.replace(/^\/+/, ''))
    const rel = relative(srcRoot, abs).replace(/\\/g, '/')
    atomPath = toAtomPath(relative(cwd, abs).replace(/\\/g, '/'), 'fs')
    if (rel.endsWith('index.ts')) atomPath = atomPathOf(rel)
  } else {
    const parts = input.split('/')
    if (parts.length >= 2) {
      const parent = parts.slice(0, -1).join('/')
      const leaf = parts[parts.length - 1]!
      const barrel = join(srcRoot, parent, 'index.ts')
      if (existsSync(barrel)) {
        try {
          const body = readFileSync(barrel, 'utf8')
          if (parseMethodExports(body).includes(leaf)) {
            return methodModelToDiamond(methodPath(`${parent}/index.ts`, leaf))
          }
        } catch {
          /* fall through to atom path */
        }
      }
    }
    atomPath = toAtomPath(input, 'fs') || input.replace(/^src\//, '')
  }

  const ctx = buildFolderReadmeContext(srcRoot)
  const folder = deriveFolderModel(atomPath, cwd, ctx)
  const boundary = boundaryForAtom(atomPath, cwd)
  const links = linksForAtom(atomPath, cwd)
  return folderModelToDiamond(folder, boundary, links)
}

/** Normalize emit entries to event id strings for the model. */
function emitIds(emits: CollectionDiamondInput['emits']): readonly string[] {
  return (emits ?? [])
    .map((e) => (typeof e === 'string' ? e : e.event))
    .sort()
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
  const atomPath = opts.atomPath ?? opts.slug
  const srcRoot = join(cwd, SRC)
  const dir = join(srcRoot, atomPath)
  const dirExists = existsSync(dir)
  const form = (dirExists && existsSync(join(dir, 'SKILL.md')) ? 1 : 0) as 0 | 1
  const code = (dirExists && existsSync(join(dir, 'index.ts')) ? 1 : 0) as 0 | 1
  let proof = 0 as 0 | 1
  if (dirExists) {
    try {
      proof = (
        existsSync(join(dir, 'test.ts')) ||
        existsSync(join(dir, 'index.test.ts')) ||
        readdirSync(dir).some((f) => f.endsWith('.test.ts'))
          ? 1
          : 0
      ) as 0 | 1
    } catch {
      proof = 0
    }
  }
  const tamperProofUuid = opts.injectTamperProofUuid !== false
  const horoStates = (opts.horoStates ?? []) as readonly HoroState[]
  const horoStateName = horoStates.length > 0 ? (opts.horoStateName ?? 'state') : null

  let boundary: FileBoundary | undefined
  const barrel = join(dir, 'index.ts')
  if (existsSync(barrel)) boundary = computeBoundary(barrel, srcRoot)

  const links = dirExists ? linksForAtom(atomPath, cwd) : []
  let folder: FolderReadmeModel | null = null
  if (dirExists) {
    try {
      const ctx = buildFolderReadmeContext(srcRoot)
      folder = deriveFolderModel(atomPath, cwd, ctx)
    } catch {
      folder = null
    }
  }

  const horo = folder?.horo ?? null
  const linksResolved = folder?.linksResolved ?? 0
  const linksTotal = folder?.linksTotal ?? 0
  const folded = folder?.folded ?? false
  const bondsIn = folder?.bondsIn ?? 0
  const bondsOut = folder?.bondsOut ?? 0
  const sealed =
    (!code || (form && code && proof)) &&
    folded &&
    linksResolved === linksTotal &&
    (horo === null || HORO_DIGITS.includes(horo as (typeof HORO_DIGITS)[number])) &&
    (horoStates.length === 0 || validateHoroStates(horoStates).ok) &&
    tamperProofUuid

  return {
    kind: 'collection',
    slug: opts.slug,
    atomPath,
    boundaryUuid: boundary?.boundaryUuid ?? folder?.uuid ?? null,
    trinity: { form, code, proof },
    horo,
    measure: measureOf(horo),
    imports: boundary?.imports ?? [],
    exports: boundary?.exports ?? [opts.slug],
    escapes: boundary?.escapes ?? [],
    links,
    linksResolved,
    linksTotal,
    folded,
    bondsIn,
    bondsOut,
    sealed,
    tamperProofUuid,
    horoStates,
    horoStateName,
    standards: [...(opts.standards ?? [])].sort(),
    emits: emitIds(opts.emits),
    subscribesTo: [...(opts.subscribesTo ?? [])].sort(),
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const target = process.argv[2] ?? 'diamond'
  const model = target.includes('/') && !target.startsWith('src/')
    ? deriveDiamond(target)
    : deriveDiamond(target)
  const v = verifyDiamond(model)
  console.log(`diamond — ${model.kind} @ ${model.atomPath}`)
  console.log(`  uuid: ${diamondUuid(model)}`)
  console.log(`  trinity: ${model.trinity.form}·${model.trinity.code}·${model.trinity.proof}`)
  console.log(`  sealed: ${v.sealed}${v.impurities.length ? ' — ' + v.impurities.join('; ') : ''}`)
}
