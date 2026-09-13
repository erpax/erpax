import { describe, expect, it } from 'vitest'
import {
  checkRowOf,
  cureFor,
  isUnknownCommit,
  jsonLines,
  pushVerdict,
  repoSlugOf,
  runRowOf,
  type CheckRow,
  type RunRow,
} from '@/arrival'

const SHA = '7fdb5c226aa11223344556677889900aabbccdde'
const OTHER = '0000000011112222333344445555666677778888'
const row = (workflowName: string, status: string, conclusion: string | null, headSha = SHA, event = 'push'): RunRow => ({
  workflowName,
  status,
  conclusion,
  headSha,
  event,
})

describe('arrival — the verdict, its laws pinned (ported from uuidna)', () => {
  // A poll is always faster than a queue, so the first answer is almost always "no runs yet".
  it('no run for the sha is UNMEASURED, never a pass', () => {
    const v = pushVerdict(SHA, [])
    expect(v.ok).toBe(false)
    expect(v.measured).toBe(false)
    expect(v.settled).toBe(false)
    expect(v.reason).toMatch(/UNMEASURED.*not a pass/)
  })

  it('runs for a different sha do not answer for this one', () => {
    const v = pushVerdict(SHA, [row('CI', 'completed', 'success', OTHER)])
    expect(v.measured).toBe(false)
    expect(v.ok).toBe(false)
  })

  it('a failing workflow is named with its conclusion; a running one is pending', () => {
    const v = pushVerdict(SHA, [row('CI', 'completed', 'failure'), row('Other', 'in_progress', null)])
    expect(v.failing).toEqual(['CI (failure)'])
    expect(v.pending).toEqual(['Other'])
    expect(v.ok).toBe(false)
  })

  it('a cancelled run does not block a push something else judged — and is named in the reason', () => {
    const v = pushVerdict(SHA, [row('CI', 'completed', 'cancelled'), row('Other', 'completed', 'success')])
    expect(v.ok).toBe(true)
    expect(v.didNotJudge).toEqual(['CI (cancelled)'])
    expect(v.reason).toMatch(/did NOT judge: CI \(cancelled\)/)
  })

  // Absence-of-failure over a set where nothing judged once read green.
  it('ALL CANCELLED is UNMEASURED — a set with no judge is not a pass', () => {
    const v = pushVerdict(SHA, [row('CI', 'completed', 'cancelled'), row('Other', 'completed', 'skipped')])
    expect(v.ok).toBe(false)
    expect(v.measured).toBe(false)
    expect(v.reason).toMatch(/NOT ONE JUDGED/)
  })

  // The control: a green push must pass, or the arm blocks every landing and is switched off in a week.
  it('every workflow green is ok — the arm can pass', () => {
    const v = pushVerdict(SHA, [row('CI', 'completed', 'success')])
    expect(v).toMatchObject({ ok: true, measured: true, settled: true })
  })

  it('a short sha matches by prefix; one below seven characters is refused', () => {
    expect(pushVerdict(SHA.slice(0, 9), [row('CI', 'completed', 'failure')]).measured).toBe(true)
    expect(() => pushVerdict('7fdb', [])).toThrow(/too short/)
  })

  // erpax's deploy IS this shape: the Cloudflare workflow runs on `workflow_run`, on the same sha as the push.
  it('a non-push run on the same sha is reported, never judged', () => {
    const v = pushVerdict(SHA, [row('CI', 'completed', 'success'), row('Cloudflare', 'completed', 'failure', SHA, 'workflow_run')])
    expect(v.ok).toBe(true)
    expect(v.failing).toEqual([])
    expect(v.notThisPush).toEqual(['Cloudflare (workflow_run: failure)'])
    expect(v.reason).toMatch(/NOT this push: Cloudflare/)
  })

  it('a sha carrying only non-push runs is UNMEASURED', () => {
    const v = pushVerdict(SHA, [row('Scheduled', 'completed', 'success', SHA, 'dynamic')])
    expect(v.ok).toBe(false)
    expect(v.reason).toMatch(/NOT ONE WAS A PUSH/)
  })
})

