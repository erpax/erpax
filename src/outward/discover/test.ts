import { describe, it, expect } from 'vitest'
import { crossFormulas, discoverApis, discoverMethods, quantityOf, type DiscoveredMethod } from './index'

describe('outward/discover — step 1: the registry', () => {
  it('reads an APIs.guru-shaped list and keeps only entries carrying a schema URL', () => {
    const list = {
      'a.com': { versions: { '1.0': { swaggerUrl: 'https://x/a.json', info: { title: 'A' } } } },
      'b.com': { versions: { '1.0': { info: { title: 'B' } } } }, // no schema — unusable
    }
    const apis = discoverApis(list)
    expect(apis).toHaveLength(1)
    expect(apis[0]).toEqual({ name: 'a.com', title: 'A', schemaUrl: 'https://x/a.json' })
  })
})

/**
 * The reader was blind to two dialects and therefore reported ABSENCE, not an error: it walked only
 * `properties`/`items`/`schema`, so an OpenAPI 3 body under `content[…].schema` and a `$ref` into
 * `components` both read as empty — 7 of 9 live APIs came back with 0 methods.
 */
describe('outward/discover — step 2/3: methods, through $ref and content', () => {
  const spec = {
    paths: {
      '/w': {
        parameters: [{ $ref: '#/components/parameters/Lat' }], // path-level, applies to every verb
        get: {
          parameters: [{ name: 'lon' }],
          responses: { '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/W' } } } } },
        },
      },
    },
    components: {
      parameters: { Lat: { name: 'lat' } },
      schemas: { W: { properties: { temperature_2m: { type: 'number' }, note: { type: 'string' } } } },
    },
  }

  it('follows a $ref parameter, a path-level parameter, and an OpenAPI 3 response body', () => {
    const ms = discoverMethods('x', spec)
    expect(ms).toHaveLength(1)
    expect(ms[0]!.inputs).toEqual(['latitude', 'longitude'])
    expect(ms[0]!.outputs).toEqual(['temperature'])
  })

  it('drops an operation that declares no quantity at all', () => {
    expect(discoverMethods('x', { paths: { '/p': { get: { responses: { '200': {} } } } } })).toEqual([])
  })

  it('maps field names to quantities, and refuses what nothing declares', () => {
    expect(quantityOf('lat')).toBe('latitude')
    expect(quantityOf('temperature_2m')).toBe('temperature')
    expect(quantityOf('flurble')).toBeNull()
  })
})

describe('outward/discover — step 4: the crosses are derived, never authored', () => {
  const m = (api: string, path: string, inputs: string[], outputs: string[]): DiscoveredMethod => ({
    api, path, verb: 'get', inputs, outputs,
  })

  it('needs BOTH a shared question and a comparable answer', () => {
    const only_input = [m('a', '/1', ['latitude'], ['temperature']), m('b', '/2', ['latitude'], ['pressure'])]
    const only_output = [m('a', '/1', ['currency'], ['temperature']), m('b', '/2', ['latitude'], ['temperature'])]
    expect(crossFormulas(only_input)).toEqual([])
    expect(crossFormulas(only_output)).toEqual([])
  })

  it('never crosses an API with itself', () => {
    expect(crossFormulas([m('a', '/1', ['latitude'], ['temperature']), m('a', '/2', ['latitude'], ['temperature'])]))
      .toEqual([])
  })

  it('AN ECHO IS NOT A COMPARISON — a returned input does not count', () => {
    // Every geo API returns the latitude it was given. Comparing that verifies only that two services
    // can quote an argument back, and it dominated 31 of 64 live candidates before this refusal.
    const echo = [
      m('a', '/1', ['latitude', 'longitude'], ['latitude', 'longitude']),
      m('b', '/2', ['latitude', 'longitude'], ['latitude', 'longitude']),
    ]
    expect(crossFormulas(echo)).toEqual([])

    const real = [
      m('a', '/1', ['latitude'], ['latitude', 'temperature']),
      m('b', '/2', ['latitude'], ['latitude', 'temperature']),
    ]
    expect(crossFormulas(real)).toHaveLength(1)
    expect(crossFormulas(real)[0]!.compares).toEqual(['temperature']) // latitude excluded as echo
  })

  it('ranks the richest cross first', () => {
    const thin = m('b', '/thin', ['latitude'], ['temperature'])
    const rich = m('c', '/rich', ['latitude', 'instant'], ['temperature', 'humidity'])
    const anchor = m('a', '/a', ['latitude', 'instant'], ['temperature', 'humidity'])
    const got = crossFormulas([anchor, thin, rich])
    expect(got[0]!.compares.length).toBeGreaterThanOrEqual(got[got.length - 1]!.compares.length)
  })
})
