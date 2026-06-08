import { describe, it, expect } from 'vitest'
import {
  DIMENSION_PLUGIN_FACTORIES,
  allDimensionalPlugins,
  checkDimensionalPluginScaffolded,
  listAttachedDimensions,
  domainDimensionPlugin,
} from '@/dimension'
import { DIMENSIONAL_PLUGINS } from '@/plugin'
import type { Config } from 'payload'

// dimension — the 10 dimensional-plugin entry-points (./index.ts). Conservation
// Law 51: every declared dimension has a matching factory, and vice versa. The
// factories are no-ops today that record attachment for observability.
describe('dimension — Conservation Law 51: scaffolding symmetry', () => {
  it('every declared dimension has exactly one factory (no missing, no orphan)', () => {
    const r = checkDimensionalPluginScaffolded()
    expect(r.ok).toBe(true)
    expect(r.missingFactories).toEqual([])
    expect(r.orphanFactories).toEqual([])
  })

  it('the factory registry covers exactly the declared dimension ids', () => {
    const declared = DIMENSIONAL_PLUGINS.map((d) => d.id).sort()
    const factories = Object.keys(DIMENSION_PLUGIN_FACTORIES).sort()
    expect(factories).toEqual(declared)
    expect(declared).toHaveLength(10)
  })

  it('allDimensionalPlugins() yields one plugin per dimension, in declared order', () => {
    const plugins = allDimensionalPlugins()
    expect(plugins).toHaveLength(DIMENSIONAL_PLUGINS.length)
    plugins.forEach((p, i) => {
      expect(p).toBe(DIMENSION_PLUGIN_FACTORIES[DIMENSIONAL_PLUGINS[i]!.id])
    })
  })

  it('a factory is a no-op today (returns the config unchanged) but records attachment', () => {
    const config = { collections: [] } as unknown as Config
    expect(domainDimensionPlugin(config)).toBe(config)
    expect(listAttachedDimensions().has('A-domain')).toBe(true)
  })
})
