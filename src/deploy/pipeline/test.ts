import { describe, it, expect, afterAll } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync, cpSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { verifyWorkflowViolations, shipOrderViolations, releaseGuards, assertPipelineOrder, stepsOf, testedBeforePublish } from './index'

/** A temp repo carrying a copy of the real workflows, so each law can be broken in isolation. */
const dirs: string[] = []
const repo = (mutate?: (yml: string) => string): string => {
  const d = mkdtempSync(join(tmpdir(), 'erpax-pipe-'))
  mkdirSync(join(d, '.github', 'workflows'), { recursive: true })
  for (const f of ['cloudflare.yml', 'publish-packages.yml']) {
    cpSync(join(process.cwd(), '.github', 'workflows', f), join(d, '.github', 'workflows', f))
  }
  if (mutate) {
    const p = join(d, '.github', 'workflows', 'cloudflare.yml')
    writeFileSync(p, mutate(readFileSync(p, 'utf8')))
  }
  dirs.push(d)
  return d
}
afterAll(() => dirs.forEach((d) => rmSync(d, { recursive: true, force: true })))

/**
 * A temp repo carrying the SHIP path — `erpax deploy app` lives in src/cli/local.ts, and
 * package.json must route through it. The deploy-era laws used to read cloudflare.yml; that
 * workflow stopped deploying when the owner ruled that no secret may stop a deployment, so the
 * laws that govern shipping now read the command that actually ships.
 */
const shipRepo = (mutate?: { local?: (ts: string) => string; pkg?: (json: string) => string }): string => {
  const d = mkdtempSync(join(tmpdir(), 'erpax-ship-'))
  mkdirSync(join(d, 'src', 'cli'), { recursive: true })
  const local = readFileSync(join(process.cwd(), 'src/cli/local.ts'), 'utf8')
  writeFileSync(join(d, 'src/cli/local.ts'), mutate?.local ? mutate.local(local) : local)
  const pkg = readFileSync(join(process.cwd(), 'package.json'), 'utf8')
  writeFileSync(join(d, 'package.json'), mutate?.pkg ? mutate.pkg(pkg) : pkg)
  dirs.push(d)
  return d
}

