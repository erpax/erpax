/**
 * confirm/matter — payload twin ⊕ vitepress twin ⊕ build lane (scoped + --full).
 *
 *   tsx src/confirm/matter.ts <file...>
 *   tsx src/confirm/matter.ts --hook
 *   tsx src/confirm/matter.ts --full
 *
 * Uuid-pure stack lives in ./index.ts (`pnpm confirm:uuid`).
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, basename, relative } from 'node:path'
import { execSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { GATE_LANES } from '@/cli/gate'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')

function loadYaml(): { load: (s: string) => unknown } | null {
  const req = createRequire(import.meta.url)
  try {
    return req('js-yaml')
  } catch {
    /* fall through */
  }
  const pnpm = join(ROOT, 'node_modules/.pnpm')
  if (existsSync(pnpm)) {
    const hit = readdirSync(pnpm).find((d) => d.startsWith('js-yaml@'))
    if (hit) {
      try {
        return req(join(pnpm, hit, 'node_modules/js-yaml/index.js'))
      } catch {
        /* fall through */
      }
    }
  }
  return null
}

function buildPages(): { pathset: Set<string>; leaf: Set<string> } {
  const pathset = new Set<string>()
  const leaf = new Set<string>()
  const walk = (dir: string): void => {
    for (const e of readdirSync(dir)) {
      const p = join(dir, e)
      if (e === 'node_modules' || e.startsWith('.')) continue
      let st
      try {
        st = statSync(p)
      } catch {
        continue
      }
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
const resolves = (t: string): boolean => {
  t = t.trim().toLowerCase()
  return t.includes('/') ? pathset.has(t) : leaf.has(t)
}

const isMdStray = (abs: string): boolean => {
  if (!/\.md$/i.test(abs)) return false
  if (basename(abs) === 'SKILL.md') return false
  const rel = relative(ROOT, abs)
  if (rel.startsWith('..')) return false
  return rel !== 'README.md' && rel !== 'index.md'
}

const MD_SKIP_DIRS = new Set(['node_modules', 'dist', 'test-results', 'playwright-report', 'coverage', '_report'])
function walkMdStrays(dir: string, acc: string[] = []): string[] {
  let ents
  try {
    ents = readdirSync(dir, { withFileTypes: true })
  } catch {
    return acc
  }
  for (const e of ents) {
    if (e.isSymbolicLink()) continue
    if (MD_SKIP_DIRS.has(e.name) || e.name.startsWith('.')) continue
    const p = join(dir, e.name)
    if (e.isDirectory()) walkMdStrays(p, acc)
    else if (isMdStray(p)) acc.push(relative(ROOT, p))
  }
  return acc
}

const FOLDER_ONE_WORD = /^[a-z][a-z0-9]*$/
const isFolderFrameworkSeg = (n: string): boolean =>
  /^\([^)]*\)$/.test(n) || /^\[.*\]$/.test(n) || n.startsWith('@') || /^[0-9]+$/.test(n)

export function folderNameWarnings(files: readonly string[]): string[] {
  const bad = new Set<string>()
  for (const f of files) {
    const rel = relative(SRC, f)
    if (rel.startsWith('..') || !rel) continue
    const segs = rel.split('/').slice(0, -1)
    if (segs[0] === 'app' || segs[0] === 'migrations') continue
    const acc: string[] = []
    for (const s of segs) {
      acc.push(s)
      if (!isFolderFrameworkSeg(s) && !FOLDER_ONE_WORD.test(s)) bad.add(acc.join('/'))
    }
  }
  return [...bad]
}

export interface VitepressConfirmResult {
  n: number
  dead: [string, string][]
  bad: [string, string][]
  ok: boolean
}

export function vitepressConfirm(
  files: readonly string[],
  yaml: { load: (s: string) => unknown } | null,
): VitepressConfirmResult {
  const dead: [string, string][] = []
  const bad: [string, string][] = []
  let n = 0
  for (const f of files) {
    if (!f.endsWith('SKILL.md') || !existsSync(f)) continue
    n++
    const txt = readFileSync(f, 'utf8')
    const m = txt.match(/^---\n([\s\S]*?)\n---/)
    if (!m) {
      bad.push([f, 'no frontmatter block'])
      continue
    }
    if (yaml) {
      try {
        const d = yaml.load(m[1]!) as { name?: string; description?: string } | null
        if (!d || !d.name || !d.description) bad.push([f, 'missing name/description'])
      } catch (e) {
        bad.push([f, 'YAML parse: ' + (e as Error).message.split('\n')[0]])
      }
    } else if (/^description:\s+[^"'\n].*: /m.test(m[1]!)) {
      bad.push([f, 'unquoted description with ": " (YAML hazard)'])
    }
    for (const lk of txt.matchAll(/\[\[([^\]]+)\]\]/g)) {
      const tgt = lk[1]!.split('|')[0]!.trim()
      if (!resolves(tgt)) dead.push([f, tgt])
    }
  }
  return { n, dead, bad, ok: dead.length === 0 && bad.length === 0 }
}

export interface PayloadConfirmResult {
  ok: boolean
  skipped?: boolean
  defer?: boolean
  msg?: string
}

export function payloadConfirm(files: readonly string[], codeChanged: boolean, hook: boolean): PayloadConfirmResult {
  if (!codeChanged) return { ok: true, skipped: true }
  if (hook) return { ok: true, defer: true }
  try {
    execSync('bash scripts/payload-verify-types.sh', { cwd: ROOT, stdio: 'pipe' })
    return { ok: true }
  } catch (e) {
    const err = e as { stdout?: Buffer; message: string }
    return { ok: false, msg: (err.stdout?.toString() || err.message).trim().split('\n').slice(-3).join(' / ') }
  }
}

export function scopeFiles(args: readonly string[], hook: boolean): string[] {
  if (hook) {
    let raw = ''
    try {
      raw = readFileSync(0, 'utf8')
    } catch {
      /* empty */
    }
    try {
      const j = JSON.parse(raw || '{}') as {
        tool_input?: { file_path?: string; path?: string; edits?: unknown[] }
      }
      const fp = j.tool_input?.file_path || j.tool_input?.path
      if (fp) return [fp]
      if (Array.isArray(j.tool_input?.edits)) return [j.tool_input.file_path].filter(Boolean) as string[]
    } catch {
      /* empty */
    }
    return []
  }
  const fileArgs = args.filter((a) => !a.startsWith('--'))
  if (fileArgs.length) return fileArgs
  const gitLines = (cmd: string): string[] =>
    execSync(cmd, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] })
      .toString()
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
  try {
    return [
      ...new Set([...gitLines('git diff --name-only HEAD'), ...gitLines('git ls-files --others --exclude-standard')]),
    ].map((p) => join(ROOT, p))
  } catch (e) {
    throw new Error(
      'cannot resolve changed-file scope via git (' +
        ((e as Error).message.split('\n')[0] ?? '') +
        ') — refusing to confirm an unknown scope',
    )
  }
}