describe('arrival — the check surface', () => {
  const ci: RunRow = { ...row('CI', 'completed', 'success'), databaseId: 900 }
  const chk = (name: string, conclusion: string | null, appSlug = 'github-actions', runId: number | null = 900, status = 'completed'): CheckRow => ({
    name,
    status,
    conclusion,
    appSlug,
    runId,
  })
  const green = [chk('Lint', 'success'), chk('TypeScript', 'success')]

  it('a failing check that no workflow row shows is SEEN', () => {
    const v = pushVerdict(SHA, [ci], [...green, chk('Some new job', 'failure')])
    expect(v.ok).toBe(false)
    expect(v.failing).toEqual(['Some new job (failure)'])
  })

  it('an exempt first-party check that FAILS still refuses: exemption covers lateness, not fault', () => {
    expect(pushVerdict(SHA, [ci], [...green, chk('Analyze (actions)', 'failure')]).failing).toEqual(['Analyze (actions) (failure)'])
  })

  it('the same exempt check merely pending does not block', () => {
    const v = pushVerdict(SHA, [ci], [...green, chk('Analyze (actions)', null, 'github-actions', 900, 'in_progress')])
    expect(v.ok).toBe(true)
  })

  it('an unrostered foreign check is judged normally and named, never defaulted', () => {
    const v = pushVerdict(SHA, [ci], [...green, chk('Vercel', 'failure', 'vercel', null)])
    expect(v.ok).toBe(false)
    expect(v.rosterGaps.some((g) => g.includes('Vercel'))).toBe(true)
  })

  it('a check whose run is not among the sha runs is unattributed — named, not dropped, not judged', () => {
    const v = pushVerdict(SHA, [ci], [...green, chk('Orphan', 'failure', 'github-actions', 12345)])
    expect(v.ok).toBe(true)
    expect(v.rosterGaps.some((g) => g.startsWith('Orphan'))).toBe(true)
  })
})

// THE REAL ROWS. erpax d5ffea88c7, 2026-09-12, as `gh api --jq` answered them: every job of the CI push run
// green, the hook green — and a foreign Cloudflare build red that appears in no workflow list.
describe('arrival — erpax d5ffea88c7, replayed from the forge', () => {
  const E = 'd5ffea88c7e4b8ade4a69c66ee2238576ae8b28b'
  const runsOut = [
    { name: 'Scheduled', head_sha: E, status: 'completed', conclusion: 'success', event: 'dynamic', id: 34723112119 },
    { name: 'Cloudflare', head_sha: E, status: 'completed', conclusion: 'failure', event: 'workflow_run', id: 34704206736 },
    { name: 'Push on main', head_sha: E, status: 'completed', conclusion: 'success', event: 'dynamic', id: 34703497721 },
    { name: 'CI', head_sha: E, status: 'completed', conclusion: 'success', event: 'push', id: 34703497770 },
  ]
    .map((o) => JSON.stringify(o))
    .join('\n')
  const job = (run: number): string => `https://github.com/erpax/erpax/actions/runs/${run}/job/1`
  const checksOut = [
    { name: 'Workers Builds: erpax', status: 'completed', conclusion: 'failure', app: 'cloudflare-workers-and-pages', details_url: 'https://dash.cloudflare.com/x/workers/services/view/erpax/production/builds/5035134b' },
    { name: 'Lint', status: 'completed', conclusion: 'success', app: 'github-actions', details_url: job(34703497770) },
    { name: 'TypeScript', status: 'completed', conclusion: 'success', app: 'github-actions', details_url: job(34703497770) },
    { name: 'Integration Tests (shard 7/16)', status: 'completed', conclusion: 'success', app: 'github-actions', details_url: job(34703497770) },
    { name: 'Playwright UI', status: 'completed', conclusion: 'skipped', app: 'github-actions', details_url: job(34703497770) },
    { name: 'Deploy + UI smoke', status: 'completed', conclusion: 'failure', app: 'github-actions', details_url: job(34704206736) },
    { name: 'Analyze (actions)', status: 'completed', conclusion: 'success', app: 'github-actions', details_url: job(34703497721) },
  ]
    .map((o) => JSON.stringify(o))
    .join('\n')
  const runs = jsonLines(runsOut).map(runRowOf)
  const checks = jsonLines(checksOut).map(checkRowOf)

  it('the green hook and green CI do not make a landing — the foreign build is red, judged and named', () => {
    const v = pushVerdict(E, runs, checks)
    expect(v.ok).toBe(false)
    expect(v.failing).toEqual(['Workers Builds: erpax (failure)'])
    expect(v.rosterGaps.some((g) => g.startsWith('Workers Builds: erpax'))).toBe(true)
  })

  it('the deploy, a workflow_run of CI, is reported and not judged as this push', () => {
    const v = pushVerdict(E, runs, checks)
    expect(v.notThisPush).toContain('Deploy + UI smoke (workflow_run: failure)')
    expect(v.didNotJudge).toEqual(['Playwright UI (skipped)'])
  })

  it('with the foreign build decided away, the same rows are a landing', () => {
    const v = pushVerdict(E, runs, checks.filter((c) => c.appSlug !== 'cloudflare-workers-and-pages'))
    expect(v).toMatchObject({ ok: true, measured: true, settled: true })
    expect(v.reason).toMatch(/3 check\(s\) passed/)
  })
})

