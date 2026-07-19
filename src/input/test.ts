import { describe, it, expect } from 'vitest'
import { helpInput, inputHelpHook } from '@/input'

describe('input — the user helped with every parseable input', () => {
  it('IBAN: normalised, checksum-refused with the law named, country DERIVED', () => {
    const good = helpInput('iban', 'bg80 bnbg 9661 1020 3456 78')
    expect(good.value).toBe('BG80BNBG96611020345678')
    expect(good.derived).toEqual({ ibanCountry: 'BG' })
    expect(helpInput('counterpartyIban', 'BG80BNBG96611020345679').error).toMatch(/ISO 13616/)
  })

  it('ЕГН: checksum gates the write; the birthdate twin is derived, never asked', () => {
    const r = helpInput('egn', '7523169263')
    expect(r.error ?? null).toBeNull()
    expect(r.derived?.birthDate).toBeTruthy()
    expect(helpInput('egn', '7523169264').error).toMatch(/ЕГН/)
  })

  it('BIC · email · URL: shaped, normalised, refused with reasons', () => {
    expect(helpInput('bic', 'bnbg bgsf').value).toBe('BNBGBGSF')
    expect(helpInput('swift', 'X').error).toMatch(/ISO 9362/)
    expect(helpInput('email', ' CECI@PSG.BG ').value).toBe('ceci@psg.bg')
    expect(helpInput('website', 'ceccec.psg.bg/theorems').value).toBe('https://ceccec.psg.bg/theorems')
  })

  it('free text passes untouched — help is never interference', () => {
    expect(helpInput('description', 'какъвто и да е текст')).toEqual({})
  })

  it('the ONE hook: normalises in place, derives twins, throws the first refusal with its law', async () => {
    const data = { iban: 'bg80 bnbg 9661 1020 3456 78', notes: 'text' }
    const out = (await inputHelpHook({ data } as never)) as Record<string, unknown>
    expect(out.iban).toBe('BG80BNBG96611020345678')
    expect(out.ibanCountry).toBe('BG')
    expect(out.notes).toBe('text')
    await expect(async () => inputHelpHook({ data: { iban: 'BG00BAD' } } as never)).rejects.toThrow(/ISO 13616/)
  })
})
