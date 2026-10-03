import { describe, it, expect } from 'vitest'
import {
  crossFormulas,
  discoverApis,
  discoverGraphql,
  discoverMethods,
  parseQuantity,
  quantityNotation,
  sharedNotation,
  quantityOf,
  relationOf,
  type DiscoveredMethod,
} from './index'

/** A method, with inputs/outputs in the compact notation: `temperature` · `temperature[]` · `temperature{}`. */
const m = (api: string, path: string, inputs: string[], outputs: string[]): DiscoveredMethod => ({
  api,
  path,
  verb: 'get',
  inputs: inputs.map(parseQuantity),
  outputs: outputs.map(parseQuantity),
})

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
    expect(ms[0]!.inputs.map(quantityNotation)).toEqual(['latitude', 'longitude'])
    expect(ms[0]!.outputs.map(quantityNotation)).toEqual(['temperature'])
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
    expect(crossFormulas(real)[0]!.compares.map(sharedNotation)).toEqual(['temperature']) // latitude excluded as echo
  })

  it('ranks the richest cross first', () => {
    const thin = m('b', '/thin', ['latitude'], ['temperature'])
    const rich = m('c', '/rich', ['latitude', 'instant'], ['temperature', 'humidity'])
    const anchor = m('a', '/a', ['latitude', 'instant'], ['temperature', 'humidity'])
    const got = crossFormulas([anchor, thin, rich])
    expect(got[0]!.compares.length).toBeGreaterThanOrEqual(got[got.length - 1]!.compares.length)
  })
})

/**
 * Two APIs in ONE registry declare a parameter called `from`, and it is a different quantity in each.
 * The strings below are verbatim from their published specs.
 */
describe('outward/discover — the words that are not quantities', () => {
  const CURRENCY_DESC = 'Currency symbol for the converted from amount' // interzoid.com:convertcurrency
  const OFFSET_DESC = 'How many initial results should be skipped. Defaults to 0.' // opentargets.io

  it('reads an ambiguous word through the spec, in both directions', () => {
    expect(quantityOf('from', CURRENCY_DESC)).toBe('currency')
    expect(quantityOf('from', OFFSET_DESC)).toBeNull()
    expect(quantityOf('to', CURRENCY_DESC)).toBe('currency')
  })

  it('refuses an ambiguous word with NO corroboration — never a guessed quantity', () => {
    for (const w of ['from', 'to', 'base', 'symbol']) expect(quantityOf(w)).toBeNull()
  })

  /**
   * The point of deriving the rule: `alt` was closed by marking it a role word, with no new logic. The
   * same machinery that refused a paginated `from` refused a response-format `alt` on the next run.
   */
  it('closes a SECOND collision with no second rule — Google\'s alt is not an altitude', () => {
    expect(quantityOf('alt', 'Data format for the response.')).toBeNull()
    expect(quantityOf('alt', 'Altitude in metres above sea level')).toBe('altitude')
    expect(quantityOf('alt')).toBeNull() // no description ⇒ refused, never guessed
    expect(quantityOf('altitude')).toBe('altitude') // the full word still answers alone
  })

  it('derives the corroborating vocabulary from the quantity itself', () => {
    // nothing anywhere lists the words that corroborate `pop` — they ARE `population`
    expect(quantityOf('pop', 'Resident population of the region')).toBe('population')
    expect(quantityOf('pop', 'Most popular tracks this week')).toBeNull()
    expect(quantityOf('rh', 'Relative humidity, percent')).toBe('humidity')
    expect(quantityOf('rh', 'Rhesus factor')).toBeNull()
  })

  it('reads the longest alternative first — an alias must not shadow the full word', () => {
    expect(quantityOf('temperature_2m')).toBe('temperature') // via `temperature`, not the alias `temp`
    expect(quantityOf('base_currency')).toBe('currency') // not via the role word `base`
  })

  it('still answers on an unambiguous name, with no hint', () => {
    expect(quantityOf('currency')).toBe('currency')
    expect(quantityOf('base_currency')).toBe('currency')
    expect(quantityOf('latitude')).toBe('latitude')
  })

  /** The whole point: a pagination offset must not make a genomics API cross with a forex one. */
  it('does not let a paginated method claim a currency', () => {
    const spec = {
      paths: {
        '/search': {
          get: { parameters: [{ name: 'from', description: OFFSET_DESC }, { name: 'size' }] },
        },
      },
    }
    expect(discoverMethods('genomics', spec)).toEqual([])
  })
})

describe('outward/discover — a POST-only schema', () => {
  const intro = {
    data: {
      __schema: {
        queryType: { name: 'Query' },
        types: [
          {
            name: 'Query',
            kind: 'OBJECT',
            fields: [
              {
                name: 'forecast',
                args: [{ name: 'latitude' }, { name: 'longitude' }, { name: 'from' }],
                // NON_NULL wrapping a LIST wrapping the named type — the shape GraphQL actually sends
                type: { kind: 'NON_NULL', name: null, ofType: { kind: 'LIST', name: null, ofType: { kind: 'OBJECT', name: 'Reading' } } },
              },
              { name: 'meta', args: [], type: { kind: 'OBJECT', name: 'Meta' } },
            ],
          },
          { name: 'Reading', kind: 'OBJECT', fields: [{ name: 'temperature' }, { name: 'humidity' }, { name: 'note' }] },
          { name: 'Meta', kind: 'OBJECT', fields: [{ name: 'note' }] },
        ],
      },
    },
  }

  it('reads root query fields as methods, unwrapping NON_NULL and LIST', () => {
    const ms = discoverGraphql('gql', intro)
    expect(ms).toHaveLength(2)
    const f = ms.find((m) => m.path === 'forecast')!
    expect(f.verb).toBe('post') // a GraphQL endpoint has one path and answers POST
    expect(f.inputs.map(quantityNotation)).toEqual(['latitude', 'longitude']) // `from` carries no hint here, so it is refused
    expect(f.outputs.map(quantityNotation)).toEqual(['humidity[]', 'temperature[]']) // `note` denotes no quantity
  })

  it('a method that denotes no quantity is still a method, and crosses nothing', () => {
    const ms = discoverGraphql('gql', intro)
    expect(ms.find((m) => m.path === 'meta')!.outputs.map(quantityNotation)).toEqual([])
    expect(crossFormulas(ms.filter((m) => m.path === 'meta'))).toEqual([])
  })

  it('an unreadable introspection is empty, never a throw', () => {
    expect(discoverGraphql('x', {})).toEqual([])
    expect(discoverGraphql('x', { data: { __schema: { types: [] } } })).toEqual([])
    expect(discoverGraphql('x', { data: { __schema: { queryType: { name: 'Nope' }, types: [{ name: 'Query', fields: [] }] } } })).toEqual([])
  })
})

