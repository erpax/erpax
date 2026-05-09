/**
 * Peppol Import Service — parses an inbound UBL 2.1 Invoice XML
 * (Peppol BIS Billing 3.0) into the canonical `PeppolBillingMessage`
 * shape.
 *
 * Inbound flow: a Peppol Access Point hands the receiver a UBL XML
 * doc; this parser turns it into the typed structure so the AP-side
 * write path can populate Invoices / InvoiceLines collections + book
 * the canonical bill:activated event.
 *
 * Implementation: dependency-free regex-based extraction (matches
 * the camt053-import.service approach). Adequate for well-formed
 * UBL emitted by certified Peppol APs. For untrusted input pair
 * with an XSD validator in front.
 *
 * @standard Peppol-BIS-3.0 billing
 * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
 * @standard UBL-2.1 universal-business-language
 * @standard ISO-6523-1:1998 participant-identifier-scheme
 * @audit ISO-19011:2018 audit-trail
 * @see src/services/peppol-export.service.ts (outbound counterpart)
 * @see src/standards/peppol-bis-3/types.ts
 * @see src/standards/en-16931/types.ts
 */

import {
  PEPPOL_BIS_3_CUSTOMIZATION_ID,
  type PeppolBillingMessage,
  type PeppolEnvelope,
  type PeppolDocumentTypeId,
  type PeppolProfileId,
  type PeppolParticipantIdentifier,
  type PeppolParticipantIdentifierScheme,
  isPeppolParticipantIdentifierScheme,
  isPeppolProfileId,
} from '@/standards/peppol-bis-3'
import type {
  InvoiceLine,
  InvoiceHeader,
  DocumentTotals,
  VatBreakdown,
  VatCategoryCode,
  InvoiceTypeCode,
  LineVatInformation,
  ItemPriceDetails,
} from '@/standards/en-16931'

// ─── Tag-extraction primitives (regex-based) ──────────────────────────

const stripNs = (xml: string): string => xml // we keep prefixes — extract by full name

/**
 * Find the first `<prefix:tag>...</prefix:tag>` body text.
 */
const extractTag = (xml: string, qualifiedTag: string): string | undefined => {
  const m = xml.match(
    new RegExp(`<${qualifiedTag}(?:\\s[^>]*)?>([\\s\\S]*?)</${qualifiedTag}>`),
  )
  return m ? m[1].trim() : undefined
}

const extractAttr = (
  xml: string,
  qualifiedTag: string,
  attr: string,
): string | undefined => {
  const m = xml.match(
    new RegExp(`<${qualifiedTag}\\s[^>]*${attr}="([^"]*)"[^>]*>`),
  )
  return m ? m[1] : undefined
}

const extractAll = (xml: string, qualifiedTag: string): string[] => {
  const out: string[] = []
  const open = `<${qualifiedTag}`
  const close = `</${qualifiedTag}>`
  let pos = 0
  while (pos < xml.length) {
    const start = xml.indexOf(open, pos)
    if (start === -1) break
    const tagEnd = xml.indexOf('>', start)
    if (tagEnd === -1) break
    if (xml[tagEnd - 1] === '/') {
      pos = tagEnd + 1
      continue
    }
    let depth = 1
    let cursor = tagEnd + 1
    while (depth > 0 && cursor < xml.length) {
      const nextOpen = xml.indexOf(open, cursor)
      const nextClose = xml.indexOf(close, cursor)
      if (nextClose === -1) return out
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth += 1
        cursor = nextOpen + open.length
      } else {
        depth -= 1
        cursor = nextClose + close.length
      }
    }
    if (depth === 0) {
      out.push(xml.slice(tagEnd + 1, cursor - close.length).trim())
      pos = cursor
    } else {
      break
    }
  }
  return out
}

/**
 * Decode XML entities back to the raw text. Inverse of the
 * peppol-export.service escapeXml.
 */
const decodeXml = (s: string | undefined): string | undefined => {
  if (s === undefined) return undefined
  return s
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
}

const toCents = (decimal: string | undefined): number => {
  if (!decimal) return 0
  return Math.round(parseFloat(decimal.trim()) * 100)
}

// ─── Per-element parsers ──────────────────────────────────────────────

const parseParticipant = (
  xml: string | undefined,
  expectedTag = 'cbc:EndpointID',
): PeppolParticipantIdentifier | undefined => {
  if (!xml) return undefined
  // The body text is the value; the schemeID attribute holds the scheme.
  // Either the input is the inner text + a separate attribute, or the
  // caller passes the whole element and we re-parse.
  const m = xml.match(
    new RegExp(
      `<${expectedTag}\\s[^>]*schemeID="([^"]*)"[^>]*>([\\s\\S]*?)</${expectedTag}>`,
    ),
  )
  if (!m) return undefined
  const [, scheme, value] = m
  if (!isPeppolParticipantIdentifierScheme(scheme)) return undefined
  return {
    scheme,
    value: decodeXml(value)?.trim() ?? '',
  }
}

