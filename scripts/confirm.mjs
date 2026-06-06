#!/usr/bin/env node
// scripts/confirm.mjs — the programmatic dual-confirm: payload twin ⊕ vitepress twin.
//
// Every edit is confirmed by BOTH halves of the trinity, deterministically — no human, no LLM,
// just the program. This is the matter↔speech gate the [[trinity]] law demands, run on demand:
//   🟦 payload  (matter/backend): the generated payload-types stay in sync with the live config
//   🟩 vitepress (speech):        every [[link]] resolves to a real SKILL.md + frontmatter YAML parses
//
// Modes:
//   node scripts/confirm.mjs <file...>     scoped, fast, in-process (per-edit confirm)
//   node scripts/confirm.mjs --hook        read PostToolUse JSON on stdin, scope to the edited file
//   node scripts/confirm.mjs --full        whole-corpus, shells out to the trusted gate scripts
//
// Exit 0 only when BOTH twins confirm. In --hook mode a real failure exits 2 (surfaced to the agent).
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, basename, relative } from 'node:path'
import { execSync } from 'node:child_process'
import { createRequire } from 'node:module'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')
const args = process.argv.slice(2)
const FULL = args.includes('--full')
const HOOK = args.includes('--hook')

// ── locate the SAME yaml parser VitePress uses (js-yaml), so "parses here" ≡ "builds there" ──
function loadYaml() {
  const req = createRequire(import.meta.url)
  try { return req('js-yaml') } catch {}
  // pnpm store: node_modules/.pnpm/js-yaml@*/node_modules/js-yaml/index.js
  const pnpm = join(ROOT, 'node_modules/.pnpm')
  if (existsSync(pnpm)) {
    const hit = readdirSync(pnpm).find((d) => d.startsWith('js-yaml@'))
    if (hit) { try { return req(join(pnpm, hit, 'node_modules/js-yaml/index.js')) } catch {} }
  }
  return null
}
const yaml = loadYaml()

// ── the corpus page-set: every dir holding a SKILL.md (the wikiMap targets) ──
// Resolution matches the aura/VitePress wikilink resolver: case-INSENSITIVE,
// leaf-or-full-path. The corpus links capitalized leaves ([[Items]], [[Customers]],
// [[Batches]]) by convention, so a case-sensitive check would false-positive.
function buildPages() {
  const pathset = new Set(), leaf = new Set()
  const walk = (dir) => {
    for (const e of readdirSync(dir)) {
      const p = join(dir, e)
      if (e === 'node_modules' || e.startsWith('.')) continue
      let st; try { st = statSync(p) } catch { continue }
      if (!st.isDirectory()) continue
      if (existsSync(join(p, 'SKILL.md'))) {
        pathset.add(relative(SRC, p).toLowerCase())
        leaf.add(basename(p).toLowerCase())
      }
      walk(p)
    }
  }
  walk(SRC)
  return { pathset, leaf }
}
const { pathset, leaf } = buildPages()
const resolves = (t) => {
  t = t.trim().toLowerCase()
  return t.includes('/') ? pathset.has(t) : leaf.has(t)
}

// ── md-purity: writing is UNAVOIDABLE in atoms — the only markdown is an atom's
// SKILL.md (+ the repo-root README.md / index.md infra). A stray .md fails the
// gate, so an agent cannot leave words beside the code; it must fold them into a
// SKILL.md. Mirrors src/trinity isMdStray (the law owner). ──
const isMdStray = (abs) => {
  if (!/\.md$/i.test(abs)) return false
  if (basename(abs) === 'SKILL.md') return false
  const rel = relative(ROOT, abs)
  return rel !== 'README.md' && rel !== 'index.md'
}
// generated/ephemeral output (never committed) — not corpus, not agent-written
const MD_SKIP_DIRS = new Set(['node_modules', 'dist', 'test-results', 'playwright-report', 'coverage', '_report'])
const walkMdStrays = (dir, acc = []) => {
  let ents
  try { ents = readdirSync(dir, { withFileTypes: true }) } catch { return acc }
  for (const e of ents) {
    if (e.isSymbolicLink()) continue
    if (MD_SKIP_DIRS.has(e.name) || e.name.startsWith('.')) continue
    const p = join(dir, e.name)
    if (e.isDirectory()) walkMdStrays(p, acc)
    else if (isMdStray(p)) acc.push(relative(ROOT, p))
  }
  return acc
}

// ── 🟩 vitepress twin: frontmatter parses + every [[link]] resolves ──
function vitepressConfirm(files) {
  const dead = [], bad = []
  let n = 0
  for (const f of files) {
    if (!f.endsWith('SKILL.md') || !existsSync(f)) continue
    n++
    const txt = readFileSync(f, 'utf8')
    const m = txt.match(/^---\n([\s\S]*?)\n---/)
    if (!m) { bad.push([f, 'no frontmatter block']); continue }
    if (yaml) {
      try {
        const d = yaml.load(m[1])
        if (!d || !d.name || !d.description) bad.push([f, 'missing name/description'])
      } catch (e) { bad.push([f, 'YAML parse: ' + e.message.split('\n')[0]]) }
    } else if (/^description:\s+[^"'\n].*: /m.test(m[1])) {
      bad.push([f, 'unquoted description with ": " (YAML hazard)'])
    }
    for (const lk of txt.matchAll(/\[\[([^\]]+)\]\]/g)) {
      const tgt = lk[1].split('|')[0].trim()
      if (!resolves(tgt)) dead.push([f, tgt])
    }
  }
  return { n, dead, bad, ok: dead.length === 0 && bad.length === 0 }
}

