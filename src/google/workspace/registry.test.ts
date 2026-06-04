import { describe, it, expect } from 'vitest'
import {
  GOOGLE_WORKSPACE_APIS,
  workspaceApi,
  workspaceApisForGap,
  allWorkspaceScopes,
  WORKSPACE_SERVICES,
} from '@/google/workspace/registry'

describe('google-workspace/registry — the computed Workspace API catalogue', () => {
  it('every entry is a real Google API: OAuth scopes, a versioned base, a native id, a target gap', () => {
    expect(GOOGLE_WORKSPACE_APIS.length).toBeGreaterThanOrEqual(7)
    const ids = GOOGLE_WORKSPACE_APIS.map((a) => a.service)
    expect(new Set(ids).size).toBe(ids.length) // unique service ids
    for (const a of GOOGLE_WORKSPACE_APIS) {
      expect(a.readScopes.length).toBeGreaterThan(0)
      expect(a.writeScopes.length).toBeGreaterThan(0)
      for (const s of [...a.readScopes, ...a.writeScopes]) {
        expect(s).toMatch(/^https:\/\/www\.googleapis\.com\/auth\//) // real Google OAuth scope
      }
      expect(a.baseUrl).toMatch(/^https:\/\//)
      expect(a.nativeIdField.length).toBeGreaterThan(0)
      expect(a.fills.length).toBeGreaterThan(0)
    }
  })

  it('fills only real erpax collection slugs (the gaps it closes)', () => {
    const known = new Set(['messages', 'bookings', 'media', 'journal-entries', 'users'])
    for (const a of GOOGLE_WORKSPACE_APIS) expect(known.has(a.fills)).toBe(true)
  })

  it('workspaceApi resolves by id; the gap-map is computed, not hand-listed', () => {
    expect(workspaceApi('gmail')?.fills).toBe('messages')
    expect(workspaceApi('sheets')?.fills).toBe('journal-entries') // the debit/credit fusion
    expect(workspaceApi('nope' as never)).toBeUndefined()
    // users is filled by BOTH people and the admin directory
    expect(workspaceApisForGap('users').map((a) => a.service).sort()).toEqual(['admin-directory', 'people'])
    expect(workspaceApisForGap('messages').map((a) => a.service)).toEqual(['gmail'])
  })

  it('allWorkspaceScopes is the deduped, sorted union for the consent screen', () => {
    const read = allWorkspaceScopes('read')
    expect(read).toEqual([...new Set(read)]) // deduped
    expect(read).toEqual([...read].sort()) // sorted
    expect(read.every((s) => s.includes('.readonly') || s.includes('directory'))).toBe(true)
    expect(allWorkspaceScopes('write').length).toBeGreaterThan(0)
    expect(WORKSPACE_SERVICES).toEqual(GOOGLE_WORKSPACE_APIS.map((a) => a.service))
  })
})
