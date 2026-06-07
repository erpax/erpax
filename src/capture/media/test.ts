import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { promises as fs } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'
import type { Payload } from 'payload'
import { buildWebVtt, uploadTestArtifacts } from '@/capture/media'

// The uploader (./index.ts) turns Playwright artifacts into Media records and
// builds a WebVTT track per video from its step titles. buildWebVtt is pure;
// uploadTestArtifacts is driven against a tmp manifest + a stub Payload.

describe('capture/media — buildWebVtt', () => {
  it('emits a WEBVTT header and monotonic HH:MM:SS.mmm cues, final cue closing at durationMs', () => {
    const body = buildWebVtt(
      [
        { title: 'open the app', ts: 0 },
        { title: 'click checkout', ts: 1500 },
      ],
      5000,
    )
    expect(body.startsWith('WEBVTT')).toBe(true)
    const cues = body.split('\n').filter((l) => l.includes('-->'))
    expect(cues).toEqual(['00:00:00.000 --> 00:00:01.500', '00:00:01.500 --> 00:00:05.000'])
    expect(body).toContain('open the app')
    expect(body).toContain('click checkout')
  })

  it('floors the final cue at start + 3s when no durationMs is given', () => {
    const body = buildWebVtt([{ title: 'only step', ts: 2000 }])
    const cue = body.split('\n').find((l) => l.includes('-->'))
    expect(cue).toBe('00:00:02.000 --> 00:00:05.000')
  })

  it('formats hours/minutes correctly past the 1-hour mark', () => {
    const body = buildWebVtt([{ title: 'late', ts: 3_661_001 }], 3_661_001 + 100)
    expect(body).toContain('01:01:01.001 -->')
  })
})

describe('capture/media — uploadTestArtifacts', () => {
  let dir: string
  interface CreateCall {
    collection: string
    data: Record<string, unknown>
    file?: { name: string; mimetype: string; size: number }
  }
  const calls: CreateCall[] = []

  const payload = {
    async create(args: CreateCall) {
      calls.push(args)
      return { id: `media-${calls.length}` }
    },
  } as unknown as Payload

  beforeAll(async () => {
    dir = await fs.mkdtemp(join(tmpdir(), 'erpax-capture-media-'))
    await fs.mkdir(join(dir, 'e2e'), { recursive: true })
    await fs.writeFile(join(dir, 'e2e', 'checkout.webm'), Buffer.from([0x1a, 0x45, 0xdf, 0xa3]))
    await fs.writeFile(join(dir, 'e2e', 'hero.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47]))
    const manifest = {
      startedAt: new Date().toISOString(),
      tests: [
        {
          name: 'checkout flow',
          spec: 'e2e/checkout.spec.ts',
          video: 'checkout.webm',
          screenshots: ['hero.png'],
          steps: [
            { title: 'open', ts: 0 },
            { title: 'pay', ts: 1000 },
          ],
          durationMs: 2000,
        },
      ],
    }
    await fs.writeFile(join(dir, 'manifest.json'), JSON.stringify(manifest))
  })

  afterAll(async () => {
    await fs.rm(dir, { recursive: true, force: true })
  })

  it('uploads video (video/webm), a companion .vtt (text/vtt) and the screenshot (image/png) to Media', async () => {
    const result = await uploadTestArtifacts(payload, dir, { tenantId: 't1' })

    const mimetypes = calls.map((c) => c.file?.mimetype)
    expect(mimetypes).toContain('video/webm')
    expect(mimetypes).toContain('text/vtt')
    expect(mimetypes).toContain('image/png')

    // every Media record lands in the media collection, tagged with the tenant
    for (const c of calls) {
      expect(c.collection).toBe('media')
      expect(c.data.tenant).toBe('t1')
    }

    const vtt = calls.find((c) => c.file?.mimetype === 'text/vtt')
    expect(vtt?.file?.name).toBe('checkout.vtt')

    expect(result.videoMediaIds).toHaveLength(1)
    expect(result.videoMediaIds[0].test).toBe('checkout flow')
    expect(result.videoMediaIds[0].subtitlesMediaId).toBeTruthy()
    expect(result.screenshotMediaIds).toHaveLength(1)
    expect(result.screenshotMediaIds[0].test).toBe('checkout flow')
  })
})
