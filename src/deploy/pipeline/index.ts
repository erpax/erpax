import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
/**
 * deploy/pipeline — the ORDER of a release is the law, not a convention.
 *
 * A workflow that is correct today is reordered tomorrow by someone fixing an
 * unrelated step. These read the YAML and refuse the orderings that have actually
 * cost this repo something. See ./SKILL.md.
 */

export interface PipelineStep {
  readonly name: string
  readonly index: number
  /**
   * What the step RUNS.
   *
   * A law matched on a step's prose NAME breaks the moment the step is renamed, and says
   * nothing about whether the guard still runs. Renaming "Assert tag matches package
   * version" to "Tag names the version it releases" broke this atom's own proof while the
   * guard itself was untouched — the label moved, the behaviour did not.
   */
  readonly run: string
  /** The action a step USES — the other half of what it actually does. */
  readonly uses: string
}

export interface PipelineViolation {
  readonly workflow: string
  readonly law: string
  readonly reason: string
}

const wfPath = (file: string, cwd: string): string => join(cwd, '.github', 'workflows', file)

/** Ordered step names of a workflow job. */
export function stepsOf(file: string, job: string, cwd: string = process.cwd()): PipelineStep[] {
  const p = wfPath(file, cwd)
  if (!existsSync(p)) return []
  const doc = parse(readFileSync(p, 'utf8')) as {
    jobs?: Record<string, { steps?: { name?: string; run?: string; uses?: string }[] }>
  }
  const steps = doc.jobs?.[job]?.steps ?? []
  return steps
    .map((s, index) => ({ name: s.name ?? s.uses ?? '', index, run: s.run ?? '', uses: s.uses ?? '' }))
    .filter((s) => s.name)
}

const posOf = (steps: readonly PipelineStep[], re: RegExp): number =>
  steps.find((s) => re.test(s.name))?.index ?? -1

/**
 * Every ordering law the deploy must satisfy.
 *
 * Each one is here because the opposite ordering shipped and had a consequence —
 * not because a checklist suggested it.
 */
/** The job that verifies what is live. It is the LAST job of ci.yml, never a workflow of its own. */
const VERIFY_JOB = 'verify-live'

/**
 * THE VERIFY JOB. Nothing in CI deploys — the owner's rule, 2026-09-13: no secret may stop a
 * deployment, so the Worker ships from Cloudflare's own git build and this job only VERIFIES what is
 * live. The deploy-era laws (build-before-migrate, smoke-after-deploy, weigh-before-migrate) judge the
 * path that actually ships, in shipOrderViolations.
 *
 * It was a workflow (cloudflare.yml) on `workflow_run: CI`, checking out `workflow_run.head_sha` so
 * it verified the commit CI judged. CodeQL `actions/cache-poisoning/poisonable-step` refuses exactly
 * that: a workflow_run job holds default-branch cache scope, and executing the triggering SHA under it
 * is untrusted code — and the job never needed the privilege, it reads no secret. So the three laws
 * now read the shape that gives the same guarantees without it: the verify job NEEDS every lane of the
 * run it belongs to (waits-for-ci), inherits their verdict without `always()` (green-only), and checks
 * out the run's own commit with no `ref:` override — `github.sha` IS the judged commit (verified-sha).
 */
