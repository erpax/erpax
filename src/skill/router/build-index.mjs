#!/usr/bin/env node
/**
 * build-skill-index — generate the bundled skill "expert pool" for the
 * catch-all router. Workers have no runtime fs, so the corpus is compiled into
 * a module the Payload endpoint imports.
 *
 * Walks .claude/skills/ ** /SKILL.md and emits
 * src/services/skill-router/skills.index.ts:
 *   { route, path, name, description, content, ancestors, siblings, children,
 *     related, contentUuid }[]   (matches SkillNode in ./resolve.ts)
 *
 * Relations come from the surrounding paths (tree) + the body's [[links]] —
 * the same derivation the VitePress config uses. contentUuid is a v5-style uuid
 * over the SKILL.md content (content-addressed identity).
 *
 * Usage: node src/services/skill-router/build-index.mjs
 */

import { readdirSync, statSync, lstatSync, existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname, basename, relative } from 'node:path'
import { createHash } from 'node:crypto'
import { execSync } from 'node:child_process'

// src is the 0 (the axis): every node is `src/[name]/[action].[format]`, so the
// skill corpus is loaded FROM src — collections/modules carry their co-located
// SKILL.md next to their code (matter↔antimatter). The legacy `.claude/skills`
// concept-atoms are still indexed until they migrate under src. Routes are
// derived relative to each root (the root = 0, stripped from the route).
const ROOTS = ['src']
const OUT = 'src/skill/router/skills.index.ts'

// Frontmatter self-upgrade: verify-first (fast path), sync on drift (one pass).
try {
  execSync('pnpm exec tsx src/skill/router/upgrade/index.ts --verify', { stdio: 'pipe' })
} catch {
  try {
    execSync('pnpm exec tsx src/skill/router/upgrade/index.ts --sync', { stdio: 'pipe' })
  } catch (e) {
    console.error('skill-index: frontmatter upgrade failed —', e.stderr?.toString?.() || e.message)
    process.exit(1)
  }
}

const isSkill = (dir) => existsSync(join(dir, 'SKILL.md'))
// Skip symlinks: the `.claude → src` merge leaves a `src/skills → .` self-symlink,
// so following links would recurse `src/skills/skills/skills/…` forever (ELOOP).
// lstat (not stat) so a symlinked dir reads as a link, not the dir it targets.
const isRealDir = (p) => { try { const s = lstatSync(p); return s.isDirectory() && !s.isSymbolicLink() } catch { return false } }
const subDirs = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).map((n) => join(dir, n)).filter(isRealDir).sort()
    : []

/** Deterministic v5-style uuid from the content (sha-256 → uuid layout). */
function contentUuid(content) {
  const h = createHash('sha256').update(content).digest('hex')
  const y = ((parseInt(h[16], 16) & 0x3) | 0x8).toString(16)
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-${y}${h.slice(17, 20)}-${h.slice(20, 32)}`
}

/** Frontmatter scalar (handles quoted + bare). */
function fmValue(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
  if (!m) return ''
  let v = m[1].trim()
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1)
  }
  return v
}

/** Nav · group · route from path segments — mirrors @/navigation pathNavMeta. */
function pathNavMeta(segments) {
  const nav = segments.slice(0, -1)
  const group = segments[0] ?? ''
  const route = '/' + segments.join('/') + '/SKILL'
  return { nav, group, route }
}

/** Leaf words of every [[link]] in the body (code stripped), deduped, self excluded. */
function relatedOf(body, self) {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
  const seen = new Set()
  const out = []
  for (const m of text.matchAll(/\[\[([a-z][a-z0-9/-]*)(?:\|[^\]]*)?\]\]/g)) {
    const w = m[1].split('/').pop()
    if (w && w !== self && !seen.has(w)) {
      seen.add(w)
      out.push(w)
    }
  }
  return out
}

// The mask is recursive: `[name]/[action].[format]` is identical at every
// depth. A node is any folder carrying the SKILL action; its route is the path
// from the 0 (`root`, stripped). The same `nodeFor`/`walk` apply at every level
// and to every root — one uniform recursion, no special-casing.
function nodeFor(skillDir, root) {
  const rel = relative('.', skillDir)
  const segments = relative(root, rel).split(/[\\/]/).filter(Boolean)
  const route = '/' + segments.join('/') + '/SKILL'
  const file = join(skillDir, 'SKILL.md')
  const raw = readFileSync(file, 'utf8')
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  const fm = fmMatch ? fmMatch[1] : ''
  const body = fmMatch ? raw.slice(fmMatch[0].length) : raw
  const self = basename(rel)

  const parent = dirname(rel)
  const ancestors = []
  for (let p = parent; p.startsWith(root) && p !== root; p = dirname(p)) {
    if (isSkill(p)) ancestors.unshift(basename(p))
  }
  const siblings = subDirs(parent).filter((d) => d !== rel && isSkill(d)).map((d) => basename(d))
  const children = subDirs(rel).filter(isSkill).map((d) => basename(d))

  const { nav, group } = pathNavMeta(segments)
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
    contentUuid: contentUuid(raw),
  }
}

function walk(dir, root, out = []) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir).sort()) {
    if (name === 'node_modules' || name.startsWith('.')) continue
    const full = join(dir, name)
    if (!isRealDir(full)) continue // skip non-dirs AND symlinks (the src/skills → . loop)
    if (isSkill(full)) out.push(nodeFor(full, root))
    walk(full, root, out)
  }
  return out
}

// Dedup by route (the 0 src is canonical; legacy .claude/skills only fills
// atoms not yet migrated under src).
const byRoute = new Map()
for (const root of ROOTS) for (const n of walk(root, root)) {
  if (!byRoute.has(n.route)) byRoute.set(n.route, n)
}
const index = [...byRoute.values()].sort((a, b) => a.route.localeCompare(b.route))
const banner =
  '// AUTO-GENERATED by src/services/skill-router/build-index.mjs — do not edit.\n' +
  '// The catch-all router\'s expert pool (Workers have no runtime fs).\n'
const file =
  banner +
  "import type { SkillNode } from './resolve'\n\n" +
  `export const SKILL_INDEX: readonly SkillNode[] = ${JSON.stringify(index, null, 0)}\n`

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, file)
console.log(`skill-index: wrote ${index.length} skills → ${OUT} (${file.length} bytes)`)
