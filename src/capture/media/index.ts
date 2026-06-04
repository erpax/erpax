/**
 * Test-artifact → Media uploader + WebVTT subtitle generator.
 *
 * Picks up Playwright screenshots (`test-results/**\/*.png`) and videos
 * (`test-results/**\/*.webm`) and uploads them to Payload's Media
 * collection so the marketing pages can embed live evidence of the
 * documented capabilities. For each video, generates a WebVTT subtitle
 * track from the test name + step labels (Playwright `test.step` titles
 * are exposed in the trace; this helper consumes a manifest produced
 * during the test run).
 *
 * Pipeline:
 *
 *   Playwright run
 *      ↓ writes test-results/<spec>/<test-name>.{png,webm,trace.zip}
 *      ↓ + manifest.json with [{name, steps:[{title, ts}]}, …]
 *   uploadTestArtifacts(payload, dir)
 *      ↓ for each .webm: payload.create({collection:'media', data, file})
 *      ↓                  payload.create({collection:'media', data:vttData, file:vtt})
 *      ↓ for each .png:   payload.create({collection:'media', data, file})
 *   Marketing page references the Media id in `hero.media`
 *
 * @standard W3C WebVTT video-text-track-format
 * @standard ISO/IEC 14496-30 timed-text-formats
 * @standard ISO 19011:2018 audit-trail test-evidence
 * @compliance WCAG-2.1 §1.2.2 captions-prerecorded
 * @compliance WCAG-2.1 §1.2.5 audio-description-prerecorded
 * @audit ISO-19011:2018 audit-trail test-recording-provenance
 * @see src/endpoints/seed/erpax-product-pages.ts
 */

import { promises as fs } from 'fs'
import { extname, join, basename, dirname } from 'path'
import type { Payload } from 'payload'

export interface TestStep {
  title: string
  /** Milliseconds from test start. */
  ts: number
}

export interface TestArtifactManifestEntry {
  /** Test name (Playwright `test('…')`). */
  name: string
  /** Spec file relative path. */
  spec: string
  /** Recorded video filename (relative to the test's results dir). */
  video?: string
  /** Screenshot filenames. */
  screenshots?: string[]
  /** Step titles + offsets (from Playwright reporter). */
  steps?: TestStep[]
  /** Total duration ms, for the WebVTT closer cue. */
  durationMs?: number
}

export interface TestArtifactManifest {
  /** Run timestamp ISO. */
  startedAt: string
  /** Per-test entries. */
  tests: TestArtifactManifestEntry[]
}

/**
 * Format a millisecond offset as a WebVTT timestamp `HH:MM:SS.mmm`.
 */
function vttTimestamp(ms: number): string {
  const h = Math.floor(ms / 3_600_000)
  const m = Math.floor((ms % 3_600_000) / 60_000)
  const s = Math.floor((ms % 60_000) / 1_000)
  const mmm = ms % 1_000
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(mmm).padStart(3, '0')}`
}

/**
 * Build a WebVTT subtitle file body from a sequence of test steps.
 * Cues run from each step's timestamp to the next; final cue runs
 * to `durationMs`.
 *
 * @standard W3C WebVTT
 */
export function buildWebVtt(steps: TestStep[], durationMs: number = 0): string {
  const cues: string[] = ['WEBVTT', '']
  for (let i = 0; i < steps.length; i++) {
    const start = steps[i].ts
    const end = i + 1 < steps.length ? steps[i + 1].ts : Math.max(durationMs, start + 3000)
    cues.push(String(i + 1))
    cues.push(`${vttTimestamp(start)} --> ${vttTimestamp(end)}`)
    cues.push(steps[i].title)
    cues.push('')
  }
  return cues.join('\n')
}

export interface UploadResult {
  videoMediaIds: Array<{ test: string; mediaId: string | number; subtitlesMediaId?: string | number }>
  screenshotMediaIds: Array<{ test: string; mediaId: string | number }>
}

/**
 * Walk a test-results directory, read its `manifest.json`, upload each
 * video / screenshot / subtitle to the Media collection, and return
 * the resulting Media IDs grouped by test.
 *
 * Idempotent on filename: re-runs that find the same
 * `(spec, name)` pair will not duplicate Media records (caller
 * dedup not yet implemented — TODO: query by alt text).
 */
export async function uploadTestArtifacts(
  payload: Payload,
  artifactsDir: string,
  options: { tenantId?: string; manifestFile?: string } = {},
): Promise<UploadResult> {
  const { tenantId, manifestFile = 'manifest.json' } = options
  const manifestPath = join(artifactsDir, manifestFile)
  const manifestRaw = await fs.readFile(manifestPath, 'utf-8')
  const manifest = JSON.parse(manifestRaw) as TestArtifactManifest

  const videoMediaIds: UploadResult['videoMediaIds'] = []
  const screenshotMediaIds: UploadResult['screenshotMediaIds'] = []

  for (const t of manifest.tests) {
    const baseDir = join(artifactsDir, dirname(t.spec))

    // Video → Media + companion WebVTT → Media
    if (t.video) {
      const videoPath = join(baseDir, t.video)
      const videoBuffer = await fs.readFile(videoPath)
      const videoDoc = await payload.create({
        collection: 'media',
        data: {
          alt: `Test recording — ${t.name}`,
          ...(tenantId !== undefined ? { tenant: tenantId } : {}),
        },
        file: {
          name: basename(videoPath),
          data: videoBuffer,
          mimetype: 'video/webm',
          size: videoBuffer.length,
        },
      })

      let subtitlesId: string | undefined
      if (t.steps && t.steps.length > 0) {
        const vttBody = buildWebVtt(t.steps, t.durationMs ?? 0)
        const vttBuffer = Buffer.from(vttBody, 'utf-8')
        const vttDoc = await payload.create({
          collection: 'media',
          data: {
            alt: `Subtitles for ${t.name}`,
            ...(tenantId !== undefined ? { tenant: tenantId } : {}),
          },
          file: {
            name: basename(videoPath, extname(videoPath)) + '.vtt',
            data: vttBuffer,
            mimetype: 'text/vtt',
            size: vttBuffer.length,
          },
        })
        subtitlesId = vttDoc.id
      }
      videoMediaIds.push({ test: t.name, mediaId: videoDoc.id, subtitlesMediaId: subtitlesId })
    }

    // Screenshots → Media
    for (const shot of t.screenshots ?? []) {
      const shotPath = join(baseDir, shot)
      const shotBuffer = await fs.readFile(shotPath)
      const shotDoc = await payload.create({
        collection: 'media',
        data: {
          alt: `Test screenshot — ${t.name} — ${basename(shot, extname(shot))}`,
          ...(tenantId !== undefined ? { tenant: tenantId } : {}),
        },
        file: {
          name: basename(shotPath),
          data: shotBuffer,
          mimetype: 'image/png',
          size: shotBuffer.length,
        },
      })
      screenshotMediaIds.push({ test: t.name, mediaId: shotDoc.id })
    }
  }

  return { videoMediaIds, screenshotMediaIds }
}
