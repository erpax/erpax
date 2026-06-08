import type { CollectionConfig } from 'payload'

import { describe, expect, it } from 'vitest'

import { capabilitiesFor, collapseApiKeyScopes, toCamelCase } from '@/plugins/mcp/scopes'

describe('toCamelCase — matches @payloadcms/plugin-mcp exactly', () => {
  it('kebab/underscore → camel', () => {
    expect(toCamelCase('account-reconciliations')).toBe('accountReconciliations')
    expect(toCamelCase('payload-mcp-api-keys')).toBe('payloadMcpApiKeys')
    expect(toCamelCase('orders')).toBe('orders')
    expect(toCamelCase('bank_accounts')).toBe('bankAccounts')
  })
})

describe('capabilitiesFor — default-open, deny narrows', () => {
  const OPS = ['create', 'find', 'update', 'delete']
  it('default (no scopes) ⇒ every op true (the door opens onto everything)', () => {
    expect(capabilitiesFor(undefined, 'orders', OPS)).toEqual({
      create: true,
      find: true,
      update: true,
      delete: true,
    })
  })
  it('deny by slug ⇒ all ops false', () => {
    expect(capabilitiesFor({ deny: ['orders'] }, 'orders', OPS)).toEqual({
      create: false,
      find: false,
      update: false,
      delete: false,
    })
  })
  it('deny by slug:op ⇒ only that op false', () => {
    expect(capabilitiesFor({ deny: ['orders:delete'] }, 'orders', OPS)).toEqual({
      create: true,
      find: true,
      update: true,
      delete: false,
    })
  })
})

// Mirrors the real plugin structure: each capability is a `collapsible` wrapper
// holding a `group` named camelCase(slug) (createApiKeyFields.js).
const apiKeyCollection: CollectionConfig = {
  slug: 'payload-mcp-api-keys',
  fields: [
    { name: 'user', type: 'relationship', relationTo: 'users' },
    { name: 'label', type: 'text' },
    { name: 'description', type: 'text' },
    {
      type: 'collapsible',
      label: 'Orders',
      fields: [{ name: 'orders', type: 'group', fields: [{ name: 'find', type: 'checkbox' }] }],
    },
    {
      type: 'collapsible',
      label: 'Invoices',
      fields: [{ name: 'invoices', type: 'group', fields: [{ name: 'find', type: 'checkbox' }] }],
    },
  ],
}

type Caps = Record<string, Record<string, boolean> | undefined>

describe('collapseApiKeyScopes — the matrix becomes a cross', () => {
  it('strips capability group fields, keeps base fields, adds the compact scopes json', () => {
    const out = collapseApiKeyScopes(apiKeyCollection)
    const names = out.fields.map((f) => (f as { name?: string }).name)
    expect(names).toContain('label')
    expect(names).toContain('description')
    expect(names).toContain('scopes')
    expect(names).not.toContain('orders') // group stripped (now virtual)
    expect(names).not.toContain('invoices')
    const scopes = out.fields.find((f) => (f as { name?: string }).name === 'scopes')
    expect((scopes as { type?: string } | undefined)?.type).toBe('json')
  })

  it('afterRead populates the exact capability shape the plugin reads (default-open)', async () => {
    const out = collapseApiKeyScopes(apiKeyCollection)
    const hook = out.hooks?.afterRead?.[0]
    expect(hook).toBeDefined()
    const req = {
      payload: {
        config: {
          collections: [{ slug: 'orders' }, { slug: 'invoices' }, { slug: 'payload-mcp-api-keys' }],
          globals: [{ slug: 'header' }],
        },
      },
    }
    const doc: Record<string, unknown> = { id: '1', label: 'k' }
    const r = (await hook!({ doc, req } as never)) as Caps
    expect(r.orders).toEqual({ create: true, find: true, update: true, delete: true })
    expect(r.invoices).toEqual({ create: true, find: true, update: true, delete: true })
    expect(r.header).toEqual({ find: true, update: true }) // globals: find/update only
    expect(r.payloadMcpApiKeys).toBeUndefined() // never gates the key collection on itself
  })

  it('afterRead respects scopes.deny (per-key narrowing survives, compactly)', async () => {
    const out = collapseApiKeyScopes(apiKeyCollection)
    const hook = out.hooks!.afterRead![0]!
    const req = { payload: { config: { collections: [{ slug: 'orders' }], globals: [] } } }
    const doc = { scopes: { deny: ['orders:delete'] } }
    const r = (await hook({ doc, req } as never)) as Caps
    expect(r.orders).toEqual({ create: true, find: true, update: true, delete: false })
  })

  it('no special capability groups ⇒ afterRead adds no tool/prompt/resource keys (no-op)', async () => {
    const out = collapseApiKeyScopes(apiKeyCollection)
    const hook = out.hooks!.afterRead![0]!
    const req = { payload: { config: { collections: [{ slug: 'orders' }], globals: [] } } }
    const r = (await hook({ doc: {}, req } as never)) as Caps
    expect(r['payload-mcp-tool']).toBeUndefined()
    expect(r['payload-mcp-resource']).toBeUndefined()
    expect(r['payload-mcp-prompt']).toBeUndefined()
    expect(r.config).toBeUndefined()
  })
})

