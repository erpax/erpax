/**
 * camt.053 Import Service — parses an inbound ISO 20022 BankToCustomer
 * Statement XML into the canonical `Camt053Statement` shape.
 *
 * Implementation note: this parser uses a tag-extraction regex approach
 * tuned to the camt.053 element vocabulary. It is intentionally
 * dependency-free (no third-party XML lib in package.json yet) and
 * adequate for the well-formed XML banks emit. For untrusted input,
 * pair with a streaming XML validator in front (or swap to
 * `fast-xml-parser` once a consumer needs schema validation).
 *
 * Supports the camt.053.001.02 → .08 element shape — the major
 * differences across versions are in optional sub-elements, not the
 * core hierarchy this parser targets (Stmt → Acct, Bal, Ntry → NtryDtls
 * → TxDtls).
 *
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO-19011:2018 audit-trail
 * @see src/standards/iso-20022/types.ts Camt053Statement
 */

import type {
  Camt053Statement,
  Camt053Transaction,
  BookingStatus,
  CreditDebitIndicator,
  AccountIdentification,
  PartyIdentification,
  RemittanceInformation,
  BankTransactionCode,
} from '@/standards/iso-20022'

// ─── Tag extraction primitives ────────────────────────────────────────

/**
 * Extract the FIRST text content of `<tag>...</tag>` (no attribute
 * matching, no nested same-name handling — adequate for the camt.053
 * value-element shape). Returns undefined when the tag isn't found.
 */
const extract = (xml: string, tag: string): string | undefined => {
  const match = xml.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`),
  )
  return match ? match[1].trim() : undefined
}

/**
 * Extract attribute value: `<TagName attr="value">...</TagName>`.
 */
const extractAttr = (
  xml: string,
  tag: string,
  attr: string,
): string | undefined => {
  const match = xml.match(
    new RegExp(`<${tag}\\s[^>]*${attr}="([^"]*)"[^>]*>`),
  )
  return match ? match[1] : undefined
}

/**
 * Extract all top-level occurrences of `<tag>...</tag>` from `xml`.
 * Greedy-aware via balanced tag counting (handles nested `<Ntry>`
 * inside `<Stmt>` correctly).
 *
 * `findOpen` ensures we don't conflate prefix-overlapping tags like
 * `<Ntry>` and `<NtryDtls>` — a plain `indexOf('<Ntry')` would match
 * both, so the depth counter would over-count nested entries and the
 * parser would walk off the end of the document with `depth > 0`, yielding
 * zero transactions. The qualifier checks the character right after the
 * tag name and only accepts `>`, whitespace, or `/`.
 */
