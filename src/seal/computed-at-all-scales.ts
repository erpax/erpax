/**
 * computed-at-all-scales — every face traces to a derive* function.
 *
 * At pixel · atom · folder · corpus · matrix · wave scales, README · diamond ·
 * LLM · SKILL frontmatter · baselines · CSS vars · analytics · bonds · horo
 * must be computed from sealed inputs — zero hand-maintained numbers, hex,
 * baselines, nav, bonds.
 *
 * Coordinate b576a290 — ALCAPS seal-debt migrates to computedBaseline(axis) from
 * law/folder/ratchet.generated.ts (emit-only; pnpm rules:ratchet).
 *
 * @see ./baseline-debt — ../readme — ../css/computed — ../skill/router/upgrade
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import {
  deriveFolderModel,
  verifyComputedFacesForPaths,
} from '@/readme'
import { deriveDiamond } from '@/diamond'
import { nodeOf } from '@/uuid/matrix'
import { computedCssForUi } from '@/css/computed'
import { verifySkillFrontmatter } from '@/skill/router/upgrade'
import { alcapsBaselineViolations } from './baseline-debt'

/** ALCAPS seal-debt coordinate — ratchet.generated.ts emit via computedBaseline. */
export const COMPUTED_AT_ALL_SCALES_COORDINATE = 'b576a290' as const

/** Scale ladder — pixel → atom → folder → corpus → matrix → wave. */
export const COMPUTED_SCALES = [
  'pixel',
  'atom',
  'folder',
  'corpus',
  'matrix',
  'wave',
] as const

export type ComputedScale = (typeof COMPUTED_SCALES)[number]

export type ComputedFace =
  | 'readme'
  | 'diamond'
  | 'llm'
  | 'skill-frontmatter'
  | 'baselines'
  | 'css-vars'
  | 'analytics'
  | 'bonds'
  | 'horo'

export interface ComputedFaceCheck {
  readonly face: ComputedFace
  readonly scale: ComputedScale
  /** Matter-twin derive* export that owns this face. */
  readonly deriveFn: string
  readonly computed: boolean
  readonly violations: readonly string[]
}

export interface ComputedScaleSummary {
  readonly scale: ComputedScale
  readonly total: number
  readonly computed: number
  readonly pctComputed: number
}

export interface ComputedAtAllScalesOpts {
  /** Skip SKILL frontmatter full upgrade verify (expensive on corpus). */
  readonly skipSkillFrontmatter?: boolean
  /** Corpus-only fast path — skip live folder face drift (README/LLM/diamond). */
  readonly light?: boolean
}

export interface ComputedAtAllScalesVerdict {
  readonly coordinate: typeof COMPUTED_AT_ALL_SCALES_COORDINATE
  readonly scope: string | 'corpus'
  readonly allComputed: boolean
  readonly checks: readonly ComputedFaceCheck[]
  readonly scales: readonly ComputedScaleSummary[]
  /** Flat hand-maintained offenders — wired into finishedIdeaCrossed impurities. */
  readonly handMaintained: readonly string[]
}

const FACE_DERIVE: Readonly<Record<ComputedFace, { scale: ComputedScale; deriveFn: string }>> = {
  readme: { scale: 'folder', deriveFn: 'deriveFolderModel' },
  diamond: { scale: 'folder', deriveFn: 'deriveDiamondJson' },
  llm: { scale: 'folder', deriveFn: 'deriveLLMBrief' },
  'skill-frontmatter': { scale: 'atom', deriveFn: 'connectFrontmatter' },
  baselines: { scale: 'corpus', deriveFn: 'computedBaseline' },
  'css-vars': { scale: 'pixel', deriveFn: 'computedCssForUi' },
  analytics: { scale: 'folder', deriveFn: 'deriveFolderAccounting' },
  bonds: { scale: 'matrix', deriveFn: 'deriveFolderModel.bondsIn' },
  horo: { scale: 'matrix', deriveFn: 'deriveDiamond.horo' },
}

