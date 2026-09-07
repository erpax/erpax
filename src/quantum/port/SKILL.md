---
name: port
description: "Use when re-porting upstreams safely — a source ports to a content-uuid, so re-porting is idempotent (unchanged sources merge, only changed ones re-port); how to run \"port all upstreams again\" repeatedly."
atomPath: "quantum/port"
coordinate: "quantum/port · 2/share · d06baa47"
contentUuid: "6fb20cf6-8203-5ddb-9401-964f4601098e"
diamondUuid: "cb211f7d-b489-8055-8ad3-b3b5d1f9508a"
uuid: "d06baa47-c1d5-8525-80f8-43e71632955c"
horo: 2
typography:
  partition: quantum
  bondDegree: 146
standards:
  - "RFC 9562 §5.8 content-uuid (the port identity)"
bindings: []
signatures:
  computationUuid: "305132fd-bf85-8e52-9f22-e430d8a86f8e"
  stages:
    - stage: path
      stageUuid: "4d526fb5-e032-8b8a-8e0f-adf0b82da3a6"
    - stage: trinity
      stageUuid: "7703b405-83f3-8c51-a6bb-3859c88e2254"
    - stage: boundary
      stageUuid: "b5799dec-b566-8134-964c-e06c157f47d6"
    - stage: links
      stageUuid: "2bc5548f-d789-814b-9d5e-f3e836b99a1a"
    - stage: horo
      stageUuid: "72dd323b-804d-8651-974d-0540ddef93b6"
    - stage: seal
      stageUuid: "d115d019-efd7-8baa-b1e1-9fc942a44339"
    - stage: uuid
      stageUuid: "082b4ad9-6db6-855a-934c-76f3b656098e"
quantum:
  superposition:
    - access
    - accounting
    - admin
    - amortize
    - api
    - calculate
    - chat
    - collapse
    - superposition
  collapse:
    - "RFC 9562 §5.8 content-uuid (the port identity)"
    - "Use when re-porting upstreams safely — a source ports to a content-uuid, so re-porting is idempotent (unchanged sources merge, only changed ones re-port); how to run \\"
    - "Use when re-porting upstreams safely — a source ports to a content-uuid, so re-porting is idempotent (unchanged sources merge, only changed ones re-port); how to run \\\"port all upstreams again\\\" repeatedly."
    - "matter-twin:src/quantum/port/index.ts"
    - "the port-uuid is a pure function of the source content, so re-porting is idempotent — an unchanged source always ports to the same identity and merges to a no-op, while only a genuinely changed source yields a new one; \"port all upstreams again\" can run any number of times and the ported set is fixed, surfacing only the real gaps."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "305132fd-bf85-8e52-9f22-e430d8a86f8e"
    contentUuid: "6fb20cf6-8203-5ddb-9401-964f4601098e"
version: 2
---
# quantum/port — content-addressed, idempotent porting

The quantum facet of [[port]]: an upstream source (a Rails table, a concept from `ceccec/erpax` / `etrima`) ports to a content-[[uuid]]. So **re-porting is idempotent** — an unchanged source yields the same port-uuid and [[merge]]s (no duplicate), while a changed source yields a new one (re-port only what changed). This is what makes **"port all upstreams again"** safe to run repeatedly: the merge law dedups everything already ported, surfacing only the genuine gaps. Merges into [[port]].

Matter-twin: `src/quantum/port/index.ts` (`portUuid` · `alreadyPorted`). Composes [[port]] · [[migrate]] · [[merge]] · [[uuid]] · [[quantum]].

**Law — [[law]]: the port-uuid is a pure function of the source content, so re-porting is idempotent — an unchanged source always ports to the same identity and merges to a no-op, while only a genuinely changed source yields a new one; "port all upstreams again" can run any number of times and the ported set is fixed, surfacing only the real gaps.**

@standard RFC 9562 §5.8 content-uuid (the port identity)

<sub>content-uuid `6fb20cf6-8203-5ddb-9401-964f4601098e` · account `quantum/port` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
