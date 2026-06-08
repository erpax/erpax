import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  ERPAX_SKILL_ENTRY,
  ERPAX_SKILL_ENTRY_CONTENT_UUID,
  normalizeErpaxRepoUrl,
  wireFromRepoUrl,
} from './index'

describe('skill/wire — wireFromRepoUrl', () => {
  it('accepts canonical erpax GitHub URL variants', () => {
    for (const url of [
      'https://github.com/erpax/erpax',
      'https://github.com/erpax/erpax/',
      'http://github.com/erpax/erpax',
      'github.com/erpax/erpax',
      'https://github.com/erpax/erpax.git',
      'https://github.com/erpax/erpax/tree/main',
    ]) {
      expect(normalizeErpaxRepoUrl(url)).toBe('https://github.com/erpax/erpax')
    }
  })

  it('rejects non-erpax URLs with actionable entry path', () => {
    expect(normalizeErpaxRepoUrl('https://github.com/other/repo')).toBeNull()
    const r = wireFromRepoUrl('https://example.com')
    expect(r.ok).toBe(false)
    if (!r.ok) {
      expect(r.reason).toContain(ERPAX_SKILL_ENTRY)
      expect(r.reason).toContain('AGENTS.md')
    }
  })

  it("wireFromRepoUrl('https://github.com/erpax/erpax') returns correct entry paths", () => {
    const r = wireFromRepoUrl('https://github.com/erpax/erpax')
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.entryPoint).toBe('.claude/skills/SKILL.md')
    expect(r.entryPointAlt).toBe('src/skills/SKILL.md')
    expect(r.contentUuid).toBe(ERPAX_SKILL_ENTRY_CONTENT_UUID)
    expect(r.surfaces).toContain('AGENTS.md')
  })
})

describe('skill/wire — agent surface smoke', () => {
  const cwd = process.cwd()
  const surfaces = [
    'AGENTS.md',
    'CLAUDE.md',
    '.github/copilot-instructions.md',
    'src/rules/erpax.mdc',
    '.well-known/ai-skills.json',
    'skills.json',
  ]

  it('every agent surface references the canonical entry point', () => {
    for (const f of surfaces) {
      const p = join(cwd, f)
      expect(existsSync(p), `${f} must exist`).toBe(true)
      const text = readFileSync(p, 'utf8')
      expect(text, f).toContain(ERPAX_SKILL_ENTRY)
    }
  })
})
