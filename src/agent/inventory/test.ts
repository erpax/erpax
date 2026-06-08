import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { copyFileSync, mkdirSync, mkdtempSync, statSync, utimesSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import {
  INVENTORY_MAX_ACTIVE,
  inventoryReport,
  taskInventory,
  type InventoryStatus,
} from './index'
import { buildInventorySnapshot } from './emit'

const FIXTURES = join(import.meta.dirname, 'fixtures')

describe('agent/inventory', () => {
  let tmp: string
  let transcriptsRoot: string

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), 'erpax-inventory-'))
    transcriptsRoot = join(tmp, 'agent-transcripts', 'session-a')
    mkdirSync(join(transcriptsRoot, 'subagents'), { recursive: true })
  })

  afterEach(() => {
    delete process.env.CURSOR_AGENT_TRANSCRIPTS
  })

  const seed = (name: string, dest: string, mtimeOffsetSec: number): void => {
    copyFileSync(join(FIXTURES, name), join(transcriptsRoot, 'subagents', dest))
    const path = join(transcriptsRoot, 'subagents', dest)
    const now = Date.now() / 1000
    const atime = now - mtimeOffsetSec
    utimesSync(path, atime, atime)
  }

  const statuses = (rows: readonly { status: InventoryStatus }[]): InventoryStatus[] =>
    rows.map((r) => r.status)

  it('classifies done transcript', () => {
    seed('done-agent.jsonl', 'aaa11111-done.jsonl', 60)
    process.env.CURSOR_AGENT_TRANSCRIPTS = join(tmp, 'agent-transcripts')
    const result = taskInventory({ cwd: tmp, includeDone: true, staleAfterSec: 30 })
    expect(statuses(result.rows)).toContain('done')
  })

  it('classifies active vs stale by mtime idle', () => {
    seed('active-agent.jsonl', 'bbb22222-active.jsonl', 10)
    seed('stale-agent.jsonl', 'ccc33333-stale.jsonl', 4000)
    process.env.CURSOR_AGENT_TRANSCRIPTS = join(tmp, 'agent-transcripts')
    const result = taskInventory({ cwd: tmp, staleAfterSec: 1800 })
    const byId = Object.fromEntries(result.rows.map((r) => [r.id, r.status]))
    expect(byId['bbb22222']).toBe('active')
    expect(byId['ccc33333']).toBe('stale')
    expect(byId['ccc33333']).toBeDefined()
  })

  it('marks younger duplicate title as duplicate', () => {
    seed('active-agent.jsonl', 'ddd44444-older.jsonl', 5000)
    seed('duplicate-younger.jsonl', 'eee55555-younger.jsonl', 100)
    process.env.CURSOR_AGENT_TRANSCRIPTS = join(tmp, 'agent-transcripts')
    const result = taskInventory({ cwd: tmp, staleAfterSec: 1800 })
    const older = result.rows.find((r) => r.id === 'ddd44444')
    const younger = result.rows.find((r) => r.id === 'eee55555')
    expect(older?.status).not.toBe('duplicate')
    expect(younger?.status).toBe('duplicate')
    expect(younger?.speedUpHint).toContain('cancel younger agent id')
  })

  it('sorts oldest first', () => {
    seed('active-agent.jsonl', 'fff66666-old.jsonl', 9000)
    seed('active-agent.jsonl', 'ggg77777-new.jsonl', 30)
    process.env.CURSOR_AGENT_TRANSCRIPTS = join(tmp, 'agent-transcripts')
    const result = taskInventory({ cwd: tmp, staleAfterSec: 1800 })
    expect(result.rows[0]!.id).toBe('fff66666')
  })

  it('inventoryReport renders markdown table', () => {
    seed('active-agent.jsonl', 'hhh88888-row.jsonl', 20)
    process.env.CURSOR_AGENT_TRANSCRIPTS = join(tmp, 'agent-transcripts')
    const md = inventoryReport({ cwd: tmp, staleAfterSec: 1800 })
    expect(md).toContain('| id | age | status | title | speed-up hint |')
    expect(md).toContain('hhh88888')
  })

  it('warns when active count exceeds max', () => {
    const titles = [
      'Run vitest on src/cli only',
      'Implement batch commit for staged corpus',
      'Fix readme waves OOM',
      'Audit stall-watch module',
    ]
    for (let i = 0; i < INVENTORY_MAX_ACTIVE + 1; i++) {
      const dest = `id${i}-agent.jsonl`
      const body = [
        '{"role":"user","message":{"content":[{"type":"text","text":"<user_query>\\n**Goal**\\n' +
          titles[i] +
          '\\n</user_query>"}]}}',
        '{"role":"assistant","message":{"content":[{"type":"text","text":"working"}]}}',
      ].join('\n')
      writeFileSync(join(transcriptsRoot, 'subagents', dest), body)
      utimesSync(join(transcriptsRoot, 'subagents', dest), Date.now() / 1000, Date.now() / 1000)
    }
    process.env.CURSOR_AGENT_TRANSCRIPTS = join(tmp, 'agent-transcripts')
    const result = taskInventory({ cwd: tmp, staleAfterSec: 1800 })
    expect(result.activeCount).toBeGreaterThan(INVENTORY_MAX_ACTIVE)
    expect(result.warnings).toContain('queue depth exceeded')
  })

  it('buildInventorySnapshot carries contentUuid', () => {
    seed('done-agent.jsonl', 'iii99999-done.jsonl', 10)
    process.env.CURSOR_AGENT_TRANSCRIPTS = join(tmp, 'agent-transcripts')
    const snap = buildInventorySnapshot(tmp)
    expect(snap.contentUuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    )
    expect(snap.rows.length).toBeGreaterThan(0)
  })

  it('parses terminal running shell', () => {
    const terminalsDir = join(tmp, 'terminals')
    mkdirSync(terminalsDir, { recursive: true })
    writeFileSync(
      join(terminalsDir, '42.txt'),
      [
        '---',
        'pid: 999',
        `cwd: "${tmp}"`,
        'command: "pnpm erpax readme check"',
        `started_at: ${new Date(Date.now() - 120_000).toISOString()}`,
        'running_for_ms: 120000  ',
        '---',
        'output line',
      ].join('\n'),
    )
    process.env.CURSOR_AGENT_TRANSCRIPTS = join(tmp, 'agent-transcripts', 'empty')
    mkdirSync(join(tmp, 'agent-transcripts', 'empty', 'subagents'), { recursive: true })
    const result = taskInventory({ cwd: tmp, terminalsDir, staleAfterSec: 1800 })
    const term = result.rows.find((r) => r.source === 'terminal')
    expect(term?.status).toBe('active')
    expect(term?.title).toContain('readme check')
  })
})
