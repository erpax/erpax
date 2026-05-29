/**
 * BG PAdES signer tests — exercises the two-pass sign flow with a mocked
 * CMS adapter (the real CMS construction is per-deployment crypto).
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
 * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
 * @standard rfc-5652 cms-detached-signature
 * @audit ISO-19011:2018 audit-trail signature-evidence
 * @compliance EU 910/2014 eidas qualified-electronic-signature
 * @see src/services/country-clients/bg-pades-signer.ts
 */

import { describe, expect, it, vi } from 'vitest'
import {
  prepareBgPadesSignature,
  signBgPadesPdf,
} from '@/services/country-clients/bg-pades-signer'

const TEXT = new TextEncoder()

describe('prepareBgPadesSignature — first pass', () => {
  it('defaults location + contactInfo to BG-flavoured values', () => {
    const dict = prepareBgPadesSignature({ reason: 'Тест' })
    expect(dict.cosDictionary).toContain('/Location (Sofia, Bulgaria)')
    expect(dict.cosDictionary).toContain('/Name (erpax \\(BG qualified seal\\))')
    expect(dict.cosDictionary).toContain('/Reason (Тест)')
  })
})

describe('signBgPadesPdf — second pass', () => {
  it('refuses to sign without cert/key', async () => {
    const dict = prepareBgPadesSignature()
    const pdf = TEXT.encode(`HEADER ${dict.contentsPlaceholder} TRAILER`)
    const result = await signBgPadesPdf(pdf, dict, {
      certPem: '',
      keyPem: '',
      signCms: async () => new Uint8Array(0),
    })
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/Missing qualified-seal cert\/key/)
  })

  it('refuses to sign when the placeholder isn\'t in the PDF', async () => {
    const dict = prepareBgPadesSignature()
    const pdf = TEXT.encode('HEADER no placeholder here TRAILER')
    const result = await signBgPadesPdf(pdf, dict, {
      certPem: 'CERT',
      keyPem: 'KEY',
      signCms: async () => new Uint8Array([0x30, 0x82]), // bogus CMS
    })
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/Placeholder not found/)
  })

  it('passes the byte range that wraps the placeholder to signCms', async () => {
    const dict = prepareBgPadesSignature({ placeholderBytes: 32 })
    const pdf = TEXT.encode(`HEADER ${dict.contentsPlaceholder} TRAILER`)
    const signCms = vi.fn(async () => new Uint8Array([0xAB, 0xCD, 0xEF]))
    const result = await signBgPadesPdf(pdf, dict, {
      certPem: 'CERT',
      keyPem: 'KEY',
      signCms,
    })
    expect(result.ok).toBe(true)
    // signCms was called with `HEADER ` + ` TRAILER` (placeholder excluded).
    const bytesToSign = (signCms.mock.calls[0] as unknown[])[0] as Uint8Array
    expect(new TextDecoder().decode(bytesToSign)).toBe('HEADER  TRAILER')
  })

  it('back-patches /Contents with the hex CMS blob, padded to placeholder length', async () => {
    const dict = prepareBgPadesSignature({ placeholderBytes: 16 })
    const pdf = TEXT.encode(`HEADER ${dict.contentsPlaceholder} TRAILER`)
    const result = await signBgPadesPdf(pdf, dict, {
      certPem: 'CERT',
      keyPem: 'KEY',
      signCms: async () => new Uint8Array([0xAB, 0xCD]),
    })
    expect(result.ok).toBe(true)
    // Slice OOO: signBgPadesPdf now returns a SignedPadesPdf envelope
    // (bytes + signatureValue + signedAt + signedBy + signingCertificate
    // + signatureDigest) instead of just Uint8Array.
    const signed = new TextDecoder().decode(result.data!.bytes)
    // Placeholder content was 16 zeros; replaced with `ABCD` + 12 zeros pad.
    expect(signed).toContain('<ABCD000000000000>')
    expect(signed).toContain('HEADER ')
    expect(signed).toContain(' TRAILER')
    // Audit envelope is populated.
    expect(result.data!.signatureValue).toBe('ABCD')
    expect(result.data!.signatureDigest).toMatch(/^[0-9a-f]{64}$/)
    expect(result.data!.signedAt).toBeInstanceOf(Date)
    expect(result.data!.signingCertificate).toBe('CERT')
  })

  it('fails when the CMS blob exceeds the placeholder', async () => {
    const dict = prepareBgPadesSignature({ placeholderBytes: 4 })
    const pdf = TEXT.encode(`X ${dict.contentsPlaceholder} Y`)
    const result = await signBgPadesPdf(pdf, dict, {
      certPem: 'CERT',
      keyPem: 'KEY',
      // 4-byte CMS = 8 hex chars; exceeds 4-byte placeholder.
      signCms: async () => new Uint8Array([1, 2, 3, 4]),
    })
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/exceeds placeholder/)
  })

  it('preserves total PDF byte length (offsets stay valid)', async () => {
    const dict = prepareBgPadesSignature({ placeholderBytes: 32 })
    const pdf = TEXT.encode(`HEADER ${dict.contentsPlaceholder} TRAILER`)
    const result = await signBgPadesPdf(pdf, dict, {
      certPem: 'CERT',
      keyPem: 'KEY',
      signCms: async () => new Uint8Array([0xAA]),
    })
    expect(result.ok).toBe(true)
    expect(result.data!.bytes.length).toBe(pdf.length)
  })
})
