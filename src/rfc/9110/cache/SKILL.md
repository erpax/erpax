---
name: cache
description: "Use when reasoning about cache — Generic Payload CMS caching utilities — wraps `next/cache` `unstable_cache` with tag-keyed invalidation for collection / global fetches."
atomPath: "rfc/9110/cache"
coordinate: "rfc/9110/cache · 1/base · 95552ce2"
contentUuid: "134b48ce-e8e6-56b5-ba0a-9f592186f0f8"
diamondUuid: "7804e1db-d92b-8e07-8f1b-d7aa4a46e27a"
uuid: "95552ce2-d03c-8122-af9b-1f6a67763d3e"
horo: 1
typography:
  partition: rfc
  bondDegree: 51
standards:
  - "7234 http-1.1-caching obsolete-but-cited"
  - "9110 §13 caching"
  - "9111 http-caching"
  - "BCP-47 language-tag locale-keyed-cache"
  - "W3C HTTP-Cache stale-while-revalidate"
bindings: []
signatures:
  computationUuid: "73459ab2-ebd9-899a-a84a-78263adc9cac"
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
      stageUuid: "57bf9df0-ae33-8f83-8507-1ca546677f74"
    - stage: seal
      stageUuid: "3db7c7bc-71c3-8f7d-a969-c60416f0d855"
    - stage: uuid
      stageUuid: "3ca6a445-8895-8e6f-a39a-7d7d54f16b90"
version: 2
---
# rfc/9110/cache

Generic Payload CMS caching utilities — wraps `next/cache` `unstable_cache` with tag-keyed invalidation for collection / global fetches.

Extracted from `rfc/9110/cache.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rfc/9110]].
