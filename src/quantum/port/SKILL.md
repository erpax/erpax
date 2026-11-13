---
name: port
description: "Use when re-porting upstreams safely — a source ports to a content-uuid, so re-porting is idempotent (unchanged sources merge, only changed ones re-port); how to run \"port all upstreams again\" repeatedly."
atomPath: "quantum/port"
coordinate: "quantum/port · 2/share · 90e3c4e8"
contentUuid: "fc8301ee-87d9-5a24-acaf-846a2e1c4332"
diamondUuid: "c92ebf2e-b5e7-8053-abe9-d923714d119c"
uuid: "90e3c4e8-870f-8422-998c-58887ea45984"
horo: 2
typography:
  partition: quantum
  bondDegree: 137
standards:
  - "RFC 9562 §5.8 content-uuid (the port identity)"
bindings: []
signatures:
  computationUuid: "3e300f23-b3b4-8b08-a3b2-aa63e3915d6a"
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
      stageUuid: "72a2c8b1-9af1-8366-928e-a0a11acd6d95"
    - stage: seal
      stageUuid: "d115d019-efd7-8baa-b1e1-9fc942a44339"
    - stage: uuid
      stageUuid: "4b72f7d7-8dff-8c71-863e-423cc6a15663"
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
    computationUuid: "3e300f23-b3b4-8b08-a3b2-aa63e3915d6a"
    contentUuid: "fc8301ee-87d9-5a24-acaf-846a2e1c4332"
version: 2
---
# quantum/port — content-addressed, idempotent porting

The quantum facet of [[port]]: an upstream source (a Rails table, a concept from `ceccec/erpax` / `etrima`) ports to a content-[[uuid]]. So **re-porting is idempotent** — an unchanged source yields the same port-uuid and [[merge]]s (no duplicate), while a changed source yields a new one (re-port only what changed). This is what makes **"port all upstreams again"** safe to run repeatedly: the merge law dedups everything already ported, surfacing only the genuine gaps. Merges into [[port]].

Matter-twin: `src/quantum/port/index.ts` (`portUuid` · `alreadyPorted`). Composes [[port]] · [[migrate]] · [[merge]] · [[uuid]] · [[quantum]].

**Law — [[law]]: the port-uuid is a pure function of the source content, so re-porting is idempotent — an unchanged source always ports to the same identity and merges to a no-op, while only a genuinely changed source yields a new one; "port all upstreams again" can run any number of times and the ported set is fixed, surfacing only the real gaps.**

@standard RFC 9562 §5.8 content-uuid (the port identity)

<sub>content-uuid `fc8301ee-87d9-5a24-acaf-846a2e1c4332` · account `quantum/port` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
