---
name: face
description: "Use when reasoning about face — Every number in this session reached its reader as a sentence. *\"48 blind probes\"*, *\"1.6× slower cached\"*, *\"237 dead pointers\"* — each true when written, none checkable by the…"
atomPath: "metric/face"
coordinate: "metric/face · 4/weave · df2a21be"
contentUuid: "f1783306-3460-5f9b-bdc3-3c831a7bb9f2"
diamondUuid: "647c1a35-5409-8ff6-81cb-7ce599fdaf3d"
uuid: "df2a21be-ad1a-80bb-a70d-e1c110210d44"
horo: 4
typography:
  partition: metric
  bondDegree: 23
standards: []
bindings: []
signatures:
  computationUuid: "4f7f41e9-1e2e-88bf-8774-ed61e3e9a19e"
  stages:
    - stage: path
      stageUuid: "b9248015-850c-8f4a-a5c3-ba3c1291cc5f"
    - stage: trinity
      stageUuid: "3a36a1c8-6ce0-84f6-90f4-7cbcffefde6b"
    - stage: boundary
      stageUuid: "2ee3eac9-fae4-88d4-a236-154ceed4296e"
    - stage: links
      stageUuid: "dac891c6-8565-827d-b446-62550727e47c"
    - stage: horo
      stageUuid: "da1b824c-345a-828b-96b3-da0ec3bb56f4"
    - stage: seal
      stageUuid: "9eeaf933-1f22-8f0b-b00a-188d7c88ade9"
    - stage: uuid
      stageUuid: "80aa7755-ea09-8bdf-83d0-3395f1fe47bc"
version: 2
---
# metric/face — a figure travels with the command that recomputes it, or it travels as prose

Every number in this session reached its reader as a sentence. *"48 blind probes"*, *"1.6× slower
cached"*, *"237 dead pointers"* — each true when written, none checkable by the person reading it.
A false figure moves at exactly the speed a true one does, because **prose has no failure mode**.

That is not hypothetical here. A sibling reported a floor as *"measured three ways"* when it was one
hand-typed constant read three times, and this session relayed it onward **without auditing**. The
claim was wrong, it was carried, and nothing in its shape could have stopped it.

So a figure leaves this corpus as a **row**: the claim in words, the value, and **the command that
recomputes it from a clean checkout**. A row whose command cannot be run is prose again, with extra
punctuation.

## Run, never remembered

`measureFace()` executes every command at emit time. A gate that fails publishes its failure **as
the value** — `FAIL: …` — because a face that quietly drops a red gate is a place where red gates go
to be quiet, and that is the defect this corpus exists against.

Its own first emission proved the point: `gate-axes-red` came back **3**, because this atom had no
SKILL and no proof yet and was not in the matrix. The face reported its own unwiredness before
anyone looked at it.

## The receipt, and exactly what it is worth

Each row is content-addressed over its own fields and **chained** into the row before it
([[merge]]'s `chainLeaf`), so a row moved, dropped or inserted changes every receipt after it and
the root with it. `verifyFace` recomputes the whole chain **from the file alone** — nothing from
this tree is needed, which is what makes a face portable.

**A green verify proves the row is unaltered since sealing and NOTHING else.** It does not make a
figure correct. It does not let a reader check a figure without running the command in the row. That
sentence ships inside the verdict object (`boundary`) rather than in a comment, so it cannot be
dropped in transit — quoting a row because its receipt checked out is precisely the mistake this
file exists to prevent.

## The formula is declared, because two honest implementations diverged inside a gap in the spec

A sibling's survey reported this corpus's face as **tampered — all fourteen rows and the root**.
They caught it before relaying, and the reason is the useful part: *every row failing at once is the
signature of a different formula; tampering changes one row or two.* The shared spec said "a receipt
over the row's own contents" and never said **which bytes** or **which fold**, so two honest
implementations diverged inside that gap — and a protocol built to stop false reports was about to
emit one.

So the formula travels in the face, as `protocol`:

| | erpax/metric-face/1 |
| --- | --- |
| covers | `key` · `claim` · `value` · **`command`** |
| receipt | `merge(canonical({key,claim,value,command}), priorReceipt)` — `''` for row 0 |
| chained | yes — each receipt folds in the one before it |
| merge | `toUuid(utf8(a + U+2016 + b))` |
| address | RFC 9562 §5.8 uuidv8 — sha256 first 16 octets, version 8, variant 10x |
| root | pairwise merge up the tree; an odd element carries up; empty folds to `toUuid('')` |

**`command` is inside the preimage here, and that is a deliberate difference.** The sibling excludes
it so a repo can correct how a row is reproduced without breaking the seal on what it says — a real
argument. This corpus takes the other side: the whole claim is *a figure travels with the command
that recomputes it*, so swapping the command while keeping the value is the subtler tamper — the row
still reads true and no longer says how to check it. Both positions are defensible; what is not
defensible is leaving it unstated.

`verifyFace` therefore returns **three** verdicts, not two. `different-convention` is read from a
declared `protocol` id that differs, and only *inferred* (every row failing at once) for a face
sealed before the field existed. A checker that cannot tell another formula from tampering makes an
accusation with the tool built to prevent them — and this one would have made exactly that
accusation about the sibling's face before this change.

**Honest boundary.** A row proves reproducibility, never truth: a command can be wrong, or measure
something other than what the claim says. The receipt covers the row's four fields — it says nothing
about whether the command was run honestly on the tree it names. And the chain is order-dependent by
construction, which is a property, not a limitation: two faces of one repo are diffable row by row.

**Law — [[law]]: a figure is emitted with the command that recomputes it, and a receipt over that
row — the receipt proving only that nobody changed it in transit. Anything less is a number a reader
must take on trust, and trust is what a corpus of gates exists to stop asking for.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.
- **RFC 9562 §5.8** — content-address: same content, same address.

Composes: [[merge]] · [[gate]]/receipt · [[law]].
