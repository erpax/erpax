---
name: cache
description: "Use when reasoning about cache — Generic Payload CMS caching utilities — wraps `next/cache` `unstable_cache` with tag-keyed invalidation for collection / global fetches."
atomPath: "rfc/9110/cache"
coordinate: "rfc/9110/cache · 1/base · 95552ce2"
contentUuid: "d902584f-ee98-5cd6-b0d6-a7a069b20f6a"
diamondUuid: "53314133-d557-852f-8c2d-1e315d3d97e5"
uuid: "95552ce2-d03c-8122-af9b-1f6a67763d3e"
horo: 1
typography:
  partition: rfc
  bondDegree: 57
standards:
  - "7234 http-1.1-caching obsolete-but-cited"
  - "9110 §13 caching"
  - "9111 http-caching"
  - "BCP-47 language-tag locale-keyed-cache"
  - "W3C HTTP-Cache stale-while-revalidate"
bindings: []
signatures:
  computationUuid: "1b08ea82-dd4e-854e-98f9-b0d7301e2bc9"
  stages:
    - stage: path
      stageUuid: "6a13e2fd-49b2-89c8-aede-a008402ac5a2"
    - stage: trinity
      stageUuid: "79177ae1-d7ae-8d16-872a-a85070ec111b"
    - stage: boundary
      stageUuid: "cef12a8b-c6bb-86ba-8152-274de895f730"
    - stage: links
      stageUuid: "886a7217-b971-86ef-b153-42b55d3c1b62"
    - stage: horo
      stageUuid: "98f79c62-bda8-8c87-ad76-7c6436ad5817"
    - stage: seal
      stageUuid: "3db7c7bc-71c3-8f7d-a969-c60416f0d855"
    - stage: uuid
      stageUuid: "e4eeb272-e3d2-8932-84f4-e3e19ca295bd"
version: 2
---
# rfc/9110/cache

Generic Payload CMS caching utilities — wraps `next/cache` `unstable_cache` with tag-keyed invalidation for collection / global fetches.

Extracted from `rfc/9110/cache.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rfc/9110]].