const parseInvoiceTypeCode = (s: string | undefined): InvoiceTypeCode => {
  const KNOWN: InvoiceTypeCode[] = [
    '326',
    '380',
    '381',
    '384',
    '386',
    '388',
    '389',
    '393',
    '395',
    '751',
  ]
  return KNOWN.includes(s as InvoiceTypeCode)
    ? (s as InvoiceTypeCode)
    : '380'
}

const parseVatCategoryCode = (s: string | undefined): VatCategoryCode => {
  const KNOWN: VatCategoryCode[] = ['S', 'Z', 'E', 'AE', 'K', 'G', 'O', 'L', 'M']
  return KNOWN.includes(s as VatCategoryCode)
    ? (s as VatCategoryCode)
    : 'S'
}

const parseTaxCategory = (xml: string | undefined): LineVatInformation => {
  if (!xml) return { categoryCode: 'S' }
  const id = extractTag(xml, 'cbc:ID')
  const percent = extractTag(xml, 'cbc:Percent')
  const exemptionReasonCode = extractTag(xml, 'cbc:TaxExemptionReasonCode')
  const exemptionReason = extractTag(xml, 'cbc:TaxExemptionReason')
  return {
    categoryCode: parseVatCategoryCode(id),
    rate: percent !== undefined ? parseFloat(percent) : undefined,
    exemptionReasonCode: decodeXml(exemptionReasonCode),
    exemptionReason: decodeXml(exemptionReason),
  }
}

const parseInvoiceLine = (xml: string): InvoiceLine => {
  const id = extractTag(xml, 'cbc:ID') ?? ''
  const note = extractTag(xml, 'cbc:Note')
  const quantityRaw = extractTag(xml, 'cbc:InvoicedQuantity')
  const quantity = quantityRaw ? parseFloat(quantityRaw) : 0
  const unitCode = extractAttr(xml, 'cbc:InvoicedQuantity', 'unitCode') ?? 'EA'
  const lineNet = extractTag(xml, 'cbc:LineExtensionAmount')

  // BG-29 Price details
  const priceXml = extractTag(xml, 'cac:Price')
  let priceDetails: ItemPriceDetails | undefined
  if (priceXml) {
    const priceAmount = extractTag(priceXml, 'cbc:PriceAmount')
    const baseQuantityRaw = extractTag(priceXml, 'cbc:BaseQuantity')
    const baseUnitCode = extractAttr(priceXml, 'cbc:BaseQuantity', 'unitCode')
    priceDetails = {
      itemNetPrice: toCents(priceAmount),
      baseQuantity: baseQuantityRaw ? parseFloat(baseQuantityRaw) : undefined,
      baseUnitCode,
    }
  }

  // Item description / sellers item id / classified tax category.
  const itemXml = extractTag(xml, 'cac:Item')
  let description = ''
  let itemId: string | undefined
  let vat: LineVatInformation = { categoryCode: 'S' }
  if (itemXml) {
    description =
      decodeXml(extractTag(itemXml, 'cbc:Description'))
        ?? decodeXml(extractTag(itemXml, 'cbc:Name')) ?? ''
    const sellersIdXml = extractTag(itemXml, 'cac:SellersItemIdentification')
    if (sellersIdXml) {
      itemId = decodeXml(extractTag(sellersIdXml, 'cbc:ID'))
    }
    const taxCatXml = extractTag(itemXml, 'cac:ClassifiedTaxCategory') ?? extractTag(itemXml, 'cac:TaxCategory')
    if (taxCatXml) vat = parseTaxCategory(taxCatXml)
  }

  return {
    id,
    note: decodeXml(note),
    quantity,
    unitCode,
    netAmount: toCents(lineNet),
    description,
    priceDetails,
    vat,
    itemId,
  }
}

const parseDocumentTotals = (xml: string | undefined): DocumentTotals => {
  if (!xml) {
    return {
      lineNetTotal: 0,
      taxExclusiveTotal: 0,
      taxInclusiveTotal: 0,
      amountDue: 0,
    }
  }
  return {
    lineNetTotal: toCents(extractTag(xml, 'cbc:LineExtensionAmount')),
    allowancesTotal: extractTag(xml, 'cbc:AllowanceTotalAmount')
      ? toCents(extractTag(xml, 'cbc:AllowanceTotalAmount'))
      : undefined,
    chargesTotal: extractTag(xml, 'cbc:ChargeTotalAmount')
      ? toCents(extractTag(xml, 'cbc:ChargeTotalAmount'))
      : undefined,
    taxExclusiveTotal: toCents(extractTag(xml, 'cbc:TaxExclusiveAmount')),
    vatTotal: extractTag(xml, 'cbc:TaxAmount')
      ? toCents(extractTag(xml, 'cbc:TaxAmount'))
      : undefined,
    taxInclusiveTotal: toCents(extractTag(xml, 'cbc:TaxInclusiveAmount')),
    prepaidAmount: extractTag(xml, 'cbc:PrepaidAmount')
      ? toCents(extractTag(xml, 'cbc:PrepaidAmount'))
      : undefined,
    roundingAmount: extractTag(xml, 'cbc:PayableRoundingAmount')
      ? toCents(extractTag(xml, 'cbc:PayableRoundingAmount'))
      : undefined,
    amountDue: toCents(extractTag(xml, 'cbc:PayableAmount')),
  }
}