describe('deploy/pipeline — the verify workflow, which no longer ships', () => {
  it('is clean today', () => {
    expect(verifyWorkflowViolations()).toEqual([])
    expect(releaseGuards()).toEqual([])
    expect(() => assertPipelineOrder()).not.toThrow()
  })

  it('waits-for-ci: a bare push trigger races CI instead of following it', () => {
    const d = repo((y) => y.replace(/on:\n(\s+#[^\n]*\n)*\s+workflow_run:[\s\S]*?branches: \[main, master\]/, 'on:\n  push:\n    branches: [main]'))
    expect(verifyWorkflowViolations(d).some((v) => v.law === 'waits-for-ci')).toBe(true)
  })

  it('green-only: waiting for CI without reading its verdict is worthless', () => {
    const d = repo((y) => y.replace(/github\.event\.workflow_run\.conclusion == 'success'/, 'true'))
    expect(verifyWorkflowViolations(d).some((v) => v.law === 'green-only')).toBe(true)
  })

  it('verified-sha: verifying HEAD instead of the commit CI judged', () => {
    const d = repo((y) => y.replace(/ref: [^\n]*head_sha[^\n]*/, 'ref: main'))
    expect(verifyWorkflowViolations(d).some((v) => v.law === 'verified-sha')).toBe(true)
  })

  // THE OWNER'S RULE AS A LAW. Every run of the old workflow failed at its first step because two
  // secrets were absent, while Cloudflare's git build shipped every push — two deployers racing,
  // one blocked by a secret. A secret reappearing here is that arrangement returning.
  it('no-secret-on-the-path: a secret reference brings back the deployer that never deployed', () => {
    const d = repo((y) => `${y}\n      - name: Sneak\n        run: echo "\${{ secrets.CLOUDFLARE_API_TOKEN }}"\n`)
    expect(verifyWorkflowViolations(d).some((v) => v.law === 'no-secret-on-the-path')).toBe(true)
  })

  it('no-secret-on-the-path: and so does a deploy step', () => {
    const d = repo((y) => `${y}\n      - name: Ship it\n        run: opennextjs-cloudflare deploy\n`)
    expect(verifyWorkflowViolations(d).some((v) => v.law === 'no-secret-on-the-path')).toBe(true)
  })
})

describe('deploy/pipeline — the path that actually ships', () => {
  it('is clean today', () => {
    expect(shipOrderViolations()).toEqual([])
  })

  // THE DEFECT THIS LAW WAS BLIND TO WHILE IT READ THE WORKFLOW: `pnpm deploy` chained
  // `payload migrate && … && erpax deploy app`, so PRODUCTION D1 was migrated before the Worker
  // was built. A failed build left the schema ahead of code that never shipped.
  it('build-before-migrate: catches the migration running before the build', () => {
    // Plant the ACTUAL defect: move the MIGRATE_STEPS loop ABOVE the build, which is exactly the
    // order `pnpm deploy` had while the law was reading cloudflare.yml and saw nothing.
    const d = shipRepo({
      local: (ts) => {
        const loop = "  for (const cmd of MIGRATE_STEPS) {\n    const m = spawnSync(cmd, { shell: true, stdio: 'inherit', cwd, env: process.env })\n    if ((m.status ?? 1) !== 0) return m.status ?? 1\n  }\n"
        if (!ts.includes(loop)) throw new Error('the migrate loop moved — repoint this fixture')
        return ts.replace(loop, '').replace('  const sha = execSync(', `${loop}  const sha = execSync(`)
      },
    })
    expect(shipOrderViolations(d).some((x) => x.law === 'build-before-migrate')).toBe(true)
  })

  it('weigh-before-migrate: catches a Worker that ships unweighed', () => {
    const d = shipRepo({ local: (ts) => ts.replace(/src\/deploy\/fold\/index\.ts/, 'src/deploy/nothing.ts') })
    expect(shipOrderViolations(d).some((x) => x.law === 'weigh-before-migrate')).toBe(true)
  })

  it('weigh-before-migrate: catches a weigh with nothing packed for it to read', () => {
    const d = shipRepo({ local: (ts) => ts.replace(/wrangler deploy --dry-run --outdir[^']*/, 'echo packed-nothing') })
    expect(shipOrderViolations(d).some((x) => x.law === 'weigh-before-migrate')).toBe(true)
  })

  // Every Cloudflare git build ships UNTAGGED, which is why no live version could be traced to a
  // commit until `erpax deploy app` tagged one.
  it('tag-every-deploy: catches an upload that carries no --tag', () => {
    const d = shipRepo({ local: (ts) => ts.replace(/opennextjs-cloudflare deploy --tag=\$\{sha\}/, 'opennextjs-cloudflare deploy') })
    expect(shipOrderViolations(d).some((x) => x.law === 'tag-every-deploy')).toBe(true)
  })

  // A shell `&&` chain has no law reading it: anyone may reorder the steps and nothing objects.
  it('one-ship-path: catches package.json chaining the steps itself again', () => {
    const d = shipRepo({
      pkg: (j) => j.replace(/"deploy": "[^"]*"/, '"deploy": "payload migrate && opennextjs-cloudflare build && opennextjs-cloudflare deploy"'),
    })
    expect(shipOrderViolations(d).some((x) => x.law === 'one-ship-path')).toBe(true)
  })
})

describe('deploy/pipeline — the release refuses a mismatched tag', () => {
  it('asserts tag == version, and BEFORE npm publish — in EVERY publishing job', () => {
    // Matched on what the step RUNS, not on its prose name. Renaming the step broke this
    // proof once while the guard was untouched: a law pinned to a label tests the label.
    const jobs = ['package', 'algebra']
    for (const job of jobs) {
      const steps = stepsOf('publish-packages.yml', job)
      expect(steps.length, `${job} has steps`).toBeGreaterThan(0)
      const assertTag = steps.findIndex((s) => /assert-tag-version\.mjs/.test(s.run))
      const publish = steps.findIndex((s) => /npm publish/.test(s.run))
      expect(assertTag, `${job} asserts the tag`).toBeGreaterThanOrEqual(0)
      expect(publish, `${job} publishes`).toBeGreaterThanOrEqual(0)
      expect(assertTag, `${job} asserts BEFORE it publishes`).toBeLessThan(publish)
    }
  })

  it('the corpus release cuts its GitHub Release only after the citation gate', () => {
    const steps = stepsOf('publish-packages.yml', 'corpus')
    const citation = steps.findIndex((s) => /citation-consistent\.mjs/.test(s.run))
    const release = steps.findIndex((s) => /action-gh-release/.test(s.uses))
    expect(citation).toBeGreaterThanOrEqual(0)
    expect(release).toBeGreaterThan(citation)
  })
})

describe('deploy/pipeline — a publisher that cannot fail is not a release', () => {
  it('every publish workflow tests or gates before it publishes', () => {
    expect(testedBeforePublish()).toEqual([])
  })

  it('CATCHES a publisher with no test step — the state publish-algebra shipped in', () => {
    // It published @erpax/algebra, a package others consume, with no test and
    // no gate: checkout → build → assert tag → publish. Synthetic rather than a
    // mutation of the real file, so the law is tested and not the formatting.
    const d = repo()
    writeFileSync(join(d, '.github', 'workflows', 'publish-naked.yml'), [
      'name: Naked', 'on: { workflow_dispatch: null }', 'jobs:', '  publish:', '    steps:',
      '      - name: Checkout', '      - name: Build', '      - name: Publish to npm', '',
    ].join('\n'))
    const v = testedBeforePublish(d)
    expect(v.some((x) => x.workflow === 'publish-naked.yml' && x.law === 'tested-before-publish')).toBe(true)
  })

  it('a gate AFTER the publish does not count', () => {
    const d = repo()
    writeFileSync(join(d, '.github', 'workflows', 'publish-late.yml'), [
      'name: Late', 'on: { workflow_dispatch: null }', 'jobs:', '  publish:', '    steps:',
      '      - name: Publish to npm', '      - name: Test the package', '',
    ].join('\n'))
    expect(testedBeforePublish(d).some((x) => x.workflow === 'publish-late.yml')).toBe(true)
  })

  it('accepts a publisher that gates FIRST', () => {
    const d = repo()
    writeFileSync(join(d, '.github', 'workflows', 'publish-good.yml'), [
      'name: Good', 'on: { workflow_dispatch: null }', 'jobs:', '  publish:', '    steps:',
      '      - name: Test the package', '      - name: Publish to npm', '',
    ].join('\n'))
    expect(testedBeforePublish(d).filter((x) => x.workflow === 'publish-good.yml')).toEqual([])
  })
})
