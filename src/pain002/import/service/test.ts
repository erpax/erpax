/**
 * pain.002 import — status report parser + PaymentRun apply.
 *
 * @standard ISO-20022 pain.002 customer-payment-status-report
 * @see ./index.ts
 */
import { describe, it, expect } from 'vitest'
import { parsePain002, applyPain002Report } from '@/pain002/import/service'
import { importStandards } from '@/export'

const SAMPLE_ACSC = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.002.001.10">
  <CstmrPmtStsRpt>
    <GrpHdr>
      <MsgId>PSTS-001</MsgId>
      <CreDtTm>2026-05-01T10:00:00Z</CreDtTm>
    </GrpHdr>
    <OrgnlGrpInfAndSts>
      <OrgnlMsgId>RUN-42</OrgnlMsgId>
      <GrpSts>ACSC</GrpSts>
    </OrgnlGrpInfAndSts>
    <OrgnlPmtInfAndSts>
      <TxInfAndSts>
        <OrgnlEndToEndId>E2E-1</OrgnlEndToEndId>
        <TxSts>ACSC</TxSts>
      </TxInfAndSts>
    </OrgnlPmtInfAndSts>
  </CstmrPmtStsRpt>
</Document>`

const SAMPLE_RJCT = `<?xml version="1.0" encoding="UTF-8"?>
<Document>
  <CstmrPmtStsRpt>
    <GrpHdr><MsgId>PSTS-2</MsgId><CreDtTm>2026-05-01T11:00:00Z</CreDtTm></GrpHdr>
    <OrgnlGrpInfAndSts>
      <OrgnlMsgId>RUN-99</OrgnlMsgId>
      <GrpSts>RJCT</GrpSts>
    </OrgnlGrpInfAndSts>
    <TxInfAndSts>
      <OrgnlEndToEndId>E2E-9</OrgnlEndToEndId>
      <TxSts>RJCT</TxSts>
      <StsRsnInf><Rsn><Cd>AM04</Cd></Rsn><AddtlInf>insufficient funds</AddtlInf></StsRsnInf>
    </TxInfAndSts>
  </CstmrPmtStsRpt>
</Document>`

describe('pain002/import — parse + apply', () => {
  it('parses ACSC status report and maps PaymentRun to settled', () => {
    const report = parsePain002(SAMPLE_ACSC)
    expect(report.messageId).toBe('PSTS-001')
    expect(report.originalMessageId).toBe('RUN-42')
    expect(report.groupStatus).toBe('ACSC')
    expect(report.transactions[0]!.endToEndId).toBe('E2E-1')
    const patch = applyPain002Report(report)
    expect(patch.bankResponseStatus).toBe('ACSC')
    expect(patch.status).toBe('settled')
  })

  it('parses RJCT with reason AM04 → rejected', () => {
    const report = parsePain002(SAMPLE_RJCT)
    expect(report.groupStatus).toBe('RJCT')
    expect(report.transactions[0]!.reasonCode).toBe('AM04')
    const patch = applyPain002Report(report)
    expect(patch.status).toBe('rejected')
    expect(patch.bankResponseReasonCode).toBe('AM04')
  })

  it('importStandards routes pain.002', async () => {
    const r = await importStandards({ format: 'pain.002', xml: SAMPLE_ACSC })
    expect(r.format).toBe('pain.002')
    expect((r.data as { originalMessageId?: string }).originalMessageId).toBe('RUN-42')
  })
})
