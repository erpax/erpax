/**
 * Google Workspace fusion transforms — one pure transform per service.
 *
 * The [[registry]] says WHICH erpax collection each Workspace service fills; the
 * [[fusion]] bridge content-addresses any resource into the mesh. This module is
 * the SHAPE layer between them: it maps the minimal Google API resource fields to
 * the real target-collection fields (the names read from each collection config),
 * then hands the result to `fuseWorkspaceResource` so the record is tagged with its
 * `source` + `externalRef` and given a content-uuid (re-fetch dedups, two instances
 * converge — the [[merge]] guarantee).
 *
 * Each transform is a PURE function (no IO): a typed Google resource + `tenantId`
 * in, a `FusedResource` out. Only the fields the target collection actually defines
 * are mapped — records are valid by construction, not invented. The native id that
 * anchors identity is the [[registry]] `nativeIdField` for that service (Gmail `id`,
 * Calendar `iCalUID`, Drive `id`, People `resourceName`, Sheets `spreadsheetId`).
 *
 * Sheets is the [[accounting]] fusion: a transaction row becomes a BALANCED
 * double-entry via `toDoubleEntry` AND fuses as a `journal-entries` resource, so the
 * spreadsheet line is both posted (Σdebit = Σcredit) and content-addressed.
 *
 * @standard RFC 9562 §5.8 content-addressed uuidv8 (the fusion identity)
 * @standard IFRS/IAS double-entry (Σdebit = Σcredit) — the sheets→journal fusion
 * @see ./registry.ts — the `fills` gap-map (service → target collection)
 * @see ./fusion.ts — fuseWorkspaceResource (the content-uuid bridge)
 * @see src/services/entry/index.ts — toDoubleEntry (the balanced debit/credit pair)
 */

import { fuseWorkspaceResource, type FusedResource } from './fusion'
import { toDoubleEntry, type Entry } from '@/entry'

// ── Minimal typed shapes of the Google API resources (only the fields used) ──

/** A Gmail message (Users.messages.get) — the subset that maps to `messages`. */
export interface GmailMessage {
  /** RFC822 message id — the Gmail-native identity (registry nativeIdField). */
  readonly id: string
  /** The `Subject` header value. */
  readonly subject?: string
  /** Short plain-text body preview (Gmail `snippet`), or the decoded body. */
  readonly snippet?: string
  /** The `From` header value (sender address). */
  readonly from?: string
  /** The thread this message belongs to (Gmail `threadId`). */
  readonly threadId?: string
}

/** A Calendar event (Events.get) — the subset that maps to `bookings`. */
export interface CalendarEvent {
  /** Cross-system event id (the registry nativeIdField for calendar). */
  readonly iCalUID: string
  /** Event title. */
  readonly summary?: string
  /** Start window — RFC 3339 date-time (`dateTime`) or all-day (`date`). */
  readonly start?: { readonly dateTime?: string; readonly date?: string }
  /** End window — RFC 3339 date-time (`dateTime`) or all-day (`date`). */
  readonly end?: { readonly dateTime?: string; readonly date?: string }
  /** Google event status: `confirmed` | `tentative` | `cancelled`. */
  readonly status?: string
  /** Attendees (first attendee seeds the booking guest display fields). */
  readonly attendees?: ReadonlyArray<{ readonly email?: string; readonly displayName?: string }>
}

/** A Drive file (Files.get) — the subset that maps to `media`. */
export interface DriveFile {
  /** Drive file id — the Drive-native identity (registry nativeIdField). */
  readonly id: string
  /** File name. */
  readonly name?: string
  /** RFC 6838 media type. */
  readonly mimeType?: string
  /** Drive-computed MD5 of the bytes (content fingerprint for dedup). */
  readonly md5Checksum?: string
}

/** A People contact / profile (People.get) — the subset that maps to `users`. */
export interface Person {
  /** `people/<id>` — the People-native identity (registry nativeIdField). */
  readonly resourceName: string
  /** Structured names; the primary's `displayName` becomes the user `name`. */
  readonly names?: ReadonlyArray<{ readonly displayName?: string }>
  /** Email addresses; the primary's `value` becomes the user `email`. */
  readonly emailAddresses?: ReadonlyArray<{ readonly value?: string }>
}

/** One accounting row of a transaction sheet — the subset that maps to `journal-entries`. */
export interface SheetTxnRow {
  /** The spreadsheet id — the Sheets-native identity (registry nativeIdField). */
  readonly spreadsheetId: string
  /** 0-based row index within the sheet — disambiguates rows of one spreadsheet. */
  readonly rowIndex: number
  /** GL account debited (takes value). */
  readonly debitAccount: string
  /** GL account credited (gives value). */
  readonly creditAccount: string
  /** Transaction amount (one currency unit; sign-agnostic — `toDoubleEntry` abs()s it). */
  readonly amount: number
  /** ISO 4217 currency code. */
  readonly currency: string
  /** Free-text line memo → the journal-entry description. */
  readonly memo?: string
}

/**
 * Gmail message → `messages` record.
 *
 * Field map (Gmail → Messages): `subject`→`subject`, `snippet`→`body`,
 * `from`→`fromAddress` (denormalised sender, no relation resolved here),
 * `threadId`→`threadId` (the Gmail thread key the caller resolves to
 * `parentMessage`). `status` seeds `unread` (a freshly-ingested mail). Subject/body
 * are the collection's two required fields, so a record is always valid.
 */
