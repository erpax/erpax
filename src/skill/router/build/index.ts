/**
 * skill/router/build — emit skills.index.ts + installed.catalogue.ts.
 *
 * Workers have no runtime fs, so the corpus is compiled into modules the
 * Payload endpoint imports. Walks every src SKILL.md and emits the catch-all
 * router expert pool; optionally loads installed Claude domain skills.
 *
 *   pnpm erpax corpus skill              # full skills.index.ts (slow, ~80MB)
 *   pnpm erpax corpus skill -- --stub    # empty index — CI/deploy (fits Worker 3MB)
 *   pnpm exec tsx src/skill/router/build/index.ts --installed  # installed.catalogue.ts
 *
 * Full index exceeds Cloudflare Worker script limits AND the CLI 5‑min timeout
 * ladder. CI/deploy MUST use `--stub` (or `ERPAX_SKILL_INDEX=stub`). Full emit
 * is for local skill-router research only.
 *
 * @see ../resolve — ../merge — ../upgrade — ../../../navigation — ../upgrade/seal
 * @see ../../cloudflare/capacity — assertFitsProduction
 */
import {
  readdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  statSync,
} from 'node:fs'
import { join, dirname, basename, relative } from 'node:path'
import { homedir } from 'node:os'
import { isRealDir } from '@/aura'
import { pathNavMeta } from '@/navigation'
import { verifySkillFrontmatter, materializeSkillFrontmatter } from '../upgrade'
import { contentUuidOf } from '../upgrade/seal'
import type { SkillNode } from '../resolve'
import type { InstalledSkill } from '../merge'
// The file's SHAPE is spelled once, in the child atom CI runs directly — see ./void.
import { buildSkillIndexStub, writeSkillIndexFile } from './void'

const INSTALLED_OUT = 'src/skill/router/installed.catalogue.ts'
const ROOTS = ['src'] as const
const CLAUDE_ROOT = join(homedir(), 'Library', 'Application Support', 'Claude', 'local-agent-mode-sessions')
const MAX_PLUGIN_DEPTH = 8

/** Frontmatter scalar (quoted + bare). */
function fmValue(fm: string, key: string): string {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
  if (!m) return ''
  let v = m[1]!.trim()
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1)
  }
  return v
}

const isSkill = (dir: string): boolean => existsSync(join(dir, 'SKILL.md'))

const subDirs = (dir: string): string[] =>
  existsSync(dir)
    ? readdirSync(dir)
        .map((n) => join(dir, n))
        .filter(isRealDir)
        .sort()
    : []

/** Leaf words of every [[link]] in the body (code stripped), deduped, self excluded. */
export function relatedOf(body: string, self: string): string[] {
  const text = body.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')
  const seen = new Set<string>()
  const out: string[] = []
  for (const m of text.matchAll(/\[\[([a-z][a-z0-9/-]*)(?:\|[^\]]*)?\]\]/g)) {
    const w = m[1]!.split('/').pop()!
    if (w && w !== self && !seen.has(w)) {
      seen.add(w)
      out.push(w)
    }
  }
  return out
}

function nodeFor(skillDir: string, root: string): SkillNode {
  const rel = relative('.', skillDir)
  const segments = relative(root, rel).split(/[\\/]/).filter(Boolean)
  const route = '/' + segments.join('/') + '/SKILL'
  const file = join(skillDir, 'SKILL.md')
  const raw = readFileSync(file, 'utf8')
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  const fm = fmMatch ? fmMatch[1]! : ''
  const body = fmMatch ? raw.slice(fmMatch[0].length) : raw
  const self = basename(rel)

  const parent = dirname(rel)
  const ancestors: string[] = []
  for (let p = parent; p.startsWith(root) && p !== root; p = dirname(p)) {
    if (isSkill(p)) ancestors.unshift(basename(p))
  }
  const siblings = subDirs(parent)
    .filter((d) => d !== rel && isSkill(d))
    .map((d) => basename(d))
  const children = subDirs(rel).filter(isSkill).map((d) => basename(d))

  const { nav, group } = pathNavMeta(segments.join('/'))
  return {
    route,
    path: segments,
    name: fmValue(fm, 'name') || self,
    description: fmValue(fm, 'description'),
    content: raw,
    ancestors,
    siblings,
    children,
    related: relatedOf(body, self),
    nav,
    group,
    contentUuid: contentUuidOf(raw),
  }
}

function walkSkills(dir: string, root: string, out: SkillNode[] = []): SkillNode[] {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir).sort()) {
    if (name === 'node_modules' || name.startsWith('.')) continue
    const full = join(dir, name)
    if (!isRealDir(full)) continue
    if (isSkill(full)) out.push(nodeFor(full, root))
    walkSkills(full, root, out)
  }
  return out
}

