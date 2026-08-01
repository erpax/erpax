---
name: posting
description: "Use when a GL posting needs its fiscal period — the beforeValidate hook that READS the period from fiscal-calendars, enforces the period lock (open · locked · archived, per SOX §404), denormalises the calendar row onto the posting, and chains its audit leaf. Read this before wiring it: until now it invented the period from the calendar year and hardcoded quarters, and enforced no lock at all."
atomPath: "validate/fiscal/period/posting"
coordinate: "validate/fiscal/period/posting · 2/share · bcb20d67"
contentUuid: "123a2b02-49bb-58bb-88f4-94d62d5314cf"
diamondUuid: "8fc0867e-400d-8568-94e2-25f495cfd080"
uuid: "bcb20d67-295f-8092-9b7d-6883b10553f9"
horo: 2
typography:
  partition: validate
  bondDegree: 42
standards:
  - "GDPR:2016/679 (access control, audit trail)"
  - "IAS-34"
  - "IAS-34:2023 (period context for interim reporting)"
  - "Law 60 (chain leaf, immutable audit)"
  - SOX
  - "SOX:2002 (period-lock enforcement, access control)"
bindings: []
signatures:
  computationUuid: "95f64d89-ec29-8686-a0e2-690280a1fae8"
  stages:
    - stage: path
      stageUuid: "c686c79d-f169-8ca2-b02c-9dcef726485a"
    - stage: trinity
      stageUuid: "50366294-1595-8a83-a780-5976182b4a2f"
    - stage: boundary
      stageUuid: "c203ba28-299e-83a2-8d82-bbc9114656a5"
    - stage: links
      stageUuid: "4286890a-ccd1-8f30-bb6e-bffab850002c"
    - stage: horo
      stageUuid: "62b12aca-f694-8b97-9ef1-513a9ed9169c"
    - stage: seal
      stageUuid: "b955785b-d445-8654-9a55-bdd462cfcdaf"
    - stage: uuid
      stageUuid: "bf3f876d-d775-8751-9704-3bd33c83f7dd"
version: 2
---
# posting — the period is READ, never invented

[[rules]]/refutable named this hook: **5 `@invariant` claims, no proof**. Two of them were false, and both were false in the same way — the code that would have made them true sat **commented out**, beside something that only looked like it.

## The period was a guess

```
@invariant Fiscal period deterministically resolved from FiscalCalendars
```

The `fiscal-calendars` query was a comment. What ran was labelled *"Placeholder resolution"*:

```ts
data.fiscalYear   = new Date(postingDate).getUTCFullYear()   // the CALENDAR year
data.fiscalPeriod = Math.ceil((month + 1) / 3)               // hardcoded QUARTERLY
```

A tenant's fiscal year may start in any month, and its `periodType` may be monthly, iso-week, retail-445 or custom. So every posting got the calendar year and a calendar quarter — then that guess was **denormalised onto the posting**, into the very fields the banner says exist so reports can skip the join. **A wrong fiscal period is not an approximation: it files an entry into the wrong financial statements.**

## The SOX control was an empty try

The banner claimed SOX:2002 — *period-lock enforcement, access control*. (It is not quoted in sigil form here: this file is scanned for banners, so restating one would file this SKILL as an implementation of SOX. It caught exactly that on the first draft.)

The `period-locks` query was also a comment — inside an **empty `try`**, under a `catch` re-throwing `archived` and `locked` errors that nothing could raise. A reviewer sees *"Validate against PeriodLocks"* and a try/catch and reads enforcement. **No period was ever locked against a posting**, which is the control SOX §404 exists for.

## Why it never bit — and why that is not comfort

The hook is exported, re-exported from the `@/hooks` barrel, and attached to **no collection** (the barrel's only importer is its own test — the exact case [[rules]]/unfolded names: an export that exists to be tested rather than used). So it corrupted nothing. **It was a trap**: wire it up and every posting silently acquires a fabricated period, in a system whose reports are built to trust those fields.

## Nothing needed inventing

Both collections already existed with exactly the fields the comments named — `fiscal-calendars` (fiscalYear · fiscalPeriod · periodLabel · regulatoryCode · quarterNumber · monthNumber · chainLeafUuid) and `period-locks` (lockStatus · allowReversals · allowPriorPeriodAdjustments). The queries were **written, in the comments, and never uncommented**. The work was to delete the placeholder and mean what the banner said.

- **Read, never derive.** Re-resolving the period here would be a second implementation of fiscal/period/resolver, free to disagree with the calendar every report reads — the duplication [[rules]]/invisible predicts and [[merge]]/chainLeaf paid for eight times over.
- **Refuse, never invent.** No calendar row ⇒ **throw**. An entry that cannot say which statements it belongs to is not an entry with an approximate period. Failing is loud and fixable; guessing is silent and lands in the accounts.
- **The lock decides, not the posting.** An archived period accepts nothing. A locked period accepts a reversal or prior-period adjustment **only where the lock row grants it** — the flags live on the lock, so the choice belongs to whoever closed the period.

## The ninth stub

The leaf was hand-rolled here too — and it **hid from the grep that found the other eight** by splitting `.toString('base64')` and `.substring(0, 32)` across two statements. Same defect (a reversible encoding truncated to the first 24 bytes, so `fiscalYear`, `fiscalPeriod` and `regulatoryCode` all sat past the window), and it silently overwrote the calendar leaf. It is [[merge]]/chainLeaf now, folded over the posting **and** the calendar row's leaf, so *"linked to the period config chain"* is a fact rather than a sentence.

The hook also never **returned** `data` — and `beforeValidate` is a transform, so Payload takes the returned value. Every field it resolved was being discarded. It never bit, for the same reason nothing else did.

**Honest boundary.** This is **still not wired**, deliberately: attaching it makes a live posting throw wherever a calendar has not been generated, which is a data-and-rollout decision, not a code one. It is now correct, proven, and safe to wire — the trap is gone, but so is the pretence that it was doing the job.

**Law — [[law]]: a posting's period is read from the calendar or the posting is refused. A commented-out query beside a placeholder is not a step toward the feature — it is the feature's claim with the feature deleted.**

## Standards

- **IAS-34:2023** — period context for interim reporting.
- **SOX §404** — the period lock: a closed period cannot accept postings.

Composes: [[rules]]/refutable · [[merge]] · [[law]].
