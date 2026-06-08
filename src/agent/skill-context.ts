/**
 * skill-context — realise all required skills for a touched path without skills.index.
 *
 * On any file or atom path open: ancestors · bonded neighbors · domain hub · 1-hop
 * imports — sealed SKILL excerpts, quantum block, eb balance, rules snapshot.
 * Caps at horo wave depth and 50KB dispatch payload.
 *
 * @see ./cheap-dispatch · ./strict-apply · ../skill/router/lazy-load · ./SKILL.md
 */
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { accountCodeOf } from '@/accounting'
import { adminGroupOf } from '@/navigation'
import { ancestorPaths, toAtomPath } from '@/path'
import { rulesOf, type RulesOfOpts, type RulesSnapshot } from '@/rules'
import {
  DEFAULT_SKILL_EXCERPT_CHARS,
  loadSkillByAtomPath,
  sealSkillExcerpt,
  skillFileForAtomPath,
  type LazySkillLoadOpts,
  type SealedSkillExcerpt,
} from '@/skill/router/lazy-load'
import { parseQuantumSkill, type QuantumEnvironment } from '@/skill/router/upgrade/quantum'
import { resolveBarrel } from '@/tamper/import'
import { backlinksOf, neighborsOf } from '@/uuid/matrix'
import { pathComparableUnits } from '@/wave/load'
import { agentCostPolicy, type AgentCostPolicyOpts } from './cost-policy'

/** Dispatch payload ceiling — never load the 77MB skills.index bundle. */
export const MAX_AGENT_SKILL_CONTEXT_BYTES = 50_000

export function resolveSkillLoadOpts(opts: LazySkillLoadOpts = {}): LazySkillLoadOpts & { cwd: string } {
  return {
    cwd: opts.cwd ?? process.cwd(),
    maxExcerptChars: opts.maxExcerptChars ?? DEFAULT_SKILL_EXCERPT_CHARS,
  }
}

export function loadSealedSkill(atomPath: string, opts: LazySkillLoadOpts = {}): SealedSkillExcerpt | null {
  const resolved = resolveSkillLoadOpts(opts)
  return loadSkillByAtomPath(atomPath, resolved)
}

export type SkillBundleRole = 'ancestor' | 'self' | 'bond' | 'hub' | 'import'

/** Compact quantum face per realised atom — superposition · collapse · seal. */
export interface CompactQuantumSnapshot {
  readonly superposition: readonly string[]
  readonly collapse: readonly string[]
  readonly seal: Pick<
    QuantumEnvironment['seal'],
    'sandbox' | 'receipt' | 'pathFollow' | 'canonicalRecord' | 'analogResults' | 'speechResults'
  >
  readonly law: string | null
  readonly entangledFieldCount: number
}

/** One axis row from `rulesOf()` — corpus gate health at dispatch time. */
export interface CompactRuleAxis {
  readonly axis: string
  readonly violations: number
  readonly baseline: number
}

export interface CompactRulesSnapshot {
  readonly axes: readonly CompactRuleAxis[]
  readonly unsealedAxes: number
}

/** One skill in the ordered realise bundle. */
export interface RealisedSkillEntry {
  readonly atomPath: string
  readonly role: SkillBundleRole
  readonly accountCode: string
  readonly ebBalance: number
  readonly skill: SealedSkillExcerpt | null
  readonly quantum: CompactQuantumSnapshot | null
}

/** Default TTL for cached AgentSkillContext (dispatch warm path). */
export const AGENT_SKILL_CONTEXT_CACHE_TTL_MS = 5 * 60 * 1000

interface SkillContextCacheEntry {
  readonly expiresAt: number
  readonly context: AgentSkillContext
}

const skillContextCache = new Map<string, SkillContextCacheEntry>()

export function clearAgentSkillContextCache(): void {
  skillContextCache.clear()
}

export function getAgentSkillContextCache(key: string): AgentSkillContext | null {
  const entry = skillContextCache.get(key)
  if (!entry || Date.now() >= entry.expiresAt) {
    if (entry) skillContextCache.delete(key)
    return null
  }
  return entry.context
}