export function verifyWorkflowViolations(cwd: string = process.cwd()): PipelineViolation[] {
  const out: PipelineViolation[] = []
  const file = 'ci.yml'
  const p = wfPath(file, cwd)
  if (!existsSync(p)) return out
  const text = readFileSync(p, 'utf8')
  const doc = parse(text) as {
    jobs?: Record<string, { if?: string; needs?: string | string[]; steps?: { name?: string; with?: Record<string, unknown> }[] }>
  }
  const job = doc.jobs?.[VERIFY_JOB]
  if (!job) {
    out.push({ workflow: file, law: 'waits-for-ci', reason: `no \`${VERIFY_JOB}\` job — nothing verifies what is live after CI` })
    return out
  }
  const steps = stepsOf(file, VERIFY_JOB, cwd)
  const jobText = JSON.stringify(job)

  // Every lane that runs on a push is a lane this job must wait for. A lane gated to pull_request
  // never runs on main, and needing a skipped job would skip the verification itself.
  const pushLanes = Object.entries(doc.jobs ?? {})
    .filter(([name, j]) => name !== VERIFY_JOB && !/pull_request/.test(j.if ?? ''))
    .map(([name]) => name)
  const needs = new Set(Array.isArray(job.needs) ? job.needs : job.needs ? [job.needs] : [])
  const missing = pushLanes.filter((l) => !needs.has(l))
  if (missing.length > 0) {
    out.push({ workflow: file, law: 'waits-for-ci', reason: `\`${VERIFY_JOB}\` does not need ${missing.join(', ')} — it races those lanes instead of following them` })
  }
  // `needs` only gates on success while the job keeps the default condition; always() / !cancelled()
  // / failure() re-admit a red run, which is waiting for CI without reading its verdict.
  if (/always\(\)|!\s*cancelled\(\)|failure\(\)/.test(job.if ?? '')) {
    out.push({ workflow: file, law: 'green-only', reason: `\`${VERIFY_JOB}\` runs on a red lane — its \`if\` overrides the success that \`needs\` requires` })
  }
  // The run's own commit is the one every lane above judged. A `ref:` on the checkout verifies some
  // other commit — and, in a privileged context, is the untrusted checkout CodeQL refuses.
  const checkout = (job.steps ?? []).find((s) => JSON.stringify(s).includes('actions/checkout'))
  if (checkout === undefined) {
    out.push({ workflow: file, law: 'verified-sha', reason: `\`${VERIFY_JOB}\` checks nothing out` })
  } else if (checkout.with !== undefined && 'ref' in checkout.with) {
    out.push({ workflow: file, law: 'verified-sha', reason: `checkout pins \`ref: ${String(checkout.with.ref)}\` — it would verify a commit this run never judged` })
  }

  // The deterministic gates run BEFORE the smoke: a red contract or a dead boot explains a red
  // smoke, and finding that out first is cheaper than reading a browser trace.
  const smoke = posOf(steps, /smoke/i)
  for (const [law, re] of [['contract-gate-first', /contract gate/i], ['boot-gate-first', /boot gate/i]] as const) {
    const g = posOf(steps, re)
    if (g < 0) out.push({ workflow: file, law, reason: `no ${law.replace(/-.*/, '')} gate in the verify job` })
    else if (smoke >= 0 && g > smoke) out.push({ workflow: file, law, reason: `"${steps[g]!.name}" runs after the smoke it should precede` })
  }

  // THE OWNER'S RULE, made a law: this job must need no secret. A deploy, a migration or a secrets
  // reference here is the arrangement that failed every run for weeks while the other path shipped —
  // two deployers racing, one blocked by an absent secret.
  if (/secrets\./.test(jobText)) {
    out.push({ workflow: file, law: 'no-secret-on-the-path', reason: 'the verify job reads a secret — it is meant to need none' })
  }
  if (steps.some((st) => /opennextjs-cloudflare deploy|payload migrate|wrangler deploy(?! --dry-run)/.test(st.run))) {
    out.push({ workflow: file, law: 'no-secret-on-the-path', reason: 'the verify job deploys or migrates — shipping belongs to the git build and `erpax deploy app`' })
  }
  return out
}

/**
 * THE PATH THAT SHIPS. `erpax deploy app` (src/cli/local.ts) is the only thing in this repo that
 * uploads a Worker, so the ordering laws are read THERE — from the source, in document order.
 *
 * `package.json` used to chain `payload migrate && … && erpax deploy app` with `&&`, which put the
 * PRODUCTION migration before the build: a failed build left the schema ahead of a Worker that
 * never shipped. A shell chain has no law — anyone may reorder it and nothing objects — so the
 * steps moved into the command, where this reads them.
 */
export function shipOrderViolations(cwd: string = process.cwd()): PipelineViolation[] {
  const out: PipelineViolation[] = []
  const file = 'src/cli/local.ts'
  const p = join(cwd, file)
  if (!existsSync(p)) return out
  const src = readFileSync(p, 'utf8')
  const fn = src.slice(src.indexOf('export function runDeployApp'))
  const body = fn.slice(0, fn.indexOf('\n}\n') + 1)
  if (!body) return out

  const at = (re: RegExp): number => body.search(re)
  const build = at(/opennextjs-cloudflare build/)
  const pack = at(/wrangler deploy --dry-run --outdir/)
  const weigh = at(/deploy\/fold\/index\.ts/)
  const migrate = at(/MIGRATE_STEPS/)
  const upload = at(/opennextjs-cloudflare deploy/)

  if (build < 0) out.push({ workflow: file, law: 'build-before-migrate', reason: 'the deploy command never builds a Worker' })
  else if (migrate >= 0 && migrate < build) {
    out.push({ workflow: file, law: 'build-before-migrate', reason: 'the production migration runs before the build — a failed build leaves production migrated' })
  }
  if (migrate >= 0 && upload >= 0 && migrate > upload) {
    out.push({ workflow: file, law: 'migrate-before-upload', reason: 'the schema is migrated after the Worker is already serving — the new code meets the old schema' })
  }
  // WEIGH BEFORE ANYTHING IRREVERSIBLE — the law that caught the 23.4 MB Turbopack Worker, now read
  // where the shipping happens instead of in a workflow that no longer ships.
  if (weigh < 0) out.push({ workflow: file, law: 'weigh-before-migrate', reason: 'nothing weighs the packed Worker — it ships unread against the 10 MiB ceiling' })
  else if (pack < 0 || pack > weigh) out.push({ workflow: file, law: 'weigh-before-migrate', reason: 'the weigh runs before anything is packed — it reads no bundle' })
  else if (build >= 0 && weigh < build) out.push({ workflow: file, law: 'weigh-before-migrate', reason: 'the weigh runs before the build it should read' })
  else if (migrate >= 0 && weigh > migrate) out.push({ workflow: file, law: 'weigh-before-migrate', reason: 'production is migrated for a Worker not yet known to fit' })
  if (upload < 0) out.push({ workflow: file, law: 'tag-every-deploy', reason: 'the deploy command never uploads' })
  else if (!/opennextjs-cloudflare deploy --tag=/.test(body)) {
    out.push({ workflow: file, law: 'tag-every-deploy', reason: 'the upload carries no --tag — a live version could not be traced to its commit' })
  }

  // The script must ROUTE through the command, or the ordering above is advisory: a `&&` chain in
  // package.json can reorder the same steps with nothing to object.
  const pkg = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')) as { scripts?: Record<string, string> }
  const deployScript = pkg.scripts?.deploy ?? ''
  if (/payload migrate|opennextjs-cloudflare/.test(deployScript)) {
    out.push({ workflow: 'package.json', law: 'one-ship-path', reason: '`pnpm deploy` chains the steps itself — reorderable with no law reading it; route through `erpax deploy app`' })
  }
  return out
}

