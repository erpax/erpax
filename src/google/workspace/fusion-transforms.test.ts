import { describe, it, expect } from 'vitest'
import { isBalanced, net } from '@/entry'
import {
  gmailToMessage,
  calendarToBooking,
  driveToMedia,
  peopleToUser,
  sheetRowToEntry,
  type GmailMessage,
  type CalendarEvent,
  type DriveFile,
  type Person,
  type SheetTxnRow,
} from '@/google/workspace/fusion-transforms'

const TENANT = 'tenant-uuid-1'
/** RFC 9562 §5.8 — version nibble 8, variant 0b10 (8|9|a|b). */
const UUIDV8 = /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

describe('google-workspace/fusion-transforms — per-service Google→erpax fusion', () => {
  describe('gmailToMessage → messages', () => {
    const msg: GmailMessage = {
      id: '18f2ab9c',
      subject: 'Invoice #42',
      snippet: 'Please find attached.',
      from: 'a@x.com',
      threadId: 't1',
    }

    it('maps Gmail fields to the messages shape, tagged + content-addressed', () => {
      const f = gmailToMessage(msg, TENANT)
      expect(f.target).toBe('messages')
      expect(f.record.source).toBe('google-workspace')
      expect(f.record.externalRef).toBe('gmail:18f2ab9c')
      expect(f.record.subject).toBe('Invoice #42')
      expect(f.record.body).toBe('Please find attached.')
      expect(f.record.threadId).toBe('t1')
      expect(f.uuid).toMatch(UUIDV8)
    })

    it('fuses idempotently — same message ⇒ same uuid (dedup on re-fetch)', () => {
      expect(gmailToMessage(msg, TENANT).uuid).toBe(gmailToMessage({ ...msg }, TENANT).uuid)
    })

    it('fills the two required fields even when the Gmail message is sparse', () => {
      const f = gmailToMessage({ id: 'bare' }, TENANT)
      expect(f.record.subject).toBe('(no subject)')
      expect(f.record.body).toBe('')
    })
  })

  describe('calendarToBooking → bookings', () => {
    const event: CalendarEvent = {
      iCalUID: 'evt-9@google.com',
      summary: 'Room 5 — Smith',
      start: { dateTime: '2026-06-01T09:00:00Z' },
      end: { dateTime: '2026-06-01T11:00:00Z' },
      status: 'confirmed',
      attendees: [{ email: 'smith@x.com', displayName: 'Smith' }],
    }

    it('maps Calendar fields to the bookings shape, tagged + content-addressed', () => {
      const f = calendarToBooking(event, TENANT)
      expect(f.target).toBe('bookings')
      expect(f.record.externalRef).toBe('calendar:evt-9@google.com')
      expect(f.record.startAt).toBe('2026-06-01T09:00:00Z')
      expect(f.record.endAt).toBe('2026-06-01T11:00:00Z')
      expect(f.record.status).toBe('confirmed')
      expect(f.record.reference).toBe('Room 5 — Smith')
      expect(f.record.guestName).toBe('Smith')
      expect(f.record.guestEmail).toBe('smith@x.com')
      expect(f.uuid).toMatch(UUIDV8)
    })

    it('maps Google event status → Bookings status, and all-day date windows', () => {
      const tentative = calendarToBooking({ ...event, status: 'tentative' }, TENANT)
      expect(tentative.record.status).toBe('held')
      const allDay = calendarToBooking(
        { iCalUID: 'd1', start: { date: '2026-06-01' }, end: { date: '2026-06-02' } },
        TENANT,
      )
      expect(allDay.record.startAt).toBe('2026-06-01')
      expect(allDay.record.status).toBe('requested') // no status ⇒ requested
    })

    it('fuses idempotently', () => {
      expect(calendarToBooking(event, TENANT).uuid).toBe(calendarToBooking({ ...event }, TENANT).uuid)
    })
  })

  describe('driveToMedia → media', () => {
    const file: DriveFile = {
      id: 'fileXYZ',
      name: 'contract.pdf',
      mimeType: 'application/pdf',
      md5Checksum: 'd41d8cd98f00b204e9800998ecf8427e',
    }

    it('maps Drive fields to the media shape, tagged + content-addressed', () => {
      const f = driveToMedia(file, TENANT)
      expect(f.target).toBe('media')
      expect(f.record.externalRef).toBe('drive:fileXYZ')
      expect(f.record.alt).toBe('contract.pdf')
      expect(f.record.filename).toBe('contract.pdf')
      expect(f.record.mimeType).toBe('application/pdf')
      expect(f.record.md5Checksum).toBe('d41d8cd98f00b204e9800998ecf8427e')
      expect(f.uuid).toMatch(UUIDV8)
    })

    it('fuses idempotently', () => {
      expect(driveToMedia(file, TENANT).uuid).toBe(driveToMedia({ ...file }, TENANT).uuid)
    })
  })

  describe('peopleToUser → users', () => {
    const person: Person = {
      resourceName: 'people/c123',
      names: [{ displayName: 'Ada Lovelace' }],
      emailAddresses: [{ value: 'ada@x.com' }],
    }

    it('maps People fields to the users shape, tagged + content-addressed', () => {
      const f = peopleToUser(person, TENANT)
      expect(f.target).toBe('users')
      expect(f.record.externalRef).toBe('people:people/c123')
      expect(f.record.name).toBe('Ada Lovelace')
      expect(f.record.email).toBe('ada@x.com')
      expect(f.uuid).toMatch(UUIDV8)
    })

    it('fuses idempotently', () => {
      expect(peopleToUser(person, TENANT).uuid).toBe(peopleToUser({ ...person }, TENANT).uuid)
    })
  })

  describe('sheetRowToEntry → journal-entries (the accounting fusion)', () => {
    const row: SheetTxnRow = {
      spreadsheetId: 'sheet-1',
      rowIndex: 7,
      debitAccount: '1010-cash',
      creditAccount: '4000-revenue',
      amount: 250,
      currency: 'EUR',
      memo: 'Cash sale',
    }

    it('maps Sheet fields to the journal-entries shape, tagged + content-addressed', () => {
      const { fused } = sheetRowToEntry(row, TENANT)
      expect(fused.target).toBe('journal-entries')
      expect(fused.record.externalRef).toBe('sheets:sheet-1#7')
      expect(fused.record.entryNumber).toBe('sheet-1#7')
      expect(fused.record.description).toBe('Cash sale')
      expect(fused.record.sourceType).toBe('manual')
      expect(fused.uuid).toMatch(UUIDV8)
    })

    it('builds a BALANCED double-entry: Σdebit = Σcredit', () => {
      const { entry } = sheetRowToEntry(row, TENANT)
      expect(isBalanced(entry)).toBe(true)
      expect(net(entry)).toBe(0)
      const debitTotal = entry.lines.reduce((s, l) => s + l.debit, 0)
      const creditTotal = entry.lines.reduce((s, l) => s + l.credit, 0)
      expect(debitTotal).toBe(250)
      expect(creditTotal).toBe(250)
      // debitAccount takes (debit), creditAccount gives (credit)
      expect(entry.lines.find((l) => l.accountable === '1010-cash')?.debit).toBe(250)
      expect(entry.lines.find((l) => l.accountable === '4000-revenue')?.credit).toBe(250)
    })

    it('mirrors the balance onto the fused record (debitTotal = creditTotal, isBalanced)', () => {
      const { fused } = sheetRowToEntry(row, TENANT)
      expect(fused.record.debitTotal).toBe(250)
      expect(fused.record.creditTotal).toBe(250)
      expect(fused.record.isBalanced).toBe(true)
      const lines = fused.record.lines as ReadonlyArray<{ accountId: string; currency: string }>
      expect(lines).toHaveLength(2)
      expect(lines[0]?.currency).toBe('EUR')
    })

    it('fuses idempotently — same row ⇒ same uuid', () => {
      expect(sheetRowToEntry(row, TENANT).fused.uuid).toBe(sheetRowToEntry({ ...row }, TENANT).fused.uuid)
    })
  })
})
