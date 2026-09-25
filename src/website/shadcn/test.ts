import { describe, it, expect } from 'vitest'
import { SHADCN_SURFACE_MAP, shadcnSurfaceFor, allRequiredShadcnComponents } from './index'

describe('website/shadcn — the widget vocabulary a surface composes from', () => {
  it('every declared surface resolves, and resolving is total over the map', () => {
    expect(SHADCN_SURFACE_MAP.length).toBeGreaterThan(0)
    for (const entry of SHADCN_SURFACE_MAP) {
      const got = shadcnSurfaceFor(entry.surface)
      expect(got, `surface ${entry.surface} must resolve`).toBeDefined()
      expect(got!.surface).toBe(entry.surface)
    }
  })

  it('a surface nobody declared resolves to undefined rather than an empty set', () => {
    // undefined is a refusal; an empty set would read as "this surface needs no widgets"
    expect(shadcnSurfaceFor('not-a-surface' as never)).toBeUndefined()
  })

  it('the install list is the DEDUPED union of the map — computed, not maintained beside it', () => {
    const all = allRequiredShadcnComponents()
    expect(new Set(all).size).toBe(all.length)
    const union = new Set(SHADCN_SURFACE_MAP.flatMap((e) => e.required))
    expect(new Set(all)).toEqual(union)
    // and every component named by some surface is in it, which is what makes it an install list
    for (const e of SHADCN_SURFACE_MAP) for (const c of e.required) expect(all).toContain(c)
  })

  it('no surface declares an empty component set — a page that renders nothing is a gap', () => {
    for (const e of SHADCN_SURFACE_MAP) expect(e.required.length).toBeGreaterThan(0)
  })

  it('every surface names the MCP tools it invokes — the widget IS an MCP client', () => {
    // this is what makes a surface usable as both the website and in-app help: the page calls the
    // same erpax.* tools an agent calls, so the help and the product read one source
    for (const e of SHADCN_SURFACE_MAP) {
      expect(e.mcpTools.length, `${e.surface} must name the tools it calls`).toBeGreaterThan(0)
      for (const t of e.mcpTools) expect(t === '*' || t.startsWith('erpax.'), `${e.surface}: ${t}`).toBe(true)
    }
  })

  it('every surface carries a Schema.org type — the SEO coupling has no unnamed surface', () => {
    for (const e of SHADCN_SURFACE_MAP) {
      expect(e.schemaOrgType).toMatch(/^[A-Z][A-Za-z]+$/)
      expect(e.description.length).toBeGreaterThan(20)
    }
  })
})