const resolveInputFile = (input: string, cwd: string): string | null => {
  const trimmed = input.trim().replace(/\\/g, '/')
  if (!isFilePath(trimmed)) return null
  if (trimmed.startsWith('/')) return trimmed
  return join(cwd, trimmed.replace(/^src\//, `${SRC_ROOT}/`))
}

const mtimeMs = (path: string): number => {
  try {
    return statSync(path).mtimeMs
  } catch {
    return 0
  }
}

/** Cache key — cwd · input · focal atom · bundle SKILL mtimes · dispatch opts. */
export function skillContextCacheKey(
  input: string,
  cwd: string,
  focalAtomPath: string,
  bundlePaths: readonly string[],
  opts: RealiseSkillsOpts,
  maxContextAtoms: number,
): string {
  const parts: string[] = [cwd, input, focalAtomPath]
  parts.push(String(opts.includeImports !== false))
  parts.push(String(opts.maxExcerptChars ?? ''))
  parts.push(String(maxContextAtoms))
  const inputFile = resolveInputFile(input, cwd)
  if (inputFile) parts.push(`in:${mtimeMs(inputFile)}`)
  const mtimes = bundlePaths
    .map((p) => `${p}:${mtimeMs(skillFileForAtomPath(p, cwd))}`)
    .sort((a, b) => a.localeCompare(b))
    .join(',')
  parts.push(mtimes)
  return parts.join('\0')
}

const setSkillContextCache = (key: string, context: AgentSkillContext, ttlMs: number): void => {
  skillContextCache.set(key, { context, expiresAt: Date.now() + ttlMs })
}

export interface RealiseSkillsOpts extends LazySkillLoadOpts {
  readonly policy?: AgentCostPolicyOpts
  /** Include 1-hop `@/` imports when input is a source file. */
  readonly includeImports?: boolean
  /** Bypass skill-context cache and rebuild from disk. */
  readonly force?: boolean
  /** Cache TTL override (ms). */
  readonly cacheTtlMs?: number
}

export interface AgentSkillContext {
  readonly input: string
  readonly focalAtomPath: string
  readonly skillBearingAtom: string
  readonly domainHub: string
  readonly skills: readonly RealisedSkillEntry[]
  readonly rules: CompactRulesSnapshot
  readonly markdown: string
  readonly contextBytes: number
  readonly atomCount: number
}

const IMPORT_RE = /(?:from|import)\s+['"](@\/[^'"]+)['"]/g
const PROSE_SKILL_FACE_RE = /(?:^|\/)?(?:SKILL|README|LLM)\.md$/i

/** True when the input path is a trinity prose face (SKILL · README · LLM). */
export function isProseSkillFace(input: string): boolean {
  return PROSE_SKILL_FACE_RE.test(input.trim().replace(/\\/g, '/'))
}

const CRAFT_SKILL_PATHS = ['writing', 'speech'] as const
const SRC_ROOT = 'src'

const isFilePath = (input: string): boolean =>
  /\.(tsx?|md|mts|mjs|cjs)$/i.test(input) || input.includes(`${SRC_ROOT}/`)

const peelImport = (spec: string): string =>
  spec.replace(/^@\//, '').replace(/\/index(?:\.ts|\.tsx)?$/, '')

const capList = <T>(items: readonly T[], max: number): readonly T[] =>
  max > 0 ? items.slice(0, max) : []

const compactQuantum = (raw: string | null): CompactQuantumSnapshot | null => {
  if (!raw) return null
  const parsed = parseQuantumSkill(raw)
  return {
    superposition: capList(parsed.environment.superposition, 6),
    collapse: capList(parsed.environment.collapse, 6),
    seal: {
      sandbox: parsed.environment.seal.sandbox,
      receipt: parsed.environment.seal.receipt,
      pathFollow: parsed.environment.seal.pathFollow,
      canonicalRecord: parsed.environment.seal.canonicalRecord,
      analogResults: parsed.environment.seal.analogResults,
      speechResults: parsed.environment.seal.speechResults,
    },
    law: parsed.law,
    entangledFieldCount: parsed.entangledFields.length,
  }
}

const compactRules = (snapshot: RulesSnapshot): CompactRulesSnapshot => {
  const axes = snapshot.axes.map((a) => ({
    axis: a.axis,
    violations: a.violations,
    baseline: a.baseline,
  }))
  const unsealedAxes = axes.filter((a) => a.violations > a.baseline).length
  return { axes, unsealedAxes }
}

/** Cached rules snapshot — compact axes for dispatch payloads and strict-apply gates. */
export function compactRulesSnapshot(cwd = process.cwd(), opts?: RulesOfOpts): CompactRulesSnapshot {
  return compactRules(rulesOf(cwd, opts))
}

const readSkillRaw = (atomPath: string, cwd: string): string | null => {
  const file = skillFileForAtomPath(atomPath, cwd)
  if (!existsSync(file)) return null
  return readFileSync(file, 'utf8')
}

/** Deepest ancestor (inclusive) that carries a SKILL.md on disk. */
export function skillBearingAtomPath(atomPath: string, cwd = process.cwd()): string {
  const chain = ancestorPaths(atomPath)
  for (let i = chain.length - 1; i >= 0; i--) {
    const p = chain[i]!
    if (existsSync(skillFileForAtomPath(p, cwd))) return p
  }
  return atomPath
}

/** Normalize a file path or atom path to the canonical atom address. */
export function atomPathFromInput(input: string): string {
  const trimmed = input.trim().replace(/\\/g, '/')
  if (!trimmed) return ''
  if (isFilePath(trimmed)) return toAtomPath(trimmed, 'fs')
  return toAtomPath(trimmed.replace(/^src\//, ''), 'fs')
}

/** Domain hub — first path segment (Payload admin group / nav bucket). */
export function domainHubFor(atomPath: string): string {
  return adminGroupOf(atomPath)
}

/** Bonded neighbor atom paths — SKILL frontmatter bonds ∪ matrix neighbors (deduped). */
export function bondedNeighborPaths(atomPath: string, cwd = process.cwd()): readonly string[] {
  const raw = readSkillRaw(atomPath, cwd)
  const out = new Set<string>()
  if (raw) {
    const parsed = parseQuantumSkill(raw)
    for (const b of [...parsed.bonds.in, ...parsed.bonds.out]) {
      const p = toAtomPath(b, 'fs')
      if (p && p !== atomPath) out.add(p)
    }
  }
  for (const n of [...neighborsOf(atomPath), ...backlinksOf(atomPath)]) {
    const p = n.path ?? n.atom
    if (p && p !== atomPath) out.add(p)
  }
  return [...out].sort((a, b) => a.localeCompare(b))
}

/**
 * Trace one `@/` import specifier to resolved atom path(s) — 1-hop, index-face only.
 * Returns the barrel-resolved atom when present; otherwise the peeled path prefix.
 */
export function skillsForImport(spec: string, cwd = process.cwd()): readonly string[] {
  const trimmed = spec.trim()
  if (!trimmed.startsWith('@/')) return []
  const barrel = resolveBarrel(trimmed, join(cwd, SRC_ROOT))
  if (barrel) {
    const atom = peelImport(barrel)
    return atom ? [atom] : []
  }
  const peeled = peelImport(trimmed)
  if (!peeled) return []
  const segments = peeled.split('/').filter(Boolean)
  const candidates: string[] = []
  for (let len = segments.length; len >= 1; len--) {
    candidates.push(segments.slice(0, len).join('/'))
  }
  for (const c of candidates) {
    if (existsSync(skillFileForAtomPath(c, cwd))) return [c]
  }
  return candidates.length ? [candidates[0]!] : []
}

/** Collect unique `@/` import atom paths from one source file (1-hop). */
export function importAtomPathsFromFile(filePath: string, cwd = process.cwd()): readonly string[] {
  const normalized = filePath.replace(/\\/g, '/')
  const abs = normalized.startsWith('/')
    ? normalized
    : join(cwd, normalized.replace(/^src\//, `${SRC_ROOT}/`))
  if (!existsSync(abs)) return []
  const body = readFileSync(abs, 'utf8')
  const atoms = new Set<string>()
  for (let m; (m = IMPORT_RE.exec(body)); ) {
    for (const p of skillsForImport(m[1]!, cwd)) atoms.add(p)
  }
  return [...atoms].sort((a, b) => a.localeCompare(b))
}

const buildEntry = (
  atomPath: string,
  role: SkillBundleRole,
  opts: RealiseSkillsOpts,
): RealisedSkillEntry => {
  const { cwd } = resolveSkillLoadOpts(opts)
  const skill = loadSealedSkill(atomPath, opts)
  const raw = skill ? readSkillRaw(atomPath, cwd) : null
  return {
    atomPath,
    role,
    accountCode: accountCodeOf(atomPath),
    ebBalance: pathComparableUnits(atomPath),
    skill,
    quantum: compactQuantum(raw),
  }
}

const orderedBundlePaths = (
  focal: string,
  bearing: string,
  hub: string,
  bonds: readonly string[],
  imports: readonly string[],
  craftSkills: readonly string[] = [],
): readonly { path: string; role: SkillBundleRole }[] => {
  const seen = new Set<string>()
  const out: { path: string; role: SkillBundleRole }[] = []

  const push = (path: string, role: SkillBundleRole): void => {
    if (!path || seen.has(path)) return
    seen.add(path)
    out.push({ path, role })
  }

  for (const a of ancestorPaths(bearing)) {
    if (a !== bearing) push(a, 'ancestor')
  }
  push(bearing, 'self')
  for (const c of craftSkills) push(c, 'bond')
  if (hub && hub !== bearing) push(hub, 'hub')
  for (const b of bonds) push(b, 'bond')
  for (const i of imports) push(i, 'import')

  if (focal !== bearing && !seen.has(focal)) push(focal, 'self')

  return out
}

const renderMarkdown = (ctx: Omit<AgentSkillContext, 'markdown' | 'contextBytes'>): string => {
  const lines: string[] = [
    `# Agent skill context — ${ctx.focalAtomPath}`,
    '',
    `focal: \`${ctx.focalAtomPath}\` · bearing: \`${ctx.skillBearingAtom}\` · hub: \`${ctx.domainHub}\``,
    `atoms: ${ctx.atomCount} · rules unsealed: ${ctx.rules.unsealedAxes}`,
    '',
  ]
  for (const s of ctx.skills) {
    lines.push(`## ${s.role}: ${s.atomPath}`)
    lines.push(`account: \`${s.accountCode}\` · eb: ${s.ebBalance}`)
    if (s.quantum) {
      lines.push(
        `quantum: superposition[${s.quantum.superposition.join(',')}] collapse[${s.quantum.collapse.join(',')}]`,
      )
      lines.push(
        `seal: sandbox=${s.quantum.seal.sandbox} receipt=${s.quantum.seal.receipt} pathFollow=${s.quantum.seal.pathFollow}`,
      )
      if (s.quantum.law) lines.push(`law: ${s.quantum.law.slice(0, 200)}`)
    }
    if (s.skill?.excerpt) {
      lines.push('', '```yaml', s.skill.excerpt.trimEnd(), '```', '')
    }
  }
  lines.push('## rules snapshot')
  for (const a of ctx.rules.axes) {
    lines.push(`- ${a.axis}: ${a.violations}/${a.baseline}`)
  }
  return lines.join('\n')
}

const contextBytesOf = (markdown: string, skills: readonly RealisedSkillEntry[]): number => {
  const jsonHint = JSON.stringify({
    skills: skills.map((s) => ({
      atomPath: s.atomPath,
      role: s.role,
      excerpt: s.skill?.excerpt ?? '',
      quantum: s.quantum,
      ebBalance: s.ebBalance,
    })),
  })
  return Math.max(new TextEncoder().encode(markdown).length, new TextEncoder().encode(jsonHint).length)
}

const trimToByteBudget = (
  skills: RealisedSkillEntry[],
  markdown: string,
  maxBytes: number,
): { skills: RealisedSkillEntry[]; markdown: string } => {
  let current = skills
  let md = markdown
  while (current.length > 1 && contextBytesOf(md, current) > maxBytes) {
    current = current.slice(0, -1)
    const partial = {
      input: '',
      focalAtomPath: '',
      skillBearingAtom: '',
      domainHub: '',
      skills: current,
      rules: { axes: [], unsealedAxes: 0 },
      atomCount: current.length,
    }
    md = renderMarkdown(partial)
  }
  if (contextBytesOf(md, current) > maxBytes && current.length > 0) {
    const last = current[current.length - 1]!
    if (last.skill) {
      const shrunk = sealSkillExcerpt(last.atomPath, last.skill.excerpt, Math.floor(maxBytes / 4))
      current = [...current.slice(0, -1), { ...last, skill: shrunk }]
    }
  }
  return { skills: current, markdown: md }
}

/**
 * Realise ordered skill bundle for a file or atom path — self · ancestors · bonds · hub.
 * Lazy-loads SKILL.md from disk; never imports skills.index.
 */
export function realiseSkillsForPath(input: string, opts: RealiseSkillsOpts = {}): AgentSkillContext {
  const cwd = opts.cwd ?? process.cwd()
  const policy = agentCostPolicy(opts.policy)
  const focalAtomPath = atomPathFromInput(input)
  const skillBearingAtom = skillBearingAtomPath(focalAtomPath, cwd)
  const domainHub = domainHubFor(focalAtomPath)

  const bonds = bondedNeighborPaths(skillBearingAtom, cwd)
  const imports =
    opts.includeImports !== false && isFilePath(input)
      ? importAtomPathsFromFile(input, cwd)
      : []

  const craftSkills = isProseSkillFace(input) ? [...CRAFT_SKILL_PATHS] : []

  const ordered = orderedBundlePaths(focalAtomPath, skillBearingAtom, domainHub, bonds, imports, craftSkills)
  const capped = ordered.slice(0, policy.maxContextAtoms)
  const bundlePaths = capped.map(({ path }) => path)
  const cacheKey = skillContextCacheKey(input, cwd, focalAtomPath, bundlePaths, opts, policy.maxContextAtoms)
  const ttlMs = opts.cacheTtlMs ?? AGENT_SKILL_CONTEXT_CACHE_TTL_MS

  if (!opts.force) {
    const cached = getAgentSkillContextCache(cacheKey)
    if (cached) return cached
  }

  let skills = capped.map(({ path, role }) => buildEntry(path, role, opts))
  const rules = compactRulesSnapshot(cwd)

  let markdown = renderMarkdown({
    input,
    focalAtomPath,
    skillBearingAtom,
    domainHub,
    skills,
    rules,
    atomCount: skills.length,
  })

  const trimmed = trimToByteBudget(skills, markdown, MAX_AGENT_SKILL_CONTEXT_BYTES)
  skills = trimmed.skills
  markdown = renderMarkdown({
    input,
    focalAtomPath,
    skillBearingAtom,
    domainHub,
    skills,
    rules,
    atomCount: skills.length,
  })

  const result: AgentSkillContext = {
    input,
    focalAtomPath,
    skillBearingAtom,
    domainHub,
    skills,
    rules,
    markdown,
    contextBytes: contextBytesOf(markdown, skills),
    atomCount: skills.length,
  }

  if (!opts.force) {
    setSkillContextCache(cacheKey, result, ttlMs)
  }

  return result
}

/** Build dispatch skill context for strict-apply path visits (primary path first). */
export function agentSkillContextForDispatch(
  paths: readonly string[],
  opts: RealiseSkillsOpts = {},
): AgentSkillContext | null {
  const primary = paths.map(atomPathFromInput).find((p) => p.length > 0)
  if (!primary) return null
  return realiseSkillsForPath(primary, opts)
}
