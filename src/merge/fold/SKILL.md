# merge/fold — the primitive, extracted so the barrel can re-export instead of concentrate

`merge(a, b) = toUuid(a ‖ b)` and the folds built on it: `canonical`, `chainLeaf`, `foldToRoot`, and the two roots `setRoot` · `sequenceRoot`.

It exists because of a shape, not a size. [[rules]]/concentration asks a hub to **re-export** and keep matter in child atoms — and the moment [[merge]]/order became `merge`'s first child, the hub's re-export ratio was 0% and the axis reddened. The obvious repair is for the barrel to re-export its child; but a child holding the roots would have to import `merge` from its own parent, and a barrel re-exporting a child that imports the barrel is a **cycle** — the tangle that once collapsed this corpus's boot ([[rules]]/cycle).

So the **primitive** moved down instead. This atom imports nothing from its parent, which is exactly what makes the parent's re-export safe.

## What it is, algebraically

A **magma**, not a monoid: closed (the result is itself a uuid) and deterministic, but neither associative nor commutative. `merge(merge(a,b),c) ≠ merge(a,merge(b,c))` and `merge(a,b) ≠ merge(b,a)` — the tree structure and the leaf order are **part of the element**. That non-commutativity is not a defect to be smoothed away; it is precisely what lets `sequenceRoot` detect a reordering that `setRoot` cannot see ([[merge]]/order).

The `‖` delimiter (U+2016) is what makes `a ‖ b` unambiguous: without it `merge('a','bc')` and `merge('ab','c')` would collide.

**Honest boundary.** Same content ⇒ same address is a theorem of the construction; different content ⇒ different address is a **collision assumption** about SHA-256, not something proved here. And a re-export preserves a name, never a meaning — the face is intact, which [[rules]]/face checks, and that is a weaker claim than the behaviour being unchanged.

**Law — [[law]]: a hub re-exports and a child imports downward only. When the child needs the parent's primitive, the primitive is what moves — not the dependency direction.**

## Standards

- **RFC 9562 §5.8** — uuidv8 content-address.

Composes: [[merge]] · [[merge]]/order · [[rules]]/cycle · [[uuid]] · [[law]].

## The algebra, in full

These narratives lived as long docstrings. They are corpus prose, and the law is to point rather than duplicate — the code carries one line and a pointer here.

### `(module)`

merge/fold — the primitive: the magma operation, canonicalisation, and the two roots. It imports NOTHING from its own parent, which is what keeps the barrel's re-export from being a cycle. @see ./SKILL.md

### `canonical`

Canonical bytes for a value — key-ORDER-independent, so the same content addresses the same, whatever order it was built in. This existed already, and that is the finding: it was written TWICE, privately, in [[readme]]/compute and [[readme]]/paper — while `chainLeaf` below serialised with plain `JSON.stringify`, whose key order is INSERTION order. Ten hand-rolled audit leaves all carried a comment claiming "JCS-canonical", and the corpus's own canonicaliser sat two atoms away, duplicated, unreachable from here. Duplication is camouflage: while the function lived in two private corners, nothing showed that the fold was missing it. Stated once, the hole is obvious. HONEST BOUNDARY — this is key-order canonical, NOT RFC 8785 JCS. Those ten comments overclaimed and this one will not: JCS also fixes number serialisation, string escaping and UTF-8 form, and this defers all three to `JSON.stringify`. For the payloads erpax addresses (plain records of strings, finite numbers, booleans, null) the two agree; on a NaN, an Infinity, a lone surrogate, or -0 they need not. Key order was the property the fold actually needed, and it is the one this guarantees.

### `chainLeaf`

The audit chain leaf — the fold's binary step over a record and the leaf before it. This is not a new primitive; it is `merge` with the record serialised, and it exists because the corpus hand-rolled it SEVEN times instead ([[fiscal]]/period/resolver · post/close/analytics · intercompany/reconciliation · tax/period/reconciliation · audit/compliance/reporting · currency/reconciliation · closing/period/checker). Every copy was byte-identical: `Buffer.from(payload + prior).toString('base64').substring(0, 32)` — base64, a reversible encoding, truncated to the first 24 bytes of input, under a banner claiming tamper detection. A field could be rewritten past byte 24 without moving the leaf, and `prior` was appended past the window, so the chain never chained. Seven statutory closing surfaces, zero tamper-cost. A law restated seven times is seven places for one lie to sit, and no fix ever reaches the others. It is stated here once. It serialises through `canonical` above, so key order cannot change a leaf. That was written as an honest boundary here — "the canonicalisation those comments promised is still unwritten" — and it was WRONG: the canonicaliser existed, twice, privately, in [[readme]]/compute and [[readme]]/paper. Finding it took DRY-cleaning by content-address, which is the argument for the fold rather than the sentence: while one law is stated in two private corners, nothing can show you that a third place is missing it. HONEST BOUNDARY: this makes tampering DETECTABLE, never impossible, and only for whoever recomputes the leaf. Canonical here means key-order canonical, NOT full RFC 8785 (see `canonical`).

### `foldToRoot`

The fold: pair-merge a row of elements up to the ONE root — the actual Merkle root that [[fold]] only COUNTS (depth ⌈log2 N⌉, N−1 merges). An odd element carries up unchanged; a single element is already its own root; the empty row folds to the void's address (the identity of the closed set). ORDER-SENSITIVE. `@/fusion` exports a DIFFERENT function under this name that sorts first; [[merge]]/order gates the collision. @rootKind sequence

### `merkleProof`

The inclusion proof — the TOTAL membership verification of the folded algebra, resolving the one-way wall. merge cannot be inverted (you cannot recover leaves from a root — that non-invertibility IS the tamper-cost), but membership IS total: the leaf's authentication path (its sibling at each level up to the root, O(log N)) re-folds to the root iff the leaf is present. This is the ceccec `concept.proof.merkle.path` theorem as local code — not the impossible inverse, but a total verify returning true, or false (⊥) for a leaf that was never folded in. The odd-carry rule matches foldToRoot exactly (a lone element promotes unchanged, contributing no path step).

