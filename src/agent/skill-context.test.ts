import { describe, it, expect, afterEach } from 'vitest'
import { performance } from 'node:perf_hooks'
import { statSync } from 'node:fs'
import { join } from 'node:path'
import { cheapAgentDispatch, fullSkillIndexContextBytes } from '@/agent/cheap-dispatch'
import {
  MAX_AGENT_SKILL_CONTEXT_BYTES,
  agentSkillContextForDispatch,
  atomPathFromInput,
  bondedNeighborPaths,
  clearAgentSkillContextCache,
  domainHubFor,
  loadSealedSkill,
  realiseSkillsForPath,
  isProseSkillFace,
  resolveSkillLoadOpts,
  skillBearingAtomPath,
  skillsForImport,
} from '@/agent/skill-context'
import { strictApplyDispatch, createPathSession, agentLawWithPathSession, AGENT_RUNTIME_GRANT } from '@/agent/strict-apply'
import type { AgentContext } from '@/agent/types'
import { clearRulesCache } from '@/rules'
import { sealSkillExcerpt } from '@/skill/router/lazy-load'
import { HORO_DIGITS } from '@/horo'

const cwd = process.cwd()
const DERIVE_NUMBER = 'src/invoices/hooks/deriveNumber.ts'
const SKILL_INDEX_PATH = join(cwd, 'src/skill/router/skills.index.ts')
const TS = '2026-06-08T12:00:00.000Z'

afterEach(() => {
  clearAgentSkillContextCache()
  clearRulesCache()
})

describe('agent skill load — shared lazy-load face', () => {
  it('resolveSkillLoadOpts defaults excerpt cap to 4096', () => {
    const opts = resolveSkillLoadOpts({ cwd })
    expect(opts.maxExcerptChars).toBe(4096)
    expect(opts.cwd).toBe(cwd)
  })

  it('loadSealedSkill seals excerpt without importing skills.index', () => {
    const max = 512
    const skill = loadSealedSkill('cost', { cwd, maxExcerptChars: max })
    expect(skill).not.toBeNull()
    expect(skill!.excerptChars).toBeLessThanOrEqual(max + 2)
    expect(skill!.fullChars).toBeGreaterThan(skill!.excerptChars)
  })

  it('sealSkillExcerpt preserves frontmatter', () => {
    const raw = '---\nname: test\ndescription: "hi"\n---\n\n# body\n'
    const sealed = sealSkillExcerpt('test', raw, 100)
    expect(sealed.excerpt).toContain('name: test')
    expect(sealed.sealed).toBe(true)
  })
})

describe('agent skill load — cheapAgentDispatch', () => {
  it('loads sealed excerpt + path account + eb for agent atom', () => {
    const ctx = cheapAgentDispatch({ atomPath: 'agent', cwd })
    expect(ctx.accountCode).toBe('agent')
    expect(ctx.ebBalance).toBeGreaterThan(0)
    expect(ctx.skill).not.toBeNull()
    expect(ctx.skill!.sealed).toBe(true)
    expect(ctx.skill!.excerpt).toContain('name: agent')
    expect(ctx.atomCount).toBeGreaterThanOrEqual(1)
    expect(ctx.contextBytes).toBeGreaterThan(3000)
    expect(ctx.contextBytes).toBeLessThan(6000)
  })

  it('caps related atoms at horo wave depth − 1', () => {
    const related = ['cost', 'wave', 'mcp', 'chat', 'seal', 'path', 'skill', 'access']
    const ctx = cheapAgentDispatch({ atomPath: 'agent', relatedAtomPaths: related, cwd })
    expect(ctx.atomCount).toBeLessThanOrEqual(HORO_DIGITS.length)
    expect(ctx.related.length).toBe(HORO_DIGITS.length - 1)
  })
})

describe('agent skill load — path resolution', () => {
  it('atomPathFromInput folds deriveNumber.ts to invoices/hooks', () => {
    expect(atomPathFromInput(DERIVE_NUMBER)).toBe('invoices/hooks')
  })

  it('skillBearingAtomPath walks up to invoices (SKILL.md bearer)', () => {
    expect(skillBearingAtomPath('invoices/hooks', cwd)).toBe('invoices')
  })

  it('domainHubFor uses first segment as hub', () => {
    expect(domainHubFor('invoices/hooks')).toBe('invoices')
  })
})

describe('agent skill load — skillsForImport (1-hop)', () => {
  it('resolves @/payload to payload atom', () => {
    const paths = skillsForImport('@/payload', cwd)
    expect(paths).toContain('payload')
  })

  it('resolves barrel alias @/payload-types to types', () => {
    const paths = skillsForImport('@/payload-types', cwd)
    expect(paths.some((p) => p === 'types' || p === 'payload')).toBe(true)
  })
})

