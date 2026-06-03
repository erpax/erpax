/**
 * Peppol Export Service — renders a `PeppolBillingMessage` into UBL 2.1
 * Invoice XML for transmission across the Peppol network.
 *
 * Schema: `urn:oasis:names:specification:ubl:schema:xsd:Invoice-2` with
 * the `cac:` (CommonAggregateComponents) and `cbc:` (CommonBasicComponents)
 * namespaces. The CustomizationID + ProfileID at the top of the document
 * mark it as Peppol BIS Billing 3.0 compliant.
 *
 * Money is integer cents on input; emitted as UBL decimal with 2 digits.
 * Every monetary `cbc:` amount carries the `currencyID` attribute.
 *
 * @standard Peppol-BIS-3.0 billing
 * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
 * @standard UBL-2.1 universal-business-language
 * @standard ISO-4217:2015 currency-codes
 * @audit ISO-19011:2018 audit-trail
 * @see src/standards/peppol-bis-3/types.ts
 */

import type {
  PeppolBillingMessage,
  PeppolParticipantIdentifier,
} from '@/standards/peppol-bis-3'
import type {
  InvoiceLine,
  VatBreakdown,
  DocumentTotals,
  LineVatInformation,
} from '@/standards/en-16931'
import { escapeXml } from '@/utilities/xml-escape'

// ─── XML primitives ───────────────────────────────────────────────────

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

/**
 * Render a leaf element: `<cbc:Tag>value</cbc:Tag>` with optional
 * attributes. Returns empty string when value is undefined / empty
 * (so callers can compose without `if` blocks for optional fields).
 */
const leaf = (
  tag: string,
  value: string | number | undefined | null,
  attrs?: Record<string, string | number | undefined>,
): string => {
  if (value === undefined || value === null || value === '') return ''
  return `<${tag}${attrs ? escapeAttrs(attrs) : ''}>${escapeXml(value)}</${tag}>`
}

/**
 * Render a wrapper element with nested children. Drops empty children.
 * Wraps children in newlines when there's at least one non-empty.
 */
const wrap = (
  tag: string,
  ...children: Array<string | undefined | null>
): string => {
  const inner = children.filter((c) => Boolean(c)).join('\n')
  if (!inner) return ''
  return `<${tag}>\n${inner}\n</${tag}>`
}

// ─── Per-element renderers ────────────────────────────────────────────

const renderParticipant = (
  tag: string,
  id: PeppolParticipantIdentifier,
): string =>
  `<${tag} schemeID="${escapeXml(id.scheme)}">${escapeXml(id.value)}</${tag}>`

const renderTaxCategory = (vat: LineVatInformation): string =>
  wrap(
    'cac:TaxCategory',
    leaf('cbc:ID', vat.categoryCode),
    vat.rate !== undefined ? leaf('cbc:Percent', vat.rate.toFixed(2)) : '',
    leaf('cbc:TaxExemptionReasonCode', vat.exemptionReasonCode),
    leaf('cbc:TaxExemptionReason', vat.exemptionReason),
    wrap('cac:TaxScheme', leaf('cbc:ID', 'VAT')),
  )

const renderInvoiceLine = (
  line: InvoiceLine,
  currencyId: string,
): string => {
  const lineExtension = leaf('cbc:LineExtensionAmount', formatAmount(line.netAmount), {
    currencyID: currencyId,
  })
  const itemBlock = wrap(
    'cac:Item',
    line.description ? leaf('cbc:Description', line.description) : '',
    leaf('cbc:Name', line.description ?? line.id),
    line.itemId
      ? wrap(
          'cac:SellersItemIdentification',
          leaf('cbc:ID', line.itemId),
        )
      : '',
    renderTaxCategory({ ...line.vat, exemptionReasonCode: undefined, exemptionReason: undefined }),
  )
  const priceBlock = wrap(
    'cac:Price',
    line.priceDetails?.itemNetPrice !== undefined
      ? leaf('cbc:PriceAmount', formatAmount(line.priceDetails.itemNetPrice), {
          currencyID: currencyId,
        })
      : '',
    line.priceDetails?.baseQuantity !== undefined
      ? leaf('cbc:BaseQuantity', line.priceDetails.baseQuantity, {
          unitCode: line.priceDetails.baseUnitCode ?? 'EA',
        })
      : '',
  )

  return wrap(
    'cac:InvoiceLine',
    leaf('cbc:ID', line.id),
    line.note ? leaf('cbc:Note', line.note) : '',
    leaf('cbc:InvoicedQuantity', line.quantity, { unitCode: line.unitCode }),
    lineExtension,
    itemBlock,
    priceBlock,
  )
}

