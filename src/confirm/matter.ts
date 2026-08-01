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
import { join, basename, relative, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { execSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { GATE_LANES } from '@/cli/gate'
import { phraseWithoutDiamondChangesetGate } from '@/law/folder/user-word'
import { commentsOf } from '@/syntax'
import { deadReferencesIn } from '@/rules/reference'
import { deadSymbolsIn } from '@/rules/prose'
import { verifyStandardsCatalogue } from '@/standards/emit'

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

/**
 * Matter written OUTSIDE the corpus root — the false negative every location axis shared.
 *
 * `isMdStray` and `folderNameWarnings` both bail on `rel.startsWith('..')`, so a `.md`/`.ts` written to
 * `~/.claude/projects/…/memory/` was exempt from every structural axis while the path-agnostic `reference`
 * axis still ran on it — the gate fired, on the wrong thing, and the real violation passed. A gate that
 * reports green over the exact defect it exists for is worse than one that over-reports ([[rules]]/cycle).
 *
 * [[rules]]/invisible states the law for matter INSIDE `src`: no lawful path ⇒ no uuid ⇒ no matrix node ⇒
 * nothing deduplicates it. Matter outside the root is that failure at its limit — it has no path in the
 * corpus at all, so a realisation saved there is re-derived forever by every later session.
 *
 * The OS temp dir is exempt: a scratchpad file is scratch, not matter — it is not durable and claims no
 * place in the fold.
 */
/**
 * Scratch roots. `os.tmpdir()` alone was NOT enough: on macOS it resolves to `/var/folders/…`
 * while a scratchpad commonly sits under `/private/tmp` (`/tmp` is a symlink to it), so the axis
 * denied legitimate throwaway writes — a gate blocking real work, which is how a gate teaches
 * people to route around it. Scratch is not matter; the corpus root is where matter lives.
 */
export const OUTSIDE_ALLOW = [resolve(tmpdir()), '/private/tmp', '/private/var/tmp'] as const

export function outsideMatter(files: readonly string[], root: string): string[] {
  return files.filter((f) => {
    const abs = resolve(root, f)
    if (!relative(root, abs).startsWith('..')) return false
    return !OUTSIDE_ALLOW.some((a) => !relative(a, abs).startsWith('..'))
  })
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

/**
 * Does this changeset touch a standard banner? That is the ONLY way the catalogue goes stale, so it is the
 * only time the freshness check is worth its 1.1s at the write.
 *
 * KNOWN FLAW in the scanner this guards ([[standards]]/emit): it is an `rg` regex over raw text, so it
 * cannot tell a banner from a STRING that looks like one. A banner sigil followed by a space and any words
 * is recorded as a citation wherever it appears — including inside a string literal, and including prose
 * ABOUT the mechanism. This gate's first refusal message named the two sigils; emit filed this file as
 * implementing an "RFC" whose title was the rest of my sentence. It caught itself immediately: the message
 * made the catalogue stale, and this hook refused the write that added it.
 *
 * That is the lesson [[rules]]/reference already paid for — a string literal is DATA, not a citation — and
 * emit has not learned it. The literals live in that atom's test on fixtures; writing one HERE would file a
 * fresh false citation, exactly as it should. The message is worded around the scanner; the honest repair
 * is to teach emit to read comments only, which is not an `rg` one-liner.
 */
export function touchesStandardBanner(files: readonly string[], root: string): boolean {
  for (const f of files) {
    if (!/\.(ts|tsx)$/.test(f) || /catalogue\.ts$|registry\.ts$/.test(f)) continue
    try {
      // PARSED, not matched. The raw-text form matched `@standard` inside a test FIXTURE STRING and
      // blocked every edit to the file holding it — a red nobody could clear, which is how a gate
      // teaches people to ignore it. A string literal is data ([[syntax]]); only a real comment
      // carries a banner.
      const text = readFileSync(resolve(root, f), 'utf8')
      if (commentsOf(f, text).some((c) => /@(standard|rfc)\s/.test(c))) return true
    } catch {
      // deleted in this changeset — it cannot still be citing a banner
    }
  }
  return false
}

/**
 * The independent axes a write must pass to persist — the LAW, and the only place the count exists.
 *
 * [[cost]] prices an unsealed forge by how many gates it must evade together, and that number was TYPED
 * (`CONFIRM_GATE_CHECKS = 8`) while this gate ran 6 — then 7, the moment `standards` was added. It was never
 * 8. A count typed beside the thing it counts is the same defect as `ERPAX_DIGEST_BITS = 106`: nobody can
 * re-derive it, so nothing contradicts it. `CONFIRM_CHECK_AXES.length` is not a number anyone types.
 */
export const CONFIRM_CHECK_AXES = [
  'vitepress',
  'payload',
  'md-stray',
  'phrase-without-diamond',
  'reference',
  'prose',
  'standards',
  'grounded',
  'outside',
] as const

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
  const phraseGate = phraseWithoutDiamondChangesetGate(files, ROOT)
  const codeChanged = files.some((f) => /\.(ts|tsx|mjs|js)$/.test(f))
  const vp = vitepressConfirm(skillFiles.length ? skillFiles : files, yaml)
  const pay = payloadConfirm(files, codeChanged, hook)
  const mdStrays = files.filter(isMdStray)
  const folderWarn = folderNameWarnings(files)
  // A dead `src/…` pointer is the same class as a dead [[link]] — and it was the UNGATED one, so the
  // Наредба Н-18 law pointed at a moved file for however long. Caught here at the WRITE, not by the
  // whole-tree gate after it has rotted ([[rules]]/reference).
  const deadRefs = deadReferencesIn(files, ROOT)
  // Prose unrelated to code is measurable — and refusable. A SKILL citing `generateFoo()` that nothing
  // defines is a citation leading nowhere, and it is WORSE than a dead path because it reads as true. Only
  // SKILLs beside an index.ts are judged; a lexicon atom is prose by design ([[rules]]/prose).
  const deadCites = files.some((f) => f.endsWith('SKILL.md')) ? deadSymbolsIn(files, ROOT) : []
  // The catalogue — the ONE index of which code implements which standard — rotted to 28 dead statutory
  // pointers and ~50% drift, while `erpax standards` (GATE_LANES[0]) sat there working perfectly. It never
  // ran: every push is --no-verify, because the whole gate exceeds the 3-minute cap and is skipped as one
  // unit. A gate too slow to run is prose. This hook fires at the WRITE and cannot be --no-verify'd, and
  // the check costs 1.1s — so it lives here, scoped to edits that actually touch a banner (the only way
  // the catalogue can go stale).
  const staleCatalogue = touchesStandardBanner(files, ROOT) && !verifyStandardsCatalogue(ROOT)
  // Realtime PROVENANCE gate ([[grounded]]): a trust-chain convention (`src/convention/*/index.ts`) that
  // reads raw, unsealed fs (`process.cwd()`/`readFileSync`/`readdirSync`/`existsSync`) prices the tamper-
  // cost on the MUTABLE working tree, not sealed content — the forge-cost then measures a directory
  // listing. Caught at the WRITE — agent OR manual, since this hook fires on every edit — so no trust
  // computation is authored ungrounded. Reground it: read committed content via git ([[grounded]]).
  const stripComments = (s: string): string =>
    s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1')
  const ungroundedEdits = files.filter(
    (f) =>
      /src\/convention\/[^/]+\/index\.ts$/.test(relative(ROOT, f).replace(/\\/g, '/')) &&
      /\breadFileSync\b|\breaddirSync\b|\bexistsSync\b|process\.cwd\(\)/.test(stripComments(readFileSync(f, 'utf8'))),
  )

  // Durable matter written OUTSIDE the corpus root — the axis every location check was missing, because
  // each one bails on `rel.startsWith('..')`. Caught at the WRITE: an atom, SKILL or realisation saved to
  // a private path has no place in the fold, so nothing dedups it and every later session re-derives it.
  const outsideWrites = outsideMatter(files, ROOT)

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
  if (phraseGate.length) {
    console.log(`🟥 phrase-without-diamond ✗  ${phraseGate.length} SKILL-only changeset(s) — add index.ts + test.ts in same pass`)
    for (const v of phraseGate) console.error(`   ${v.atomPath}: ${v.reason}`)
  }
  if (deadRefs.length)
    console.log(
      `🟥 reference ✗  ${deadRefs.length} dead src/… pointer(s) — a moved file carries its references in the same diff`,
    )
  if (deadCites.length)
    console.log(
      `🟥 prose     ✗  ${deadCites.length} cited symbol(s) do not exist — write the code, or stop claiming it`,
    )
  if (staleCatalogue)
    console.log(
      '🟥 standards ✗  a standard banner moved and the catalogue did not follow — run `pnpm erpax standards catalogue`',
    )
  if (ungroundedEdits.length)
    console.log(
      `🟥 grounded  ✗  ${ungroundedEdits.length} trust-chain convention(s) read process.cwd()/raw fs — source from SEALED content (git), not the mutable tree ([[grounded]]): ${ungroundedEdits.map((f) => relative(ROOT, f)).join(', ')}`,
    )
  if (outsideWrites.length)
    console.log(
      `🟥 outside   ✗  ${outsideWrites.length} write(s) outside the corpus root — matter lives in src/ as an addressable atom, or it is not matter ([[rules]]/invisible)`,
    )
  console.log(payLine)
  for (const f of outsideWrites) console.error(`   outside    ${f} — no corpus path ⇒ no uuid ⇒ nothing dedups it`)
  for (const d of deadCites) console.error(`   dead cite  ${d.from} → \`${d.symbol}\` (nothing defines it)`)
  for (const d of deadRefs) console.error(`   dead ref   ${d.from} → ${d.target} (does not exist)`)
  for (const [f, t] of vp.dead) console.error(`   dead link  ${relative(ROOT, f)} → [[${t}]]`)
  for (const [f, m] of vp.bad) console.error(`   frontmatter ${relative(ROOT, f)} → ${m}`)
  for (const f of mdStrays) console.error(`   md stray   ${relative(ROOT, f)} — fold into a SKILL.md atom`)
  if (pay.msg) console.error('   ' + pay.msg)

  // The axes a write must pass. A LIST, not a boolean chain, because [[cost]] prices a forge by how many
  // independent gates it must evade — and that number was TYPED (`CONFIRM_GATE_CHECKS = 8`) while the gate
  // ran 6, then 7 once `standards` was added. A count typed beside the thing it counts drifts the moment
  // anyone edits the thing: the same defect as ERPAX_DIGEST_BITS. `CONFIRM_CHECK_AXES.length` cannot.
  // The Record is exhaustive by TYPE, so adding an axis here without a verdict is a compile error.
  const verdicts: Record<(typeof CONFIRM_CHECK_AXES)[number], boolean> = {
    vitepress: vp.ok,
    payload: pay.ok,
    'md-stray': mdStrays.length === 0,
    'phrase-without-diamond': phraseGate.length === 0,
    reference: deadRefs.length === 0,
    prose: deadCites.length === 0,
    standards: !staleCatalogue,
    grounded: ungroundedEdits.length === 0,
    outside: outsideWrites.length === 0,
  }
  const ok = CONFIRM_CHECK_AXES.every((axis) => verdicts[axis])
  if (ok) {
    console.log('✓ confirmed — payload ⊕ vitepress')
  } else {
    // A blocking gate must never be SILENT. The failing-axis lines above mix stdout/stderr, and the harness
    // surfaces only stderr — so a stdout-only reason reads as "No stderr output", a wall that will not say why.
    // Name the failing axes on stderr so every block states its cause ([[rules]]: a gate that cannot be read
    // is prose; improve it, do not --no-verify around it).
    const failed = CONFIRM_CHECK_AXES.filter((axis) => !verdicts[axis])
    console.error(`✗ NOT confirmed — failing axis(es): ${failed.join(', ')}`)
  }
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
