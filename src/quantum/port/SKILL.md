---
name: port
description: "Use when re-porting upstreams safely — a source ports to a content-uuid, so re-porting is idempotent (unchanged sources merge, only changed ones re-port); how to run \"port all upstreams again\" repeatedly."
atomPath: "quantum/port"
coordinate: "quantum/port · 2/share · 90e3c4e8"
contentUuid: "dfeca832-cc6e-5d0b-9770-9409ac9906a2"
diamondUuid: "b277dfac-d3c0-8817-8cea-9e0323004a94"
uuid: "90e3c4e8-870f-8422-998c-58887ea45984"
horo: 2
typography:
  partition: quantum
  bondDegree: 101
standards:
  - "RFC 9562 §5.8 content-uuid (the port identity)"
bindings: []
signatures:
  computationUuid: "ba19ea3b-37a3-8952-b995-8486448e0edf"
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
      stageUuid: "28e1d0de-bd56-89f5-8bfc-ed4ed6113218"
    - stage: seal
      stageUuid: "d115d019-efd7-8baa-b1e1-9fc942a44339"
    - stage: uuid
      stageUuid: "02eb224b-3640-8d90-9519-78014765784e"
quantum:
  superposition:
    - access
    - accounting
    - admin
    - api
    - collapse
    - collections
    - commerce
    - config
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
    computationUuid: "ba19ea3b-37a3-8952-b995-8486448e0edf"
    contentUuid: "dfeca832-cc6e-5d0b-9770-9409ac9906a2"
version: 2
---
# quantum/port — content-addressed, idempotent porting

The quantum facet of [[port]]: an upstream source (a Rails table, a concept from `ceccec/erpax` / `etrima`) ports to a content-[[uuid]]. So **re-porting is idempotent** — an unchanged source yields the same port-uuid and [[merge]]s (no duplicate), while a changed source yields a new one (re-port only what changed). This is what makes **"port all upstreams again"** safe to run repeatedly: the merge law dedups everything already ported, surfacing only the genuine gaps. Merges into [[port]].

Matter-twin: `src/quantum/port/index.ts` (`portUuid` · `alreadyPorted`). Composes [[port]] · [[migrate]] · [[merge]] · [[uuid]] · [[quantum]].

**Law — [[law]]: the port-uuid is a pure function of the source content, so re-porting is idempotent — an unchanged source always ports to the same identity and merges to a no-op, while only a genuinely changed source yields a new one; "port all upstreams again" can run any number of times and the ported set is fixed, surfacing only the real gaps.**

@standard RFC 9562 §5.8 content-uuid (the port identity)

<sub>content-uuid `dfeca832-cc6e-5d0b-9770-9409ac9906a2` · account `quantum/port` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