const checkOf = (
  face: ComputedFace,
  violations: readonly string[],
): ComputedFaceCheck => {
  const meta = FACE_DERIVE[face]
  return {
    face,
    scale: meta.scale,
    deriveFn: meta.deriveFn,
    computed: violations.length === 0,
    violations,
  }
}

const summarizeScales = (checks: readonly ComputedFaceCheck[]): ComputedScaleSummary[] =>
  COMPUTED_SCALES.map((scale) => {
    const items = checks.filter((c) => c.scale === scale)
    const computed = items.filter((c) => c.computed).length
    const total = items.length
    return {
      scale,
      total,
      computed,
      pctComputed: total === 0 ? 100 : Math.round((computed / total) * 1000) / 10,
    }
  })

const flattenHandMaintained = (checks: readonly ComputedFaceCheck[]): string[] =>
  checks.flatMap((c) =>
    c.violations.map((v) => `hand-maintained: ${c.face} (${c.deriveFn}) — ${v}`),
  )

const isFile = (p: string): boolean => {
  try {
    return statSync(p).isFile()
  } catch {
    return false
  }
}

const walkTs = (dir: string, cwd: string, out: string[]): void => {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return
  }
  for (const e of entries) {
    if (e.startsWith('.')) continue
    const p = join(dir, e)
    try {
      if (!statSync(p).isDirectory()) {
        if (/\.tsx?$/.test(e) && !e.endsWith('.test.ts')) out.push(relative(cwd, p))
        continue
      }
      walkTs(p, cwd, out)
    } catch {
      /* skip unreadable */
    }
  }
}

/** globals.css fallback palette must declare ComputedCssProvider override. */
export function globalsCssFallbackViolations(cwd: string = process.cwd()): readonly string[] {
  const path = join(cwd, 'src/app/(frontend)/globals.css')
  const out: string[] = []
  let content: string
  try {
    content = readFileSync(path, 'utf8')
  } catch {
    return ['globals.css missing']
  }
  if (!content.includes('ComputedCssProvider')) {
    out.push('globals.css: missing ComputedCssProvider override annotation')
  }
  if (/\.dark\s*\{[^}]*--sidebar:\s*hsl/.test(content)) {
    out.push('globals.css:.dark hand hsl sidebar block — derive via computedCssForUi')
  }
  try {
    computedCssForUi({ path: 'css', sealed: true, mode: 'light' })
  } catch (e) {
    out.push(`computedCssForUi unreachable: ${e instanceof Error ? e.message : String(e)}`)
  }
  return out
}

const SKILLS_INDEX_ALLOWED = new Set([
  'src/skill/router/index.ts',
  'src/skill/router/plugin.ts',
  'src/skill/router/competencies.ts',
  'src/skill/router/skills.index.ts',
])

