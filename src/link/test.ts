import { describe, it, expect } from 'vitest'
import { appearanceOptions, link, linkGroup } from '@/link'

describe('link', () => {
  it('appearanceOptions has exactly the two canonical keys', () => {
    const keys = Object.keys(appearanceOptions)
    expect(keys).toEqual(expect.arrayContaining(['default', 'outline']))
    expect(keys).toHaveLength(2)
  })

  it('appearanceOptions values carry the correct value field', () => {
    expect(appearanceOptions.default.value).toBe('default')
    expect(appearanceOptions.outline.value).toBe('outline')
  })

  it('appearanceOptions labels are locale record objects with at least en', () => {
    expect(typeof appearanceOptions.default.label).toBe('object')
    expect(typeof appearanceOptions.default.label['en']).toBe('string')
    expect(typeof appearanceOptions.outline.label['en']).toBe('string')
  })

  it('link() with no args returns a group field named "link"', () => {
    const field = link() as { name: string; type: string }
    expect(field.name).toBe('link')
    expect(field.type).toBe('group')
  })

  it('link() default includes an appearance select field', () => {
    const field = link() as { fields: Array<{ name?: string; type: string }> }
    const flat = field.fields.flatMap((f: any) => f.fields ?? [f])
    const appearance = flat.find((f: any) => f.name === 'appearance')
    expect(appearance).toBeDefined()
    expect(appearance?.type).toBe('select')
  })

  it('link({ appearances: false }) omits the appearance field', () => {
    const field = link({ appearances: false }) as { fields: Array<{ name?: string; type: string }> }
    const flat = field.fields.flatMap((f: any) => f.fields ?? [f])
    const appearance = flat.find((f: any) => f.name === 'appearance')
    expect(appearance).toBeUndefined()
  })

  it('link({ disableLabel: true }) omits the label field', () => {
    const field = link({ disableLabel: true }) as { fields: Array<{ name?: string; type: string }> }
    const flat = field.fields.flatMap((f: any) => f.fields ?? [f])
    const label = flat.find((f: any) => f.name === 'label')
    expect(label).toBeUndefined()
  })

  it('link({ appearances: ["outline"] }) limits appearance options to one', () => {
    const field = link({ appearances: ['outline'] }) as { fields: Array<any> }
    const flat = field.fields.flatMap((f: any) => f.fields ?? [f])
    const appearance = flat.find((f: any) => f.name === 'appearance') as any
    expect(appearance?.options).toHaveLength(1)
    expect(appearance?.options[0].value).toBe('outline')
  })

  it('link({ overrides }) deep-merges the override into the result', () => {
    const field = link({ overrides: { admin: { hideGutter: false } } }) as any
    expect(field.admin.hideGutter).toBe(false)
  })

  it('linkGroup() returns an array field named "links"', () => {
    const group = linkGroup() as { name: string; type: string }
    expect(group.name).toBe('links')
    expect(group.type).toBe('array')
  })

  it('linkGroup() initCollapsed defaults to true', () => {
    const group = linkGroup() as { admin: { initCollapsed: boolean } }
    expect(group.admin.initCollapsed).toBe(true)
  })

  it('linkGroup({ overrides }) merges overrides onto the array field', () => {
    const group = linkGroup({ overrides: { label: 'Nav Links' } }) as any
    expect(group.label).toBe('Nav Links')
  })
})