const renderTaxTotal = (
  vatBreakdown: VatBreakdown[],
  currencyId: string,
): string => {
  const totalTaxAmount = vatBreakdown.reduce((s, b) => s + b.taxAmount, 0)
  const subTotals = vatBreakdown
    .map((b) =>
      wrap(
        'cac:TaxSubtotal',
        leaf('cbc:TaxableAmount', formatAmount(b.taxableAmount), {
          currencyID: currencyId,
        }),
        leaf('cbc:TaxAmount', formatAmount(b.taxAmount), {
          currencyID: currencyId,
        }),
        renderTaxCategory({
          categoryCode: b.categoryCode,
          rate: b.rate,
          exemptionReasonCode: b.exemptionReasonCode,
          exemptionReason: b.exemptionReason,
        }),
      ),
    )
    .join('\n')
  return wrap(
    'cac:TaxTotal',
    leaf('cbc:TaxAmount', formatAmount(totalTaxAmount), {
      currencyID: currencyId,
    }),
    subTotals,
  )
}

const renderLegalMonetaryTotal = (
  totals: DocumentTotals,
  currencyId: string,
): string =>
  wrap(
    'cac:LegalMonetaryTotal',
    leaf('cbc:LineExtensionAmount', formatAmount(totals.lineNetTotal), {
      currencyID: currencyId,
    }),
    leaf('cbc:TaxExclusiveAmount', formatAmount(totals.taxExclusiveTotal), {
      currencyID: currencyId,
    }),
    leaf('cbc:TaxInclusiveAmount', formatAmount(totals.taxInclusiveTotal), {
      currencyID: currencyId,
    }),
    totals.allowancesTotal !== undefined
      ? leaf('cbc:AllowanceTotalAmount', formatAmount(totals.allowancesTotal), {
          currencyID: currencyId,
        })
      : '',
    totals.chargesTotal !== undefined
      ? leaf('cbc:ChargeTotalAmount', formatAmount(totals.chargesTotal), {
          currencyID: currencyId,
        })
      : '',
    totals.prepaidAmount !== undefined
      ? leaf('cbc:PrepaidAmount', formatAmount(totals.prepaidAmount), {
          currencyID: currencyId,
        })
      : '',
    totals.roundingAmount !== undefined
      ? leaf('cbc:PayableRoundingAmount', formatAmount(totals.roundingAmount), {
          currencyID: currencyId,
        })
      : '',
    leaf('cbc:PayableAmount', formatAmount(totals.amountDue), {
      currencyID: currencyId,
    }),
  )

// ─── Top-level renderer ───────────────────────────────────────────────

/**
 * Render a complete UBL 2.1 Peppol BIS Billing 3.0 Invoice document.
 *
 * Output: a single XML string starting with the prolog `<?xml...?>`
 * and the `<Invoice>` root with the three required namespaces and
 * the BIS 3.0 CustomizationID + ProfileID at the top.
 *
 * @standard Peppol-BIS-3.0 billing
 * @standard EN-16931:2017 semantic-model
 * @standard UBL-2.1 universal-business-language
 */
export const renderPeppolInvoice = (msg: PeppolBillingMessage): string => {
  const { envelope, invoice, lines, totals, vatBreakdown } = msg
  const cur = invoice.currencyCode

  const head = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"' +
      ' xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"' +
      ' xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">',
  ].join('\n')

  const meta = [
    leaf('cbc:CustomizationID', envelope.customizationId),
    leaf('cbc:ProfileID', envelope.profileId),
    leaf('cbc:ID', invoice.invoiceNumber),
    leaf(
      'cbc:IssueDate',
      typeof invoice.issueDate === 'string'
        ? invoice.issueDate
        : invoice.issueDate.toISOString().slice(0, 10),
    ),
    invoice.dueDate
      ? leaf(
          'cbc:DueDate',
          typeof invoice.dueDate === 'string'
            ? invoice.dueDate
            : invoice.dueDate.toISOString().slice(0, 10),
        )
      : '',
    leaf('cbc:InvoiceTypeCode', invoice.typeCode),
    leaf('cbc:DocumentCurrencyCode', cur),
    invoice.buyerReference
      ? leaf('cbc:BuyerReference', invoice.buyerReference)
      : '',
  ]
    .filter(Boolean)
    .join('\n')

  const supplier = wrap(
    'cac:AccountingSupplierParty',
    wrap(
      'cac:Party',
      renderParticipant('cbc:EndpointID', envelope.senderEndpointId),
    ),
  )
  const customer = wrap(
    'cac:AccountingCustomerParty',
    wrap(
      'cac:Party',
      renderParticipant('cbc:EndpointID', envelope.receiverEndpointId),
    ),
  )

  const taxTotal = renderTaxTotal(vatBreakdown, cur)
  const monetaryTotal = renderLegalMonetaryTotal(totals, cur)
  const invoiceLines = lines.map((l) => renderInvoiceLine(l, cur)).join('\n')

  return [head, meta, supplier, customer, taxTotal, monetaryTotal, invoiceLines, '</Invoice>']
    .filter(Boolean)
    .join('\n')
}
