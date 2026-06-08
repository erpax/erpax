/**
 * tightened-scans — stray-ts · multi-segment · accounting · diamond membership scans.
 *
 * No @/law/folder barrel import — live-counts and emit avoid circular init.
 */
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import {
  diamondMembershipViolations,
  isChildAtomDir,
  TRINITY_FORM,
  type DiamondMembershipViolation,
} from '@/diamond/membership'
import {
  ACCOUNTING_NEST_MAP,
  FORBIDDEN_INTERMEDIATE_SEGMENTS,
  ROOT_TS_ALLOWED,
} from './bindings'

const SRC = 'src'

const COLOCATED_TEST = /\.test\.(ts|tsx)$/i
const COMPUTED_FACES = new Set(['README.md', 'LLM.md', 'diamond.json'])
const GENERATED_TS = /\.generated\.ts$/i
const UI_FACET_TSX = /\.tsx$/i
const MULTI_SEGMENT_STEM = /[-.]/

const ACCOUNTING_FORBIDDEN_COMPLIANT: Readonly<Record<string, string>> = {
  path: 'coa',
  self: 'corpus',
}

export interface TightenedViolation {
  readonly atomPath: string
  readonly file: string
  readonly law: 'stray-ts' | 'multi-segment-file' | 'accounting-structure' | 'forbidden-intermediate' | 'stray-dir'
  readonly reason: string
  readonly compliant?: string
}

const isDir = (p: string): boolean => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

const fileNames = (dir: string): string[] => {
  try {
    return readdirSync(dir)
  } catch {
    return []
  }
}

/** Every atom folder (SKILL.md present) under src/ — lightweight, no @/readme dependency. */
export function listAtomPaths(cwd: string = process.cwd()): string[] {
  const root = join(cwd, SRC)
  const out: string[] = []
  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir).sort()
    } catch {
      return
    }
    if (entries.includes(TRINITY_FORM)) out.push(rel || '.')
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      if (!isDir(p)) continue
      walk(p, rel ? `${rel}/${e}` : e)
    }
  }
  walk(root, '')
  return out.sort()
}

export function diamondMembershipScan(cwd: string = process.cwd()): DiamondMembershipViolation[] {
  const out: DiamondMembershipViolation[] = []
  for (const atomPath of listAtomPaths(cwd)) {
    out.push(...diamondMembershipViolations(atomPath, cwd))
  }
  return out
}

export function isMultiSegmentFilename(name: string): boolean {
  if (!/\.tsx?$/i.test(name)) return false
  if (COLOCATED_TEST.test(name)) {
    const stem = name.replace(/\.test\.(ts|tsx)$/i, '')
    return MULTI_SEGMENT_STEM.test(stem)
  }
  const stem = name.replace(/\.tsx?$/i, '')
  if (ROOT_TS_ALLOWED.has(name)) return false
  return MULTI_SEGMENT_STEM.test(stem)
}

export function strayTsViolations(cwd: string = process.cwd()): TightenedViolation[] {
  const out: TightenedViolation[] = []
  for (const atomPath of listAtomPaths(cwd)) {
    const dir = join(cwd, SRC, atomPath)
    const entries = fileNames(dir)
    const hasCode = entries.some((e) => e === 'index.ts' || e === 'index.tsx' || e === 'test.ts')
    if (!hasCode) continue
    for (const e of entries) {
      if (isDir(join(dir, e))) continue
      if (!/\.tsx?$/i.test(e)) continue
      if (ROOT_TS_ALLOWED.has(e)) continue
      if (COLOCATED_TEST.test(e)) continue
      if (COMPUTED_FACES.has(e)) continue
      if (GENERATED_TS.test(e)) continue
      if (UI_FACET_TSX.test(e)) continue
      out.push({
        atomPath,
        file: e,
        law: 'stray-ts',
        reason: 'barrel sibling .ts at atom root — nest as child atom or fold into index.ts',
      })
    }
  }
  return out
}