const extractAll = (xml: string, tag: string): string[] => {
  const out: string[] = []
  const open = `<${tag}`
  const close = `</${tag}>`
  const isTagBoundary = (ch: string | undefined): boolean =>
    ch === '>' || ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r' || ch === '/'
  const findOpen = (from: number): number => {
    let i = from
    while (i < xml.length) {
      const idx = xml.indexOf(open, i)
      if (idx === -1) return -1
      if (isTagBoundary(xml[idx + open.length])) return idx
      i = idx + open.length
    }
    return -1
  }

  let pos = 0
  while (pos < xml.length) {
    const start = findOpen(pos)
    if (start === -1) break
    // Find the end of the opening tag.
    const tagEnd = xml.indexOf('>', start)
    if (tagEnd === -1) break
    // Self-closing case: `<tag .../>`.
    if (xml[tagEnd - 1] === '/') {
      pos = tagEnd + 1
      continue
    }
    // Walk forward counting balanced open/close.
    let depth = 1
    let cursor = tagEnd + 1
    while (depth > 0 && cursor < xml.length) {
      const nextOpen = findOpen(cursor)
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

// ─── Sub-element parsers ──────────────────────────────────────────────

const parseAccount = (xml: string | undefined): AccountIdentification => {
  if (!xml) return { iban: undefined }
  const iban = extract(xml, 'IBAN')
  const otherId = iban ? undefined : extract(xml, 'Id')
  const ccy = extract(xml, 'Ccy')
  return { iban, otherId, currency: ccy }
}

const parseParty = (xml: string | undefined): PartyIdentification | undefined => {
  if (!xml) return undefined
  const name = extract(xml, 'Nm')
  const bic = extract(xml, 'BICFI') ?? extract(xml, 'BIC')
  const lei = extract(xml, 'LEI')
  if (!name && !bic && !lei) return undefined
  return { name, bic, lei }
}

const parseBankTransactionCode = (
  xml: string | undefined,
): BankTransactionCode | undefined => {
  if (!xml) return undefined
  const domain = extract(xml, 'Cd')
  const familyXml = extract(xml, 'Fmly')
  const family = familyXml ? extract(familyXml, 'Cd') : undefined
  const subFamily = familyXml ? extract(familyXml, 'SubFmlyCd') : undefined
  if (!domain || !family || !subFamily) return undefined
  return { domain, family, subFamily }
}

const parseRemittance = (xml: string | undefined): RemittanceInformation | undefined => {
  if (!xml) return undefined
  const ustrd = extract(xml, 'Ustrd')
  const strdXml = extract(xml, 'Strd')
  let creditorReference: { reference: string; typeCode?: string } | undefined
  let referredDocumentNumbers: string[] | undefined
  if (strdXml) {
    const cdtrRefXml = extract(strdXml, 'CdtrRefInf')
    if (cdtrRefXml) {
      const ref = extract(cdtrRefXml, 'Ref')
      const typeCode = extract(cdtrRefXml, 'Cd')
      if (ref) creditorReference = { reference: ref, typeCode }
    }
    const docInfXml = extractAll(strdXml, 'RfrdDocInf')
    if (docInfXml.length > 0) {
      referredDocumentNumbers = docInfXml
        .map((d) => extract(d, 'Nb'))
        .filter((s): s is string => Boolean(s))
    }
  }
  if (!ustrd && !creditorReference && !referredDocumentNumbers) return undefined
  return {
    unstructured: ustrd,
    structured:
      creditorReference || referredDocumentNumbers
        ? { creditorReference, referredDocumentNumbers }
        : undefined,
  }
}

const parseTransaction = (entryXml: string): Camt053Transaction | null => {
  const acctSvcrRef = extract(entryXml, 'AcctSvcrRef')
  const bookgDt = extract(entryXml, 'BookgDt')
  const valDt = extract(entryXml, 'ValDt')
  const bookingDate = bookgDt ? new Date(extract(bookgDt, 'Dt') ?? bookgDt) : new Date()
  const valueDate = valDt ? new Date(extract(valDt, 'Dt') ?? valDt) : undefined

  const amtRaw = extract(entryXml, 'Amt')
  const amount = amtRaw
    ? Math.round(parseFloat(amtRaw.replace(/<[^>]+>/g, '').trim()) * 100)
    : 0
  const currency = extractAttr(entryXml, 'Amt', 'Ccy') ?? 'EUR'
  const cdtDbtInd = extract(entryXml, 'CdtDbtInd') as CreditDebitIndicator | undefined

  const status = extract(entryXml, 'Sts') as BookingStatus | undefined
  const bankTxCdXml = extract(entryXml, 'BkTxCd')
  const bankTransactionCode = parseBankTransactionCode(bankTxCdXml)

  // NtryDtls / TxDtls — counterparty, end-to-end id, remittance live here.
  const txDtlsXml = extract(entryXml, 'TxDtls')
  const endToEndId = txDtlsXml
    ? extract(extract(txDtlsXml, 'Refs') ?? '', 'EndToEndId')
    : undefined
  const cdtrXml = txDtlsXml
    ? extract(extract(txDtlsXml, 'RltdPties') ?? '', 'Cdtr')
    : undefined
  const dbtrXml = txDtlsXml
    ? extract(extract(txDtlsXml, 'RltdPties') ?? '', 'Dbtr')
    : undefined
  // For a credit entry the counterparty is the debtor; for a debit it's
  // the creditor. Either field may be present — pick whichever.
  const counterparty = parseParty(cdtrXml) ?? parseParty(dbtrXml)
  const counterpartyAcctXml = txDtlsXml
    ? extract(extract(txDtlsXml, 'RltdPties') ?? '', 'CdtrAcct') ??
      extract(extract(txDtlsXml, 'RltdPties') ?? '', 'DbtrAcct')
    : undefined
  const counterpartyAccount = counterpartyAcctXml
    ? parseAccount(counterpartyAcctXml)
    : undefined
  const remittanceXml = txDtlsXml ? extract(txDtlsXml, 'RmtInf') : undefined
  const remittanceInformation = parseRemittance(remittanceXml)

  return {
    accountServicerReference: acctSvcrRef,
    endToEndId,
    bookingDate,
    valueDate,
    amount,
    currency,
    creditDebitIndicator: cdtDbtInd ?? 'CRDT',
    status: status ?? 'BOOK',
    bankTransactionCode,
    counterparty,
    counterpartyAccount,
    remittanceInformation,
  }
}

// ─── Top-level parser ─────────────────────────────────────────────────

/**
 * Parse a single camt.053 statement XML document into the canonical
 * `Camt053Statement` type.
 *
 * For multi-statement camt.053 files (one `<BkToCstmrStmt>` containing
 * multiple `<Stmt>` blocks), the caller can `extractAll(xml, 'Stmt')`
 * and pass each block to `parseStatement(stmtXml)`.
 *
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 */
export const parseCamt053 = (xml: string): Camt053Statement => {
  // Locate the Stmt block (single-statement file). For multi-stmt
  // files, callers should call parseStatement on each Stmt.
  const stmtBlock = extract(xml, 'Stmt') ?? xml
  return parseStatement(stmtBlock)
}

const parseStatement = (stmt: string): Camt053Statement => {
  const id = extract(stmt, 'Id') ?? ''
  const createdAt = new Date(extract(stmt, 'CreDtTm') ?? new Date().toISOString())

  const acctXml = extract(stmt, 'Acct')
  const account = parseAccount(acctXml)
  const ownerXml = acctXml ? extract(acctXml, 'Ownr') : undefined
  const owner = parseParty(ownerXml)

  const frToDt = extract(stmt, 'FrToDt')
  const fromDateTime = new Date(
    (frToDt ? extract(frToDt, 'FrDtTm') : undefined) ??
      new Date().toISOString(),
  )
  const toDateTime = new Date(
    (frToDt ? extract(frToDt, 'ToDtTm') : undefined) ??
      new Date().toISOString(),
  )

  // Balances — pull the OPBD (opening booked) and CLBD (closing booked)
  // pair. Each <Bal> has a <Tp><CdOrPrtry><Cd>...</Cd></CdOrPrtry></Tp>.
  let openingBalance = 0
  let closingBalance = 0
  let currency = account.currency ?? 'EUR'
  for (const balXml of extractAll(stmt, 'Bal')) {
    const tpCd = extract(extract(extract(balXml, 'Tp') ?? '', 'CdOrPrtry') ?? '', 'Cd')
    const amt = extract(balXml, 'Amt')
    if (!amt) continue
    const value = Math.round(
      parseFloat(amt.replace(/<[^>]+>/g, '').trim()) * 100,
    )
    const ccy = extractAttr(balXml, 'Amt', 'Ccy') ?? currency
    currency = ccy
    if (tpCd === 'OPBD') openingBalance = value
    if (tpCd === 'CLBD') closingBalance = value
  }

  const transactions = extractAll(stmt, 'Ntry')
    .map(parseTransaction)
    .filter((t): t is Camt053Transaction => t !== null)

  return {
    id,
    createdAt,
    account,
    owner,
    fromDateTime,
    toDateTime,
    openingBalance,
    closingBalance,
    currency,
    transactions,
  }
}

/**
 * Multi-statement variant — returns one `Camt053Statement` per `<Stmt>`
 * block found in the XML. Banks that batch a month of statements
 * into one file rely on this.
 */
export const parseCamt053Multi = (xml: string): Camt053Statement[] =>
  extractAll(xml, 'Stmt').map(parseStatement)
