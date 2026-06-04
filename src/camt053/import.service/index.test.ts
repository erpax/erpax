/**
 * camt.053 import — XML parser tests.
 *
 * Asserts an inbound camt.053 statement parses cleanly into the
 * canonical Camt053Statement shape.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @audit ISO-19011:2018 audit-trail
 * @see ./index.ts
 */

import { describe, it, expect } from 'vitest'
import {
  parseCamt053,
  parseCamt053Multi,
} from '@/camt053/import.service'
import { importStandards } from '@/export/standards-import'

const SAMPLE_CAMT053 = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.053.001.08">
  <BkToCstmrStmt>
    <GrpHdr>
      <MsgId>MSG-001</MsgId>
      <CreDtTm>2026-05-01T08:00:00Z</CreDtTm>
    </GrpHdr>
    <Stmt>
      <Id>STMT-2026-04</Id>
      <CreDtTm>2026-05-01T08:00:00Z</CreDtTm>
      <Acct>
        <Id>
          <IBAN>BG80BNBG96611020345678</IBAN>
        </Id>
        <Ccy>EUR</Ccy>
        <Ownr>
          <Nm>Acme Holdings</Nm>
        </Ownr>
      </Acct>
      <Bal>
        <Tp><CdOrPrtry><Cd>OPBD</Cd></CdOrPrtry></Tp>
        <Amt Ccy="EUR">100000.00</Amt>
        <CdtDbtInd>CRDT</CdtDbtInd>
      </Bal>
      <Bal>
        <Tp><CdOrPrtry><Cd>CLBD</Cd></CdOrPrtry></Tp>
        <Amt Ccy="EUR">110000.00</Amt>
        <CdtDbtInd>CRDT</CdtDbtInd>
      </Bal>
      <FrToDt>
        <FrDtTm>2026-04-01T00:00:00Z</FrDtTm>
        <ToDtTm>2026-04-30T23:59:59Z</ToDtTm>
      </FrToDt>
      <Ntry>
        <AcctSvcrRef>ACME-2026-001</AcctSvcrRef>
        <Amt Ccy="EUR">5000.00</Amt>
        <CdtDbtInd>CRDT</CdtDbtInd>
        <Sts>BOOK</Sts>
        <BookgDt><Dt>2026-04-15</Dt></BookgDt>
        <ValDt><Dt>2026-04-15</Dt></ValDt>
        <BkTxCd>
          <Domn>
            <Cd>PMNT</Cd>
            <Fmly>
              <Cd>RCDT</Cd>
              <SubFmlyCd>BOOK</SubFmlyCd>
            </Fmly>
          </Domn>
        </BkTxCd>
        <NtryDtls>
          <TxDtls>
            <Refs>
              <EndToEndId>E2E-001</EndToEndId>
            </Refs>
            <RltdPties>
              <Dbtr>
                <Nm>Customer LLC</Nm>
              </Dbtr>
              <DbtrAcct>
                <Id><IBAN>DE89370400440532013000</IBAN></Id>
              </DbtrAcct>
            </RltdPties>
            <RmtInf>
              <Strd>
                <CdtrRefInf>
                  <Ref>RF18539007547034</Ref>
                </CdtrRefInf>
                <RfrdDocInf>
                  <Nb>INV-2026-042</Nb>
                </RfrdDocInf>
              </Strd>
            </RmtInf>
          </TxDtls>
        </NtryDtls>
      </Ntry>
      <Ntry>
        <AcctSvcrRef>ACME-2026-002</AcctSvcrRef>
        <Amt Ccy="EUR">25.00</Amt>
        <CdtDbtInd>DBIT</CdtDbtInd>
        <Sts>BOOK</Sts>
        <BookgDt><Dt>2026-04-30</Dt></BookgDt>
        <ValDt><Dt>2026-04-30</Dt></ValDt>
      </Ntry>
    </Stmt>
  </BkToCstmrStmt>
