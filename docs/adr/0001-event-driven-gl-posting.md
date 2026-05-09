# ADR 0001 — Event-driven GL posting

**Status**: Accepted
**Date**: 2026-05-09
**Authors**: erpax accounting maintainers
**Supersedes**: Slice FFF "direct-import the singleton" pattern

## Context

The accounting plugin needs to turn business-domain writes (invoice activation, bill receipt, payment recording, inventory movement, depreciation post) into balanced GL entries. Three patterns have been tried:

1. **Service-registry indirection** (`req.payload.services?.X`). Failed: services were never registered, hooks silently no-op'd. Audit-flagged across 8 hooks.
2. **Direct singleton invocation** (`glPostingService.postInvoice(tenant, data)`). Failed: `GLPostingService` is event-subscriber-shaped, exposes `postInvoiceActivated(event)` not `postInvoice(tenant, data)`. The phantom-method calls landed inside `try { ... } catch { logger.error() }` blocks that swallowed the resulting `TypeError` — the bug shipped to production undetected. Found in `invoice.hook.ts`, `bill.hook.ts`, `payment.hook.ts`, `item.hook.ts`.
3. **Event-driven** (`eventEmitter.emit(InvoiceActivatedEvent)`). The pattern this ADR codifies.

## Decision

Collection hooks are emitters; `glPostingService` and other side-effect services are subscribers. Specifically:

- A collection's `afterChange` hook detects the meaningful state transition (status crosses into the active set, status flips to 'posted', etc.) and emits a canonical domain event via `eventEmitter.emit(...)`.
- Each event type lives in `src/types/events.ts` and is included in the `AllDomainEvents` union.
- `GLPostingService.subscribeToEvents()` registers handlers per event type at construction. The handler builds the JE and calls `journalEntryService.createEntry(...) → postEntry(...)`.
- Other subscribers (audit logger, analytics, GDPR data-subject log) can attach to the same event without changing the emitter or the GL handler.

The `GLPostingService` class is `export class` — so consumers get a tight type and calling a non-existent method like `postInvoice` fails at compile time instead of throwing at runtime under a swallowing try/catch.

## Consequences

**Positive**:

- One write path → one event → many subscribers. The audit trail, GL post, analytics emission, and outbound webhook can all hook the same event without touching the collection hook.
- Hooks become trivially testable in isolation: assert "writing X with status Y emits event Z" — no DB or service mocking needed beyond a fresh `EventEmitterService`.
- Type discipline: phantom-method calls fail compile-time; event payloads are exhaustively typed and the `AllDomainEvents` union prevents drift.
- Aligns with the architecture comments throughout `gl-posting.service.ts` ("event-driven double-entry posting").

**Negative**:

- Two-step indirection (hook → event → handler) is harder to trace than a direct call. Mitigated by the fact that `eventEmitter.emit(event)` calls all subscribers synchronously in the same tick, and event types are discoverable via the `AllDomainEvents` union.
- Adds a single shared bus that must be reset between tests. Mitigated by `EventEmitterService.clearAllData()` and the existing `initializeGLPosting(emitter)` test seam.

## State transition rules

Per-collection state-transition logic for emitting:

| Collection | Status transition | Event emitted | GL handler |
|---|---|---|---|
| `invoices` | → issued / open / active / past_due / grace_period (from anything else) | `invoice:activated` | `postInvoiceActivated` |
| `invoices` | → paid (from active set) | `invoice:completed` | `postInvoiceCompleted` |
| `invoices` | → reversed | `invoice:reversed` | `postInvoiceReversed` |
| `bills` | → issued / open / approved / active / past_due | `bill:activated` | `postBillActivated` |
| `bills` | → paid | `bill:paid` | `postBillPaid` |
| `bills` | → reversed | `bill:reversed` | `postBillReversed` |
| `payments` | create with direction = received | `payment:received` | `postPaymentReceived` |
| `payments` | create with direction = sent | `payment:sent` | `postPaymentSent` |
| `depreciation-schedules` | status → posted | `depreciation:posted` | `postDepreciation` |

`items` (inventory master) hook is **deprecated** — inventory accounting already fires from invoice/bill activation. Stand-alone inventory adjustments (writedowns, count variances, transfers) need their own `inventory:adjusted` event in a follow-up slice and a corresponding handler.

## How to add a new event-driven posting

1. Add the event interface to `src/types/events.ts` and include it in the `AllDomainEvents` union.
2. Add the handler method to `GLPostingService` (`async postX(event: XEvent)`) and a corresponding `subscribeToEvents()` registration.
3. In the collection's `afterChange` hook, detect the state transition and emit the event via `eventEmitter.emit(...)`.
4. Add a unit test that asserts the right event fires on the right transition (use `initializeGLPosting(privateEmitter)` to isolate from the global bus).

## References

- `src/services/event-emitter.service.ts`
- `src/services/gl-posting.service.ts`
- `src/services/journal-entry.service.ts`
- `src/types/events.ts`
- Audit memory `erpax_audit_findings_2026-05-09.md` — Slice FFF DOA pattern.

@audit ISO-19011:2018 audit-trail event-driven-posting
@compliance SOX §404 internal-controls evidence-preservation
@accounting IFRS IAS-1 presentation-of-financial-statements
@accounting OECD SAF-T §3 transactions
