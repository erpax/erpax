import { afterEach, describe, expect, it, vi } from 'vitest'

import { workerLogger } from '@/utilities/log'

const lines = () => {
  const out: Record<string, unknown>[] = []
  for (const name of ['log', 'warn', 'error', 'debug'] as const) {
    vi.spyOn(console, name).mockImplementation((line: string) => void out.push(JSON.parse(line)))
  }
  return out
}

afterEach(() => vi.restoreAllMocks())

describe('log — Payload’s logger on Workers, in pino’s shape', () => {
  it('writes one JSON line per call, with the message', () => {
    const out = lines()
    const logger = workerLogger()
    logger.info('started')
    logger.warn({ tool: 'findDocuments' }, 'slow')
    expect(out).toEqual([
      { level: 'info', msg: 'started' },
      { level: 'warn', tool: 'findDocuments', msg: 'slow' },
    ])
  })

  it('spells out an error instead of writing {}', () => {
    const out = lines()
    workerLogger().error({ err: new TypeError('boom'), msg: 'failed' })
    expect(out[0]).toMatchObject({ level: 'error', msg: 'failed', err: { name: 'TypeError', message: 'boom' } })
  })

  it('has child(bindings, { msgPrefix }) and a settable level, as @payloadcms/plugin-mcp uses it', () => {
    const out = lines()
    const root = workerLogger('info', { app: 'erpax' })
    const mcp = root.child({ plugin: 'mcp' }, { msgPrefix: '[plugin-mcp] ' })
    mcp.level = 'warn'
    mcp.info('quiet')
    mcp.warn('loud')
    root.info('root still informs')
    expect(out).toEqual([
      { level: 'warn', app: 'erpax', plugin: 'mcp', msg: '[plugin-mcp] loud' },
      { level: 'info', app: 'erpax', msg: 'root still informs' },
    ])
  })

  it('filters below its level, as pino does, and silent writes nothing', () => {
    const out = lines()
    const logger = workerLogger('info')
    logger.debug('hidden')
    logger.level = 'silent'
    logger.fatal('hidden too')
    expect(out).toEqual([])
  })
})