/** Runtime agent dispatch must not import the static skills.index bundle. */
export function skillsIndexRuntimeViolations(cwd: string = process.cwd()): readonly string[] {
  const forbiddenRoots = ['src/agent', 'src/monitor', 'src/navigation', 'src/seal']
  const files: string[] = []
  for (const root of forbiddenRoots) walkTs(join(cwd, root), cwd, files)
  const out: string[] = []
  for (const rel of files) {
    if (SKILLS_INDEX_ALLOWED.has(rel)) continue
    const content = readFileSync(join(cwd, rel), 'utf8')
    if (/from\s+['"].*skills\.index['"]/.test(content) || /import\s*\(['"].*skills\.index['"]\)/.test(content)) {
      out.push(`${rel}: imports skills.index at runtime (use loadSealedSkill / lazy-load)`)
    }
  }
  return out
}

const HARDCODED_GROUP_SKIP = /(?:\.test\.ts$|navigation\/|factory\/|payload\.config|skill\/router\/)/

/** Collection admin.group literals — must use adminGroupOf(atomPath). */
export function hardcodedAdminGroupViolations(cwd: string = process.cwd()): readonly string[] {
  const files: string[] = []
  walkTs(join(cwd, 'src'), cwd, files)
  const out: string[] = []
  const re = /group:\s*['"][^'"]+['"]/g
  for (const rel of files) {
    if (HARDCODED_GROUP_SKIP.test(rel)) continue
    const content = readFileSync(join(cwd, rel), 'utf8')
    if (content.includes('group: adminGroup') || content.includes('group: collectionAdminGroup')) continue
    for (const m of content.matchAll(re)) {
      out.push(`${rel}: ${m[0]} — use adminGroupOf(atomPath)`)
      if (out.length >= 50) return out
    }
  }
  return out
}

/** Per-atom folder face drift — README · LLM · diamond.json. */
function folderFaceChecks(atomPath: string, cwd: string): ComputedFaceCheck[] {
  const drift = verifyComputedFacesForPaths([atomPath], cwd)
  return [
    checkOf('readme', drift.readme.ok ? [] : drift.readme.drift.map((d) => `${d} README drift`)),
    checkOf('llm', drift.llm.ok ? [] : drift.llm.drift.map((d) => `${d} LLM drift`)),
    checkOf(
      'diamond',
      drift.diamond.ok ? [] : drift.diamond.drift.map((d) => `${d} diamond.json drift`),
    ),
  ]
}

/** SKILL frontmatter drift for one atom. */
function skillFrontmatterCheck(atomPath: string, cwd: string): ComputedFaceCheck {
  const { ok, drift } = verifySkillFrontmatter(cwd, [atomPath])
  return checkOf('skill-frontmatter', ok ? [] : drift.map((d) => `${d} frontmatter drift`))
}

/** Analytics ledger derived from folder model statement. */
function analyticsCheck(atomPath: string, cwd: string): ComputedFaceCheck {
  const violations: string[] = []
  try {
    const folder = deriveFolderModel(atomPath, cwd)
    const { statement } = folder
    if (!Number.isFinite(statement.totalDebits) || !Number.isFinite(statement.totalCredits)) {
      violations.push('deriveFolderAccounting: non-finite ledger totals')
    }
    if (Math.abs(statement.totalDebits - statement.totalCredits) > 1e-6) {
      violations.push('deriveFolderAccounting: debits ≠ credits')
    }
  } catch (e) {
    violations.push(e instanceof Error ? e.message : String(e))
  }
  return checkOf('analytics', violations)
}

/** Matrix bonds must match deriveFolderModel counts. */
function bondsCheck(atomPath: string, cwd: string): ComputedFaceCheck {
  const violations: string[] = []
  const folder = deriveFolderModel(atomPath, cwd)
  const leaf = atomPath.split('/').pop() ?? atomPath
  const node = nodeOf(atomPath) ?? nodeOf(leaf)
  const matrixAtom = node?.atom ?? leaf
  const model = deriveDiamond(atomPath, cwd)
  if (model.bondsIn !== folder.bondsIn) {
    violations.push(`bondsIn drift: diamond ${model.bondsIn} ≠ folder ${folder.bondsIn}`)
  }
  if (model.bondsOut !== folder.bondsOut) {
    violations.push(`bondsOut drift: diamond ${model.bondsOut} ≠ folder ${folder.bondsOut}`)
  }
  if (matrixAtom !== atomPath.split('/').pop() && !node) {
    violations.push(`matrix: atom not folded (${atomPath})`)
  }
  return checkOf('bonds', violations)
}

/** Horo on-ring — matrix node horo matches folder model. */
function horoCheck(atomPath: string, cwd: string): ComputedFaceCheck {
  const violations: string[] = []
  const folder = deriveFolderModel(atomPath, cwd)
  const model = deriveDiamond(atomPath, cwd)
  const leaf = atomPath.split('/').pop() ?? atomPath
  const node = nodeOf(atomPath) ?? nodeOf(leaf)
  const matrixHoro = node?.horo ?? null
  if (matrixHoro !== folder.horo) {
    violations.push(`horo drift: folder ${folder.horo} ≠ matrix ${matrixHoro}`)
  }
  if (model.horo !== folder.horo) {
    violations.push(`horo drift: diamond ${model.horo} ≠ folder ${folder.horo}`)
  }
  return checkOf('horo', violations)
}

/** CSS vars — pixel scale; path-scoped or corpus globals audit. */
function cssVarsCheck(atomPath: string | 'corpus', cwd: string): ComputedFaceCheck {
  if (atomPath !== 'corpus' && !atomPath.startsWith('css') && !atomPath.includes('ui')) {
    return checkOf('css-vars', [])
  }
  const violations =
    atomPath === 'corpus' || atomPath.startsWith('css')
      ? [...globalsCssFallbackViolations(cwd)]
      : []
  return checkOf('css-vars', violations)
}

/** Corpus baselines — ALCAPS seal-debt; ceilings from ratchet.generated emit. */
function baselinesCheck(cwd: string): ComputedFaceCheck {
  const alcaps = alcapsBaselineViolations(cwd)
  return checkOf(
    'baselines',
    alcaps.map((v) => `${v.file}:${v.constName} — ${v.reason}`),
  )
}

/** Wave-scale corpus batch gate — verifyComputedFacesInWaves export exists. */
function waveScaleCheck(corpusDriftCount: number): ComputedFaceCheck {
  return {
    face: 'readme',
    scale: 'wave',
    deriveFn: 'verifyComputedFacesInWaves',
    computed: corpusDriftCount === 0,
    violations:
      corpusDriftCount === 0
        ? []
        : [`corpus computed-face drift: ${corpusDriftCount} folder(s) (wave batch gate)`],
  }
}

/**
 * Checklist verdict — one atom path or whole corpus.
 * Each face must trace to its derive* function; drift ⇒ hand-maintained impurity.
 */
export function computedAtAllScalesVerdict(
  scope: string | 'corpus',
  cwd: string = process.cwd(),
  opts: ComputedAtAllScalesOpts = {},
): ComputedAtAllScalesVerdict {
  const checks: ComputedFaceCheck[] = []

  if (scope === 'corpus') {
    const samplePath = 'seal'
    if (!opts.light) {
      checks.push(...folderFaceChecks(samplePath, cwd))
      if (!opts.skipSkillFrontmatter) {
        checks.push(skillFrontmatterCheck(samplePath, cwd))
      } else {
        checks.push(checkOf('skill-frontmatter', []))
      }
      checks.push(analyticsCheck(samplePath, cwd))
      checks.push(bondsCheck(samplePath, cwd))
      checks.push(horoCheck(samplePath, cwd))

      const corpusDrift = verifyComputedFacesForPaths([samplePath], cwd)
      const driftCount =
        corpusDrift.readme.drift.length +
        corpusDrift.llm.drift.length +
        corpusDrift.diamond.drift.length
      checks.push(waveScaleCheck(driftCount))
    }

    checks.push(cssVarsCheck('corpus', cwd))
    checks.push(baselinesCheck(cwd))

    const corpusViolations = [
      ...skillsIndexRuntimeViolations(cwd).slice(0, 5),
      ...hardcodedAdminGroupViolations(cwd).slice(0, 10),
    ]
    if (corpusViolations.length > 0) {
      checks.push({
        face: 'baselines',
        scale: 'corpus',
        deriveFn: 'computedAtAllScalesVerdict',
        computed: false,
        violations: corpusViolations,
      })
    }
  } else {
    checks.push(...folderFaceChecks(scope, cwd))
    if (!opts.skipSkillFrontmatter) {
      checks.push(skillFrontmatterCheck(scope, cwd))
    } else {
      checks.push(checkOf('skill-frontmatter', []))
    }
    checks.push(analyticsCheck(scope, cwd))
    checks.push(bondsCheck(scope, cwd))
    checks.push(horoCheck(scope, cwd))
    checks.push(cssVarsCheck(scope, cwd))
    checks.push(baselinesCheck(cwd))
  }

  const handMaintained = flattenHandMaintained(checks)
  const allComputed = handMaintained.length === 0

  return {
    coordinate: COMPUTED_AT_ALL_SCALES_COORDINATE,
    scope,
    allComputed,
    checks,
    scales: summarizeScales(checks),
    handMaintained,
  }
}
