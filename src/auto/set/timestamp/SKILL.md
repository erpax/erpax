---
name: timestamp
description: Use when stamping a status-transition timestamp (postedAt, approvedAt, reconciledAt, authorizedAt) onto a configurable field the first time a condition fires — a beforeChange hook factory emitting canonical UTC ISO-8601.
---

# auto/set/timestamp — verifiable event time on transition

A factory that builds a Payload `beforeChange` [[hooks]] from a field name and a condition predicate. The returned hook writes a fresh `new Date().toISOString()` onto that field only when the condition holds AND the field is not already set — so a transition time is recorded exactly once, on first occurrence, and never overwritten on later saves. It always emits canonical UTC ISO-8601, the verifiable event-time leg of the [[audit]] trail.

Matter-twin: `src/auto/set/timestamp/index.ts` — `autoSetTimestamp(timestampField, condition)` returning a `CollectionBeforeChangeHook`. One of the [[auto]]-set control gates ([[hooks]]).

**Law — [[law]]: a status-transition time is set once, server-side, in canonical UTC ISO-8601 — written only when the condition fires and the field is empty, so the event time is verifiable and cannot be silently restamped.**

@standard ISO-8601-1:2019 date-time utc-canonical
