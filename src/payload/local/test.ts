import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { payloadSkillSeed, readSkill, relink, skillPath, skillRoot, skillRows } from '@/payload/local'

describe('payload/local — an installed skill as generated page seeds', () => {
  it('addresses the skill as the parent and each reference as its child', () => {
    expect(skillRoot('payload')).toBe('skills/payload')
    expect(skillPath('skills/payload', 'SKILL.md')).toBe('skills/payload')
    expect(skillPath('skills/payload', 'reference/ACCESS-CONTROL.md')).toBe('skills/payload/access-control')
  })

  it('rewrites a link to a reference file into the page that file became, and leaves other links alone', () => {
    const md = 'see [Q](reference/QUERIES.md), [H](HOOKS.md#loops), [site](https://payloadcms.com/docs) and [x](./notes.md)'
    expect(relink('skills/payload', md)).toBe('see [Q](/skills-payload-queries), [H](/skills-payload-hooks#loops), [site](https://payloadcms.com/docs) and [x](./notes.md)')
  })

  it('derives parents first, strips frontmatter, titles by heading, and hangs the local page beside the references', () => {
    const rows = skillRows('payload', {
      'SKILL.md': '---\nname: payload\n---\n\n# Payload\nsee [Q](reference/QUERIES.md)',
      'reference/QUERIES.md': '# Queries',
    }, { local: '# Payload here' })
    expect(rows.map((r) => [r.slug, r.parent])).toEqual([
      ['skills', null],
      ['skills-payload', 'skills'],
      ['skills-payload-local', 'skills-payload'],
      ['skills-payload-queries', 'skills-payload'],
    ])
    expect(rows[1]!.title).toBe('Payload')
    expect(rows[1]!.markdown).toBe('# Payload\nsee [Q](/skills-payload-queries)')
  })

  it('a changed source moves the row address; an unchanged one does not', () => {
    const a = skillRows('payload', { 'SKILL.md': '# P' })
    const b = skillRows('payload', { 'SKILL.md': '# P' })
    const c = skillRows('payload', { 'SKILL.md': '# P2' })
    expect(a[1]!.content).toBe(b[1]!.content)
    expect(c[1]!.content).not.toBe(a[1]!.content)
  })

  it('reads a skill folder from disk, and yields nothing for a skill that is not installed', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'skill-'))
    expect(readSkill(join(cwd, 'absent'))).toEqual({})
    mkdirSync(join(cwd, '.agents', 'skills', 'payload', 'reference'), { recursive: true })
    writeFileSync(join(cwd, '.agents', 'skills', 'payload', 'SKILL.md'), '# Payload')
    writeFileSync(join(cwd, '.agents', 'skills', 'payload', 'reference', 'HOOKS.md'), '# Hooks')
    writeFileSync(join(cwd, '.agents', 'skills', 'payload', 'reference', 'notes.txt'), 'not a document')
    expect(Object.keys(readSkill(join(cwd, '.agents', 'skills', 'payload')))).toEqual(['SKILL.md', 'reference/HOOKS.md'])
    // no local extension in this tree: the seed is the skill alone
    expect(payloadSkillSeed(cwd).map((r) => r.slug)).toEqual(['skills', 'skills-payload', 'skills-payload-hooks'])
  })
})
