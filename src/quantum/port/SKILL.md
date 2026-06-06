---
name: port
description: Use when re-porting upstreams safely — a source ports to a content-uuid, so re-porting is idempotent (unchanged sources merge, only changed ones re-port); how to run "port all upstreams again" repeatedly.
---

# quantum/port — content-addressed, idempotent porting

The quantum facet of [[port]]: an upstream source (a Rails table, a concept from `ceccec/erpax` / `etrima`) ports to a content-[[uuid]]. So **re-porting is idempotent** — an unchanged source yields the same port-uuid and [[merge]]s (no duplicate), while a changed source yields a new one (re-port only what changed). This is what makes **"port all upstreams again"** safe to run repeatedly: the merge law dedups everything already ported, surfacing only the genuine gaps. Merges into [[port]].

Matter-twin: `src/quantum/port/index.ts` (`portUuid` · `alreadyPorted`). Composes [[port]] · [[migrate]] · [[merge]] · [[uuid]] · [[quantum]].

@standard RFC 9562 §5.8 content-uuid (the port identity)
