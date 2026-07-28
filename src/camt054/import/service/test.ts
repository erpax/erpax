/**
 * camt.054 import — notification parser tests.
 *
 * @standard ISO-20022 camt.054 bank-to-customer-debit-credit-notification
 * @see ./index.ts
 */
import { describe, it, expect } from 'vitest'
import { parseCamt054, parseCamt054Multi } from '@/camt054/import/service'
import { importStandards } from '@/export'

const SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.054.001.08">
  <BkToCstmrDbtCdtNtfctn>
    <GrpHdr>
      <MsgId>NTF-001</MsgId>
      <CreDtTm>2026-05-01T12:00:00Z</CreDtTm>
    </GrpHdr>
    <Ntfctn>
      <Id>NTF-2026-001</Id>
      <CreDtTm>2026-05-01T12:00:00Z</CreDtTm>
      <Acct>
        <Id><IBAN>BG80BNBG96611020345678</IBAN></Id>
        <Ccy>EUR</Ccy>
        <Ownr><Nm>Acme Holdings</Nm></Ownr>
      </Acct>
      <Ntry>
        <AcctSvcrRef>ADV-001</AcctSvcrRef>
        <Amt Ccy="EUR">250.00</Amt>
        <CdtDbtInd>CRDT</CdtDbtInd>
        <Sts>BOOK</Sts>
        <BookgDt><Dt>2026-05-01</Dt></BookgDt>
        <NtryDtls>
          <TxDtls>
            <Refs><EndToEndId>E2E-NTF-1</EndToEndId></Refs>
          </TxDtls>
        </NtryDtls>
      </Ntry>
    </Ntfctn>
  </BkToCstmrDbtCdtNtfctn>
</Document>`

describe('camt054/import — parseCamt054', () => {
  it('parses a debit/credit notification into Camt054Notification', () => {
    const n = parseCamt054(SAMPLE)
    expect(n.id).toBe('NTF-2026-001')
    expect(n.account.iban).toBe('BG80BNBG96611020345678')
    expect(n.currency).toBe('EUR')
    expect(n.transactions).toHaveLength(1)
    expect(n.transactions[0]!.amount).toBe(25000)
    expect(n.transactions[0]!.endToEndId).toBe('E2E-NTF-1')
  })

  it('parseCamt054Multi returns one notification per Ntfctn', () => {
    expect(parseCamt054Multi(SAMPLE)).toHaveLength(1)
  })

  it('importStandards routes camt.054', async () => {
    const r = await importStandards({ format: 'camt.054', xml: SAMPLE })
    expect(r.format).toBe('camt.054')
    expect((r.data as { id: string }).id).toBe('NTF-2026-001')
  })
})
