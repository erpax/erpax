---
name: sealed
description: "Use when reasoning about error handling as an entropy leak — a swallowed or defaulted catch hides the truth so entropy escapes; the corpus is sealed only when errors propagate, and coverage measures the fraction of catches that do not leak."
atomPath: "convention/sealed"
coordinate: "convention/sealed · 7/descent · 82a38788"
contentUuid: "38f5c216-53ff-5670-aa05-e39434a1cbda"
diamondUuid: "cca28eef-67b8-8b0d-bd1a-e29003c96823"
uuid: "82a38788-6955-8d87-8c5c-de2a507ed038"
horo: 7
typography:
  partition: convention
  bondDegree: 19
standards:
  - "error propagation over swallow/default · no defined fallback · zero-entropy (no hidden state)"
bindings: []
signatures:
  computationUuid: "9a4893ed-75cb-895d-9ce6-499f514ed545"
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
      stageUuid: "c035e77f-7203-8bb1-aa57-d08bb1aea4c8"
    - stage: seal
      stageUuid: "fc54d3ec-3c69-8716-a14e-f15faebb0a3f"
    - stage: uuid
      stageUuid: "e680418b-867b-8399-ad28-94bb768a7823"
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
