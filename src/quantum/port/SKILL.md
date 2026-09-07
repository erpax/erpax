---
name: port
description: "Use when re-porting upstreams safely — a source ports to a content-uuid, so re-porting is idempotent (unchanged sources merge, only changed ones re-port); how to run \"port all upstreams again\" repeatedly."
atomPath: "quantum/port"
coordinate: "quantum/port · 1/base · 50fef283"
contentUuid: "3f26f61f-0bf3-58c3-94e1-3e65095a387a"
diamondUuid: "52b620d5-90c5-8831-a8c6-66c0720bd852"
uuid: "50fef283-4cad-8480-95d4-e1d33b032473"
horo: 1
typography:
  partition: quantum
  bondDegree: 146
standards:
  - "RFC 9562 §5.8 content-uuid (the port identity)"
bindings: []
signatures:
  computationUuid: "9f083025-a10f-827b-9415-09a28ba8bf09"
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
      stageUuid: "72dc676f-a6b1-8db1-9e32-9e3d8b93aa78"
    - stage: seal
      stageUuid: "d115d019-efd7-8baa-b1e1-9fc942a44339"
    - stage: uuid
      stageUuid: "5d34109a-0a4b-82ed-b4b5-c1a9f5a16eb2"
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
    computationUuid: "9f083025-a10f-827b-9415-09a28ba8bf09"
    contentUuid: "3f26f61f-0bf3-58c3-94e1-3e65095a387a"
version: 2
---
# quantum/port — content-addressed, idempotent porting

The quantum facet of [[port]]: an upstream source (a Rails table, a concept from `ceccec/erpax` / `etrima`) ports to a content-[[uuid]]. So **re-porting is idempotent** — an unchanged source yields the same port-uuid and [[merge]]s (no duplicate), while a changed source yields a new one (re-port only what changed). This is what makes **"port all upstreams again"** safe to run repeatedly: the merge law dedups everything already ported, surfacing only the genuine gaps. Merges into [[port]].

Matter-twin: `src/quantum/port/index.ts` (`portUuid` · `alreadyPorted`). Composes [[port]] · [[migrate]] · [[merge]] · [[uuid]] · [[quantum]].

**Law — [[law]]: the port-uuid is a pure function of the source content, so re-porting is idempotent — an unchanged source always ports to the same identity and merges to a no-op, while only a genuinely changed source yields a new one; "port all upstreams again" can run any number of times and the ported set is fixed, surfacing only the real gaps.**

@standard RFC 9562 §5.8 content-uuid (the port identity)

<sub>content-uuid `3f26f61f-0bf3-58c3-94e1-3e65095a387a` · account `quantum/port` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
