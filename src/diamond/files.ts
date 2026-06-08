/**
 * diamond/files — only computed sealed files may be present in the diamond.
 *
 * A diamond folder (atom) may hold ONLY:
 *   1. Trinity — SKILL.md (vocabulary), OR SKILL.md + index.ts + test.ts (code)
 *   2. Computed faces — README.md · LLM.md · diamond.json (+ @/readme COMPUTED_FACES)
 *   3. Nested child atom folders (each with their own SKILL.md)
 *   4. Explicit allowlist — co-located tests, translations/seed, .tsx UI facets
 *
 *   tsx src/diamond/index.ts --audit-files
 *
 * @audit allowed sets + violation scan computed from live tree; baseline ratchets DOWN only
 * @see ./SKILL.md — ../readme — ../guardian — ../law/folder
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { guardian } from '@/guardian'
import { seal, type SealVerdict } from '@/seal'
import {
  deriveFolderModel,
  buildFolderReadmeContext,
  renderFolderReadme,
  deriveLLMBrief,
  renderLLM,
  lawLineForAtom,
  listAtomPaths,
  type FolderReadmeModel,
} from '@/readme'

/** Must match @/readme COMPUTED_FACES — inlined to break diamond ↔ readme circular init. */
const COMPUTED_FACES = ['README.md', 'LLM.md', 'diamond.json'] as const
type ComputedFace = (typeof COMPUTED_FACES)[number]
import { folderInputToDiamond, renderDiamondJson, type DiamondModel } from '@/diamond/projection'
import { computeBoundary } from '@/quantum/boundary'

const SRC = 'src'

/** Vocabulary atom — antimatter-only (SKILL.md, no code barrel). */
export type DiamondAtomKind = 'vocabulary' | 'code'

/** Trinity form leg — the only markdown that may be hand-authored (sealed by gates). */
export const TRINITY_FORM = 'SKILL.md' as const

/** Full trinity code legs for a code atom. */
export const TRINITY_CODE = ['index.ts', 'test.ts'] as const

/** Presence of matter or proof ⇒ code atom (trinity required by folder law). */
export const CODE_MARKERS = ['index.ts', 'index.tsx', 'test.ts', 'test.tsx'] as const

/** Tolerated co-locations (folder law + trinity organ). */
export const COLOCATED = [
  'index.tsx',
  'index.test.ts',
  'index.test.tsx',
  'test.tsx',
  'translations.ts',
  'seed.ts',
] as const

/** UI component facets — rare necessities in component atoms. */
const TSX_EXT = /\.tsx$/i
const COLOCATED_TEST = /\.test\.(ts|tsx)$/i
const FORBIDDEN_NAME = /\.(bak|backup)$/i

const computedSet = (): ReadonlySet<string> => new Set(COMPUTED_FACES)

const vocabularyCore = (): ReadonlySet<string> =>
  new Set([TRINITY_FORM, ...COLOCATED, ...COMPUTED_FACES])

const codeCore = (): ReadonlySet<string> =>
  new Set([TRINITY_FORM, ...TRINITY_CODE, ...COLOCATED, ...COMPUTED_FACES])

/** Allowed basenames per atom kind — nested child dirs are always allowed. */
export const ALLOWED_DIAMOND_FILES: Readonly<Record<DiamondAtomKind, ReadonlySet<string>>> = {
  vocabulary: vocabularyCore(),
  code: codeCore(),
}

export interface DiamondFileViolation {
  readonly atomPath: string
  readonly file: string
  readonly reason: string
}

export interface DiamondAuditContext {
  readonly cwd: string
  readonly folderOf: (atomPath: string) => FolderReadmeModel
  readonly diamondOf: (atomPath: string) => DiamondModel
}

/** membership = stray files/dirs only; full = membership + computed-face drift verify. */
export type DiamondFileAuditMode = 'membership' | 'full'

const isDir = (p: string): boolean => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

const basenames = (dir: string): string[] => {
  try {
    return readdirSync(dir)
  } catch {
    return []
  }
}

/** Classify atom kind from live basenames — code wins when matter or proof is present. */
export function diamondAtomKind(files: Iterable<string>): DiamondAtomKind {
  const set = new Set(files)
  return CODE_MARKERS.some((m) => set.has(m)) ? 'code' : 'vocabulary'
}

/** Allowed basenames for this kind (does not include pattern allowlist). */
export function allowedDiamondFiles(kind: DiamondAtomKind): ReadonlySet<string> {
  return ALLOWED_DIAMOND_FILES[kind]
}

/** Nested child atom — subdirectory holding its own SKILL.md diamond. */
export function isChildAtomDir(parentDir: string, name: string): boolean {
  return existsSync(join(parentDir, name, TRINITY_FORM))
}

const isAllowedFile = (name: string, kind: DiamondAtomKind): boolean => {
  if (FORBIDDEN_NAME.test(name)) return false
  if (name.startsWith('.') && name !== '.gitkeep') return false
  const allowed = ALLOWED_DIAMOND_FILES[kind]
  if (allowed.has(name)) return true
  if (kind === 'code') {
    if (TSX_EXT.test(name)) return true
    if (COLOCATED_TEST.test(name)) return true
  }
  return false
}