/** Run frontmatter self-upgrade before index emit (verify-first, sync on drift). */
function ensureFrontmatterGreen(cwd: string = process.cwd()): void {
  if (process.env.SKIP_SKILL_UPGRADE === '1') return
  let { ok, drift } = verifySkillFrontmatter(cwd)
  if (!ok) {
    materializeSkillFrontmatter(cwd)
    ;({ ok, drift } = verifySkillFrontmatter(cwd))
  }
  if (!ok) {
    console.error('skill-index: frontmatter upgrade failed —', drift.slice(0, 20).join(', '))
    process.exit(1)
  }
}

/** Emit skills.index.ts — the catch-all router expert pool. */
export function buildSkillIndex(cwd: string = process.cwd()): { count: number; bytes: number; out: string } {
  ensureFrontmatterGreen(cwd)
  const byRoute = new Map<string, SkillNode>()
  for (const root of ROOTS) {
    for (const n of walkSkills(join(cwd, root), root)) {
      if (!byRoute.has(n.route)) byRoute.set(n.route, n)
    }
  }
  const index = [...byRoute.values()].sort((a, b) => a.route.localeCompare(b.route))
  return writeSkillIndexFile(
    cwd,
    index,
    "The catch-all router's expert pool (Workers have no runtime fs). Prefer --stub for deploy.",
  )
}

function findPluginDirs(dir: string, depth: number, out: string[]): string[] {
  if (depth > MAX_PLUGIN_DEPTH || !existsSync(dir)) return out
  if (existsSync(join(dir, '.claude-plugin', 'plugin.json')) && existsSync(join(dir, 'skills'))) {
    out.push(dir)
  }
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue
    const full = join(dir, name)
    let isDir = false
    try {
      isDir = statSync(full).isDirectory()
    } catch {
      isDir = false
    }
    if (isDir) findPluginDirs(full, depth + 1, out)
  }
  return out
}

/** Emit installed.catalogue.ts — machine-local Claude domain skills. */
export function buildInstalledCatalogue(cwd: string = process.cwd()): {
  count: number
  domains: number
  out: string
} {
  const byKey = new Map<string, InstalledSkill>()
  for (const pluginDir of findPluginDirs(CLAUDE_ROOT, 0, [])) {
    let domain = ''
    try {
      domain = JSON.parse(readFileSync(join(pluginDir, '.claude-plugin', 'plugin.json'), 'utf8')).name || ''
    } catch {
      domain = ''
    }
    if (!domain) continue
    const skillsDir = join(pluginDir, 'skills')
    for (const name of existsSync(skillsDir) ? readdirSync(skillsDir).sort() : []) {
      const file = join(skillsDir, name, 'SKILL.md')
      if (!existsSync(file)) continue
      const raw = readFileSync(file, 'utf8')
      const fm = (raw.match(/^---\n([\s\S]*?)\n---\n?/) || [, ''])[1]!
      const key = `${domain}/${name}`
      if (byKey.has(key)) continue
      byKey.set(key, {
        domain,
        name: fmValue(fm, 'name') || name,
        description: fmValue(fm, 'description'),
        contentUuid: contentUuidOf(raw),
      })
    }
  }
  const catalogue = [...byKey.values()].sort(
    (a, b) => a.domain.localeCompare(b.domain) || a.name.localeCompare(b.name),
  )
  const out = join(cwd, INSTALLED_OUT)
  const banner =
    '// AUTO-GENERATED by src/skill/router/build/index.ts — do not edit.\n' +
    '// The installed Claude domain-skill catalogue; merged into the erpax corpus by ./merge.ts.\n'
  const file =
    banner +
    "import type { InstalledSkill } from './merge'\n\n" +
    `export const INSTALLED_CATALOGUE: readonly InstalledSkill[] = ${JSON.stringify(catalogue, null, 0)}\n`
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, file)
  const domains = new Set(catalogue.map((c) => c.domain))
  console.log(
    `installed-catalogue: wrote ${catalogue.length} skills across ${domains.size} domains → ${INSTALLED_OUT}`,
  )
  return { count: catalogue.length, domains: domains.size, out: INSTALLED_OUT }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const stub = process.argv.includes('--stub') || process.env.ERPAX_SKILL_INDEX === 'stub'
  if (process.argv.includes('--installed')) buildInstalledCatalogue()
  else if (stub) buildSkillIndexStub()
  else buildSkillIndex()
}

/** @index-cross.foldback child=skill/router/build parent=skill/router — this cross folds back into its parent. */

/** Re-exported so the full emitter stays the one face callers know. */
export { buildSkillIndexStub }
