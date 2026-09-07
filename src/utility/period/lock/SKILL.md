---
name: lock
description: "Use when reasoning about lock — is the hook wired into every GL-posting collection: it reads the document's posting date, finds the fiscal period containing it, and throws when that period's status is ."
atomPath: "utility/period/lock"
coordinate: "utility/period/lock · 2/share · 5d7a79c8"
contentUuid: "d6fd28b4-3873-5d0e-bea6-5224c84ba444"
diamondUuid: "def78f86-cc4b-8c73-84ea-4d4ca4f7c717"
uuid: "5d7a79c8-e029-8cd8-8b69-35e4b99d9cdd"
horo: 2
typography:
  partition: utility
  bondDegree: 15
standards:
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IAS-8 accounting-policies-changes-and-errors"
  - "ISO-8601-1:2019 date-time utc-canonical-form"
  - "SOX §404 period-close-integrity"
  - "US-GAAP ASC-250 accounting-changes-and-error-corrections"
bindings: []
signatures:
  computationUuid: "65ef505a-ef58-8559-87c0-f8ba26d97b99"
  stages:
    - stage: path
      stageUuid: "40df3ae8-949b-8a69-b04d-c8c755127558"
    - stage: trinity
      stageUuid: "268d6fc6-a531-88ac-90c2-5f8f61b67c76"
    - stage: boundary
      stageUuid: "5dd4747c-5d58-871c-be34-198f425e3f02"
    - stage: links
      stageUuid: "5c6febb9-d216-8c2a-9d7f-74e80fd8ec55"
    - stage: horo
      stageUuid: "9a672c9a-bfcc-8fa3-9b62-1f26a6d64814"
    - stage: seal
      stageUuid: "776bb3e9-2886-8e7d-85df-fa4f298437a3"
    - stage: uuid
      stageUuid: "43f036eb-ab80-8621-8ebe-6bff6c096a29"
version: 2
---
# utility/period/lock — an unparseable posting date must be refused, never waved through

`validateNotLocked` is the hook wired into every GL-posting collection: it reads the
document's posting date, finds the fiscal period containing it, and throws when that
period's status is `locked`. **SOX §404** is the reader — the auditor's control is that
you cannot post into a closed period.

## The lock has failed open twice, by two different doors

It mirrors Ruby erpax's `tenant.accounting_locked_for_date?(date)`: once a fiscal
period's status is `locked`, no transaction with a posting date inside it may be
created or updated.

| door | what it did |
| --- | --- |
| the wrong tenant field | the query read `host` / `data.host` / `req.user.host` — fields that no longer exist on user, document or `fiscal-periods` after the multi-tenant move. It returned an empty result set on every call, so **no period was ever locked against a posting**. Rewired to `req.user.tenants[0]?.tenant`. |
| the unparseable date | see below — an `Invalid Date` compares `false` against every bound, so the period search matched nothing and the hook returned normally. |

**Both are the same shape**: the query found nothing, and finding nothing was read as
"nothing is locked". A control whose negative answer is indistinguishable between
*"no lock applies"* and *"I could not look"* is not a control.

The failure it carried was a fail-**open**. A date the runtime cannot parse produced an
`Invalid Date`, every `>=`/`<=` comparison against it is `false`, so
`findLockedPeriodForDate` matched **no** period and the hook returned normally. A row
whose date nothing could read posted into a locked period unchecked, and the API
answered `200`.

That is the shape [[rules]]/unraised names: not a wrong answer, an unasked question —
default-ALLOW by omission, on the one control an auditor signs.

```ts
if (Number.isNaN(new Date(postingDate).getTime())) {
  throw new Error(`Period lock cannot evaluate posting date …`)
}
```

The lock now **refuses** rather than allows: a date it cannot evaluate is a date it
cannot clear. Absence of a match is not evidence of an open period.

**Honest boundary.** This proves the hook cannot be bypassed by an unreadable date. It
does not prove the period query is correct for every tenant shape, and it says nothing
about a row written around the hook — the Local API's `overrideAccess` path is
[[rules]]/bypass's surface, not this one's. It closes the door that was standing open.

**Law — [[law]]: a control that cannot evaluate its input refuses it. An unparseable
date matches no period, and matching no period must never read as "no period is
locked".**

## Standards

- **SOX §404** — period-close integrity: a control the auditor certifies.
- **ISO/IEC 25010:2023 §5.4** — security: integrity of a posted record.

Composes: [[rules]]/unraised · [[fiscal]] · [[law]].
