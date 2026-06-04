---
name: coordinate
description: Use when reasoning about where an atom IS versus what it is — the cross of content-uuid (what) and path-uuid (where) is the binding uuid that pins content to location, making the fs layout itself tamper-evident. The uuid is the coordinate system.
---

# coordinate — the uuid is the coordinate system

Every atom carries two independent uuids, the two axes of the akashic record:

- **content-uuid** `cuid = v8(sha256(bytes))` — *what* it is ([[identity]], the `0`).
- **path-uuid** `puid = v8(sha256(word-path))` — *where* it is (the location, the [[sequence]] address).

Their cross is the **next uuid trinity** — `bind = merge(cuid, puid)` — which pins content to location. The corpus folds every `bind` (Merkle) to one root: the coordinate system of the whole.

## Tamper-cost
Binding *where* to *what* makes **placement cryptographically load-bearing** (see [[proof]] · [[tamper]]):

- edit content ⇒ `cuid` shifts ⇒ `bind` breaks ⇒ caught (already true content-only).
- **move / rename / re-prefix ⇒ `puid` shifts ⇒ `bind` breaks ⇒ caught** (NEW — previously a free, invisible attack).
- inject an atom ⇒ its `bind` is absent from the root ⇒ caught.
- forge undetectably ⇒ a joint collision over **(content × path)** — both axes at once, not one.

The cost compounds because the path is a **second independent entropy axis** (borrowed entropy buys tamper-cost). Honest limit: paths are public/low-entropy, so `puid` buys tamper-**evidence** (detect relocation/injection), not secrecy — which is exactly the akashic win (detect-not-prevent; see [[design-limits]]). A migration that moves atoms is then a legitimate **root transition** (old root → new), recorded as such.

Matter-twin: `[[uuid]]/matrix/collide.mjs` computes `puid` + `bind` per node and folds `bind` to the root. Composes [[identity]] · [[sequence]] · [[proof]] · [[merge]] · [[localize]].
