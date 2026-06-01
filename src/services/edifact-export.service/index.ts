/**
 * EDIFACT Export Service — segment-based wire-format serializer for the
 * canonical UN/EDIFACT message types in `@/standards/un-edifact`.
 *
 * Implements the ISO 9735 syntax rules:
 *   • Segment terminator:    `'`
 *   • Composite separator:   `+`
 *   • Element separator:     `:`
 *   • Release character:     `?`  (escape any of the four)
 *
 * The default UNA service-string-advice header (`UNA:+.? '`) is the
 * standard separator-character set; this serializer doesn't emit UNA
 * — partners pre-agree on the standard set or the parser inspects the
 * first 9 bytes for `UNA`.
 *
 * @standard UN-EDIFACT D.96A
 * @standard ISO-9735:2002 edifact-syntax-rules
 * @audit ISO-19011:2018 audit-trail
 * @see src/standards/un-edifact/types.ts
 */

import type {
  EdifactInterchange,
  EdifactInvoic,
  EdifactDesadv,
  EdifactPaymul,
  EdifactUNB,
  EdifactUNH,
  EdifactUNT,
  EdifactUNZ,
  EdifactBGM,
  EdifactDTM,
  EdifactNAD,
  EdifactLIN,
  EdifactIMD,
  EdifactQTY,
  EdifactPRI,
  EdifactMOA,
  EdifactTAX,
} from '@/standards/un-edifact'

// ─── Low-level encoders ───────────────────────────────────────────────

/**
 * Escape ISO 9735 special characters: `?` (release) → `??` first, then
 * `+` `:` `'` each prefixed with `?`. Order matters — release must
 * escape itself before introducing more `?` into the value.
 */
