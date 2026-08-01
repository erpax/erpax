/**
 * transcript — spoken content, parsed into locatable segments.
 *
 * This atom existed as PROSE ONLY — `SKILL.md`, `README.md`, `LLM.md`, no `index.ts`, no `test.ts`.
 * A name with no matter, which is exactly what [[rules]]/word-without-logic counts. It was found by
 * looking for a way to read video content and discovering the socket was already cut and empty.
 *
 * **Why this is the honest path to "analyse these videos".** An agent cannot watch or hear. What it
 * can do is read the captions as BYTES — locally, with no consent wall, no JS rendering, and no
 * model standing between the source and the reader ([[local]]). A `.vtt` or `.srt` on disk is a
 * primary source; a summary of a video is not.
 *
 * **What a transcript is, and is not.** It is a record of what was SAID — never that the statement
 * is true, and never the visual content. Auto-generated captions additionally carry transcription
 * error, so a term that matters (a symbol name, a number) can be silently wrong. Treat a segment as
 * a POINTER to a moment worth checking, not as evidence about the corpus.
 *
 * @law a transcript is what was said, located — never what is true, and never what was shown.
 * @invariant every segment carries the timestamp it came from, so a claim can be re-heard
 * @invariant a malformed cue is skipped, never guessed at — a fabricated timestamp is worse than a
 *            missing segment, because it sends a reader to the wrong moment with confidence
 * @standard W3C WebVTT — The Web Video Text Tracks Format
 * @see ./SKILL.md -- ../local -- ../instrument -- ../handoff
 */
import { exactMax, exactTrunc } from '@/algebra'

/** One cue: what was said, and when. */
export interface Segment {
  /** start offset in milliseconds */
  readonly startMs: number
  /** end offset in milliseconds */
  readonly endMs: number
  readonly text: string
}

export type CaptionFormat = 'vtt' | 'srt' | 'unknown'

/** Which format the bytes are, decided by their own header rather than by a filename. */
export function formatOf(text: string): CaptionFormat {
  const head = text.trimStart().slice(0, 6).toUpperCase()
  if (head.startsWith('WEBVTT')) return 'vtt'
  // an SRT cue block opens with an integer index line followed by a `-->` timing line
  if (/^\s*\d+\s*\r?\n\d{2}:\d{2}:\d{2},\d{3}\s*-->/m.test(text)) return 'srt'
  if (text.includes('-->')) return 'vtt' // a headerless cue list is still VTT-shaped timing
  return 'unknown'
}

/** `00:01:02.500` or `01:02,500` → milliseconds. Returns NaN for anything malformed. */
export function timestampMs(stamp: string): number {
  const m = /^(?:(\d+):)?(\d{1,2}):(\d{2})[.,](\d{1,3})$/.exec(stamp.trim())
  if (!m) return Number.NaN
  const [, h, min, s, frac] = m
  return (
    Number(h ?? 0) * 3_600_000 +
    Number(min) * 60_000 +
    Number(s) * 1000 +
    Number(frac!.padEnd(3, '0'))
  )
}

const TIMING = /^(.+?)\s*-->\s*(\S+)/

/**
 * Parse captions into segments. Handles WebVTT and SubRip alike, because they differ only in the
 * decimal separator and an index line — and a parser that refused one of them would send a reader
 * to convert a file by hand, which is where transcription errors are introduced.
 *
 * A cue whose timing line does not parse is SKIPPED. Guessing a timestamp would point a reader at
 * the wrong moment with full confidence, which is the failure mode this corpus keeps paying for.
 */
export function parseCaptions(text: string): readonly Segment[] {
  const out: Segment[] = []
  const blocks = text.replace(/\r\n/g, '\n').split(/\n{2,}/)
  for (const block of blocks) {
    const lines = block.split('\n').filter((l) => l.trim().length > 0)
    if (lines.length === 0) continue
    const timingIndex = lines.findIndex((l) => l.includes('-->'))
    if (timingIndex === -1) continue
    const timing = TIMING.exec(lines[timingIndex]!)
    if (!timing) continue
    const startMs = timestampMs(timing[1]!)
    const endMs = timestampMs(timing[2]!)
    if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) continue
    const body = lines
      .slice(timingIndex + 1)
      .join(' ')
      // WebVTT inline markup is presentation, not speech
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    if (body.length === 0) continue
    out.push({ startMs, endMs, text: body })
  }
  return out
}

/** `01:23:45` — for citing a moment a human can scrub to. */
export function atTime(ms: number): string {
  const total = exactTrunc(ms / 1000)
  const pad = (n: number): string => String(n).padStart(2, '0')
  return `${pad(exactTrunc(total / 3600))}:${pad(exactTrunc((total % 3600) / 60))}:${pad(total % 60)}`
}

export interface Mention {
  readonly term: string
  readonly at: string
  readonly startMs: number
  readonly text: string
}

/**
 * Where a term is spoken, with the moment attached.
 *
 * This is the whole point of parsing rather than reading: a term found in a transcript is a
 * POINTER — *go listen at 00:14:22* — never a finding. The corpus is checked against the tree, not
 * against what someone said about it.
 */
export function mentions(segments: readonly Segment[], terms: readonly string[]): readonly Mention[] {
  const out: Mention[] = []
  for (const seg of segments) {
    const lower = seg.text.toLowerCase()
    for (const term of terms) {
      if (term.trim().length === 0) continue
      if (lower.includes(term.toLowerCase())) {
        out.push({ term, at: atTime(seg.startMs), startMs: seg.startMs, text: seg.text })
      }
    }
  }
  return out.sort((a, b) => a.startMs - b.startMs)
}

/** Total spoken duration covered by cues — not the video length, which captions do not report. */
export function coveredMs(segments: readonly Segment[]): number {
  return segments.reduce((n, s) => n + exactMax(0, s.endMs - s.startMs), 0)
}

/* c8 ignore start -- CLI face: `pnpm erpax transcript <file.vtt> [term …]` */
if (import.meta.url === `file://${process.argv[1]}`) {
  const [file, ...terms] = process.argv.slice(2)
  if (!file) {
    console.log('usage: tsx src/transcript/index.ts <captions.vtt|.srt> [term …]')
  } else {
    const { readFileSync } = await import('node:fs')
    const text = readFileSync(file, 'utf8')
    const segs = parseCaptions(text)
    console.log(`${file} — ${formatOf(text)} · ${segs.length} segment(s) · ${atTime(coveredMs(segs))} spoken`)
    for (const m of mentions(segs, terms)) console.log(`  ${m.at}  ${m.term}: ${m.text.slice(0, 90)}`)
  }
}
/* c8 ignore stop */
