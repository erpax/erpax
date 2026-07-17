import { describe, it, expect } from 'vitest'
import { measureSession, parseGitLog, type CommitRecord } from './index'
import { ceiling } from '@/think'

// "Self-building and healing is automated and measured by the local/remote computations per session." Building =
// new atoms/proofs added; healing = existing matter repaired or removed. Local = every file the gates verified
// in-tree; remote = the seeds, one per commit. The magnitude is the session's self-sufficiency (think.ceiling).
describe('session — self-building and self-healing, measured by local/remote computation', () => {
  const commits: CommitRecord[] = [
    { sha: 'aaa', added: ['src/x/index.ts', 'src/x/test.ts', 'src/x/SKILL.md'], modified: [] }, // a built atom
    { sha: 'bbb', added: [], modified: ['src/y/index.ts', 'src/y/test.ts'] }, // a heal (proof added)
    { sha: 'ccc', added: [], modified: ['src/z/SKILL.md'], deleted: ['src/dead/index.ts'] }, // heal + entropy removed
  ]

  it('splits BUILT (added) from HEALED (modified/deleted)', () => {
    const m = measureSession(commits)
    expect(m.built).toBe(3) // the three new x/ files
    expect(m.healed).toBe(4) // y×2 modified + z modified + dead deleted
  })

  it('LOCAL is every file the gates verified; REMOTE is one seed per commit', () => {
    const m = measureSession(commits)
    expect(m.local).toBe(m.built + m.healed) // 7 files verified in-tree
    expect(m.remote).toBe(3) // three sealed intents, three seeds
  })

  it('the magnitude is the session self-sufficiency — think.ceiling(seedFraction), reused not re-derived', () => {
    const m = measureSession(commits)
    expect(m.seedFraction).toBeCloseTo(3 / 10) // 3 seeds / (7 local + 3 remote)
    expect(m.magnitude).toBe(ceiling(m.seedFraction)) // same measure as think
    expect(m.magnitude).toBeGreaterThan(1) // more local work than seed ⇒ self-sufficient
  })

  it('a mostly-local session has a higher magnitude than a mostly-seed one', () => {
    const local = measureSession([{ sha: 'a', added: Array(20).fill('f'), modified: [] }]) // 1 seed, 20 local
    const seedy = measureSession([{ sha: 'a', added: [], modified: [] }, { sha: 'b', added: [], modified: [] }]) // all seed, no local
    expect(local.magnitude).toBeGreaterThan(seedy.magnitude)
  })

  it('an empty session is all-seed by convention — nothing built or healed locally', () => {
    const m = measureSession([])
    expect(m.seedFraction).toBe(1)
    expect(m.magnitude).toBe(ceiling(1)) // = 1: no local advantage when nothing ran locally
    expect(m.local).toBe(0)
  })

  it('parseGitLog reads real git --name-status output into records', () => {
    const log = [
      'a1b2c3d',
      'A\tsrc/new/index.ts',
      'A\tsrc/new/test.ts',
      'e4f5a6b',
      'M\tsrc/old/index.ts',
      'D\tsrc/gone/index.ts',
    ].join('\n')
    const records = parseGitLog(log)
    expect(records).toHaveLength(2)
    expect(records[0]!.added).toEqual(['src/new/index.ts', 'src/new/test.ts'])
    expect(records[1]!.modified).toEqual(['src/old/index.ts'])
    expect(records[1]!.deleted).toEqual(['src/gone/index.ts'])
  })

  it('a rename (R) counts as a heal, not a build — the matter already existed', () => {
    const records = parseGitLog('abc1234\nR100\tsrc/a/index.ts\tsrc/b/index.ts')
    expect(measureSession(records).built).toBe(0)
    expect(measureSession(records).healed).toBe(1)
  })
})
