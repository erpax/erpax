import { describe, it, expect, afterAll } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync, cpSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pipelineViolations, releaseGuards, assertPipelineOrder, stepsOf } from './index'

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

describe('deploy/pipeline — the live pipeline obeys every ordering law', () => {
  it('is clean today', () => {
    expect(pipelineViolations()).toEqual([])
    expect(releaseGuards()).toEqual([])
    expect(() => assertPipelineOrder()).not.toThrow()
  })

  it('reads the deploy steps in document order', () => {
    const names = stepsOf('cloudflare.yml', 'deploy').map((s) => s.name)
    expect(names.indexOf('Migrate remote D1')).toBeGreaterThan(names.findIndex((n) => /^Build/.test(n)))
    expect(names.indexOf('Deploy')).toBeGreaterThan(names.indexOf('Migrate remote D1'))
  })
})

describe('deploy/pipeline — each law CATCHES its own reordering', () => {
  it('waits-for-ci: a bare push trigger races CI', () => {
    // The original defect: ci.yml and cloudflare.yml both fired on push:main, so a
    // commit with failing tests deployed anyway.
    const d = repo((y) => y.replace(/  workflow_run:[\s\S]*?branches: \[main, master\]/, '  push:\n    branches: [main, master]'))
    expect(pipelineViolations(d).some((v) => v.law === 'waits-for-ci')).toBe(true)
  })

  it('green-only: waiting for CI without checking its verdict is worthless', () => {
    const d = repo((y) => y.replace(/github\.event\.workflow_run\.conclusion == 'success'/, 'true'))
    expect(pipelineViolations(d).some((v) => v.law === 'green-only')).toBe(true)
  })

  it('verified-sha: deploying HEAD instead of the tested commit', () => {
    const d = repo((y) => y.replace(/ref: \$\{\{ github\.event\.workflow_run\.head_sha \|\| github\.ref \}\}/, 'ref: main'))
    expect(pipelineViolations(d).some((v) => v.law === 'verified-sha')).toBe(true)
  })

  it('build-before-migrate: a failed build must not leave production migrated', () => {
    // Swap the two step names — the exact ordering that shipped before today.
    const d = repo((y) => y.replace('- name: Build (OpenNext → Workers, lean next build)', '- name: ZZ-placeholder')
      .replace('- name: Migrate remote D1', '- name: Build (OpenNext → Workers, lean next build)')
      .replace('- name: ZZ-placeholder', '- name: Migrate remote D1'))
    expect(pipelineViolations(d).some((v) => v.law === 'build-before-migrate')).toBe(true)
  })

  it('contract-gate-first: a deterministic gate after the deploy protects nothing', () => {
    const d = repo((y) => y.replace(/      - name: Contract gate[\s\S]*?tsx src\/outward\/gate\/index\.ts\n\n/, ''))
    expect(pipelineViolations(d).some((v) => v.law === 'contract-gate-first')).toBe(true)
  })

  it('boot-gate-first: the config must load before anything ships', () => {
    const d = repo((y) => y.replace(/      - name: Boot gate[\s\S]*?tsx src\/run\/load\/index\.ts\n\n/, ''))
    expect(pipelineViolations(d).some((v) => v.law === 'boot-gate-first')).toBe(true)
  })
})

describe('deploy/pipeline — the release refuses a mismatched tag', () => {
  it('asserts tag == version, and BEFORE npm publish', () => {
    const steps = stepsOf('publish-packages.yml', 'publish').map((s) => s.name)
    const assertTag = steps.findIndex((n) => /tag matches package version/i.test(n))
    const publish = steps.findIndex((n) => /Publish to npm/i.test(n))
    expect(assertTag).toBeGreaterThanOrEqual(0)
    expect(assertTag).toBeLessThan(publish)
  })
})