export function multiSegmentFileViolations(cwd: string = process.cwd()): TightenedViolation[] {
  const out: TightenedViolation[] = []
  for (const atomPath of listAtomPaths(cwd)) {
    const dir = join(cwd, SRC, atomPath)
    for (const e of fileNames(dir)) {
      if (isDir(join(dir, e))) continue
      if (!isMultiSegmentFilename(e)) continue
      out.push({
        atomPath,
        file: e,
        law: 'multi-segment-file',
        reason: 'multi-segment filename at atom root — one word per folder; nest accounting/coa not hyphen siblings',
        compliant: atomPath === 'accounting' ? ACCOUNTING_NEST_MAP[e] : undefined,
      })
    }
  }
  return out
}

export function forbiddenIntermediateViolations(cwd: string = process.cwd()): TightenedViolation[] {
  const out: TightenedViolation[] = []
  for (const atomPath of listAtomPaths(cwd)) {
    const dir = join(cwd, SRC, atomPath)
    const entries = fileNames(dir)
    const hasCode = entries.some((e) => e === 'index.ts' || e === 'index.tsx' || e === 'test.ts')
    if (!hasCode) continue
    const compliantMap = atomPath === 'accounting' ? ACCOUNTING_FORBIDDEN_COMPLIANT : undefined
    for (const e of entries) {
      if (!isDir(join(dir, e))) continue
      if (FORBIDDEN_INTERMEDIATE_SEGMENTS.has(e)) {
        out.push({
          atomPath,
          file: e + '/',
          law: 'forbidden-intermediate',
          reason: `meaningless intermediate segment under ${atomPath} — forbidden lattice word "${e}" as folder`,
          compliant: compliantMap?.[e],
        })
      }
    }
    const walkForbiddenNests = (rel: string): void => {
      const sub = join(dir, rel)
      for (const e of fileNames(sub)) {
        const childRel = rel ? `${rel}/${e}` : e
        const childDir = join(dir, childRel)
        if (!isDir(childDir)) continue
        const first = childRel.split('/')[0]!
        if (FORBIDDEN_INTERMEDIATE_SEGMENTS.has(first) && childRel !== first) {
          out.push({
            atomPath,
            file: childRel + '/',
            law: 'forbidden-intermediate',
            reason: `nested under forbidden intermediate ${atomPath}/${first}/ — flatten`,
            compliant: compliantMap?.[first],
          })
        }
        walkForbiddenNests(childRel)
      }
    }
    walkForbiddenNests('')
  }
  return out
}

export function accountingStructureViolations(cwd: string = process.cwd()): TightenedViolation[] {
  const atomPath = 'accounting'
  const dir = join(cwd, SRC, atomPath)
  const out: TightenedViolation[] = []
  for (const [file, nest] of Object.entries(ACCOUNTING_NEST_MAP)) {
    const p = join(dir, file)
    try {
      if (statSync(p).isFile()) {
        out.push({
          atomPath,
          file,
          law: 'accounting-structure',
          reason: `corpus module at barrel root — nest accounting/${nest}/ with full trinity`,
          compliant: nest,
        })
      }
    } catch {
      /* absent — compliant */
    }
  }
  for (const e of fileNames(dir)) {
    if (!isDir(join(dir, e))) continue
    if (!isChildAtomDir(dir, e) && (e.includes('-') || e.includes('.'))) {
      out.push({
        atomPath,
        file: e + '/',
        law: 'stray-dir',
        reason: 'non-atom directory at accounting root — must carry SKILL.md or relocate',
      })
    }
  }
  return out
}

export function tightenedFolderLaw(cwd: string = process.cwd()): readonly TightenedViolation[] {
  const stray = strayTsViolations(cwd)
  const multi = multiSegmentFileViolations(cwd)
  const forbidden = forbiddenIntermediateViolations(cwd)
  const acct = accountingStructureViolations(cwd)
  const seen = new Set<string>()
  const merged: TightenedViolation[] = []
  for (const v of [...stray, ...multi, ...forbidden, ...acct]) {
    const key = `${v.atomPath}:${v.file}:${v.law}`
    if (seen.has(key)) continue
    seen.add(key)
    merged.push(v)
  }
  return merged
}
