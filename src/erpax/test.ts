import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import {
  ERPAX_CANONICAL_REPO,
  ERPAX_SKILL_ENTRY,
  wireFromRepoUrl,
  erpaxApiDiscoveryPayload,
} from './index'

describe('erpax — the orientation face', () => {
  it('the wire resolves the canonical repo to its sealed skill entry', () => {
    const w = wireFromRepoUrl(ERPAX_CANONICAL_REPO)
    expect(w.ok).toBe(true)
    if (!w.ok) return
    expect(w.repoUrl).toBe(ERPAX_CANONICAL_REPO)
    expect(w.entryPoint).toBe(ERPAX_SKILL_ENTRY)
    expect(w.contentUuid.length).toBeGreaterThan(0)
  })

  it('REFUSES a url that is not this corpus — an orientation to nowhere is worse than none', () => {
    const w = wireFromRepoUrl('https://github.com/someone/else')
    expect(w.ok).toBe(false)
    if (w.ok) return
    expect(w.reason.length).toBeGreaterThan(0)
  })

  it('states the law and the tiered licence in the form leg, not as code', () => {
    // Prose belongs in SKILL.md and the shipped README; a constant holding text is a
    // second copy of what the form leg already says, and it cracks the matrix ratchet.
    const skill = readFileSync(join(process.cwd(), 'src/erpax/SKILL.md'), 'utf8')
    expect(skill).toMatch(/CC-BY-NC-ND-4\.0/)
    const readme = readFileSync(join(process.cwd(), 'packages/erpax/README.md'), 'utf8')
    expect(readme).toMatch(/Zero entropy/)
    expect(readme).toMatch(/MIT/)
  })

  it('carries no application — the face ships orientation, never the licensed app', () => {
    const payload = erpaxApiDiscoveryPayload() as Record<string, unknown>
    expect(payload).toBeTruthy()
    expect(Object.keys(payload).length).toBeGreaterThan(0)
  })
})
