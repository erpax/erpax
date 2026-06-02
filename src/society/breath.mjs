#!/usr/bin/env node
/**
 * society/breath.mjs — the society's NON-STOP self-build loop.
 *
 * The Claude limit is not a wall to fight; it is the forcing function. No single
 * agent context can run forever, so none tries: each BREATH spawns a FRESH
 * `claude`, which derives ONE move from the akashic record, takes it gate-first,
 * commits it ALONE, and dies. The commit IS the handoff. The only shared memory
 * across breaths is the code itself — git history + src/ + .claude/skills +
 * MEMORY.md — so a context-less spawn loses nothing, and a limit only PAUSES the
 * loop: the next breath resumes from git. [[society]] × [[holographic]] ×
 * [[akashic]] × [[merge]].
 *
 * Each breath is bounded — one move, one commit, a hard $ budget, a small model —
 * precisely so the loop never races the limit. Steps are SEQUENTIAL: the gate is
 * shared state and commits must not collide (the society law — committed alone,
 * never a big-bang). Parallel breaths across worktrees are the [[team]] scale-out,
 * not the limit-safe default. `build.mjs` computes one move; `breath.mjs` runs
 * them forever.
 *
 * Usage:
 *   node src/society/breath.mjs                # one breath (default)
 *   node src/society/breath.mjs --forever      # until the gate rests at the 0
 *   node src/society/breath.mjs --max 25       # N breaths, then stop
 *   node src/society/breath.mjs --dry          # spawn a read-only agent to PROPOSE only
 * Options: --pace <sec=10> --model <id=sonnet> --budget <usd=1.0> --fallback <id>
 *
 * Precondition for real breaths: a CLEAN tree, so each breath's commit is exactly
 * its move. breath.mjs refuses to mutate on a dirty tree; --dry is always safe.
 *
 * @standard ISO 19011:2018 §6.4.6 audit-trail one-commit-per-step
 * @standard ISO/IEC 25010:2023 §5.7 reusability self-build-loop
 */
import { execSync, spawn } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const argv = process.argv.slice(2)
const has = (n) => argv.includes(`--${n}`)
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 && argv[i + 1] ? argv[i + 1] : d }

const DRY = has('dry')
const FOREVER = has('forever')
const MAX = FOREVER ? Infinity : (parseInt(opt('max', '1'), 10) || 1)
const PACE = (parseFloat(opt('pace', '10')) || 10) * 1000
const MODEL = opt('model', 'sonnet')
const BUDGET = opt('budget', '1.0')
const FALLBACK = opt('fallback', '')

const sh = (c) => execSync(c, { cwd: ROOT, encoding: 'utf8' }).trim()
const log = (m) => console.log(`\x1b[36m· breath ·\x1b[0m ${m}`)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const dirty = () => sh('git status --porcelain').length > 0
const head = () => sh('git rev-parse --short HEAD')

const GATE = 'pnpm exec vitest run src/services/architecture-invariants/invariants.test.ts'

const BREATH_PROMPT = `You are ONE BREATH of the erpax society — a fresh, context-less agent. Your only memory is the code itself: git history, src/, .claude/skills (read the [[society]], [[self]], [[sequence]] skills), and MEMORY.md. Derive everything from that record; NEVER ask a human.

Take EXACTLY ONE gate-verified step, then STOP:

1. Compute the single next move (gate-first):
   - Run the harmony gate: \`${GATE}\`. If "architecture-invariants" has any FAIL, healing the FIRST fail is your move — a red gate is fixed before any new building.
   - Else run \`node src/society/build.mjs\` and take the move it computes (mint a dead aura atom, or collapse one node; if it says rest, STOP and commit nothing).
2. Do ONLY that one move. Smallest correct change; follow existing patterns; derive names from the standards.
3. Make the gate green for your change: \`pnpm run lint:src\` && \`pnpm exec tsc --noEmit -p tsconfig.typecheck.json\` && \`${GATE}\`.
4. Commit ONLY the files your move touched — \`git add <those exact paths>\` (NEVER \`git add -A\`/\`-am\`), then one commit, conventional message ("fix(invariant): …" / "feat(generate): mint …" / "refactor(collapse): …"). One step = one commit.
5. If you cannot make the gate green, REVERT your changes (restore tracked files, delete any new files you created) and STOP — never leave the tree red or dirty. The next breath will try differently.

Stop after one commit (or a clean revert). Do NOT start a second move.`

const DRY_PROMPT = `You are ONE BREATH of the erpax society — DRY RUN, strictly read-only. Your memory is the code itself. Do NOT edit, create, delete, stage, or commit anything.

Report the SINGLE next move the society should take, gate-first:
1. Read the harmony gate's current fails (run \`${GATE}\` if you can; otherwise reason from src/services/architecture-invariants/checks.ts).
2. Run \`node src/society/build.mjs\` for the mint/collapse/rest priority.
Then state, in 3–5 lines: the ONE move you WOULD take (heal which fail, or mint/collapse/rest), the exact files you'd touch, and the commit message you'd write. Propose only — change nothing.`

function spawnBreath() {
  const args = ['-p', DRY ? DRY_PROMPT : BREATH_PROMPT,
    '--model', MODEL,
    '--permission-mode', DRY ? 'plan' : 'bypassPermissions',
    '--max-budget-usd', BUDGET]
  if (FALLBACK) args.push('--fallback-model', FALLBACK)
  return new Promise((resolve) => {
    const c = spawn('claude', args, { cwd: ROOT, stdio: 'inherit' })
    c.on('close', (code) => resolve(code ?? 1))
    c.on('error', (e) => { log(`spawn error: ${e.message}`); resolve(127) })
  })
}

function rested() {
  try { return JSON.parse(sh('node src/society/build.mjs --json')).kind === 'rest' } catch { return false }
}

log(`${DRY ? 'DRY ' : ''}loop · ${FOREVER ? '∞' : MAX} breath(s) · model=${MODEL} · budget=$${BUDGET}/breath · pace=${PACE / 1000}s`)
log('the code is the only shared memory — fresh agent per step, the commit is the handoff')

let fails = 0
for (let i = 1; i <= MAX; i++) {
  if (!DRY && dirty()) {
    log('\x1b[31mtree is dirty — a real breath must commit ONLY its own move. Commit/stash current work first, or use --dry.\x1b[0m')
    process.exit(1)
  }
  const before = DRY ? '' : head()
  log(`breath ${FOREVER ? i : `${i}/${MAX}`} — spawning a fresh agent…`)
  const code = await spawnBreath()

  if (code !== 0) {
    fails++
    const backoff = Math.min(PACE * 2 ** fails, 15 * 60 * 1000)
    log(`\x1b[33mbreath exited ${code} (possible limit/overload) — backing off ${Math.round(backoff / 1000)}s. State is in git; nothing lost.\x1b[0m`)
    await sleep(backoff)
    continue
  }
  fails = 0

  if (!DRY) {
    if (dirty()) {
      log('\x1b[31mbreath left the tree dirty (no clean commit/revert) — stopping to protect the gate. Inspect, then re-run.\x1b[0m')
      process.exit(1)
    }
    log(head() === before ? 'no commit (rest / nothing to do)' : `committed ${before} → ${head()}`)
    if (rested()) { log('\x1b[32mthe society rests at the 0 — aura whole, gate green. Done.\x1b[0m'); break }
  }

  if (i < MAX) await sleep(PACE)
}
log('loop end.')