export function gmailToMessage(msg: GmailMessage, tenantId: string): FusedResource {
  return fuseWorkspaceResource(
    {
      service: 'gmail',
      nativeId: msg.id,
      content: {
        subject: msg.subject ?? '(no subject)',
        body: msg.snippet ?? '',
        fromAddress: msg.from ?? '',
        threadId: msg.threadId ?? '',
        status: 'unread',
      },
    },
    tenantId,
  )
}

/**
 * Calendar event → `bookings` record.
 *
 * Field map (Calendar → Bookings): `summary`→`reference` (the booking's
 * useAsTitle display) and `guestName`, `start.dateTime|date`→`startAt`,
 * `end.dateTime|date`→`endAt` (the two required date windows), Google
 * `status`→Bookings `status` (`confirmed`→`confirmed`, `tentative`→`held`,
 * `cancelled`→`cancelled`, else `requested`), first attendee →
 * `guestName`/`guestEmail`. `guestType` defaults to `customer` (an external party).
 */
export function calendarToBooking(event: CalendarEvent, tenantId: string): FusedResource {
  const guest = event.attendees?.[0]
  return fuseWorkspaceResource(
    {
      service: 'calendar',
      nativeId: event.iCalUID,
      content: {
        reference: event.summary ?? event.iCalUID,
        startAt: event.start?.dateTime ?? event.start?.date ?? '',
        endAt: event.end?.dateTime ?? event.end?.date ?? '',
        status: calendarStatusToBooking(event.status),
        guestType: 'customer',
        guestName: guest?.displayName ?? event.summary ?? '',
        guestEmail: guest?.email ?? '',
      },
    },
    tenantId,
  )
}

/** Map a Google Calendar event status to a Bookings status value. */
function calendarStatusToBooking(status: string | undefined): string {
  switch (status) {
    case 'confirmed':
      return 'confirmed'
    case 'tentative':
      return 'held'
    case 'cancelled':
      return 'cancelled'
    default:
      return 'requested'
  }
}

/**
 * Drive file → `media` record.
 *
 * Field map (Drive → Media): `name`→`alt` (the media collection's text
 * description field) and `filename` (the upload identity), `mimeType`→`mimeType`
 * (the upload's RFC 6838 type), `md5Checksum`→`md5Checksum` (the bytes fingerprint —
 * lets an identical R2 upload dedup against this Drive file).
 */
export function driveToMedia(file: DriveFile, tenantId: string): FusedResource {
  return fuseWorkspaceResource(
    {
      service: 'drive',
      nativeId: file.id,
      content: {
        alt: file.name ?? '',
        filename: file.name ?? '',
        mimeType: file.mimeType ?? 'application/octet-stream',
        md5Checksum: file.md5Checksum ?? '',
      },
    },
    tenantId,
  )
}

/**
 * People contact → `users` record.
 *
 * Field map (People → Users): primary `names[].displayName`→`name` (the user's
 * useAsTitle), primary `emailAddresses[].value`→`email` (the login identity). One
 * typeless actor — what the person IS (employee/agent/customer) emerges from
 * relations, never a `kind` field, so only `name` + `email` are seeded.
 */
export function peopleToUser(person: Person, tenantId: string): FusedResource {
  return fuseWorkspaceResource(
    {
      service: 'people',
      nativeId: person.resourceName,
      content: {
        name: person.names?.[0]?.displayName ?? '',
        email: person.emailAddresses?.[0]?.value ?? '',
      },
    },
    tenantId,
  )
}

/** A sheet row fused: the balanced double-entry AND the content-addressed record. */
export interface SheetRowFusion {
  /** The balanced double-entry (Σdebit = Σcredit) built from the row. */
  readonly entry: Entry
  /** The `journal-entries` record, content-addressed (re-fetch dedups). */
  readonly fused: FusedResource
}

/**
 * Sheet transaction row → balanced double-entry + `journal-entries` record.
 *
 * The [[accounting]] fusion: the row is run through `toDoubleEntry` (debitAccount
 * takes, creditAccount gives) to produce a BALANCED pair, then the journal-entries
 * record is built from that pair and fused (content-addressed). Field map (Sheet →
 * JournalEntries): `spreadsheetId`+`rowIndex`→`entryNumber` (the unique sequential
 * id) and `sourceId`, `memo`→`description` (required), the two entry lines →
 * `lines[]` (`accountable`→`accountId`, `debit`/`credit`, `currency`), the line
 * sums → `debitTotal`/`creditTotal`/`isBalanced`, `sourceType`→`manual`. The
 * spreadsheetId+rowIndex anchors identity, so the same row re-imported dedups.
 */
export function sheetRowToEntry(row: SheetTxnRow, tenantId: string): SheetRowFusion {
  const entry = toDoubleEntry({ payer: row.creditAccount, payee: row.debitAccount, amount: row.amount })
  const lines = entry.lines.map((l, i) => ({
    lineNumber: i + 1,
    accountId: l.accountable,
    debit: l.debit,
    credit: l.credit,
    currency: row.currency,
  }))
  const debitTotal = entry.lines.reduce((s, l) => s + l.debit, 0)
  const creditTotal = entry.lines.reduce((s, l) => s + l.credit, 0)
  const nativeId = `${row.spreadsheetId}#${row.rowIndex}`
  const fused = fuseWorkspaceResource(
    {
      service: 'sheets',
      nativeId,
      content: {
        entryNumber: nativeId,
        description: row.memo ?? `Imported row ${row.rowIndex}`,
        lines,
        debitTotal,
        creditTotal,
        isBalanced: debitTotal === creditTotal,
        sourceType: 'manual',
        sourceId: nativeId,
        status: 'draft',
      },
    },
    tenantId,
  )
  return { entry, fused }
}
