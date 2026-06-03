/**
 * ISO 20022 Export Service — pain.001 (credit transfer) + pain.008
 * (direct debit) XML serializer.
 *
 * Consumes the canonical types in `@/standards/iso-20022` and emits
 * the bank-ingestable wire format. Banks accept the file at the SEPA /
 * SCT-Inst / SDD interfaces.
 *
 * Schema namespaces (ISO 20022 message catalogue):
 *   pain.001.001.09  — CustomerCreditTransferInitiationV09
 *   pain.008.001.08  — CustomerDirectDebitInitiationV08
 *
 * Each version increments roughly biennially; the message body shape
 * is stable enough that callers can override the namespace via the
 * options object when their bank requires an older / newer version.
 *
 * @standard ISO-20022:2022 universal-financial-industry-message-scheme
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO-19011:2018 audit-trail
 * @see src/standards/iso-20022/types.ts
 */

import type {
  Pain001Initiation,
  Pain001Payment,
  Pain001CreditTransfer,
  Pain008Initiation,
  Pain008Payment,
  Pain008DirectDebit,
  PartyIdentification,
  AccountIdentification,
  RemittanceInformation,
} from '@/standards/iso-20022'
import { escapeXml } from '@/utilities/xml-escape'

const formatAmount = (cents: number): string => (cents / 100).toFixed(2)

const escapeAttrs = (
  attrs: Record<string, string | number | undefined>,
): string => {
  const pairs: string[] = []
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined) continue
    pairs.push(`${key}="${escapeXml(value)}"`)
  }
  return pairs.length ? ' ' + pairs.join(' ') : ''
}

const leaf = (
  tag: string,
  value: string | number | undefined | null,
  attrs?: Record<string, string | number | undefined>,
): string => {
  if (value === undefined || value === null || value === '') return ''
  return `<${tag}${attrs ? escapeAttrs(attrs) : ''}>${escapeXml(value)}</${tag}>`
}

const wrap = (
  tag: string,
  ...children: Array<string | undefined | null>
): string => {
  const inner = children.filter((c) => Boolean(c)).join('\n')
  if (!inner) return ''
  return `<${tag}>\n${inner}\n</${tag}>`
}

const formatDate = (date: Date | string): string =>
  typeof date === 'string'
    ? date.length >= 10
      ? date.slice(0, 10)
      : date
    : date.toISOString().slice(0, 10)

const formatDateTime = (date: Date | string): string =>
  typeof date === 'string' ? date : date.toISOString()

// ─── Reusable building blocks ─────────────────────────────────────────

const renderParty = (party: PartyIdentification): string => {
  const addressLines = party.postalAddress
    ? wrap(
        'PstlAdr',
        leaf('StrtNm', party.postalAddress.streetName),
        leaf('BldgNb', party.postalAddress.buildingNumber),
        leaf('PstCd', party.postalAddress.postCode),
        leaf('TwnNm', party.postalAddress.townName),
        leaf('CtrySubDvsn', party.postalAddress.countrySubDivision),
        leaf('Ctry', party.postalAddress.country),
      )
    : ''
  const idBlock =
    party.bic || party.lei || party.otherId
      ? wrap(
          'Id',
          party.bic
            ? wrap('OrgId', wrap('AnyBIC', leaf('AnyBIC', party.bic)))
            : '',
          party.lei
            ? wrap('OrgId', leaf('LEI', party.lei))
            : '',
          party.otherId && party.otherIdIssuer
            ? wrap(
                'OrgId',
                wrap(
                  'Othr',
                  leaf('Id', party.otherId),
                  wrap('SchmeNm', leaf('Cd', party.otherIdIssuer)),
                ),
              )
            : '',
        )
      : ''
  return wrap(
    'Party',
    leaf('Nm', party.name),
    addressLines,
    idBlock,
  )
}

const renderAccount = (account: AccountIdentification): string =>
  wrap(
    'Acct',
    wrap(
      'Id',
      account.iban
        ? leaf('IBAN', account.iban)
        : wrap('Othr', leaf('Id', account.otherId)),
    ),
    leaf('Ccy', account.currency),
  )

const renderAgent = (bic: string | undefined, tag: string): string =>
  bic ? wrap(tag, wrap('FinInstnId', leaf('BICFI', bic))) : ''

