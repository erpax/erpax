---
name: sealed
description: "Use when reasoning about error handling as an entropy leak — a swallowed or defaulted catch hides the truth so entropy escapes; the corpus is sealed only when errors propagate, and coverage measures the fraction of catches that do not leak."
atomPath: convention/sealed
coordinate: convention/sealed · 8/crest · f7bf6b1c
contentUuid: "a0cea48e-4922-5041-91af-36c13c177447"
diamondUuid: "eb58b177-b710-8db6-a0f4-deb43ce4da4c"
uuid: "f7bf6b1c-96d2-8a76-81d7-d43c93ee4590"
horo: 8
bonds:
  in:
    - collider
    - convention
    - default
    - entropy
    - gate
    - law
  out:
    - collider
    - convention
    - default
    - entropy
    - gate
    - law
typography:
  partition: convention
  bondDegree: 19
  neighbors: []
standards:
  - "catches + leaks scanned live from src; coverage = (catches − leaks)/catches, never assumed"
  - "error propagation over swallow/default · no defined fallback · zero-entropy (no hidden state)"
bindings: []
neighbors:
  wikilink:
    - collider
    - default
    - entropy
    - law
  matrix:
    - collider
    - convention
    - default
    - entropy
    - gate
    - law
  backlinks:
    - collider
    - convention
    - default
    - entropy
    - gate
    - law
signatures:
  computationUuid: "bf5392fe-ba44-8829-8eb0-2049c0fbb81e"
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
      stageUuid: "0900972d-c33f-8ea9-956b-69a7886a74ec"
    - stage: seal
      stageUuid: "c759a436-cf62-8095-9660-71ad0df43815"
    - stage: uuid
      stageUuid: "f717dadc-c880-8fd8-8909-9df37e45d7a8"
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