/** Every ordering law, both families. */
export function pipelineViolations(cwd: string = process.cwd()): PipelineViolation[] {
  return [...verifyWorkflowViolations(cwd), ...shipOrderViolations(cwd)]
}

/**
 * The release must refuse to publish a tag that disagrees with the package version.
 *
 * @invariant publish-packages asserts tag == version, and does so BEFORE npm publish
 */
export function releaseGuards(cwd: string = process.cwd()): PipelineViolation[] {
  const out: PipelineViolation[] = []
  const file = 'publish-packages.yml'
  const steps = stepsOf(file, 'publish', cwd)
  if (steps.length === 0) return out
  const assertTag = posOf(steps, /tag matches package version/i)
  const publish = posOf(steps, /Publish to npm/i)
  if (assertTag < 0) out.push({ workflow: file, law: 'tag-matches-version', reason: 'no step asserts the tag matches the package version' })
  else if (publish >= 0 && assertTag > publish) {
    out.push({ workflow: file, law: 'tag-matches-version', reason: 'the tag/version assertion runs AFTER the publish' })
  }
  return out
}

/**
 * Every PUBLISHING workflow must test what it publishes, before it publishes.
 *
 * publish-algebra shipped @erpax/algebra — the core-math package others consume —
 * with no test and no gate at all: checkout, build, assert tag, publish. A publisher
 * that cannot fail is not a release; it is a copy.
 */
export function testedBeforePublish(cwd: string = process.cwd()): PipelineViolation[] {
  const out: PipelineViolation[] = []
  const dir = join(cwd, '.github', 'workflows')
  if (!existsSync(dir)) return out
  for (const file of readdirSync(dir).filter((f) => /^publish-.*\.ya?ml$/.test(f))) {
    const doc = parse(readFileSync(join(dir, file), 'utf8')) as {
      jobs?: Record<string, { steps?: { name?: string; run?: string; uses?: string }[] }>
    }
    for (const [jobName, job] of Object.entries(doc.jobs ?? {})) {
      const steps = (job.steps ?? [])
        .map((x, i) => ({ name: x.name ?? '', index: i, run: x.run ?? '', uses: x.uses ?? '' }))
        .filter((x) => x.name)
      const publish = posOf(steps, /publish to npm/i)
      if (publish < 0) continue
      const verified = steps.filter((x) => /\bgate\b|\btest\b/i.test(x.name) && x.index < publish)
      if (verified.length === 0) {
        out.push({ workflow: file, law: 'tested-before-publish', reason: `job "${jobName}" publishes with no test or gate step before it` })
      }
    }
  }
  return out
}

/** Fail closed. Zero is a theorem: there is no acceptable number of these. */
export function assertPipelineOrder(cwd: string = process.cwd()): void {
  const all = [...pipelineViolations(cwd), ...releaseGuards(cwd), ...testedBeforePublish(cwd)]
  if (all.length === 0) return
  throw new Error(
    `✗ deploy pipeline order:\n${all.map((v) => `  [${v.law}] ${v.workflow} — ${v.reason}`).join('\n')}`,
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  void (async () => {
    try {
      assertPipelineOrder()
      console.log('✓ deploy pipeline — waits for green CI, builds before migrating, gates before deploying, smokes after')
    } catch (e) {
      console.error((e as Error).message)
      process.exit(1)
    }
  })()
}

/** @index-cross.foldback child=deploy/pipeline parent=deploy — this cross folds back into its parent. */