const parseVatBreakdown = (root: string): VatBreakdown[] => {
  const taxTotalXml = extractTag(root, 'cac:TaxTotal')
  if (!taxTotalXml) return []
  return extractAll(taxTotalXml, 'cac:TaxSubtotal').map((sub) => {
    const taxableAmount = toCents(extractTag(sub, 'cbc:TaxableAmount'))
    const taxAmount = toCents(extractTag(sub, 'cbc:TaxAmount'))
    const cat = parseTaxCategory(extractTag(sub, 'cac:TaxCategory'))
    return {
      taxableAmount,
      taxAmount,
      categoryCode: cat.categoryCode,
      rate: cat.rate,
      exemptionReasonCode: cat.exemptionReasonCode,
      exemptionReason: cat.exemptionReason,
    }
  })
}

// ─── Top-level parser ─────────────────────────────────────────────────

/**
 * Parse a UBL 2.1 Invoice document into the canonical
 * `PeppolBillingMessage`. Returns the envelope (CustomizationID +
 * ProfileID + sender / receiver participant ids) plus the EN-16931
 * body (invoice header + lines + totals + VAT breakdown).
 *
 * @standard Peppol-BIS-3.0 billing
 * @standard EN-16931:2017 semantic-model
 */
export const parsePeppolInvoice = (xml: string): PeppolBillingMessage => {
  // Locate the Invoice (or CreditNote — same parser shape) root body.
  const invoiceBlock =
    extractTag(xml, 'Invoice') ??
    extractTag(xml, 'CreditNote') ??
    xml

  // Envelope ids.
  const customizationIdRaw = decodeXml(extractTag(invoiceBlock, 'cbc:CustomizationID'))
  const profileIdRaw = decodeXml(extractTag(invoiceBlock, 'cbc:ProfileID'))
  const profileId = isPeppolProfileId(profileIdRaw)
    ? (profileIdRaw as PeppolProfileId)
    : 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0'

  // Document type id is conventionally not in the document body — the
  // Peppol Access Point assigns it from the document type at receive
  // time. We derive it from the invoice type code (380 → Invoice-2,
  // 381 → CreditNote-2).
  const invoiceTypeCodeRaw = decodeXml(extractTag(invoiceBlock, 'cbc:InvoiceTypeCode'))
  const documentTypeId: PeppolDocumentTypeId =
    invoiceTypeCodeRaw === '381'
      ? 'urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2::CreditNote##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1'
      : 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1'

  // Sender + receiver from AccountingSupplierParty / AccountingCustomerParty.
  const supplierXml = extractTag(invoiceBlock, 'cac:AccountingSupplierParty')
  const customerXml = extractTag(invoiceBlock, 'cac:AccountingCustomerParty')
  const supplierPartyXml = supplierXml ? extractTag(supplierXml, 'cac:Party') : undefined
  const customerPartyXml = customerXml ? extractTag(customerXml, 'cac:Party') : undefined
  const FALLBACK: PeppolParticipantIdentifier = {
    scheme: '0088' as PeppolParticipantIdentifierScheme,
    value: '',
  }
  const senderParticipantId =
    (supplierPartyXml && parseParticipant(supplierPartyXml, 'cbc:EndpointID')) ??
    FALLBACK
  const receiverParticipantId =
    (customerPartyXml && parseParticipant(customerPartyXml, 'cbc:EndpointID')) ??
    FALLBACK

  const envelope: PeppolEnvelope = {
    customizationId:
      customizationIdRaw === PEPPOL_BIS_3_CUSTOMIZATION_ID
        ? PEPPOL_BIS_3_CUSTOMIZATION_ID
        : PEPPOL_BIS_3_CUSTOMIZATION_ID,
    profileId,
    documentTypeId,
    senderParticipantId,
    receiverParticipantId,
    senderEndpointId: senderParticipantId,
    receiverEndpointId: receiverParticipantId,
  }

  // Invoice header.
  const invoice: InvoiceHeader = {
    invoiceNumber: decodeXml(extractTag(invoiceBlock, 'cbc:ID')) ?? '',
    issueDate: decodeXml(extractTag(invoiceBlock, 'cbc:IssueDate')) ?? '',
    typeCode: parseInvoiceTypeCode(invoiceTypeCodeRaw),
    currencyCode: decodeXml(extractTag(invoiceBlock, 'cbc:DocumentCurrencyCode')) ?? 'EUR',
    dueDate: decodeXml(extractTag(invoiceBlock, 'cbc:DueDate')),
    buyerReference: decodeXml(extractTag(invoiceBlock, 'cbc:BuyerReference')),
  }

  const lines = extractAll(invoiceBlock, 'cac:InvoiceLine').map(parseInvoiceLine)
  const totals = parseDocumentTotals(extractTag(invoiceBlock, 'cac:LegalMonetaryTotal'))
  const vatBreakdown = parseVatBreakdown(invoiceBlock)

  return { envelope, invoice, lines, totals, vatBreakdown }
}

/** Re-export so consumers can stay on a single import path. */
export { stripNs }
