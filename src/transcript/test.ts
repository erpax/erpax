import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'

import { atTime, coveredMs, formatOf, mentions, parseCaptions, timestampMs } from './index'

const VTT = `WEBVTT

00:00:01.000 --> 00:00:04.500
the sequence folds through the void

2
00:14:22.250 --> 00:14:25.000
<v Speaker>and the <i>ratchet</i> ceiling is derived</v>
`

const SRT = `1
00:00:01,000 --> 00:00:04,500
the sequence folds through the void

2
00:14:22,250 --> 00:14:25,000
and the ratchet ceiling is derived
`

describe('transcript — spoken content, parsed into locatable segments', () => {
  it('the format is decided by the BYTES, not by a filename', () => {
    expect(formatOf(VTT)).toBe('vtt')
    expect(formatOf(SRT)).toBe('srt')
    expect(formatOf('just some prose with no cues')).toBe('unknown')
  })

  it('parses VTT and SRT alike — they differ by a separator and an index line', () => {
    const a = parseCaptions(VTT)
    const b = parseCaptions(SRT)
    expect(a).toHaveLength(2)
    expect(b).toHaveLength(2)
    expect(a.map((s) => s.text)).toEqual(b.map((s) => s.text))
    // a parser that refused one would send a reader to convert by hand — where errors enter
    expect(a[0]!.startMs).toBe(b[0]!.startMs)
  })

  it('inline markup is presentation, not speech', () => {
    const segs = parseCaptions(VTT)
    expect(segs[1]!.text).toBe('and the ratchet ceiling is derived')
    expect(segs[1]!.text).not.toContain('<')
  })

  it('a malformed cue is SKIPPED, never guessed at', () => {
    const broken = 'WEBVTT\n\nnot-a-timestamp --> also-not\nsomething said\n\n00:00:02.000 --> 00:00:03.000\nreal cue\n'
    const segs = parseCaptions(broken)
    // a fabricated timestamp sends a reader to the wrong moment with confidence
    expect(segs).toHaveLength(1)
    expect(segs[0]!.text).toBe('real cue')
    expect(timestampMs('not-a-timestamp')).toBeNaN()
  })

  it('timestamps carry hours, and an absent hour field is zero', () => {
    expect(timestampMs('00:00:01.000')).toBe(1000)
    expect(timestampMs('01:02:03.500')).toBe(3_723_500)
    expect(timestampMs('02:03,500')).toBe(123_500) // mm:ss, SRT comma
    expect(atTime(3_723_500)).toBe('01:02:03')
  })

  it('a mention is a POINTER to a moment, never a finding', () => {
    const m = mentions(parseCaptions(VTT), ['ratchet', 'void'])
    expect(m.map((x) => x.term)).toEqual(['void', 'ratchet']) // sorted by time, not by term
    expect(m[1]!.at).toBe('00:14:22')
    // the corpus is checked against the TREE; this only says where to go listen
    expect(m[1]!.text).toContain('ratchet')
    expect(mentions(parseCaptions(VTT), [''])).toEqual([])
  })

  it('covered time is spoken duration — not video length, which captions do not report', () => {
    expect(coveredMs(parseCaptions(VTT))).toBe(3500 + 2750)
    expect(coveredMs([])).toBe(0)
  })

  it('empty input yields no segments, never a throw', () => {
    expect(parseCaptions('')).toEqual([])
    expect(parseCaptions('WEBVTT\n')).toEqual([])
  })
})

describe('transcript — judged by the constitution', () => {
  const change: Change = {
    atom: 'transcript',
    dualities: [
      { builds: 'parseCaptions', breaks: 'a malformed cue is skipped, never guessed at' },
      { builds: 'formatOf', breaks: 'prose with no cues is unknown, not defaulted to vtt' },
      { builds: 'mentions', breaks: 'an empty term matches nothing' },
    ],
    anchors: ['W3C WebVTT — Web Video Text Tracks Format', 'ISO-19011:2018 §6.4'],
    claims: [
      {
        text: 'this lets an agent analyse video',
        boundary:
          'it lets an agent read CAPTIONS as bytes. A transcript is what was SAID — never that the ' +
          'statement is true, and never the visual content. Auto-generated captions carry ' +
          'transcription error, so a symbol name or a number can be silently wrong; a segment is a ' +
          'pointer to a moment worth checking, not evidence about the corpus',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'said⊕located', ring: [1, 1] },
    ],
    served: [{ result: 'the located segments', recompute: 'src/transcript/index.ts' }],
    postings: [
      { debit: 'speech/segment', credit: 'time/offset', amount: 2 },
      { debit: 'time/offset', credit: 'speech/segment', amount: 2 },
    ],
    edges: [
      { from: 'transcript', to: 'local' },
      { from: 'local', to: 'transcript' },
    ],
    quantities: [{ name: 'caption formats parsed', value: 2, derivation: 'src/transcript/index.ts' }],
    keepers: [],
    seed: ['src/transcript/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
