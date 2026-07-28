/**
 * pacs.004 import — payment-return parser tests.
 *
 * @standard ISO-20022 pacs.004 payment-return
 * @see ./index.ts
 */
import { describe, it, expect } from 'vitest'
import { parsePacs004 } from '@/pacs004/import/service'
import { importStandards } from '@/export'

const SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.004.001.09">
  <PmtRtr>
    <GrpHdr>
      <MsgId>RTR-001</MsgId>
      <CreDtTm>2026-05-02T09:00:00Z</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <CtrlSum>50.00</CtrlSum>
    </GrpHdr>
    <TxInf>
      <RtrId>RTR-TX-1</RtrId>
      <OrgnlEndToEndId>E2E-ORIG-1</OrgnlEndToEndId>
      <RtrdIntrBkSttlmAmt Ccy="EUR">50.00</RtrdIntrBkSttlmAmt>
      <RtrRsnInf>
        <Rsn><Cd>AC01</Cd></Rsn>
        <AddtlInf>Incorrect account number</AddtlInf>
      </RtrRsnInf>
    </TxInf>
  </PmtRtr>
</Document>`

describe('pacs004/import — parsePacs004', () => {
  it('parses a payment return into Pacs004Return', () => {
    const r = parsePacs004(SAMPLE)
    expect(r.messageId).toBe('RTR-001')
    expect(r.numberOfTransactions).toBe(1)
    expect(r.controlSum).toBe(5000)
    expect(r.returns).toHaveLength(1)
    expect(r.returns[0]!.endToEndId).toBe('RTR-TX-1')
    expect(r.returns[0]!.originalEndToEndId).toBe('E2E-ORIG-1')
    expect(r.returns[0]!.amount).toBe(5000)
    expect(r.returns[0]!.reasonCode).toBe('AC01')
  })

  it('importStandards routes pacs.004', async () => {
    const r = await importStandards({ format: 'pacs.004', xml: SAMPLE })
    expect(r.format).toBe('pacs.004')
    expect((r.data as { messageId: string }).messageId).toBe('RTR-001')
  })
})