describe('arrival — reading the forge', () => {
  it('a run row with no event is refused, never defaulted', () => {
    expect(() => runRowOf({ name: 'CI', head_sha: SHA, status: 'completed', conclusion: 'success' })).toThrow(/carries no `event`/)
  })

  it('a missing conclusion is null, not the string "undefined"', () => {
    expect(runRowOf({ name: 'CI', head_sha: SHA, status: 'in_progress', event: 'push' }).conclusion).toBeNull()
  })

  it('a line that is not an object is refused rather than read as "no runs"', () => {
    expect(() => jsonLines('[1,2]')).toThrow(/not an object/)
    expect(jsonLines('\n\n')).toEqual([])
  })

  it('a foreign check has no run id; an Actions check recovers its run from details_url', () => {
    expect(checkRowOf({ name: 'x', app: 'cloudflare-workers-and-pages', details_url: 'https://dash.cloudflare.com/a' }).runId).toBeNull()
    expect(checkRowOf({ name: 'y', app: { slug: 'github-actions' }, details_url: 'https://github.com/o/r/actions/runs/42/job/7' })).toMatchObject({
      appSlug: 'github-actions',
      runId: 42,
    })
  })

  it('repoSlugOf reads either remote form and refuses what it cannot read', () => {
    expect(repoSlugOf('https://github.com/erpax/erpax.git')).toBe('erpax/erpax')
    expect(repoSlugOf('git@github.com:erpax/erpax.git\n')).toBe('erpax/erpax')
    expect(() => repoSlugOf('https://gitlab.com/erpax/erpax.git')).toThrow(/cannot read/)
  })

  it('an unindexed commit is recognised; a forge that cannot be asked is not', () => {
    expect(isUnknownCommit('gh: No commit found for SHA: 389ff689 (HTTP 422)')).toBe(true)
    expect(isUnknownCommit('gh: Not Found (HTTP 404)')).toBe(true)
    expect(isUnknownCommit('gh: authentication required (HTTP 401)')).toBe(false)
    expect(isUnknownCommit('gh: command not found')).toBe(false)
  })
})

describe('arrival — the taught cure', () => {
  it('behind the shared tree is recognised in both of git’s spellings', () => {
    expect(cureFor(' ! [rejected]        main -> main (fetch first)')?.name).toBe('behind the shared tree')
    expect(cureFor(' ! [rejected]        main -> main (non-fast-forward)')?.name).toBe('behind the shared tree')
    expect(cureFor('hint: the tip of your current branch is behind')?.name).toBe('behind the shared tree')
  })

  // The real line the hook printed on 2026-09-13, and the spelling it prints since the remedy was corrected.
  it('a stale standards index is recognised in the line the hook really prints', () => {
    expect(cureFor('ERROR: docs/STANDARDS_INDEX.md is stale. Run: pnpm standards:write-index')?.name).toBe('stale standards index')
    expect(cureFor('ERROR: docs/STANDARDS_INDEX.md is stale. Run: bash scripts/standards-citation-index.sh --write-index')?.name).toBe(
      'stale standards index',
    )
    expect(cureFor('ERROR: docs/STANDARDS_INDEX.md does not exist. Run: …')?.name).toBe('stale standards index')
  })

  it('the index cure commits only the index, by path', () => {
    const cmd = cureFor('docs/STANDARDS_INDEX.md is stale')!.cmd
    expect(cmd).toMatch(/-- docs\/STANDARDS_INDEX\.md$/)
    expect(cmd).not.toMatch(/git add -A|git add \.|--no-verify|--force/)
  })

  it('a hook denial has no taught cure — it stops for a human', () => {
    expect(cureFor('✖ folder law: 1 violation\nerror: failed to push some refs')).toBeUndefined()
  })

  it('the cure integrates and never forces', () => {
    const cmd = cureFor('(fetch first) [rejected]')?.cmd ?? cureFor(' ! [rejected] main -> main (fetch first)')!.cmd
    expect(cmd).not.toMatch(/--force|--no-verify|reset --hard/)
    expect(cmd).toMatch(/merge --abort/)
  })
})