const renderRemittance = (rmt: RemittanceInformation | undefined): string => {
  if (!rmt) return ''
  const ustrd = rmt.unstructured ? leaf('Ustrd', rmt.unstructured) : ''
  const strd = rmt.structured?.creditorReference
    ? wrap(
        'Strd',
        wrap(
          'CdtrRefInf',
          rmt.structured.creditorReference.typeCode
            ? wrap('Tp', wrap('CdOrPrtry', leaf('Cd', rmt.structured.creditorReference.typeCode)))
            : '',
          leaf('Ref', rmt.structured.creditorReference.reference),
        ),
        ...(rmt.structured.referredDocumentNumbers ?? []).map((n) =>
          wrap('RfrdDocInf', leaf('Nb', n)),
        ),
      )
    : ''
  return wrap('RmtInf', ustrd, strd)
}

// ─── pain.001 — Customer Credit Transfer Initiation ───────────────────

const renderPain001CreditTransfer = (
  ct: Pain001CreditTransfer,
  chargeBearer?: string,
): string =>
  wrap(
    'CdtTrfTxInf',
    wrap('PmtId', leaf('EndToEndId', ct.endToEndId)),
    wrap(
      'Amt',
      leaf('InstdAmt', formatAmount(ct.amount), { Ccy: ct.currency }),
    ),
    chargeBearer ? leaf('ChrgBr', chargeBearer) : '',
    renderAgent(ct.creditorAgentBic, 'CdtrAgt'),
    // Renamed from `Party` → `Cdtr` for the creditor.
    wrap(
      'Cdtr',
      leaf('Nm', ct.creditor.name),
      ct.creditor.postalAddress
        ? wrap(
            'PstlAdr',
            leaf('StrtNm', ct.creditor.postalAddress.streetName),
            leaf('PstCd', ct.creditor.postalAddress.postCode),
            leaf('TwnNm', ct.creditor.postalAddress.townName),
            leaf('Ctry', ct.creditor.postalAddress.country),
          )
        : '',
    ),
    wrap(
      'CdtrAcct',
      wrap(
        'Id',
        ct.creditorAccount.iban
          ? leaf('IBAN', ct.creditorAccount.iban)
          : wrap('Othr', leaf('Id', ct.creditorAccount.otherId)),
      ),
    ),
    renderRemittance(ct.remittanceInformation),
  )

const renderPain001Payment = (pmt: Pain001Payment): string =>
  wrap(
    'PmtInf',
    leaf('PmtInfId', pmt.paymentInformationId),
    leaf('PmtMtd', pmt.paymentMethod),
    leaf('NbOfTxs', pmt.creditTransfers.length),
    leaf(
      'CtrlSum',
      formatAmount(pmt.creditTransfers.reduce((s, t) => s + t.amount, 0)),
    ),
    leaf('ReqdExctnDt', formatDate(pmt.requestedExecutionDate)),
    wrap(
      'Dbtr',
      leaf('Nm', pmt.debtor.name),
      pmt.debtor.postalAddress
        ? wrap(
            'PstlAdr',
            leaf('StrtNm', pmt.debtor.postalAddress.streetName),
            leaf('PstCd', pmt.debtor.postalAddress.postCode),
            leaf('TwnNm', pmt.debtor.postalAddress.townName),
            leaf('Ctry', pmt.debtor.postalAddress.country),
          )
        : '',
    ),
    wrap(
      'DbtrAcct',
      wrap(
        'Id',
        pmt.debtorAccount.iban
          ? leaf('IBAN', pmt.debtorAccount.iban)
          : wrap('Othr', leaf('Id', pmt.debtorAccount.otherId)),
      ),
    ),
    renderAgent(pmt.debtorAgentBic, 'DbtrAgt'),
    ...pmt.creditTransfers.map((ct) => renderPain001CreditTransfer(ct)),
  )

/**
 * Render a complete pain.001 customer credit transfer initiation as XML.
 *
 * @standard ISO-20022 pain.001.001.09 customer-credit-transfer-initiation
 */
