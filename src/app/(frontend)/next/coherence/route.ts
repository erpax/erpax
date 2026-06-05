/**
 * POST /next/coherence — edge rPPG. Receive a camera colour-trace from the
 * BROWSER, compute the pulse on the Worker (pure arithmetic, no native deps), and
 * log the reading through the Analytics Engine binding. Cloudflare-native end to
 * end — nothing here needs ffmpeg, a filesystem, or a camera on the server.
 *
 * THE CAMERA + SENSORS STAY CLIENT-SIDE (a Worker has neither). The browser does:
 *
 *   const stream = await navigator.mediaDevices.getUserMedia({ video: true })
 *   const v = document.createElement('video'); v.srcObject = stream; await v.play()
 *   const c = document.createElement('canvas'); c.width = 64; c.height = 64
 *   const ctx = c.getContext('2d', { willReadFrequently: true })!
 *   const trace: number[] = []; const fps = 30
 *   await new Promise<void>((done) => {
 *     const t0 = performance.now()
 *     const tick = () => {
 *       ctx.drawImage(v, v.videoWidth/3, v.videoHeight/3, v.videoWidth/3, v.videoHeight/3, 0, 0, 64, 64)
 *       const d = ctx.getImageData(0, 0, 64, 64).data
 *       let g = 0; for (let i = 1; i < d.length; i += 4) g += d[i]      // mean GREEN of the ROI
 *       trace.push(g / (d.length / 4))
 *       if (performance.now() - t0 < 30000) requestAnimationFrame(tick); else done()
 *     }
 *     requestAnimationFrame(tick)
 *   })
 *   stream.getTracks().forEach((t) => t.stop())
 *   const r = await fetch('/next/coherence', { method: 'POST', body: JSON.stringify({ trace, fps }) })
 *
 * Only the tiny number[] crosses the wire — no video, no frames, no PII.
 *
 * @rfc 9110 http-semantics  @rfc 8259 json
 * @standard DSP rPPG green-channel pulse extraction (0.7..4 Hz)
 * @audit ISO-19011:2018 reading logged to Analytics Engine (ANALYTICS_AI binding)
 * @see src/coherence (the edge-safe analyzer) — src/app/README.md
 */

import { extractPulse, type Pulse } from '@/coherence'

export const POST = async (request: Request): Promise<Response> => {
  let body: { trace?: unknown; fps?: unknown }
  try {
    body = (await request.json()) as { trace?: unknown; fps?: unknown }
  } catch {
    return Response.json({ error: 'invalid JSON body' }, { status: 400 })
  }

  const trace = Array.isArray(body.trace) ? body.trace.filter((n): n is number => typeof n === 'number') : []
  const fps = typeof body.fps === 'number' && body.fps > 0 ? body.fps : 30
  if (trace.length < 2 * fps) {
    return Response.json({ error: `trace too short — need >= ${2 * fps} samples (~2s)` }, { status: 400 })
  }

  const pulse: Pulse = extractPulse(trace, fps)

  // Cloudflare binding: log the reading to Analytics Engine — schema-less,
  // fire-and-forget telemetry that escapes the "no stateful compute" limit
  // without a DB round-trip. Absent in plain `next dev`, so guard it.
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    const { env } = await getCloudflareContext({ async: true })
    env.ANALYTICS_AI.writeDataPoint({
      blobs: [pulse.confidence],
      doubles: [pulse.bpm, pulse.coherence, pulse.snr, pulse.seconds],
      indexes: ['coherence'],
    })
  } catch {
    /* binding unavailable in this runtime — degrade gracefully, still return the reading */
  }

  return Response.json(pulse)
}