/** Build lane tokens — byte-aligned with src/cli/gate.ts (guard test asserts confirm:full ⊇ gate). */
export const BUILD_GATE_CHECKS = GATE_LANES

export function fullConfirm(yaml: { load: (s: string) => unknown } | null): boolean {
  const run = (cmd: string): string | null => {
    try {
      execSync(cmd, { cwd: ROOT, stdio: 'pipe' })
      return null
    } catch (e) {
      return ((e as { stdout?: Buffer; message: string }).stdout?.toString() || (e as Error).message) ?? 'failed'
    }
  }
  const fmErr = run('cross-env NODE_OPTIONS="--no-deprecation --import=tsx/esm" tsx src/skill/frontmatter.ts')
  const auraOut = (() => {
    try {
      return execSync('node src/aura/scan.mjs', { cwd: ROOT }).toString()
    } catch (e) {
      return (e as { stdout?: Buffer }).stdout?.toString() || ''
    }
  })()
  const auraOk = /gap = 0\b/.test(auraOut) || /aura whole/.test(auraOut)
  const mdStrays = walkMdStrays(ROOT)
  const mdOk = mdStrays.length === 0
  const payErr = run('bash scripts/payload-verify-types.sh')
  const vpOk = !fmErr && auraOk && mdOk && !!yaml
  const payOk = !payErr

  const buildErrs: [string, string][] = []
  for (const [label, cmd] of BUILD_GATE_CHECKS) {
    const err = run(cmd)
    if (err) buildErrs.push([label, err])
  }
  const buildOk = buildErrs.length === 0

  console.log(
    `🟩 vitepress ${vpOk ? '✓' : '✗'}  frontmatter ${fmErr ? 'FAIL' : yaml ? 'ok' : 'UNVERIFIED (js-yaml missing)'} · aura ${auraOk ? 'gap=0' : 'gap>0 (dead links)'} · md ${mdOk ? 'pure (atoms only)' : mdStrays.length + ' stray(s)'}`,
  )
  console.log(`🟦 payload   ${payOk ? '✓' : '✗'}  payload-types ${payErr ? 'OUT OF SYNC' : 'in sync with config'}`)
  console.log(
    `⬛ build     ${buildOk ? '✓' : '✗'}  ${buildOk ? 'standards · lint · lint:src · lint:imports · typecheck · test:int all green (= pnpm check)' : buildErrs.map(([l]) => l + ' FAIL').join(' · ')}`,
  )
  if (fmErr) console.error(fmErr.trim().split('\n').slice(-4).join('\n'))
  if (!mdOk)
    console.error('   md strays (write IN atoms — SKILL.md only):\n' + mdStrays.slice(0, 20).map((s) => '     ' + s).join('\n'))
  if (payErr) console.error(payErr.trim().split('\n').slice(-4).join('\n'))
  for (const [label, err] of buildErrs)
    console.error('   ⬛ ' + label + ' →\n' + err.trim().split('\n').slice(-4).map((s) => '     ' + s).join('\n'))
  const ok = vpOk && payOk && buildOk
  console.log(
    ok
      ? '\n✓ confirmed — payload ⊕ vitepress ⊕ build all green (whole corpus = CI gate)'
      : '\n✗ NOT confirmed — fix the failing lane above',
  )
  return ok
}

