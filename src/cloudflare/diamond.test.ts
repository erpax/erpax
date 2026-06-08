/**
 * Cloudflare binding diamonds — all Wrangler binding types + live wrangler.jsonc parse.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  CLOUDFLARE_BINDING_TYPES,
  bindingDiamond,
  bindingBoundaryUuid,
  cloudflareBindingFace,
  mergeCloudflareBinding,
  deriveWranglerBindingDiamonds,
  sealCloudflareConfig,
  parseWranglerBindings,
  type CloudflareBindingType,
} from '@/cloudflare'
import { diamondUuid } from '@/diamond'
import { pathsMeet, toAtomPath } from '@/path'

const ROOT = process.cwd()
const FAKE_CONFIG = {
  accountId: '00000000000000000000000000000001',
  apiToken: 'cf-test-token-00000000000000000000000000000001',
}
const CONTEXT = '00000000-0000-5000-8000-context000001'
const ATOM = 'law/folder'

/** Minimal wrangler fragment per binding type for matrix coverage. */
const MOCK_BY_TYPE: Record<CloudflareBindingType, { bindingName: string; config: Record<string, unknown> }> = {
  d1_databases: { bindingName: 'D1', config: { binding: 'D1', database_id: 'db-1' } },
  r2_buckets: { bindingName: 'R2', config: { binding: 'R2', bucket_name: 'erpax' } },
  kv_namespaces: { bindingName: 'KV', config: { binding: 'KV', id: 'kv-1' } },
  durable_objects: { bindingName: 'ERPAX_DO', config: { name: 'ERPAX_DO', class_name: 'ErpaxStateDO' } },
  services: { bindingName: 'WORKER_SELF', config: { binding: 'WORKER_SELF', service: 'erpax' } },
  analytics_engine_datasets: { bindingName: 'ANALYTICS', config: { binding: 'ANALYTICS', dataset: 'erpax' } },
  queues: { bindingName: 'QUEUE_AI_BATCH', config: { binding: 'QUEUE_AI_BATCH', queue: 'q' } },
  hyperdrive: { bindingName: 'HYPERDRIVE', config: { binding: 'HYPERDRIVE', id: 'hd-1' } },
  vectorize: { bindingName: 'VECTORIZE_DOCS', config: { binding: 'VECTORIZE_DOCS', index_name: 'idx' } },
  ai: { bindingName: 'AI', config: { binding: 'AI' } },
  browser: { bindingName: 'BROWSER', config: { binding: 'BROWSER' } },
  secrets: { bindingName: 'PAYLOAD_SECRET', config: { name: 'PAYLOAD_SECRET' } },
  vars: { bindingName: 'AI_GATEWAY_URL', config: { name: 'AI_GATEWAY_URL', value: 'https://example' } },
  assets: { bindingName: 'ASSETS', config: { binding: 'ASSETS', directory: '.open-next/assets' } },
  images: { bindingName: 'IMAGES', config: { binding: 'IMAGES' } },
  send_email: { bindingName: 'EMAIL_SENDER', config: { name: 'EMAIL_SENDER' } },
  ratelimit: { bindingName: 'RATE_LIMITER_API', config: { name: 'RATE_LIMITER_API', type: 'ratelimit' } },
  mtls_certificates: { bindingName: 'CF_MTLS_BG_NAP', config: { binding: 'CF_MTLS_BG_NAP' } },
  triggers: { bindingName: 'CRON', config: { crons: ['*/15 * * * *'] } },
}

describe('cloudflare — binding diamonds (all types)', () => {
  const prior = process.env.PAYLOAD_SECRET

  beforeEach(() => {
    process.env.PAYLOAD_SECRET = 'unit-test-master-secret-for-cf-seal'
  })

  afterEach(() => {
    if (prior === undefined) Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET')
    else process.env.PAYLOAD_SECRET = prior
  })

  it('CLOUDFLARE_BINDING_TYPES covers every documented Wrangler section', () => {
    expect(CLOUDFLARE_BINDING_TYPES).toHaveLength(19)
    for (const type of CLOUDFLARE_BINDING_TYPES) {
      expect(MOCK_BY_TYPE[type]).toBeDefined()
    }
  })

  it.each(CLOUDFLARE_BINDING_TYPES)('bindingDiamond(%s) yields boundaryUuid + sealed model', (type) => {
    const mock = MOCK_BY_TYPE[type]
    const model = bindingDiamond({ type, bindingName: mock.bindingName, config: mock.config })
    expect(model.boundaryUuid).toMatch(/^[0-9a-f-]{36}$/)
    expect(model.sealed).toBe(true)
    expect(model.atomPath).toBe(`cloudflare/${type.replace(/_/g, '-')}/${mock.bindingName}`)
    expect(diamondUuid(model)).toMatch(/^[0-9a-f-]{36}$/)
    expect(bindingBoundaryUuid({ type, bindingName: mock.bindingName, config: mock.config })).toBe(
      model.boundaryUuid,
    )
    expect(cloudflareBindingFace(type)).toBeTruthy()
  })

  it('parse repo wrangler.jsonc → N binding diamonds, each with boundaryUuid', () => {
    const text = readFileSync(join(ROOT, 'wrangler.jsonc'), 'utf8')
    const entries = parseWranglerBindings(text)
    expect(entries.length).toBeGreaterThanOrEqual(20)
    const diamonds = deriveWranglerBindingDiamonds(entries)
    expect(diamonds).toHaveLength(entries.length)
    const types = new Set(entries.map((e) => e.type))
    expect(types.has('d1_databases')).toBe(true)
    expect(types.has('r2_buckets')).toBe(true)
    expect(types.has('durable_objects')).toBe(true)
    expect(types.has('queues')).toBe(true)
    expect(types.has('analytics_engine_datasets')).toBe(true)
    for (const d of diamonds) {
      expect(d.boundaryUuid).toMatch(/^[0-9a-f-]{36}$/)
      expect(d.sealed).toBe(true)
    }
  })

  it('CF cloudflare surface + fs path → same atomPath', () => {
    expect(
      pathsMeet(`src/${ATOM}/index.ts`, `r2://erpax/t:tenant/${ATOM}/report.pdf`, 'fs', 'cloudflare'),
    ).toBe(true)
    expect(toAtomPath(`https://erpax.workers.dev/api/corpus/${ATOM}`, 'cloudflare')).toBe(ATOM)
    expect(toAtomPath(`d1://erpax/t:tenant/${ATOM}`, 'cloudflare')).toBe(ATOM)
  })

  it('mergeCloudflareBinding entangles path uuid + sealed config + binding diamond', async () => {
    const sealed = await sealCloudflareConfig(FAKE_CONFIG, CONTEXT)
    const merged = await mergeCloudflareBinding({
      path: `r2://erpax/t:tenant/${ATOM}/report.pdf`,
      binding: {
        type: 'r2_buckets',
        bindingName: 'R2',
        config: { binding: 'R2', bucket_name: 'erpax' },
      },
      sealedConfig: sealed,
    })
    expect(merged.atomPath).toBe(ATOM)
    expect(merged.sealedContentUuid).toBe(sealed.contentUuid)
    expect(merged.boundaryUuid).toMatch(/^[0-9a-f-]{36}$/)
    expect(merged.diamond.exports).toContain('R2')
  })
})
