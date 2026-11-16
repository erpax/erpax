/**
 * land — one command from a committed branch to production, decided by Arrival.lean's twin
 * (src/utilities/land).
 *
 *   pnpm land          the current branch: push it, open its PR from the last commit if none is open
 *   pnpm land <pr>     a PR that is already open (its branch must be checked out to reconcile it)
 *
 * Then, until it lands or a person is needed:
 * - It reads the PR's REQUIRED checks (`gh pr checks --required`, the ruleset's own list, so no
 *   check is exempted by name) and GitHub's merge state, and asks `nextStep`.
 * - It waits on a run still going.
 * - It updates a branch behind main.
 * - It settles a conflict confined to generated files by taking main's copy and regenerating.
 *   The merge commit runs the hooks.
 * - It stops on a failed check or any other conflict.
 * - Once landed, it squash-merges and waits for the Deployed run of the merge commit.
 * - A Deployed failure is re-run once if production answers (`scripts/smoke.mjs --production`): a
 *   cold start right after a deploy can outlast the smoke's timeouts. A second failure is reported.
 *
 * Never a force push, never --no-verify: every commit it makes runs the hooks.
 */
import { spawnSync } from 'node:child_process'

import { GENERATED, nextStep, reconcilable, type Check } from '@/utilities/land'

const POLL_MS = 20_000
const DEADLINE = Date.now() + 90 * 60_000

const run = (cmd: string, args: readonly string[]): { ok: boolean; out: string; err: string } => {
  const r = spawnSync(cmd, args, { encoding: 'utf8' })
  return { ok: r.status === 0, out: (r.stdout ?? '').trim(), err: (r.stderr ?? '').trim() }
}
const must = (cmd: string, args: readonly string[]): string => {
  const r = run(cmd, args)
  if (!r.ok) throw new Error(`${cmd} ${args.join(' ')}: ${r.err || r.out}`)
  return r.out
}
const gh = (...args: string[]) => must('gh', args)
const git = (...args: string[]) => must('git', args)
const say = (line: string) => console.log(`land · ${line}`)
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const stop = (line: string): never => {
  console.error(`land · stopped: ${line}`)
  process.exit(1)
}

/** The PR to land: the one named, or the current branch's, opened from its last commit if none is open. */
const prOf = (arg: string | undefined): string => {
  if (arg) return arg
  if (git('status', '--porcelain')) stop('the working tree has uncommitted changes')
  git('push', '-u', 'origin', 'HEAD')
  const open = run('gh', ['pr', 'view', '--json', 'number,state', '--jq', 'select(.state == "OPEN") | .number'])
  if (open.ok && open.out) return open.out
  const subject = git('log', '-1', '--format=%s')
  const body = git('log', '-1', '--format=%b')
  return gh('pr', 'create', '--base', 'main', '--title', subject, '--body', body || subject).split('/').pop() as string
}

/** Merge main into the PR's branch; regenerate a conflict confined to generated files, or stop. */
const reconcile = (pr: string): void => {
  const head = gh('pr', 'view', pr, '--json', 'headRefName', '--jq', '.headRefName')
  if (git('rev-parse', '--abbrev-ref', 'HEAD') !== head) stop(`PR #${pr} conflicts with main; check out ${head} to let land reconcile it`)
  git('fetch', 'origin', 'main')
  if (run('git', ['merge', 'origin/main', '-m', `Merge origin/main into ${head}`]).ok) return void git('push')
  const conflicts = git('diff', '--name-only', '--diff-filter=U').split('\n').filter(Boolean)
  if (!reconcilable(conflicts)) {
    git('merge', '--abort')
    stop(`PR #${pr} conflicts with main outside generated files: ${conflicts.filter((c) => !(GENERATED as readonly string[]).includes(c)).join(', ')}`)
  }
  git('checkout', '--theirs', '--', ...conflicts)
  must('pnpm', ['-s', 'generate:types'])
  must('pnpm', ['-s', 'generate:importmap'])
  if (conflicts.includes('src/utilities/verify/lean/inventory.generated.json')) must('./node_modules/.bin/tsx', ['src/utilities/verify/inventory/index.ts'])
  must('./node_modules/.bin/tsx', ['scripts/generate-repo.ts'])
  must('bash', ['scripts/standards-citation-index.sh', '--write-index'])
  git('add', '-A')
  git('commit', '--no-edit')
  git('push')
  say(`reconciled ${conflicts.length} generated file(s) with main: ${conflicts.join(', ')}`)
}

/** The Deployed run for a commit, once it has finished. */
const deployedRun = async (sha: string): Promise<{ id: string; conclusion: string }> => {
  for (;;) {
    if (Date.now() > DEADLINE) stop('the Deployed run did not finish in time')
    const runs = JSON.parse(gh('run', 'list', '--workflow', 'deployed.yml', '--limit', '20', '--json', 'databaseId,headSha,status,conclusion')) as Array<{
      databaseId: number
      headSha: string
      status: string
      conclusion: string
    }>
    const found = runs.find((r) => r.headSha === sha)
    if (found?.status === 'completed') return { id: String(found.databaseId), conclusion: found.conclusion }
    await sleep(POLL_MS)
  }
}

const main = async (): Promise<void> => {
  const pr = prOf(process.argv[2])
  say(`PR #${pr}`)
  for (;;) {
    if (Date.now() > DEADLINE) stop(`PR #${pr} did not land in 90 minutes`)
    const checks = JSON.parse(run('gh', ['pr', 'checks', pr, '--required', '--json', 'name,bucket']).out || '[]') as Check[]
    const state = gh('pr', 'view', pr, '--json', 'mergeStateStatus', '--jq', '.mergeStateStatus')
    const step = nextStep(checks, state)
    if (step === 'merge') break
    if (step === 'stop') {
      const failed = checks.filter((c) => c.bucket === 'fail' || c.bucket === 'cancel').map((c) => c.name)
      stop(failed.length ? `required check(s) failed on PR #${pr}: ${failed.join(', ')}` : `PR #${pr} is ${state} with every required check green`)
    }
    if (step === 'update') {
      gh('pr', 'update-branch', pr)
      say('behind main: branch updated')
    }
    if (step === 'reconcile') reconcile(pr)
    await sleep(POLL_MS)
  }
  gh('pr', 'merge', pr, '--squash')
  const sha = gh('pr', 'view', pr, '--json', 'mergeCommit', '--jq', '.mergeCommit.oid')
  say(`merged as ${sha.slice(0, 10)}; waiting for Deployed`)
  let deployed = await deployedRun(sha)
  if (deployed.conclusion !== 'success') {
    const answers = run('node', ['scripts/smoke.mjs', '--production']).ok
    if (!answers) stop(`Deployed ${deployed.conclusion} for ${sha.slice(0, 10)}, and production does not answer`)
    say('Deployed failed but production answers now: re-running the failed job once')
    gh('run', 'rerun', deployed.id, '--failed')
    await sleep(POLL_MS)
    deployed = await deployedRun(sha)
    if (deployed.conclusion !== 'success') stop(`Deployed ${deployed.conclusion} twice for ${sha.slice(0, 10)}`)
  }
  say(`landed: PR #${pr} is live as ${sha.slice(0, 10)}`)
}

main().catch((err: unknown) => stop(err instanceof Error ? err.message : String(err)))
