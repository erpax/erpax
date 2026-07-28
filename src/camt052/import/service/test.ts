/**
 * camt.052 import — intraday account-report parser tests.
 *
 * @standard ISO-20022 camt.052 bank-to-customer-account-report
 * @see ./index.ts
 */
import { describe, it, expect } from 'vitest'
import { parseCamt052, parseCamt052Multi } from '@/camt052/import/service'
import { importStandards } from '@/export'

const SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.052.001.08">
  <BkToCstmrAcctRpt>
    <GrpHdr>
      <MsgId>RPT-001</MsgId>
      <CreDtTm>2026-05-01T10:00:00Z</CreDtTm>
    </GrpHdr>
    <Rpt>
      <Id>RPT-2026-001</Id>
      <CreDtTm>2026-05-01T10:00:00Z</CreDtTm>
      <FrToDt>
        <FrDtTm>2026-05-01T00:00:00Z</FrDtTm>
        <ToDtTm>2026-05-01T10:00:00Z</ToDtTm>
      </FrToDt>
      <Acct>
        <Id><IBAN>BG80BNBG96611020345678</IBAN></Id>
        <Ccy>EUR</Ccy>
        <Ownr><Nm>Acme Holdings</Nm></Ownr>
      </Acct>
      <Ntry>
        <AcctSvcrRef>INTRA-001</AcctSvcrRef>
        <Amt Ccy="EUR">100.00</Amt>
        <CdtDbtInd>CRDT</CdtDbtInd>
        <Sts>BOOK</Sts>
        <BookgDt><Dt>2026-05-01</Dt></BookgDt>
        <NtryDtls>
          <TxDtls>
            <Refs><EndToEndId>E2E-RPT-1</EndToEndId></Refs>
          </TxDtls>
        </NtryDtls>
      </Ntry>
    </Rpt>
  </BkToCstmrAcctRpt>
</Document>`

describe('camt052/import — parseCamt052', () => {
  it('parses an intraday account report into Camt052Report', () => {
    const r = parseCamt052(SAMPLE)
    expect(r.id).toBe('RPT-2026-001')
    expect(r.account.iban).toBe('BG80BNBG96611020345678')
    expect(r.currency).toBe('EUR')
    expect(r.fromDateTime.toISOString()).toBe('2026-05-01T00:00:00.000Z')
    expect(r.toDateTime.toISOString()).toBe('2026-05-01T10:00:00.000Z')
    expect(r.transactions).toHaveLength(1)
    expect(r.transactions[0]!.amount).toBe(10000)
    expect(r.transactions[0]!.endToEndId).toBe('E2E-RPT-1')
  })

  it('parseCamt052Multi returns one report per Rpt', () => {
    expect(parseCamt052Multi(SAMPLE)).toHaveLength(1)
  })

  it('importStandards routes camt.052', async () => {
    const r = await importStandards({ format: 'camt.052', xml: SAMPLE })
    expect(r.format).toBe('camt.052')
    expect((r.data as { id: string }).id).toBe('RPT-2026-001')
  })
})