export const escapeEdifact = (value: string | number | undefined): string => {
  if (value === undefined || value === null) return ''
  const s = String(value)
  // The four ISO 9735 specials: `?` first (else we'd double-escape).
  return s
    .replace(/\?/g, '??')
    .replace(/\+/g, '?+')
    .replace(/:/g, '?:')
    .replace(/'/g, "?'")
}

/**
 * Render a composite — `:`-joined elements with trailing empty
 * elements stripped (canonical EDIFACT form).
 */
export const composite = (
  ...elements: Array<string | number | undefined | null>
): string => {
  // Drop trailing empty / undefined elements per ISO 9735 — but keep
  // intermediate empties so the position-based decoder still maps
  // correctly.
  const parts = elements.map((e) =>
    e === undefined || e === null ? '' : escapeEdifact(e),
  )
  while (parts.length > 0 && parts[parts.length - 1] === '') parts.pop()
  return parts.join(':')
}

/**
 * Render a complete segment: `TAG+composite+composite+...'`.
 * Trailing empty composites are stripped per ISO 9735.
 */
export const segment = (tag: string, ...composites: string[]): string => {
  const parts = [...composites]
  while (parts.length > 0 && parts[parts.length - 1] === '') parts.pop()
  return `${tag}${parts.length > 0 ? '+' : ''}${parts.join('+')}'`
}

// ─── Per-segment serializers ──────────────────────────────────────────

export const serializeUNB = (unb: EdifactUNB): string =>
  segment(
    'UNB',
    composite(unb.syntaxIdentifier, unb.syntaxVersion),
    composite(unb.sender.id, unb.sender.qualifier),
    composite(unb.receiver.id, unb.receiver.qualifier),
    composite(unb.preparationDate, unb.preparationTime),
    unb.interchangeControlReference,
  )

export const serializeUNH = (unh: EdifactUNH): string =>
  segment(
    'UNH',
    unh.messageReferenceNumber,
    composite(
      unh.messageType,
      unh.version,
      unh.release,
      unh.controllingAgency,
    ),
  )

export const serializeUNT = (unt: EdifactUNT): string =>
  segment('UNT', String(unt.numberOfSegments), unt.messageReferenceNumber)

export const serializeUNZ = (unz: EdifactUNZ): string =>
  segment(
    'UNZ',
    String(unz.numberOfMessages),
    unz.interchangeControlReference,
  )

export const serializeBGM = (bgm: EdifactBGM): string =>
  segment(
    'BGM',
    bgm.documentNameCode,
    bgm.documentNumber,
    bgm.messageFunctionCode,
  )

export const serializeDTM = (dtm: EdifactDTM): string =>
  segment('DTM', composite(dtm.qualifier, dtm.value, dtm.formatQualifier))

export const serializeNAD = (nad: EdifactNAD): string =>
  segment(
    'NAD',
    nad.partyQualifier,
    composite(
      nad.partyId?.id,
      nad.partyId?.codeListAgency,
      nad.partyId?.codeListIdentifier,
    ),
    '', // BG-09 (party identification details — empty here)
    composite(nad.name, nad.taxId), // BG-10 short name + reference
    nad.street ?? '',
    nad.city ?? '',
    '', // country sub-entity — usually empty
    nad.postalCode ?? '',
    nad.country ?? '',
  )

export const serializeLIN = (lin: EdifactLIN): string =>
  segment(
    'LIN',
    String(lin.lineNumber),
    '', // action code — usually empty
    composite(lin.itemId?.id, lin.itemId?.codeListIdentifier),
  )

export const serializeIMD = (imd: EdifactIMD): string =>
  segment(
    'IMD',
    imd.descriptionFormat,
    '', // item description code — empty for free-form
    composite('', '', '', imd.description), // 4th element is the text
  )

export const serializeQTY = (qty: EdifactQTY): string =>
  segment(
    'QTY',
    composite(qty.qualifier, String(qty.value), qty.unitCode),
  )

export const serializePRI = (pri: EdifactPRI): string =>
  segment('PRI', composite(pri.qualifier, formatAmount(pri.value)))

export const serializeMOA = (moa: EdifactMOA): string =>
  segment('MOA', composite(moa.qualifier, formatAmount(moa.value), moa.currency))

export const serializeTAX = (tax: EdifactTAX): string =>
  // UN/EDIFACT D96A TAX segment data elements (8 total):
  //   1. Function qualifier (e.g. '7' = VAT)
  //   2. Tax type (composite C241 — we only emit the first sub-element)
  //   3. Country code (composite C533) — usually empty
  //   4. Tax account info — usually empty
  //   5. Tax assessment basis monetary value — usually empty
  //   6. Tax details (composite C243: typeCode + listQualifier + agency + rate)
  //   7. Tax category code (e.g. 'S' = standard rate)
  //   8. (party tax identifier, calculation sequence — emitted as nothing)
  //
  // Expected wire form for a 20% standard VAT line:
  //   TAX+7+VAT++++:::20+S'
  //   ^^^ ^ ^^^ ^^^ ^^^^^^ ^
  //    1  2  3   4   5+6   7
  segment(
    'TAX',
    tax.functionQualifier,
    tax.type,
    '', // 3. country code (BG-23) — usually empty
    '', // 4. tax-account info — usually empty
    '', // 5. tax assessment basis — usually empty
    composite('', '', '', tax.rate !== undefined ? String(tax.rate) : ''),
    tax.categoryCode ?? '',
  )

// EDIFACT renders monetary amounts as decimal with `.` separator, NOT cents.
const formatAmount = (cents: number): string => (cents / 100).toFixed(2)

// ─── Message serializers ──────────────────────────────────────────────

/**
 * Serialize an INVOIC message into its segment list (ordered).
 * The caller joins them with newlines (cosmetic) or sends as-is
 * (the `'` terminator is the canonical message boundary).
 */
export const serializeInvoic = (msg: EdifactInvoic): string[] => {
  const segments: string[] = []
  segments.push(serializeUNH(msg.unh))
  segments.push(serializeBGM(msg.bgm))
  for (const dtm of msg.dates) segments.push(serializeDTM(dtm))
  for (const nad of msg.parties) segments.push(serializeNAD(nad))
  if (msg.currency) {
    segments.push(
      segment('CUX', composite(msg.currency.qualifier, msg.currency.code)),
    )
  }
  for (const line of msg.lines) {
    segments.push(serializeLIN(line.lin))
    if (line.description) segments.push(serializeIMD(line.description))
    segments.push(serializeQTY(line.quantity))
    segments.push(serializePRI(line.price))
    segments.push(serializeMOA(line.lineNetAmount))
    if (line.tax) segments.push(serializeTAX(line.tax))
  }
  // Document-level totals come after a UNS+S section separator.
  segments.push(segment('UNS', 'S'))
  segments.push(serializeMOA(msg.documentTotals.netAmount))
  segments.push(serializeMOA(msg.documentTotals.taxAmount))
  segments.push(serializeMOA(msg.documentTotals.grossAmount))
  segments.push(serializeMOA(msg.documentTotals.amountDue))
  // Reconcile UNT.numberOfSegments — counts UNH..UNT inclusive.
  const unt: EdifactUNT = {
    ...msg.unt,
    numberOfSegments: segments.length + 1, // +1 for the UNT itself
  }
  segments.push(serializeUNT(unt))
  return segments
}

export const serializeDesadv = (msg: EdifactDesadv): string[] => {
  const segments: string[] = []
  segments.push(serializeUNH(msg.unh))
  segments.push(serializeBGM(msg.bgm))
  for (const dtm of msg.dates) segments.push(serializeDTM(dtm))
  for (const nad of msg.parties) segments.push(serializeNAD(nad))
  for (const line of msg.lines) {
    segments.push(serializeLIN(line.lin))
    segments.push(serializeQTY(line.quantity))
  }
  segments.push(
    serializeUNT({ ...msg.unt, numberOfSegments: segments.length + 1 }),
  )
  return segments
}

export const serializePaymul = (msg: EdifactPaymul): string[] => {
  const segments: string[] = []
  segments.push(serializeUNH(msg.unh))
  segments.push(serializeBGM(msg.bgm))
  for (const dtm of msg.dates) segments.push(serializeDTM(dtm))
  for (const leg of msg.legs) {
    segments.push(serializeNAD(leg.payee))
    segments.push(serializeMOA(leg.amount))
    segments.push(segment('PAI', composite('', '', leg.paymentMeans.code)))
    if (leg.remittanceReference) {
      segments.push(segment('RFF', composite('CR', leg.remittanceReference)))
    }
  }
  segments.push(
    serializeUNT({ ...msg.unt, numberOfSegments: segments.length + 1 }),
  )
  return segments
}

// ─── Top-level interchange ────────────────────────────────────────────

/**
 * Serialize a complete EDIFACT interchange (UNB + 1..N messages + UNZ).
 * Returns the segment list as an array of strings — the caller joins
 * with newlines (for readability) or empty (canonical wire form).
 */
export const serializeInterchange = (
  interchange: EdifactInterchange,
): string[] => {
  const out: string[] = []
  out.push(serializeUNB(interchange.unb))
  for (const msg of interchange.messages) {
    let messageSegments: string[]
    if (msg.unh.messageType === 'INVOIC') {
      messageSegments = serializeInvoic(msg as EdifactInvoic)
    } else if (msg.unh.messageType === 'DESADV') {
      messageSegments = serializeDesadv(msg as EdifactDesadv)
    } else {
      messageSegments = serializePaymul(msg as EdifactPaymul)
    }
    out.push(...messageSegments)
  }
  // Reconcile UNZ.numberOfMessages.
  out.push(
    serializeUNZ({
      ...interchange.unz,
      numberOfMessages: interchange.messages.length,
    }),
  )
  return out
}

/**
 * Convenience — render the interchange as a single newline-joined string.
 * Production senders typically transmit the segments concatenated with
 * no separator other than the segment terminator `'`; the newline here
 * is for human readability.
 */
export const serializeInterchangeAsString = (
  interchange: EdifactInterchange,
): string => serializeInterchange(interchange).join('\n')
