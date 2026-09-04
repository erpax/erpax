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