</Document>`

describe('parseCamt053 — canonical statement shape', () => {
  const stmt = parseCamt053(SAMPLE_CAMT053)

  it('extracts statement id + period dates', () => {
    expect(stmt.id).toBe('STMT-2026-04')
    expect(stmt.fromDateTime.toISOString().slice(0, 10)).toBe('2026-04-01')
    expect(stmt.toDateTime.toISOString().slice(0, 10)).toBe('2026-04-30')
  })

  it('parses account IBAN + currency + owner', () => {
    expect(stmt.account.iban).toBe('BG80BNBG96611020345678')
    expect(stmt.account.currency).toBe('EUR')
    expect(stmt.owner?.name).toBe('Acme Holdings')
  })

  it('extracts opening + closing booked balances as cents', () => {
    expect(stmt.openingBalance).toBe(100_000_00)
    expect(stmt.closingBalance).toBe(110_000_00)
  })

  it('parses two transactions with correct amount/CDT-DBT/status', () => {
    expect(stmt.transactions).toHaveLength(2)
    const credit = stmt.transactions[0]
    expect(credit.amount).toBe(5_000_00)
    expect(credit.creditDebitIndicator).toBe('CRDT')
    expect(credit.status).toBe('BOOK')
    const debit = stmt.transactions[1]
    expect(debit.amount).toBe(25_00)
    expect(debit.creditDebitIndicator).toBe('DBIT')
  })

  it('parses bank-transaction-code triplet (PMNT/RCDT/BOOK)', () => {
    const credit = stmt.transactions[0]
    expect(credit.bankTransactionCode).toEqual({
      domain: 'PMNT',
      family: 'RCDT',
      subFamily: 'BOOK',
    })
  })

  it('parses end-to-end id + counterparty + creditor reference', () => {
    const credit = stmt.transactions[0]
    expect(credit.endToEndId).toBe('E2E-001')
    expect(credit.counterparty?.name).toBe('Customer LLC')
    expect(credit.counterpartyAccount?.iban).toBe('DE89370400440532013000')
    expect(
      credit.remittanceInformation?.structured?.creditorReference?.reference,
    ).toBe('RF18539007547034')
    expect(
      credit.remittanceInformation?.structured?.referredDocumentNumbers,
    ).toEqual(['INV-2026-042'])
  })
})

describe('parseCamt053Multi — multi-statement file', () => {
  it('splits a 2-statement file into two Camt053Statements', () => {
    const multi = `<?xml version="1.0"?>
<BkToCstmrStmt>
  <Stmt>
    <Id>STMT-A</Id>
    <CreDtTm>2026-05-01T08:00:00Z</CreDtTm>
    <Acct><Id><IBAN>BG80BNBG96611020345678</IBAN></Id><Ccy>EUR</Ccy></Acct>
    <FrToDt><FrDtTm>2026-04-01T00:00:00Z</FrDtTm><ToDtTm>2026-04-30T23:59:59Z</ToDtTm></FrToDt>
    <Bal><Tp><CdOrPrtry><Cd>OPBD</Cd></CdOrPrtry></Tp><Amt Ccy="EUR">100.00</Amt></Bal>
    <Bal><Tp><CdOrPrtry><Cd>CLBD</Cd></CdOrPrtry></Tp><Amt Ccy="EUR">200.00</Amt></Bal>
  </Stmt>
  <Stmt>
    <Id>STMT-B</Id>
    <CreDtTm>2026-05-01T08:00:00Z</CreDtTm>
    <Acct><Id><IBAN>BG80BNBG96611020345678</IBAN></Id><Ccy>EUR</Ccy></Acct>
    <FrToDt><FrDtTm>2026-05-01T00:00:00Z</FrDtTm><ToDtTm>2026-05-31T23:59:59Z</ToDtTm></FrToDt>
    <Bal><Tp><CdOrPrtry><Cd>OPBD</Cd></CdOrPrtry></Tp><Amt Ccy="EUR">200.00</Amt></Bal>
    <Bal><Tp><CdOrPrtry><Cd>CLBD</Cd></CdOrPrtry></Tp><Amt Ccy="EUR">300.00</Amt></Bal>
  </Stmt>
</BkToCstmrStmt>`
    const stmts = parseCamt053Multi(multi)
    expect(stmts).toHaveLength(2)
    expect(stmts[0].id).toBe('STMT-A')
    expect(stmts[1].id).toBe('STMT-B')
    expect(stmts[1].openingBalance).toBe(200_00)
  })
})

describe('importStandards dispatcher', () => {
  it('camt.053 format dispatches to single-statement parser', async () => {
    const result = await importStandards({
      format: 'camt.053',
      xml: SAMPLE_CAMT053,
    })
    expect(result.format).toBe('camt.053')
    expect(Array.isArray(result.data)).toBe(false)
    const stmt = result.data as { id: string }
    expect(stmt.id).toBe('STMT-2026-04')
  })

  it('camt.053-multi format dispatches to multi-statement parser', async () => {
    const result = await importStandards({
      format: 'camt.053-multi',
      xml: SAMPLE_CAMT053,
    })
    expect(result.format).toBe('camt.053-multi')
    expect(Array.isArray(result.data)).toBe(true)
  })
})
