/**
 * Test-artifact uploader — wiring gate. (a) buildWebVtt emits a valid, monotonic
 * WebVTT body; (b) uploadTestArtifacts uploads each artifact to Media with the
 * right mimetype + a companion .vtt for videos with steps; (c) the @see cross-ref
 * resolves to a real file (docs-aura lint).
 *
 * @standard W3C WebVTT
 * @see ./index.ts ; src/agents/mcp/tool-defs.ts (erpax.website.uploadTestArtifacts)
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { promises as fs } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'
import type { Payload } from 'payload'
import { buildWebVtt, uploadTestArtifacts } from '@/capture/media'

describe('capture/media: buildWebVtt emits a valid monotonic WebVTT body', () => {
  it('a 2-step manifest yields a WEBVTT header + monotonic HH:MM:SS.mmm cues, final cue closing at durationMs', () => {
    const body = buildWebVtt(
      [
        { title: 'open the app', ts: 0 },
        { title: 'click checkout', ts: 1500 },
      ],
      5000,
    )
    expect(body.startsWith('WEBVTT')).toBe(true)
    const cueLines = body.split('\n').filter((l) => l.includes('-->'))
    expect(cueLines).toHaveLength(2)
    expect(cueLines[0]).toBe('00:00:00.000 --> 00:00:01.500')
    // final cue closes at durationMs (5000ms ⇒ 00:00:05.000)
    expect(cueLines[1]).toBe('00:00:01.500 --> 00:00:05.000')
    // cue starts are monotonic non-decreasing
    expect(body).toContain('open the app')
    expect(body).toContain('click checkout')
  })

  it('with no durationMs the final cue still closes after its start (start + 3s floor)', () => {
    const body = buildWebVtt([{ title: 'only step', ts: 2000 }])
    const cue = body.split('\n').find((l) => l.includes('-->'))!
    expect(cue).toBe('00:00:02.000 --> 00:00:05.000')
  })
})

describe('capture/media: uploadTestArtifacts uploads each artifact to Media (wiring gate)', () => {
  let dir: string
  type CreateCall = { collection: string; data: Record<string, unknown>; file?: { name: string; mimetype: string } }
  const calls: CreateCall[] = []

  const payload = {
    async create(args: { collection: string; data: Record<string, unknown>; file?: { name: string; mimetype: string } }) {
      calls.push({ collection: args.collection, data: args.data, file: args.file })
      return { id: `media-${calls.length}` }
    },
  } as unknown as Payload

  beforeAll(async () => {
    dir = await fs.mkdtemp(join(tmpdir(), 'erpax-capture-'))
    // spec dir holds the video + screenshot (manifest spec = 'e2e/checkout.spec.ts' ⇒ baseDir = dir/e2e)
    await fs.mkdir(join(dir, 'e2e'), { recursive: true })
    await fs.writeFile(join(dir, 'e2e', 'checkout.webm'), Buffer.from([0x1a, 0x45, 0xdf, 0xa3])) // tiny webm magic
    await fs.writeFile(join(dir, 'e2e', 'hero.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47])) // tiny png magic
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

  it('creates Media for the video (video/webm), a companion .vtt (text/vtt), and the screenshot (image/png)', async () => {
    const result = await uploadTestArtifacts(payload, dir, { tenantId: 't1' })

    const mimetypes = calls.map((c) => c.file?.mimetype)
    expect(mimetypes).toContain('video/webm')
    expect(mimetypes).toContain('text/vtt') // companion subtitle for a video WITH steps
    expect(mimetypes).toContain('image/png')

    // the .vtt filename is the video basename with .vtt
    const vtt = calls.find((c) => c.file?.mimetype === 'text/vtt')
    expect(vtt!.file!.name).toBe('checkout.vtt')

    // result groups ids by test, with the subtitle id surfaced for the video
    expect(result.videoMediaIds).toHaveLength(1)
    expect(result.videoMediaIds[0].test).toBe('checkout flow')
    expect(result.videoMediaIds[0].subtitlesMediaId).toBeTruthy()
    expect(result.screenshotMediaIds).toHaveLength(1)
  })
})

describe('capture/media: the @see cross-ref resolves to a real file (docs-aura lint)', () => {
  it('the @see path in index.ts points at an existing file', async () => {
    const src = await fs.readFile(join(process.cwd(), 'src/capture/media/index.ts'), 'utf-8')
    const m = src.match(/@see\s+(src\/\S+\.ts)/)
    expect(m, 'index.ts must carry an @see <src/...> reference').not.toBeNull()
    const ref = m![1]
    await expect(fs.access(join(process.cwd(), ref))).resolves.toBeUndefined()
  })
})