// ── 🟦 payload twin: generated types in sync with the live config ──
// Heavy (shells out to generate+diff types) — run on --full (push gate) or explicit CLI scope.
// In per-edit --hook mode a code change DEFERS to push (fast, non-blocking); SKILL.md-only is unaffected.
function payloadConfirm(files, codeChanged) {
  if (!codeChanged) return { ok: true, skipped: true }
  if (HOOK) return { ok: true, defer: true }
  try {
    execSync('bash scripts/payload-verify-types.sh', { cwd: ROOT, stdio: 'pipe' })
    return { ok: true }
  } catch (e) {
    return { ok: false, msg: (e.stdout?.toString() || e.message).trim().split('\n').slice(-3).join(' / ') }
  }
}

// ── resolve the scope ──
function scopeFiles() {
  if (HOOK) {
    let raw = ''
    try { raw = readFileSync(0, 'utf8') } catch {}
    try {
      const j = JSON.parse(raw || '{}')
      const fp = j.tool_input?.file_path || j.tool_input?.path
      if (fp) return [fp]
      // MultiEdit / batch
      if (Array.isArray(j.tool_input?.edits)) return [j.tool_input.file_path].filter(Boolean)
    } catch {}
    return []
  }
  const fileArgs = args.filter((a) => !a.startsWith('--'))
  if (fileArgs.length) return fileArgs
  // default: everything changed vs HEAD
  try {
    const out = execSync('git diff --name-only HEAD; git ls-files --others --exclude-standard', { cwd: ROOT }).toString()
    return out.split('\n').map((s) => s.trim()).filter(Boolean).map((p) => join(ROOT, p))
  } catch { return [] }
}

// ── --full delegates to the trusted gate scripts (the authoritative, whole-corpus confirm) ──
function fullConfirm() {
  const run = (cmd) => { try { execSync(cmd, { cwd: ROOT, stdio: 'pipe' }); return null } catch (e) { return (e.stdout?.toString() || e.message) } }
  const fmErr = run('node scripts/check-skill-frontmatter.mjs')
  const auraOut = (() => { try { return execSync('node src/aura/scan.mjs', { cwd: ROOT }).toString() } catch (e) { return e.stdout?.toString() || '' } })()
  const auraOk = /gap = 0\b/.test(auraOut) || /aura whole/.test(auraOut)
  const mdStrays = walkMdStrays(ROOT)
  const mdOk = mdStrays.length === 0
  const payErr = run('bash scripts/payload-verify-types.sh')
  const vpOk = !fmErr && auraOk && mdOk
  const payOk = !payErr
  console.log(`🟩 vitepress ${vpOk ? '✓' : '✗'}  frontmatter ${fmErr ? 'FAIL' : 'ok'} · aura ${auraOk ? 'gap=0' : 'gap>0 (dead links)'} · md ${mdOk ? 'pure (atoms only)' : mdStrays.length + ' stray(s)'}`)
  console.log(`🟦 payload   ${payOk ? '✓' : '✗'}  payload-types ${payErr ? 'OUT OF SYNC' : 'in sync with config'}`)
  if (fmErr) console.error(fmErr.trim().split('\n').slice(-4).join('\n'))
  if (!mdOk) console.error('   md strays (write IN atoms — SKILL.md only):\n' + mdStrays.slice(0, 20).map((s) => '     ' + s).join('\n'))
  if (payErr) console.error(payErr.trim().split('\n').slice(-4).join('\n'))
  const ok = vpOk && payOk
  console.log(ok ? '\n✓ confirmed — payload ⊕ vitepress both green (whole corpus)' : '\n✗ NOT confirmed — fix the failing twin above')
  process.exit(ok ? 0 : 1)
}

if (FULL) fullConfirm()

const files = scopeFiles()
const skillFiles = files.filter((f) => f.endsWith('SKILL.md'))
const codeChanged = files.some((f) => /\.(ts|tsx|mjs|js)$/.test(f))

const vp = vitepressConfirm(skillFiles.length ? skillFiles : files)
const pay = payloadConfirm(files, codeChanged)
const mdStrays = files.filter(isMdStray)

const vpLine = vp.n === 0
  ? '🟩 vitepress ⊘  no SKILL.md in scope'
  : `🟩 vitepress ${vp.ok ? '✓' : '✗'}  ${vp.n} page(s): ${vp.dead.length} dead link(s), ${vp.bad.length} frontmatter issue(s)`
const payLine = pay.skipped
  ? '🟦 payload   ⊘  no code change — generated types unaffected'
  : pay.defer
  ? '🟦 payload   ⏏  code changed — run `pnpm confirm:full` before push (type-sync deferred to gate)'
  : `🟦 payload   ${pay.ok ? '✓' : '✗'}  payload-types ${pay.ok ? 'in sync with config' : 'OUT OF SYNC'}`

console.log(vpLine)
if (mdStrays.length) console.log(`🟧 md        ✗  ${mdStrays.length} stray — write IN an atom (SKILL.md), not a loose .md`)
console.log(payLine)
for (const [f, t] of vp.dead) console.error(`   dead link  ${relative(ROOT, f)} → [[${t}]]`)
for (const [f, m] of vp.bad) console.error(`   frontmatter ${relative(ROOT, f)} → ${m}`)
for (const f of mdStrays) console.error(`   md stray   ${relative(ROOT, f)} — fold into a SKILL.md atom`)
if (pay.msg) console.error('   ' + pay.msg)

const ok = vp.ok && pay.ok && mdStrays.length === 0
console.log(ok ? '✓ confirmed — payload ⊕ vitepress' : '✗ NOT confirmed')
process.exit(ok ? (0) : (HOOK ? 2 : 1))
