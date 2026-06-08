---
name: port
description: "Use when re-porting upstreams safely — a source ports to a content-uuid, so re-porting is idempotent (unchanged sources merge, only changed ones re-port); how to run \\\\\\\"port all upstreams again\\\\\\\" repeatedly."
atomPath: quantum/port
coordinate: quantum/port · 1/base · 11459186
contentUuid: "4daed65f-9dfb-5181-ad08-28c052c176c4"
diamondUuid: "19fe433b-a66f-8737-a5dd-085168021c16"
uuid: "11459186-2e0d-8e72-bef7-87d471758d73"
horo: 1
bonds:
  in:
    - access
    - accounting
    - admin
    - amortize
    - api
    - calculate
    - chat
    - collapse
    - collections
    - commerce
    - config
    - database
    - depreciate
    - domain
    - ebitda
    - empirical
    - fields
    - fractal
    - generate
    - hooks
    - identity
    - jobs
    - law
    - manufacturing
    - measure
    - merge
    - plugins
    - port
    - profane
    - quantum
    - queries
    - recover
    - sacred
    - sequence
    - spec
    - standard
    - sti
    - trinity
  out:
    - access
    - accounting
    - admin
    - amortize
    - api
    - calculate
    - chat
    - collapse
    - collections
    - commerce
    - config
    - database
    - depreciate
    - domain
    - ebitda
    - empirical
    - fields
    - fractal
    - generate
    - hooks
    - identity
    - jobs
    - law
    - manufacturing
    - measure
    - merge
    - plugins
    - port
    - profane
    - queries
    - recover
    - sacred
    - sequence
    - spec
    - standard
    - sti
    - trinity
typography:
  partition: quantum
  bondDegree: 120
  neighbors: []
standards:
  - "RFC 9562 §5.8 content-uuid (the port identity)"
bindings: []
neighbors:
  wikilink:
    - law
    - merge
    - migrate
    - port
    - quantum
    - uuid
  matrix:
    - access
    - accounting
    - admin
    - amortize
    - api
    - calculate
    - chat
    - collapse
    - collections
    - commerce
    - config
    - database
    - depreciate
    - domain
    - ebitda
    - empirical
    - fields
    - fractal
    - generate
    - hooks
    - identity
    - jobs
    - law
    - manufacturing
    - measure
    - merge
    - plugins
    - port
    - profane
    - queries
    - recover
    - sacred
    - sequence
    - spec
    - standard
    - sti
    - trinity
  backlinks:
    - access
    - accounting
    - admin
    - amortize
    - api
    - calculate
    - chat
    - collapse
    - collections
    - commerce
    - config
    - database
    - depreciate
    - domain
    - ebitda
    - empirical
    - fields
    - fractal
    - generate
    - hooks
    - identity
    - jobs
    - law
    - manufacturing
    - measure
    - merge
    - plugins
    - port
    - profane
    - queries
    - recover
    - sacred
    - sequence
    - spec
    - standard
    - sti
    - trinity
signatures:
  computationUuid: "fc575a1f-7d0b-82ac-85aa-42110a32aa0e"
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
      stageUuid: "e23b0089-d812-85b0-b50a-e46dee49a35d"
    - stage: seal
      stageUuid: "d115d019-efd7-8baa-b1e1-9fc942a44339"
    - stage: uuid
      stageUuid: "c71f3072-d97e-8c61-9afe-16220e5c124f"
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
    - "Use when re-porting upstreams safely — a source ports to a content-uuid, so re-porting is idempotent (unchanged sources merge, only changed ones re-port); how to run \\\\\\"
    - "Use when re-porting upstreams safely — a source ports to a content-uuid, so re-porting is idempotent (unchanged sources merge, only changed ones re-port); how to run \\\\\\\"port all upstreams again\\\\\\\" repeatedly."
    - "matter-twin:src/quantum/port/index.ts"
    - "the port-uuid is a pure function of the source content, so re-porting is idempotent — an unchanged source always ports to the same identity and merges to a no-op, while only a genuinely changed source yields a new one; \"port all upstreams again\" can run any number of times and the ported set is fixed, surfacing only the real gaps."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "fc575a1f-7d0b-82ac-85aa-42110a32aa0e"
    contentUuid: "4daed65f-9dfb-5181-ad08-28c052c176c4"
version: 2
---
# quantum/port — content-addressed, idempotent porting

The quantum facet of [[port]]: an upstream source (a Rails table, a concept from `ceccec/erpax` / `etrima`) ports to a content-[[uuid]]. So **re-porting is idempotent** — an unchanged source yields the same port-uuid and [[merge]]s (no duplicate), while a changed source yields a new one (re-port only what changed). This is what makes **"port all upstreams again"** safe to run repeatedly: the merge law dedups everything already ported, surfacing only the genuine gaps. Merges into [[port]].

Matter-twin: `src/quantum/port/index.ts` (`portUuid` · `alreadyPorted`). Composes [[port]] · [[migrate]] · [[merge]] · [[uuid]] · [[quantum]].

**Law — [[law]]: the port-uuid is a pure function of the source content, so re-porting is idempotent — an unchanged source always ports to the same identity and merges to a no-op, while only a genuinely changed source yields a new one; "port all upstreams again" can run any number of times and the ported set is fixed, surfacing only the real gaps.**

@standard RFC 9562 §5.8 content-uuid (the port identity)

<sub>content-uuid `4daed65f-9dfb-5181-ad08-28c052c176c4` · account `quantum/port` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