describe('agent skill load — realiseSkillsForPath', () => {
  it('opens deriveNumber.ts with self=invoices, ancestors, bonds, rules, quantum', () => {
    const ctx = realiseSkillsForPath(DERIVE_NUMBER, { cwd, includeImports: true })
    expect(ctx.focalAtomPath).toBe('invoices/hooks')
    expect(ctx.skillBearingAtom).toBe('invoices')
    expect(ctx.domainHub).toBe('invoices')
    expect(ctx.skills.some((s) => s.role === 'self' && s.atomPath === 'invoices')).toBe(true)
    expect(ctx.skills.find((s) => s.atomPath === 'invoices')?.quantum).not.toBeNull()
    expect(ctx.skills.find((s) => s.atomPath === 'invoices')?.ebBalance).toBeGreaterThan(0)
    expect(ctx.rules.axes.length).toBeGreaterThan(0)
    expect(ctx.markdown).toContain('invoices')
    expect(ctx.contextBytes).toBeGreaterThan(10_000)
    expect(ctx.contextBytes).toBeLessThan(MAX_AGENT_SKILL_CONTEXT_BYTES)
  })

  it('includes bonded neighbors from invoices SKILL frontmatter', () => {
    const bonds = bondedNeighborPaths('invoices', cwd)
    expect(bonds.length).toBeGreaterThan(0)
    expect(bonds).toContain('accounting')
    const ctx = realiseSkillsForPath('invoices', { cwd })
    expect(ctx.skills.some((s) => s.role === 'bond')).toBe(true)
  })

  it('loads writing and speech when opening a prose trinity face', () => {
    expect(isProseSkillFace('src/quantum/emr/SKILL.md')).toBe(true)
    const ctx = realiseSkillsForPath('src/quantum/emr/SKILL.md', { cwd })
    expect(ctx.skills.some((s) => s.atomPath === 'writing')).toBe(true)
    expect(ctx.skills.some((s) => s.atomPath === 'speech')).toBe(true)
  })

  it('contextBytes ≪ skills.index (never loads 77MB bundle)', () => {
    let indexBytes = 76_756_764
    try {
      indexBytes = statSync(SKILL_INDEX_PATH).size
    } catch {
      // gitignored on fresh clone
    }
    const cheap = cheapAgentDispatch({ atomPath: 'agent', cwd })
    const full = realiseSkillsForPath(DERIVE_NUMBER, { cwd })
    const fullBytes = fullSkillIndexContextBytes(indexBytes)
    expect(cheap.contextBytes).toBeLessThan(fullBytes / 100)
    expect(full.contextBytes).toBeLessThan(fullBytes / 100)
    expect(cheap.contextBytes).toBeLessThan(MAX_AGENT_SKILL_CONTEXT_BYTES)
    expect(full.contextBytes).toBeLessThan(MAX_AGENT_SKILL_CONTEXT_BYTES)
    const savingsPct = (1 - cheap.contextBytes / fullBytes) * 100
    expect(savingsPct).toBeGreaterThan(99)
  })
})

describe('agent skill load — strict-apply dispatch hook', () => {
  it('agentSkillContextForDispatch builds context from visited paths', () => {
    const ctx = agentSkillContextForDispatch([DERIVE_NUMBER, 'path'], { cwd })
    expect(ctx).not.toBeNull()
    expect(ctx!.focalAtomPath).toBe('invoices/hooks')
    expect(ctx!.atomCount).toBeGreaterThanOrEqual(1)
  })

  it('strictApplyDispatch attaches skillContext on law for effect gate reuse', () => {
    const session = createPathSession()
    const law = agentLawWithPathSession(session, { depth: 0, actor: 'agent-a', grant: AGENT_RUNTIME_GRANT })
    const ctx: AgentContext = {
      payload: {} as AgentContext['payload'],
      tenantId: 'tenant-a',
      locale: 'en',
      t: (k) => k,
      emit: () => {},
      audit: () => {},
      capture: () => {},
      call: async () => [],
      mcp: {} as AgentContext['mcp'],
      law,
    }
    const v = strictApplyDispatch(
      ctx,
      { id: 'invoice:activated', tenantId: 'tenant-a', payload: { atomPath: 'invoices/hooks' }, emittedAt: TS },
      { paths: ['path'] },
    )
    expect(v.allowed).toBe(true)
    expect(v.skillContext).toBeDefined()
    expect(law.skillContext).toBe(v.skillContext)
    expect(law.skillContext!.rules.axes.length).toBeGreaterThan(0)
  })
})

describe('agent skill load — cache', () => {
  it(
    'second realiseSkillsForPath call hits cache (<100ms)',
    () => {
      realiseSkillsForPath(DERIVE_NUMBER, { cwd, includeImports: true })
      const t0 = performance.now()
      const ctx = realiseSkillsForPath(DERIVE_NUMBER, { cwd, includeImports: true })
      const elapsed = performance.now() - t0
      console.log(`skill-context cache hit: ${elapsed.toFixed(1)}ms`)
      expect(ctx.focalAtomPath).toBe('invoices/hooks')
      expect(elapsed).toBeLessThan(100)
    },
    120_000,
  )
})