/** Build once per corpus scan — caches folder + diamond models per atomPath. */
export function buildDiamondAuditContext(cwd: string = process.cwd()): DiamondAuditContext {
  const srcRoot = join(cwd, SRC)
  const readmeCtx = buildFolderReadmeContext(srcRoot)
  const folderCache = new Map<string, FolderReadmeModel>()
  const diamondCache = new Map<string, DiamondModel>()
  const folderOf = (atomPath: string): FolderReadmeModel => {
    let m = folderCache.get(atomPath)
    if (!m) {
      m = deriveFolderModel(atomPath, cwd, readmeCtx)
      folderCache.set(atomPath, m)
    }
    return m
  }
  const diamondOf = (atomPath: string): DiamondModel => {
    let m = diamondCache.get(atomPath)
    if (!m) {
      const folder = folderOf(atomPath)
      const barrel = join(srcRoot, atomPath, 'index.ts')
      let boundary: ReturnType<typeof computeBoundary> | undefined
      if (existsSync(barrel)) {
        try {
          boundary = computeBoundary(barrel, srcRoot)
        } catch {
          boundary = undefined
        }
      }
      m = folderInputToDiamond(folder, boundary)
      diamondCache.set(atomPath, m)
    }
    return m
  }
  return { cwd, folderOf, diamondOf }
}

const expectedFace = (
  atomPath: string,
  face: ComputedFace,
  ctx: DiamondAuditContext,
): string => {
  const folder = ctx.folderOf(atomPath)
  const diamond = ctx.diamondOf(atomPath)
  if (face === 'README.md') return renderFolderReadme(folder)
  if (face === 'LLM.md') return renderLLM(deriveLLMBrief(folder, diamond, lawLineForAtom(atomPath, ctx.cwd)))
  return renderDiamondJson(diamond)
}

const verifyComputedFace = (
  atomPath: string,
  face: ComputedFace,
  ctx: DiamondAuditContext,
): string | null => {
  const path = join(ctx.cwd, SRC, atomPath, face)
  let actual: string
  try {
    actual = readFileSync(path, 'utf8')
  } catch {
    return null
  }
  if (actual !== expectedFace(atomPath, face, ctx)) return `computed-drift:${face}`
  return null
}

/**
 * Audit one atom folder — lists stray files/dirs and computed-face drift.
 * Pass `auditCtx` from `buildDiamondAuditContext` when scanning many atoms.
 */
export function auditDiamondFolder(
  atomPath: string,
  cwd: string = process.cwd(),
  auditCtx: DiamondAuditContext = buildDiamondAuditContext(cwd),
  mode: DiamondFileAuditMode = 'full',
): { ok: boolean; violations: DiamondFileViolation[] } {
  const dir = join(cwd, SRC, atomPath)
  const entries = basenames(dir)
  const fileNames = entries.filter((e) => !isDir(join(dir, e)))
  const kind = diamondAtomKind(fileNames)
  const violations: DiamondFileViolation[] = []

  for (const e of entries) {
    const p = join(dir, e)
    if (isDir(p)) {
      if (!isChildAtomDir(dir, e)) {
        violations.push({ atomPath, file: e + '/', reason: 'stray-dir' })
      }
      continue
    }
    if (FORBIDDEN_NAME.test(e)) {
      violations.push({ atomPath, file: e, reason: 'forbidden-backup' })
      continue
    }
    if (e.startsWith('.')) {
      violations.push({ atomPath, file: e, reason: 'stray-dotfile' })
      continue
    }
    if (e.endsWith('.md') && e !== TRINITY_FORM && !computedSet().has(e)) {
      violations.push({ atomPath, file: e, reason: 'stray-markdown' })
      continue
    }
    if (!isAllowedFile(e, kind)) {
      violations.push({ atomPath, file: e, reason: 'stray-file' })
    }
  }

  if (mode === 'full') {
    for (const face of COMPUTED_FACES) {
      const drift = verifyComputedFace(atomPath, face, auditCtx)
      if (drift) violations.push({ atomPath, file: face, reason: drift })
    }
  }

  return { ok: violations.length === 0, violations }
}

/** Scan every atom folder under src/ — single source of truth for the guardian. */
export function diamondFileViolations(
  cwd: string = process.cwd(),
  mode: DiamondFileAuditMode = 'membership',
): DiamondFileViolation[] {
  const auditCtx = buildDiamondAuditContext(cwd)
  const out: DiamondFileViolation[] = []
  for (const atomPath of listAtomPaths(cwd)) {
    out.push(...auditDiamondFolder(atomPath, cwd, auditCtx, mode).violations)
  }
  return out
}

/**
 * THE COMMITTED CEILING — live membership violations (stray files/dirs/dotfiles).
 * Computed-face drift is gated separately by `pnpm readme:check`. Ratchet DOWN only.
 * Derived: `tsx src/diamond/index.ts --audit-files` (645, 2026-06-08).
 */
export const DIAMOND_FILES_BASELINE = 645

/** Diamond-files guardian — one axis, baseline ratchet (mirrors typography). */
export function diamondFilesGuardian(
  violations: number = diamondFileViolations().length,
  baseline: number = DIAMOND_FILES_BASELINE,
): SealVerdict {
  return seal([guardian({ axis: 'diamond-files', violations, baseline })])
}
