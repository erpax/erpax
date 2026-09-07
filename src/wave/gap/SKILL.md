---
name: gap
description: "Use when turning the corpus's own structural debt into runnable waves — dead references, stray .ts and unraised kinds grouped by the CLASS they share and ordered biggest-first, so one fix pattern covers a wave. Feeds chat at tokens=0 via wave/feed. Run: tsx src/wave/gap/index.ts"
atomPath: "wave/gap"
coordinate: "wave/gap · 4/weave · 3656c33d"
contentUuid: "64ef6e9f-3aa3-5c04-bd86-0e1fe5003e0a"
diamondUuid: "9a494a54-d40f-880a-9b7b-42b04cfc27f2"
uuid: "3656c33d-f8f7-8e57-82a8-d0b596ffb521"
horo: 4
typography:
  partition: wave
  bondDegree: 36
standards: []
bindings: []
signatures:
  computationUuid: "90fe1e9d-136a-8bdb-aca7-ee6885b6c13c"
  stages:
    - stage: path
      stageUuid: "0ef694e8-e01b-8969-9155-146d71f24478"
    - stage: trinity
      stageUuid: "bb740090-309c-8c13-bcb8-ce200a8b4a31"
    - stage: boundary
      stageUuid: "b6ec76ed-6fb5-8607-a35f-421d74821ac4"
    - stage: links
      stageUuid: "9a3fb4b1-4d55-8e85-907a-9d1559b12b41"
    - stage: horo
      stageUuid: "f6afe90a-8c00-8970-b567-2af9284a2eee"
    - stage: seal
      stageUuid: "f916be34-7a15-82de-b6c5-84372c1950c7"
    - stage: uuid
      stageUuid: "27700e5c-217b-8f65-842b-5f2810f9ec61"
version: 2
---
# gap — the corpus's own debt, grouped into waves

Three wave sources already feed chat — [[bank]]/research, [[quantum]]/ftl/purify, [[standards]]/improve. Each takes a domain, produces waves, and feeds them into themselves at `tokens=0` through [[wave]]/feed. This is the fourth, and its domain is **the corpus's own structure**.

Live, over the gates rather than a fresh scan:

```
258 wave(s) over 1525 gap(s) — biggest class first

  162  dead-reference  src/services/
   63  dead-reference  src/standards/
   54  stray-ts        agents
   53  dead-reference  src/plugins/
```

## Why the class, not the file

465 dead pointers looks like 465 problems. It is not: **93% land in 12 dissolved trees**, and 162 aim at `src/services/` alone. The unit of repair is the tree that moved, never the pointer that followed it nowhere. Ordering by count puts the compressible class first, so a wave is worth running exactly when one pattern closes many gaps.

Kinds are never merged into one wave even when they share a cluster — a stray `.ts` and a dead pointer in the same tree have different fixes, and a wave whose items need two different repairs is a list, not a wave.

## The trap the ask carries

The dissolved tree maps by hyphen-to-slash — `services/<a>-<b>/` becomes `<a>/<b>/` — for **95 of 162**, verified by existence check. That is a *directory* match, and a directory match is not a file match: a pointer of the form `services/<a>-<b>/<leaf>.ts` proves the ATOM now lives at `<a>/<b>`, never that `<leaf>.ts` survived as a file rather than folding into the barrel.

(The literal stale paths are not quoted here — a dead path in prose fails this very gate, and it refused this page for carrying one. They live in the test, on hermetic fixtures.)

[[rules]]/reference states the consequence exactly: **a pointer to a wrong-but-existing file passes the gate and is worse than a dead one.** So every generated ask names that trap in its own text, and a test pins that it does — otherwise the wave invites precisely the sweep it exists to prevent.

## Reuse, never re-derive

`gapWaves` reads the existing gates (`deadReferences`, `strayTsViolations`, `unraisedKinds`) instead of scanning again. The gates are the slow, serial resource — a build is minutes, a gate is seconds, and agents are cheap by comparison. A wave source that re-measured would widen the bottleneck it exists to feed.

**Honest boundary.** A wave proves these gaps **share a shape**, never that one edit closes them, and never that closing them is correct. It is a batch to review, not a sweep to run — the same boundary [[rules]]/collapse draws for merges: content-addressing finds the candidates, and nothing but a human decides.

**Law — [[law]]: debt is repaired by class, not by instance. Group gaps by the shape they share, order by how many one pattern closes, and carry the wrong-target warning in the ask — a batch that forgets it becomes the sweep it was meant to replace.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — maintainability: a change is reviewable when its class is stated.

Composes: [[wave]]/feed · [[rules]]/reference · [[rules]]/unraised · [[law]]/folder · [[law]].