// Mirrors @payloadcms/plugin-mcp's createApiKeysCollection: the custom
// tool/resource/prompt matrices are a `collapsible` → `group` named the literal
// key the handler indexes (`payload-mcp-tool` etc.), and experimental tools are
// a `collapsible` → groups named `collections`/`jobs`/`config`/`auth`. The
// handler (getMcpHandler.js) reads ALL of these off the api-key doc, so the
// collapse must repopulate them too — not just collections/globals.
const apiKeyCollectionWithSpecials: CollectionConfig = {
  slug: 'payload-mcp-api-keys',
  fields: [
    { name: 'user', type: 'relationship', relationTo: 'users' },
    {
      type: 'collapsible',
      label: 'Orders',
      fields: [{ name: 'orders', type: 'group', fields: [{ name: 'find', type: 'checkbox' }] }],
    },
    {
      type: 'collapsible',
      label: 'Tools',
      fields: [
        {
          name: 'payload-mcp-tool',
          type: 'group',
          label: false,
          fields: [
            { name: 'fooTool', type: 'checkbox' },
            { name: 'barTool', type: 'checkbox' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Resources',
      fields: [
        {
          name: 'payload-mcp-resource',
          type: 'group',
          label: false,
          fields: [{ name: 'someResource', type: 'checkbox' }],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Prompts',
      fields: [
        {
          name: 'payload-mcp-prompt',
          type: 'group',
          label: false,
          fields: [{ name: 'somePrompt', type: 'checkbox' }],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Experimental Tools',
      fields: [
        {
          name: 'config',
          type: 'group',
          fields: [
            { name: 'find', type: 'checkbox' },
            { name: 'update', type: 'checkbox' },
          ],
        },
        { name: 'auth', type: 'group', fields: [{ name: 'login', type: 'checkbox' }] },
      ],
    },
  ],
}

describe('collapseApiKeyScopes — full plugin read surface (tool/prompt/resource/experimental)', () => {
  const req = {
    payload: { config: { collections: [{ slug: 'orders' }], globals: [] } },
  }

  it('strips the special capability groups (no stored columns)', () => {
    const out = collapseApiKeyScopes(apiKeyCollectionWithSpecials)
    const names = out.fields.map((f) => (f as { name?: string }).name)
    expect(names).toContain('user')
    expect(names).toContain('scopes')
    expect(names).not.toContain('payload-mcp-tool')
    expect(names).not.toContain('payload-mcp-resource')
    expect(names).not.toContain('payload-mcp-prompt')
    expect(names).not.toContain('config')
    expect(names).not.toContain('auth')
    expect(names).not.toContain('orders')
  })

  it('afterRead repopulates tool/prompt/resource namespaces default-open', async () => {
    const out = collapseApiKeyScopes(apiKeyCollectionWithSpecials)
    const hook = out.hooks!.afterRead![0]!
    const r = (await hook({ doc: {}, req } as never)) as Caps
    expect(r['payload-mcp-tool']).toEqual({ fooTool: true, barTool: true })
    expect(r['payload-mcp-resource']).toEqual({ someResource: true })
    expect(r['payload-mcp-prompt']).toEqual({ somePrompt: true })
  })

  it('afterRead repopulates experimental namespaces default-open', async () => {
    const out = collapseApiKeyScopes(apiKeyCollectionWithSpecials)
    const hook = out.hooks!.afterRead![0]!
    const r = (await hook({ doc: {}, req } as never)) as Caps
    expect(r.config).toEqual({ find: true, update: true })
    expect(r.auth).toEqual({ login: true })
  })

  it('deny narrows a single tool (namespace:child)', async () => {
    const out = collapseApiKeyScopes(apiKeyCollectionWithSpecials)
    const hook = out.hooks!.afterRead![0]!
    const doc = { scopes: { deny: ['payload-mcp-tool:fooTool'] } }
    const r = (await hook({ doc, req } as never)) as Caps
    expect(r['payload-mcp-tool']).toEqual({ fooTool: false, barTool: true })
  })

  it('deny narrows a whole namespace', async () => {
    const out = collapseApiKeyScopes(apiKeyCollectionWithSpecials)
    const hook = out.hooks!.afterRead![0]!
    const doc = { scopes: { deny: ['payload-mcp-resource'] } }
    const r = (await hook({ doc, req } as never)) as Caps
    expect(r['payload-mcp-resource']).toEqual({ someResource: false })
  })
})
