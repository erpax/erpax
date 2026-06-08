import { describe, it, expect } from 'vitest'
import { toAtomPath, pathsMeet, pathsMeetAll, atomPathUuid, PATH_SURFACES } from '@/path'

const ATOM = 'law/folder'

describe('path — all surfaces merge at one canonical atom path', () => {
  it('exports every merged surface', () => {
    expect(PATH_SURFACES).toEqual(['fs', 'url', 'github', 'mcp', 'api', 'http'])
  })

  it('fs paths normalize to atom/subatom (no src/, no index.ts)', () => {
    expect(toAtomPath('src/law/folder/index.ts', 'fs')).toBe(ATOM)
    expect(toAtomPath('law/folder/index.ts', 'fs')).toBe(ATOM)
    expect(toAtomPath('src/law/folder/', 'fs')).toBe(ATOM)
    expect(toAtomPath('law/folder', 'fs')).toBe(ATOM)
  })

  it('url paths normalize to the same atom path', () => {
    expect(toAtomPath('/law/folder/SKILL', 'url')).toBe(ATOM)
    expect(toAtomPath('law/folder/SKILL', 'url')).toBe(ATOM)
    expect(toAtomPath('/law/folder', 'url')).toBe(ATOM)
  })

  it('github repo paths and blob URLs normalize to the same atom path', () => {
    expect(toAtomPath('erpax/erpax/src/law/folder/index.ts', 'github')).toBe(ATOM)
    expect(
      toAtomPath('https://github.com/erpax/erpax/blob/main/src/law/folder/SKILL.md', 'github'),
    ).toBe(ATOM)
    expect(
      toAtomPath(
        'https://raw.githubusercontent.com/erpax/erpax/main/src/law/folder/index.ts',
        'github',
      ),
    ).toBe(ATOM)
  })

  it('mcp resource URIs normalize to the same atom path', () => {
    expect(toAtomPath('erpax://law/folder', 'mcp')).toBe(ATOM)
    expect(toAtomPath('erpax://corpus/law/folder', 'mcp')).toBe(ATOM)
    expect(toAtomPath('erpax://atoms/law/folder', 'mcp')).toBe(ATOM)
    expect(toAtomPath('mcp://localhost:3000/resources/law/folder', 'mcp')).toBe(ATOM)
  })

  it('api routes normalize to the same atom path', () => {
    expect(toAtomPath('/api/corpus/law/folder', 'api')).toBe(ATOM)
    expect(toAtomPath('/api/atoms/law/folder', 'api')).toBe(ATOM)
    expect(toAtomPath('https://tenant.example/api/corpus/law/folder', 'api')).toBe(ATOM)
  })

  it('http URLs auto-detect github, api, and docs routes', () => {
    expect(
      toAtomPath('https://github.com/erpax/erpax/blob/main/src/law/folder/SKILL.md', 'http'),
    ).toBe(ATOM)
    expect(toAtomPath('https://tenant.example/api/corpus/law/folder', 'http')).toBe(ATOM)
    expect(toAtomPath('https://docs.erpax.dev/law/folder/SKILL', 'http')).toBe(ATOM)
  })

  it('pathsMeet — fs + url + github + mcp + api, one atom', () => {
    expect(
      pathsMeetAll(
        ['src/law/folder/index.ts', 'fs'],
        ['/law/folder/SKILL', 'url'],
        [
          'https://github.com/erpax/erpax/blob/main/src/law/folder/SKILL.md',
          'github',
        ],
        ['erpax://law/folder', 'mcp'],
        ['/api/corpus/law/folder', 'api'],
      ),
    ).toBe(true)
  })

  it('pathsMeet fails closed on different atoms', () => {
    expect(pathsMeet('src/law/folder/index.ts', '/aura/SKILL', 'fs', 'url')).toBe(false)
    expect(pathsMeet('erpax://law/folder', 'erpax://aura', 'mcp', 'mcp')).toBe(false)
    expect(pathsMeet('/api/corpus/law/folder', '/api/corpus/aura', 'api', 'api')).toBe(false)
  })

  it('edge cases — trailing slash, backslashes, query strings', () => {
    expect(toAtomPath('src\\law\\folder\\', 'fs')).toBe(ATOM)
    expect(toAtomPath('/law/folder/SKILL?foo=bar', 'url')).toBe(ATOM)
    expect(toAtomPath('erpax://law/folder?read=1', 'mcp')).toBe(ATOM)
  })

  it('root atom (single segment)', () => {
    expect(toAtomPath('src/aura/index.ts', 'fs')).toBe('aura')
    expect(toAtomPath('/aura/SKILL', 'url')).toBe('aura')
    expect(toAtomPath('erpax://aura', 'mcp')).toBe('aura')
    expect(pathsMeet('src/aura/index.ts', 'erpax://aura', 'fs', 'mcp')).toBe(true)
  })

  it('atomPathUuid entangles all surfaces at content-uuid scale', () => {
    const surfaces: [string, Parameters<typeof atomPathUuid>[1]][] = [
      ['src/law/folder/index.ts', 'fs'],
      ['/law/folder/SKILL', 'url'],
      ['https://github.com/erpax/erpax/blob/main/src/law/folder/SKILL.md', 'github'],
      ['erpax://law/folder', 'mcp'],
      ['/api/corpus/law/folder', 'api'],
      ['https://docs.erpax.dev/law/folder/SKILL', 'http'],
    ]
    const uuids = surfaces.map(([p, s]) => atomPathUuid(p, s))
    expect(new Set(uuids).size).toBe(1)
    expect(uuids[0]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
})
