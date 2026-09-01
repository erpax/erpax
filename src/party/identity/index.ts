/**
 * identity — a party's address is what it IS, never what it is TO YOU.
 *
 * [[rules]]/collapse measured it: `customers` and `vendors` differ by **exactly one field** — `bank`. They
 * share `code · name · country · identity · contact · addresses · tax · commercial · ledger · notes ·
 * metadata`. They are not two tables. **They are one party in two states**, and "customer" / "vendor" is a
 * ROLE the beholder holds — which is [[perspective]]'s law at the entity level: the same invoice row is AR
 * from the seller and AP from the buyer, one content, two views, derived never stored.
 *
 * The fold makes that actionable rather than philosophical. **Same content ⇒ same address** ([[merge]]), so
 * a company recorded as a customer AND as a vendor **collides by construction** — no matching heuristic, no
 * fuzzy name score, no reconciliation job. The duplicate is not *found*; it cannot exist.
 *
 * WHAT IDENTIFIES A PARTY, and why each choice is a decision not a detail:
 *
 *   country + taxId   the LEGAL identity. A tax id is unique only within its jurisdiction — `BG123` and
 *                     `DE123` are different companies, and folding without the country silently merges them.
 *   NOT the name      names change (rebrands, translations, "Ltd" vs "OOD"). An address that moves when a
 *                     company renames is not an identity; it is a label, and every invoice pointing at the
 *                     old fold would orphan.
 *   NOT the role      a customer who becomes a supplier is the SAME legal person. Folding the role in
 *                     creates two addresses for one entity — the exact duplication this exists to make
 *                     impossible.
 *   NOT `bank`        the one field that differs. It is a FACET of the vendor state, not the party.
 *
 * HONEST BOUNDARY — this proves two records are THE SAME LEGAL ENTITY; it does not merge them. A party with
 * no taxId cannot be folded (a sole trader, a cash customer): `partyUuid` REFUSES rather than folding on a
 * name, because a name-fold silently merges two companies that share a name, and a silent merge of parties
 * is worse than a duplicate. And a wrong taxId folds two real companies into one — the fold is exact about
 * its input, never about the truth of it.
 *
 * @standard ISO 3166-1 alpha-2 — the jurisdiction a tax id is unique within
 * @standard RFC 9562 §5.8 — the content-address
 *
 * Composes [[merge]] · [[perspective]] · [[rules]]/collapse · [[law]].
 */
import { canonical } from '@/merge'
import { toUuid } from '@/uuid/matrix'

/** Canonical atom path. */
export const atomPath = 'identity' as const

/** What a party IS — the legal person, in the jurisdiction that issued it. */
export interface PartyIdentity {
  /** ISO 3166-1 alpha-2. A tax id is unique only WITHIN a jurisdiction. */
  readonly country: string
  /** The legal registration (VAT / ЕИК / tax id) — the thing a registry can be asked about. */
  readonly taxId: string
}

/** The roles a party may hold. A role is what it is TO YOU — never part of its address. */
export type PartyRole = 'customer' | 'vendor'

const normalise = (s: string): string => s.trim().toUpperCase().replace(/[\s.-]/g, '')

/**
 * The content-address of a party — the fold over its LEGAL identity.
 *
 * @invariant the same legal entity folds to ONE address, whatever role it is held in
 * @invariant a party with no taxId THROWS — it is not foldable, and a name-fold would merge strangers
 */
export function partyUuid(id: PartyIdentity): string {
  const country = normalise(id.country ?? '')
  const taxId = normalise(id.taxId ?? '')
  if (!country || !taxId) {
    throw new Error(
      'party identity: country + taxId are required to fold a party. A party with no tax registration is ' +
        'not foldable — folding on a name would merge two companies that share one.',
    )
  }
  return toUuid(Buffer.from(canonical({ country, taxId }), 'utf8'))
}

/** Are these the same legal person? Decided by the fold, not by a matching heuristic. */
export function isSameParty(a: PartyIdentity, b: PartyIdentity): boolean {
  return partyUuid(a) === partyUuid(b)
}

/**
 * The roles one party holds across the books — the SUPERPOSITION, measured rather than declared.
 *
 * A party is not typed `customer` or `vendor`; it HOLDS roles, and which one you see is your seat. This
 * collapses records from both collections by their fold: a company in both lists is ONE party in both
 * states, which is precisely the `bank`-only difference [[rules]]/collapse found.
 */
export function rolesOf(
  records: ReadonlyArray<{ readonly identity: PartyIdentity; readonly role: PartyRole }>,
): Map<string, Set<PartyRole>> {
  const out = new Map<string, Set<PartyRole>>()
  for (const r of records) {
    const uuid = partyUuid(r.identity)
    const set = out.get(uuid) ?? new Set<PartyRole>()
    set.add(r.role)
    out.set(uuid, set)
  }
  return out
}

/** @index-cross.foldback child=party/identity parent=party — this cross folds back into its parent. */
