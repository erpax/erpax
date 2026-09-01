/**
 * confirm/seal-and-push — the Cursor `stop` hook body, in TypeScript (run via tsx).
 *
 * When a prompt leaves a COMPLETE SEALED tree, immediately save → commit → push,
 * harmonizing all on the way in waves:
 *   1. pnpm confirm:full  — the authoritative whole-corpus seal (payload ⊕ vitepress
 *      ⊕ build). ONLY a green seal may commit; an unsealed tree is left untouched.
 *   2. git commit         — fires husky pre-commit (regenerate artefacts + the seal).
 *   3. git push           — fires husky pre-push (auto-heal + the full gate again).
 *
 * Safety: runs DETACHED so the agent turn never blocks on test:int; a single lock
 * prevents overlapping waves; commits the whole tree only after a green seal; pushes
 * ONLY to an existing upstream on a real branch — never force, never --no-verify;
 * fail-open for the turn, fail-closed for the seal. Every decision is logged to
 * .git/seal-and-push.log (inside .git → never committed).
 *
 * @standard ISO-19011:2018 audit-trail self-heal-visible-in-git-log
 * @see ./index.ts (the confirm seal this hook gates on) · ../../.cursor/hooks.json (registration)
 */
import { spawn, execSync } from 'node:child_process'
import { existsSync, mkdirSync, rmdirSync, appendFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const SELF = fileURLToPath(import.meta.url)

function repoRoot(): string {
  try {
    return execSync('git rev-parse --show-toplevel', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim()
  } catch {
    process.exit(0)
  }
}

const ROOT = repoRoot()
process.chdir(ROOT)

const LOG = `${ROOT}/.git/seal-and-push.log`
const LOCK = `${ROOT}/.git/seal-and-push.lock`
const ts = (): string => new Date().toISOString()
const log = (msg: string): void => {
  try {
    appendFileSync(LOG, `[${ts()}] ${msg}\n`)
  } catch {
    /* logging is best-effort */
  }
}

/** A quiet shell call; returns trimmed stdout or null on any non-zero exit. */
function sh(cmd: string): string | null {
  try {
    return execSync(cmd, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim()
  } catch {
    return null
  }
}

function dirty(): boolean {
  const s = sh('git status --porcelain')
  return !!s && s.length > 0
}

// ── Foreground: never block the turn — relaunch detached, then return. ──
if (process.env.SEAL_AND_PUSH_BG !== '1') {
  if (!dirty()) process.exit(0) // nothing to seal
  const child = spawn(process.execPath, ['--import', 'tsx/esm', SELF], {
    cwd: ROOT,
    detached: true,
    stdio: 'ignore',
    env: { ...process.env, SEAL_AND_PUSH_BG: '1' },
  })
  child.unref()
  process.exit(0)
}

// ── Background worker ──
try {
  mkdirSync(LOCK) // throws if a wave is already in flight
} catch {
  process.exit(0)
}
const release = (): void => {
  try {
    rmdirSync(LOCK)
  } catch {
    /* already gone */
  }
}
process.on('exit', release)

function run(): void {
  log(`seal-and-push: wave start on ${sh('git rev-parse --short HEAD') ?? '(no HEAD)'}`)

  if (
    existsSync(`${ROOT}/.git/MERGE_HEAD`) ||
    existsSync(`${ROOT}/.git/rebase-merge`) ||
    existsSync(`${ROOT}/.git/rebase-apply`)
  ) {
    log('skip: repository is mid-merge/rebase')
    return
  }
  const branch = sh('git symbolic-ref --quiet --short HEAD')
  if (!branch) {
    log('skip: detached HEAD')
    return
  }
  if (!dirty()) {
    log('skip: clean tree')
    return
  }
  if (sh('command -v pnpm') === null) {
    log('skip: pnpm not on PATH')
    return
  }

  // Wave 1 — the full seal. ONLY a green seal may commit.
  log('wave 1: pnpm confirm:full')
  try {
    execSync('pnpm run -s confirm:full', { cwd: ROOT, stdio: 'inherit' })
  } catch {
    log('NOT SEALED — confirm:full failed; leaving the tree untouched')
    return
  }

  // Wave 2 — commit the whole sealed tree (husky pre-commit harmonizes).
  sh('git add -A')
  if (sh('git diff --cached --name-only') === null || (sh('git diff --cached --name-only') ?? '') === '') {
    log('skip: nothing staged after add')
    return
  }
  const stat = sh('git diff --cached --stat | tail -1') ?? ''
  const msg = `atoms: auto-seal ${ts()}\n\nSealed by confirm:full and committed by the Cursor stop hook.\n${stat}`
  log('wave 2: git commit')
  try {
    execSync('git commit -F -', { cwd: ROOT, input: msg, stdio: ['pipe', 'ignore', 'pipe'] })
  } catch {
    log('commit aborted (husky pre-commit gate) — left as staged')
    return
  }

  // Wave 3 — push to the existing upstream only (husky pre-push harmonizes).
  if (sh("git rev-parse --abbrev-ref --symbolic-full-name '@{u}'") !== null) {
    log(`wave 3: git push origin ${branch}`)
    try {
      execSync('git push', { cwd: ROOT, stdio: 'inherit' })
      log(`pushed ${branch} → upstream OK`)
    } catch {
      log('push failed (gate/network) — commit retained locally')
    }
  } else {
    log(`no upstream for ${branch} — committed locally, not pushed`)
  }
  log('seal-and-push: wave done')
}

run()