/**
 * A flattened leaf-name scan threw away the half that decides comparability. `temperature` once,
 * `[temperature]` hourly and `{ city: temperature }` are three answers to one question.
 */
describe('outward/discover — arrays and hashes are answers too', () => {
  it('reads an array as a LIST of its quantity', () => {
    const spec = {
      paths: {
        '/hourly': {
          get: {
            parameters: [{ name: 'latitude' }],
            responses: {
              '200': {
                content: {
                  'application/json': {
                    schema: { type: 'array', items: { type: 'object', properties: { temperature: { type: 'number' } } } },
                  },
                },
              },
            },
          },
        },
      },
    }
    expect(discoverMethods('x', spec)[0]!.outputs.map(quantityNotation)).toEqual(['temperature[]'])
  })

  it('reads additionalProperties as a MAP, and named properties as a record', () => {
    const asMap = {
      paths: {
        '/byCity': {
          get: {
            parameters: [{ name: 'latitude' }],
            responses: {
              '200': {
                content: {
                  'application/json': {
                    schema: { type: 'object', additionalProperties: { type: 'object', properties: { temperature: {} } } },
                  },
                },
              },
            },
          },
        },
      },
    }
    expect(discoverMethods('x', asMap)[0]!.outputs.map(quantityNotation)).toEqual(['temperature{}'])

    // `type: object` with NAMED properties is a record, not a hash — otherwise every body is a map
    const asRecord = {
      paths: {
        '/one': {
          get: {
            parameters: [{ name: 'latitude' }],
            responses: {
              '200': { content: { 'application/json': { schema: { type: 'object', properties: { temperature: {} } } } } },
            },
          },
        },
      },
    }
    expect(discoverMethods('x', asRecord)[0]!.outputs.map(quantityNotation)).toEqual(['temperature'])
  })

  it('keeps the WIDEST shape a quantity was seen in', () => {
    const both = {
      paths: {
        '/mixed': {
          get: {
            parameters: [{ name: 'latitude' }],
            responses: {
              '200': {
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        temperature: { type: 'number' },
                        hourly: { type: 'array', items: { type: 'object', properties: { temperature: {} } } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }
    // reporting the scalar would promise one value the caller must pick out of many
    expect(discoverMethods('x', both)[0]!.outputs.map(quantityNotation)).toEqual(['temperature[]'])
  })

  it('a repeatable query parameter takes MANY of its quantity', () => {
    const spec = {
      paths: {
        '/multi': {
          get: {
            parameters: [{ name: 'currency', schema: { type: 'array', items: { type: 'string' } } }],
            responses: { '200': { content: { 'application/json': { schema: { properties: { temperature: {} } } } } } },
          },
        },
      },
    }
    expect(discoverMethods('x', spec)[0]!.inputs.map(quantityNotation)).toEqual(['currency[]'])
  })

  it('names the relation two shapes force, symmetrically', () => {
    expect(relationOf('scalar', 'scalar')).toBe('direct')
    expect(relationOf('list', 'list')).toBe('align')
    expect(relationOf('list', 'scalar')).toBe('reduce')
    expect(relationOf('scalar', 'list')).toBe('reduce')
    expect(relationOf('map', 'list')).toBe('key') // a hash outranks everything: agree on keys first
    expect(relationOf('map', 'scalar')).toBe('key')
  })

  it('a cross carries the HARDEST relation its compared quantities force', () => {
    const pair = [
      m('a', '/1', ['latitude'], ['temperature[]', 'pressure']),
      m('b', '/2', ['latitude'], ['temperature', 'pressure']),
    ]
    const c = crossFormulas(pair)[0]!
    expect(c.compares.map(sharedNotation)).toEqual(['pressure', 'temperature:reduce'])
    expect(c.relation).toBe('reduce') // one list against one scalar is not an equality
  })

  it('ranks a runnable cross above one that owes a decision', () => {
    const many = [
      m('a', '/1', ['latitude'], ['temperature{}']),
      m('b', '/2', ['latitude'], ['temperature']),
      m('c', '/3', ['latitude'], ['pressure']),
      m('d', '/4', ['latitude'], ['pressure']),
    ]
    const cs = crossFormulas(many)
    expect(cs[0]!.relation).toBe('direct') // c × d: pressure against pressure
    expect(cs.at(-1)!.relation).toBe('key') // a × b: a hash needs a key space first
  })

  it('the notation round-trips, in both directions', () => {
    for (const spec of ['temperature', 'temperature[]', 'temperature{}']) {
      expect(quantityNotation(parseQuantity(spec))).toBe(spec)
    }
  })
})
