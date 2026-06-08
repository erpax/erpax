import { describe, it, expect } from 'vitest'
import { fuseWorkspaceResource, fusesIdentically, externalRef, type WorkspaceResource } from './fusion'

const TENANT = 'tenant-uuid-1'
const gmailMsg: WorkspaceResource = {
  service: 'gmail',
  nativeId: '18f2ab9c',
  content: { subject: 'Invoice #42', body: 'Please find attached.', from: 'a@x.com', threadId: 't1' },
}

describe('google-workspace/fusion — the merge law applied to external resources', () => {
  it('fuses a resource into the mesh: source tag + externalRef + content-uuid, routed to the registry target', () => {
    const f = fuseWorkspaceResource(gmailMsg, TENANT)
    expect(f.target).toBe('messages') // the gap gmail fills
    expect(f.record.source).toBe('google-workspace')
    expect(f.record.externalRef).toBe('gmail:18f2ab9c')
    expect(f.record.subject).toBe('Invoice #42') // content carried through
    expect(f.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/) // content-addressed uuidv8
  })

  it('is idempotent — the same resource fetched twice fuses to the same uuid (dedup on re-fetch)', () => {
    expect(fuseWorkspaceResource(gmailMsg, TENANT).uuid).toBe(fuseWorkspaceResource(gmailMsg, TENANT).uuid)
    expect(fusesIdentically(gmailMsg, { ...gmailMsg }, TENANT)).toBe(true)
  })

  it('distinguishes different resources, and namespaces by tenant', () => {
    const other = { ...gmailMsg, nativeId: '99zz', content: { ...gmailMsg.content, subject: 'Other' } }
    expect(fusesIdentically(gmailMsg, other, TENANT)).toBe(false)
    // same resource, different tenant ⇒ different uuid (no cross-tenant collision)
    expect(fuseWorkspaceResource(gmailMsg, TENANT).uuid).not.toBe(fuseWorkspaceResource(gmailMsg, 'tenant-uuid-2').uuid)
  })

  it('routes each service to its registry gap and carries the cross-system key', () => {
    const event: WorkspaceResource = { service: 'calendar', nativeId: 'evt-9@google.com', content: { summary: 'Standup' } }
    const f = fuseWorkspaceResource(event, TENANT)
    expect(f.target).toBe('bookings')
    expect(f.record.externalRef).toBe('calendar:evt-9@google.com')
    expect(externalRef('drive', 'fileXYZ')).toBe('drive:fileXYZ')
  })

  it('throws on an unknown service (the catalogue is the source of truth)', () => {
    expect(() => fuseWorkspaceResource({ service: 'nope' as never, nativeId: 'x', content: {} }, TENANT)).toThrow(/unknown service/)
  })
})
