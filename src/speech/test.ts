/**
 * speech — computed utterances and writing collapse.
 */
import { describe, it, expect } from 'vitest'
import { computedWritingForPath } from '@/writing/computed'
import { improveSpeechSkill } from '@/writing/skills'
import {
  speechFromHoro,
  writingToSpeech,
  computedSpeechForUi,
  chiCungUtteranceChain,
} from '@/speech'

const TAICHI = '220f7274-dfa6-8321-bf45-4cfd86e2bee4'

describe('speechFromHoro — A432 phoneme frame', () => {
  it('taichi horo 8 crest — deterministic pitch and phonemes', () => {
    const s = speechFromHoro(TAICHI, 8)
    expect(s.note).toBe('F')
    expect(s.pitchHz).toBe(345.6)
    expect(s.phonemes).toHaveLength(8)
    expect(s.phonemes[0]).toBe('fa')
    expect(s.durationMs).toBe(432)
  })

  it('computedSpeechForUi matches explicit surface', () => {
    const s = computedSpeechForUi({ contentUuid: TAICHI, horo: 8 })
    expect(s).toEqual(speechFromHoro(TAICHI, 8))
  })
})

describe('writingToSpeech — collapse prose → phoneme chain', () => {
  it('extends base utterance with prose syllables', () => {
    const writing = computedWritingForPath('quantum/emr')
    const base = speechFromHoro(writing.contentUuid!, writing.horo ?? 1)
    const collapsed = writingToSpeech(writing, {
      text: 'analog results append only health state',
    })
    expect(collapsed.phonemes.length).toBeGreaterThan(base.phonemes.length)
    expect(collapsed.pitchHz).toBe(base.pitchHz)
    expect(collapsed.durationMs).toBeGreaterThan(base.durationMs)
  })

  it('chi-cung utterance chain walks four breath phases', () => {
    const chain = chiCungUtteranceChain(TAICHI, 8)
    expect(chain).toHaveLength(4)
    expect(chain.map((f) => f.phase)).toEqual(['inhale', 'hold', 'exhale', 'rest'])
  })
})

describe('improveSpeechSkill — writing + speech readiness', () => {
  it('quantum/emr is speech-ready with contentUuid', () => {
    const r = improveSpeechSkill({ atomPath: 'quantum/emr' })
    expect(r.speechReady).toBe(true)
    expect(r.computed.contentUuid).toBeTruthy()
  })
})