export function runScopedConfirm(args: readonly string[], hook: boolean, yaml: { load: (s: string) => unknown } | null): number {
  let files: string[]
  try {
    files = scopeFiles(args, hook)
  } catch (e) {
    console.error('✗ NOT confirmed — ' + (e as Error).message)
    return hook ? 2 : 1
  }
  const skillFiles = files.filter((f) => f.endsWith('SKILL.md'))
  const codeChanged = files.some((f) => /\.(ts|tsx|mjs|js)$/.test(f))
  const vp = vitepressConfirm(skillFiles.length ? skillFiles : files, yaml)
  const pay = payloadConfirm(files, codeChanged, hook)
  const mdStrays = files.filter(isMdStray)
  const folderWarn = folderNameWarnings(files)

  const vpLine =
    vp.n === 0
      ? '🟩 vitepress ⊘  no SKILL.md in scope'
      : `🟩 vitepress ${vp.ok ? '✓' : '✗'}  ${vp.n} page(s): ${vp.dead.length} dead link(s), ${vp.bad.length} frontmatter issue(s)`
  const payLine = pay.skipped
    ? '🟦 payload   ⊘  no code change — generated types unaffected'
    : pay.defer
      ? '🟦 payload   ⏏  code changed — run `pnpm confirm:full` before push (type-sync deferred to gate)'
      : `🟦 payload   ${pay.ok ? '✓' : '✗'}  payload-types ${pay.ok ? 'in sync with config' : 'OUT OF SYNC'}`

  console.log(vpLine)
  if (mdStrays.length)
    console.log(`🟧 md        ✗  ${mdStrays.length} stray — write IN an atom (SKILL.md), not a loose .md`)
  if (folderWarn.length)
    console.log(
      `🟪 folder    ⏏  ${folderWarn.length} non-one-word folder(s) in scope — name every atom ONE generic word (the push gate \`pnpm lint:folders\` + law/folder test FAIL): ${folderWarn.join(', ')}`,
    )
  console.log(payLine)
  for (const [f, t] of vp.dead) console.error(`   dead link  ${relative(ROOT, f)} → [[${t}]]`)
  for (const [f, m] of vp.bad) console.error(`   frontmatter ${relative(ROOT, f)} → ${m}`)
  for (const f of mdStrays) console.error(`   md stray   ${relative(ROOT, f)} — fold into a SKILL.md atom`)
  if (pay.msg) console.error('   ' + pay.msg)

  const ok = vp.ok && pay.ok && mdStrays.length === 0
  console.log(ok ? '✓ confirmed — payload ⊕ vitepress' : '✗ NOT confirmed')
  return ok ? 0 : hook ? 2 : 1
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2)
  const FULL = args.includes('--full')
  const HOOK = args.includes('--hook')
  const yaml = loadYaml()
  if (!yaml)
    console.error(
      '⚠️  confirm: js-yaml not loadable — frontmatter checked by weak regex only (run `pnpm install`). --full will FAIL closed.',
    )
  if (FULL) process.exit(fullConfirm(yaml) ? 0 : 1)
  process.exit(runScopedConfirm(args, HOOK, yaml))
}