export const renderPain001 = (
  init: Pain001Initiation,
  options: { namespace?: string } = {},
): string => {
  const ns = options.namespace ?? 'urn:iso:std:iso:20022:tech:xsd:pain.001.001.09'
  const head = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<Document xmlns="${ns}">`,
  ].join('\n')
  const body = wrap(
    'CstmrCdtTrfInitn',
    wrap(
      'GrpHdr',
      leaf('MsgId', init.messageId),
      leaf('CreDtTm', formatDateTime(init.creationDateTime)),
      leaf('NbOfTxs', init.numberOfTransactions),
      leaf('CtrlSum', formatAmount(init.controlSum)),
      wrap(
        'InitgPty',
        leaf('Nm', init.initiatingParty.name),
      ),
    ),
    ...init.payments.map(renderPain001Payment),
  )
  return `${head}\n${body}\n</Document>`
}

// ─── pain.008 — Customer Direct Debit Initiation ──────────────────────

const renderPain008DirectDebit = (dd: Pain008DirectDebit): string =>
  wrap(
    'DrctDbtTxInf',
    wrap('PmtId', leaf('EndToEndId', dd.endToEndId)),
    wrap(
      'InstdAmt',
      leaf('InstdAmt', formatAmount(dd.amount), { Ccy: dd.currency }),
    ),
    wrap(
      'DrctDbtTx',
      wrap(
        'MndtRltdInf',
        leaf('MndtId', dd.mandateId),
        leaf('DtOfSgntr', formatDate(dd.dateOfSignature)),
      ),
    ),
    renderAgent(dd.debtorAgentBic, 'DbtrAgt'),
    wrap(
      'Dbtr',
      leaf('Nm', dd.debtor.name),
      dd.debtor.postalAddress
        ? wrap(
            'PstlAdr',
            leaf('StrtNm', dd.debtor.postalAddress.streetName),
            leaf('PstCd', dd.debtor.postalAddress.postCode),
            leaf('TwnNm', dd.debtor.postalAddress.townName),
            leaf('Ctry', dd.debtor.postalAddress.country),
          )
        : '',
    ),
    wrap(
      'DbtrAcct',
      wrap(
        'Id',
        dd.debtorAccount.iban
          ? leaf('IBAN', dd.debtorAccount.iban)
          : wrap('Othr', leaf('Id', dd.debtorAccount.otherId)),
      ),
    ),
    renderRemittance(dd.remittanceInformation),
  )

const renderPain008Payment = (pmt: Pain008Payment): string =>
  wrap(
    'PmtInf',
    leaf('PmtInfId', pmt.paymentInformationId),
    leaf('PmtMtd', pmt.paymentMethod),
    leaf('NbOfTxs', pmt.directDebits.length),
    leaf(
      'CtrlSum',
      formatAmount(pmt.directDebits.reduce((s, d) => s + d.amount, 0)),
    ),
    pmt.localInstrument
      ? wrap('PmtTpInf', wrap('LclInstrm', leaf('Cd', pmt.localInstrument)))
      : '',
    wrap('PmtTpInf', leaf('SeqTp', pmt.sequenceType)),
    leaf('ReqdColltnDt', formatDate(pmt.requestedCollectionDate)),
    wrap(
      'Cdtr',
      leaf('Nm', pmt.creditor.name),
      pmt.creditor.postalAddress
        ? wrap(
            'PstlAdr',
            leaf('StrtNm', pmt.creditor.postalAddress.streetName),
            leaf('PstCd', pmt.creditor.postalAddress.postCode),
            leaf('TwnNm', pmt.creditor.postalAddress.townName),
            leaf('Ctry', pmt.creditor.postalAddress.country),
          )
        : '',
    ),
    wrap(
      'CdtrAcct',
      wrap(
        'Id',
        pmt.creditorAccount.iban
          ? leaf('IBAN', pmt.creditorAccount.iban)
          : wrap('Othr', leaf('Id', pmt.creditorAccount.otherId)),
      ),
    ),
    renderAgent(pmt.creditorAgentBic, 'CdtrAgt'),
    ...pmt.directDebits.map(renderPain008DirectDebit),
  )

/**
 * Render a complete pain.008 customer direct debit initiation as XML.
 *
 * @standard ISO-20022 pain.008.001.08 customer-direct-debit-initiation
 */
export const renderPain008 = (
  init: Pain008Initiation,
  options: { namespace?: string } = {},
): string => {
  const ns = options.namespace ?? 'urn:iso:std:iso:20022:tech:xsd:pain.008.001.08'
  const head = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<Document xmlns="${ns}">`,
  ].join('\n')
  const body = wrap(
    'CstmrDrctDbtInitn',
    wrap(
      'GrpHdr',
      leaf('MsgId', init.messageId),
      leaf('CreDtTm', formatDateTime(init.creationDateTime)),
      leaf('NbOfTxs', init.numberOfTransactions),
      leaf('CtrlSum', formatAmount(init.controlSum)),
      wrap(
        'InitgPty',
        leaf('Nm', init.initiatingParty.name),
      ),
    ),
    ...init.payments.map(renderPain008Payment),
  )
  return `${head}\n${body}\n</Document>`
}

// Exported for tests / advanced consumers that compose their own envelopes.
export { renderParty, renderAccount, renderRemittance }
