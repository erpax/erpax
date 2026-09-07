---
name: sealed
description: "Use when reasoning about error handling as an entropy leak — a swallowed or defaulted catch hides the truth so entropy escapes; the corpus is sealed only when errors propagate, and coverage measures the fraction of catches that do not leak."
atomPath: "convention/sealed"
coordinate: "convention/sealed · 8/crest · 242ea5d8"
contentUuid: "49c058d1-26d2-582f-a7d2-16aa923e2bf9"
diamondUuid: "58b14eec-bf78-8dd8-ac73-0e8e7ca135d4"
uuid: "242ea5d8-c0f6-8deb-a626-be9c7d7df9ad"
horo: 8
typography:
  partition: convention
  bondDegree: 19
standards:
  - "error propagation over swallow/default · no defined fallback · zero-entropy (no hidden state)"
bindings: []
signatures:
  computationUuid: "b2bcc4c7-b6aa-8c72-b43b-b35608c7b8e9"
  stages:
    - stage: path
      stageUuid: "fdf6dc66-0ef3-85d2-a4ca-eaea9df5cb28"
    - stage: trinity
      stageUuid: "c33b84e4-50d8-812a-9e3d-5c59ccd4484b"
    - stage: boundary
      stageUuid: "fa5f1dae-5a3c-8a5e-a2b9-ba12096676f9"
    - stage: links
      stageUuid: "f24deda2-c095-80f7-8884-fb63a6535862"
    - stage: horo
      stageUuid: "f87c2dd0-c806-87cd-96f3-ddfab882cf97"
    - stage: seal
      stageUuid: "fc54d3ec-3c69-8716-a14e-f15faebb0a3f"
    - stage: uuid
      stageUuid: "5a9019a8-d64b-8c31-b262-ad2c46c11b10"
version: 2
---
# convention/sealed — entropy leaves through error handling

A `catch` is a door. A **swallowed** catch (`catch {}`) or a **defaulted** one (`.catch(() => x)`) lets the error — the [[entropy]] — escape through it: the failure is hidden, the real state is lost, and a verifier can no longer tell truth from forgery. That is the same sin as a defined [[default]] — an assumption that leaks entropy. The corpus is **sealed** only when errors **propagate**: the truth travels up, uncaught, until something can honestly act on it.

`coverage()` scans `src` for catch handlers and the detectable leak patterns (empty catch, `.catch(() => …)`) and returns `(catches − leaks) / catches` — the fraction that propagate. The detected leaks are a **lower bound**, so the coverage is an **upper bound** on the seal, stated honestly. There is no default: the corpus has error-handling by architecture, so the denominator is positive.

This is a factor in the [[collider]] product: each leaky catch drops the seal below 1, so the corpus's tamper-cost stays finite until every error propagates. Seal the doors and the limit is ∞.

Matter-twin: `src/convention/sealed/index.ts` (`coverage`). Composes [[default]] · [[collider]] · [[entropy]].

**Law — [[law]]: entropy leaves through error handling — a swallowed (empty catch) or defaulted (.catch(() => x)) error hides the truth, so the entropy escapes instead of propagating. The corpus is sealed only when errors propagate; coverage is the fraction of catches that do not leak (an upper bound — real leaks ≥ detected). It is the same sin as a defined default: an assumption that leaks entropy.**

@audit catches + leaks scanned live from src; coverage = (catches − leaks)/catches, never assumed
@standard error propagation over swallow/default · no defined fallback · zero-entropy (no hidden state)
