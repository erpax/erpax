import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { atomAddress } from '@/atom/address'
import { ERPAX_DOI, ERPAX_SPDX, ERPAX_VERSION_DOI, LICENSE_CONTACT, SOURCE_URL } from '.'

/** The one source. Everything this atom offers is read from here. */
const cff = readFileSync(join(process.cwd(), 'CITATION.cff'), 'utf8')

describe('algebra/license', () => {
  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('algebra/license')
  })

  it('agrees with CITATION.cff on every fact it offers', () => {
    // Refutable in both directions: edit the citation file without regenerating, or edit the
    // generated face by hand, and this reddens. That is the whole point of not typing it twice.
    expect(cff).toContain(`license: ${ERPAX_SPDX}`)
    expect(cff).toContain(`repository-code: "${SOURCE_URL}"`)
    expect(cff).toContain(`email: "${LICENSE_CONTACT}"`)
    expect(cff).toContain(`doi: "${ERPAX_DOI}"`)
    expect(cff).toContain(`value: "${ERPAX_VERSION_DOI}"`)
  })

  it('names one licence, so there is no path that decides which answer you get', () => {
    expect(ERPAX_SPDX).toBe('CC-BY-NC-ND-4.0')
    expect(cff.match(/^license:/gm) ?? []).toHaveLength(1)
  })

  it('distinguishes the concept doi from the version doi', () => {
    expect(ERPAX_DOI).not.toBe(ERPAX_VERSION_DOI)
  })
})
