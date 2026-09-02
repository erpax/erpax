import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { requiredSecrets, missingSecrets, formatSecretVerdict, configuredSecretNames } from './index'

const fixture = (workflows: Record<string, string>): string => {
  const tmp = mkdtempSync(join(tmpdir(), 'erpax-secret-'))
  mkdirSync(join(tmp, '.github', 'workflows'), { recursive: true })
  for (const [name, body] of Object.entries(workflows)) {
    writeFileSync(join(tmp, '.github', 'workflows', name), body)
  }
  return tmp
}

describe('deploy/secret — a lane that cannot run should not be discovered by pushing', () => {
  it('reads what the workflows declare they need', () => {
    const tmp = fixture({
      'deploy.yml': 'jobs:\n  a:\n    env:\n      T: ${{ secrets.CLOUDFLARE_API_TOKEN }}\n      P: ${{ secrets.PAYLOAD_SECRET }}\n',
    })
    expect(requiredSecrets(tmp).map((r) => r.name).sort()).toEqual(['CLOUDFLARE_API_TOKEN', 'PAYLOAD_SECRET'])
    rmSync(tmp, { recursive: true, force: true })
  })

  it('GITHUB_TOKEN is not a requirement — Actions always injects it', () => {
    const tmp = fixture({ 'ci.yml': 'jobs:\n  a:\n    env:\n      G: ${{ secrets.GITHUB_TOKEN }}\n' })
    expect(requiredSecrets(tmp)).toEqual([])
    rmSync(tmp, { recursive: true, force: true })
  })

  it('names the workflow, because that is the lane that dies', () => {
    const tmp = fixture({
      'a.yml': 'env:\n  X: ${{ secrets.SHARED }}\n',
      'b.yml': 'env:\n  X: ${{ secrets.SHARED }}\n',
    })
    const req = requiredSecrets(tmp)
    expect(req).toHaveLength(2)
    expect(req.map((r) => r.workflow).sort()).toEqual(['a.yml', 'b.yml'])
    rmSync(tmp, { recursive: true, force: true })
  })

  it('a repo with no workflows requires nothing — and does not throw', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'erpax-secret-'))
    expect(requiredSecrets(tmp)).toEqual([])
    rmSync(tmp, { recursive: true, force: true })
  })

  /*
   * THE FAIL-OPEN CLAUSE. An unauthenticated gh, a plane, or a token without the secrets scope
   * must report UNKNOWN — never "missing". A shell glob that errored and returned nothing once
   * let this corpus read absence of evidence as evidence of absence ([[rules]]/unraised), and a
   * gate that cries wolf offline is a gate nobody reads.
   */
  it('an unlistable inventory is UNKNOWN, never a manufactured missing secret', () => {
    const tmp = fixture({ 'deploy.yml': 'env:\n  T: ${{ secrets.NEVER_CONFIGURED }}\n' })
    const inventory = configuredSecretNames(tmp)
    const verdict = missingSecrets(tmp)
    if (!inventory.known) {
      expect(verdict.known).toBe(false)
      expect(verdict.missing).toEqual([])
      expect(formatSecretVerdict(verdict)).toContain('UNKNOWN')
    } else {
      // gh answered for THIS repo's org/repo, so the fixture's invented name is genuinely absent.
      expect(verdict.missing.map((m) => m.name)).toContain('NEVER_CONFIGURED')
    }
    rmSync(tmp, { recursive: true, force: true })
  })

  it('the report names the lane and where to fix it, not just a count', () => {
    const text = formatSecretVerdict({
      known: true,
      why: 'test',
      missing: [{ name: 'CLOUDFLARE_API_TOKEN', workflow: 'cloudflare.yml' }],
    })
    expect(text).toContain('cloudflare.yml')
    expect(text).toContain('CLOUDFLARE_API_TOKEN')
    expect(text).toContain('Settings')
  })
})
