import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'

import { assertInstrument, INSTRUMENTS, instrumentFor, paidFor, renderInstrumentSection } from './index'

describe('instrument — name the tool before the measurement', () => {
  it('every row names a real failure mode and the instrument that settles it', () => {
    expect(INSTRUMENTS.length).toBeGreaterThanOrEqual(9)
    for (const i of INSTRUMENTS) {
      expect(i.failure.length).toBeGreaterThan(30)
      expect(i.because.length).toBeGreaterThan(30)
      expect(i.right.length).toBeGreaterThan(10)
      expect(i.wrong).not.toBe(i.right)
    }
  })

  it('MOST rows were paid for here — the table is evidence, not advice', () => {
    // an anticipated failure mode is a guess; a paid one happened, and the ratio is the argument
    expect(paidFor().length).toBeGreaterThanOrEqual(INSTRUMENTS.length - 1)
  })

  it('the minified-bundle case — the one that nearly shipped a phantom defect', () => {
    const i = instrumentFor('does the deployed bundle export this class?')!
    expect(i.failure).toMatch(/MINIFIED/)
    expect(i.right).toMatch(/export tail|dry-run/)
    // public export names are the module's CONTRACT — that is why they are decisive
    expect(i.because).toMatch(/no minifier may rename them/)
  })

  it('an UNKNOWN question returns undefined — never a default instrument', () => {
    // guessing which tool applies is precisely the error this atom exists to prevent
    expect(instrumentFor('what is the airspeed velocity of an unladen swallow')).toBeUndefined()
    expect(instrumentFor('')).toBeUndefined()
  })

  it('assertInstrument fails CLOSED on a known-wrong pairing', () => {
    expect(() => assertInstrument('does the deployed bundle export this class?', 'grep the bundle')).toThrow(/does not answer/)
    expect(() => assertInstrument('does the deployed bundle export this class?', 'grep the bundle')).toThrow(/MINIFIED/)
    // the right instrument passes
    expect(() => assertInstrument('does the deployed bundle export this class?', 'read the export tail')).not.toThrow()
  })

  it('an UNREGISTERED question never throws — this register is not a whitelist', () => {
    // pretending the table were complete would be its own instrument error
    expect(() => assertInstrument('something nobody has measured yet', 'grep')).not.toThrow()
  })

  it('the rendered section states the ratio and the pattern, not a virtue', () => {
    const md = renderInstrumentSection().join('\n')
    expect(md).toMatch(/paid for in this repository/)
    expect(md).toMatch(/does not error, it answers/)
    expect(md).toContain('| question | instrument that ANSWERS | instrument that SETTLES |')
    for (const i of INSTRUMENTS) expect(md).toContain(i.question)
    // it names commands a reader can run, not adjectives
    expect(md).toMatch(/pnpm erpax instrument/)
  })
})

describe('instrument — judged by the constitution', () => {
  const change: Change = {
    atom: 'instrument',
    dualities: [
      { builds: 'instrumentFor', breaks: 'an unknown question returns undefined, never a default' },
      { builds: 'assertInstrument', breaks: 'an unregistered question never throws' },
      { builds: 'renderInstrumentSection', breaks: 'every row must carry a failure mode and a reason' },
    ],
    anchors: ['ISO-19011:2018 §6.4', 'ISO/IEC 25010:2023 §5.5'],
    claims: [
      {
        text: 'this prevents wrong measurements',
        boundary:
          'it prevents the NINE recorded ones. It is a register, not a whitelist — an unregistered ' +
          'question passes silently, because pretending the table were complete would be the same ' +
          'category of error it exists to catch. Which instrument answers which question is DECLARED ' +
          'by a human; no theorem derives it',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'question⊕instrument', ring: [9, 9] },
    ],
    served: [{ result: 'the instrument register', recompute: 'src/instrument/index.ts' }],
    postings: [
      { debit: 'measurement/question', credit: 'instrument/answer', amount: 9 },
      { debit: 'instrument/answer', credit: 'measurement/question', amount: 9 },
    ],
    edges: [
      { from: 'instrument', to: 'local' },
      { from: 'local', to: 'instrument' },
    ],
    quantities: [
      { name: 'registered instruments', value: 9, derivation: 'src/instrument/index.ts' },
      { name: 'misreadings actually paid for', value: 9, derivation: 'src/instrument/index.ts' },
    ],
    keepers: [],
    seed: ['src/instrument/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})

describe('instrument — the threshold row, added the day it was paid for', () => {
  it('a ceiling is meaningless until you know the function that produced it', () => {
    const i = instrumentFor('is this ratchet ceiling too loose?')!
    expect(i.failure).toMatch(/the gap IS the design/)
    expect(i.right).toMatch(/mathCeiling/)
    // three plan items were written against comparing two numbers without their definition
    expect(i.failure).toMatch(/Three plan items/)
    expect(i.paid).toBe(true)
  })
})
