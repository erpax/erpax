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
