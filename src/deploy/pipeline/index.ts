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
  const doc = parse(readFileSync(p, 'utf8')) as { jobs?: Record<string, { steps?: { name?: string }[] }> }
  const steps = doc.jobs?.[job]?.steps ?? []
  return steps.map((s, index) => ({ name: s.name ?? '', index })).filter((s) => s.name)
}

const posOf = (steps: readonly PipelineStep[], re: RegExp): number =>
  steps.find((s) => re.test(s.name))?.index ?? -1

/**
 * Every ordering law the deploy must satisfy.
 *
 * Each one is here because the opposite ordering shipped and had a consequence —
 * not because a checklist suggested it.
 */
export function pipelineViolations(cwd: string = process.cwd()): PipelineViolation[] {
  const out: PipelineViolation[] = []
  const file = 'cloudflare.yml'
  const p = wfPath(file, cwd)
  if (!existsSync(p)) return out

  const doc = parse(readFileSync(p, 'utf8')) as {
    on?: Record<string, unknown>
    jobs?: Record<string, { if?: string; steps?: { name?: string; with?: Record<string, unknown> }[] }>
  }
  const job = doc.jobs?.deploy
  const steps = stepsOf(file, 'deploy', cwd)

  // 1. Deploy must WAIT for CI. Both once triggered on `push: main` independently and
  //    raced — a commit with failing tests still deployed.
  if (!doc.on || !('workflow_run' in doc.on)) {
    out.push({ workflow: file, law: 'waits-for-ci', reason: 'deploy does not trigger on workflow_run — it races CI instead of following it' })
  }

  // 2. …and only on a GREEN one. Waiting is worthless without checking the verdict.
  if (!/workflow_run\.conclusion\s*==\s*'success'/.test(job?.if ?? '')) {
    out.push({ workflow: file, law: 'green-only', reason: "the job does not require workflow_run.conclusion == 'success'" })
  }

  // 3. Check out the commit CI VERIFIED, not whatever the branch points at now.
  const checkout = (doc.jobs?.deploy?.steps ?? []).find((s) => JSON.stringify(s).includes('actions/checkout'))
  if (!JSON.stringify(checkout?.with ?? {}).includes('workflow_run.head_sha')) {
    out.push({ workflow: file, law: 'verified-sha', reason: 'checkout does not pin workflow_run.head_sha — a push during CI would deploy untested code' })
  }

  // 4. BUILD BEFORE MIGRATE. Migrating first left the PRODUCTION schema ahead of a
  //    Worker that never shipped, with nothing to roll it back.
  const build = posOf(steps, /^Build\b/i)
  const migrate = posOf(steps, /Migrate remote D1/i)
  if (build >= 0 && migrate >= 0 && migrate < build) {
    out.push({ workflow: file, law: 'build-before-migrate', reason: `"${steps[migrate]!.name}" runs before "${steps[build]!.name}" — a failed build leaves production migrated` })
  }

  // 5. The deterministic gates belong IN FRONT of a deploy, not after it.
  const deployStep = posOf(steps, /^Deploy$/i)
  for (const [law, re] of [['contract-gate-first', /Contract gate/i], ['boot-gate-first', /Boot gate/i]] as const) {
    const g = posOf(steps, re)
    if (g < 0) out.push({ workflow: file, law, reason: `no ${law.replace(/-.*/, '')} gate before deploy` })
    else if (deployStep >= 0 && g > deployStep) out.push({ workflow: file, law, reason: `"${steps[g]!.name}" runs after the deploy` })
  }

  // 6. Smoke AFTER deploy — it tests the deployed Worker, so before is meaningless.
  const smoke = posOf(steps, /UI smoke/i)
  if (smoke >= 0 && deployStep >= 0 && smoke < deployStep) {
    out.push({ workflow: file, law: 'smoke-after-deploy', reason: 'the UI smoke runs before the deploy it is meant to test' })
  }
  return out
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
 * publish-algebra shipped @erpax/algebra — the MIT core-math package others consume —
 * with no test and no gate at all: checkout, build, assert tag, publish. A publisher
 * that cannot fail is not a release; it is a copy.
 */
export function testedBeforePublish(cwd: string = process.cwd()): PipelineViolation[] {
  const out: PipelineViolation[] = []
  const dir = join(cwd, '.github', 'workflows')
  if (!existsSync(dir)) return out
  for (const file of readdirSync(dir).filter((f) => /^publish-.*\.ya?ml$/.test(f))) {
    const doc = parse(readFileSync(join(dir, file), 'utf8')) as {
      jobs?: Record<string, { steps?: { name?: string }[] }>
    }
    for (const [jobName, job] of Object.entries(doc.jobs ?? {})) {
      const steps = (job.steps ?? []).map((x, i) => ({ name: x.name ?? '', index: i })).filter((x) => x.name)
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
