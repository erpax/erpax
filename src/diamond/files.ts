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
import { existsSync, readFileSync } from 'node:fs'
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
import {
  ALLOWED_DIAMOND_FILES,
  CODE_MARKERS,
  COLOCATED,
  TRINITY_CODE,
  TRINITY_FORM,
  diamondAtomKind,
  diamondMembershipViolations,
  isChildAtomDir,
  type DiamondAtomKind,
  type DiamondMembershipViolation,
} from './membership'

export {
  ALLOWED_DIAMOND_FILES,
  CODE_MARKERS,
  COLOCATED,
  TRINITY_CODE,
  TRINITY_FORM,
  diamondAtomKind,
  isChildAtomDir,
  type DiamondAtomKind,
}

/** Must match @/readme COMPUTED_FACES — inlined to break diamond ↔ readme circular init. */
const COMPUTED_FACES = ['README.md', 'LLM.md', 'diamond.json'] as const
type ComputedFace = (typeof COMPUTED_FACES)[number]
import { folderInputToDiamond, renderDiamondJson, type DiamondModel } from './projection'
import { computeBoundary } from '@/quantum/boundary'

const SRC = 'src'

export type DiamondFileViolation = DiamondMembershipViolation

export interface DiamondAuditContext {
  readonly cwd: string
  readonly folderOf: (atomPath: string) => FolderReadmeModel
  readonly diamondOf: (atomPath: string) => DiamondModel
}

/** membership = stray files/dirs only; full = membership + computed-face drift verify. */
export type DiamondFileAuditMode = 'membership' | 'full'


/** Allowed basenames for this kind (does not include pattern allowlist). */
export function allowedDiamondFiles(kind: DiamondAtomKind): ReadonlySet<string> {
  return ALLOWED_DIAMOND_FILES[kind]
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
  const violations: DiamondFileViolation[] = [...diamondMembershipViolations(atomPath, cwd)]

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
