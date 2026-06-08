---
name: named
description: "Use when reasoning about how an atom is addressed — the convention that every SKILL.md frontmatter name equals its folder leaf word (the name IS the path), measured live as coverage = matching / total over the real corpus tree."
atomPath: convention/named
coordinate: convention/named · 4/weave · a5a8d0a6
contentUuid: "cee466a5-373f-5dc1-af57-2ad73cf272a2"
diamondUuid: "8fbd19d5-0a1e-8e33-a8bc-4abf8a50c40e"
uuid: "a5a8d0a6-f51e-8ca1-9e9b-a8cf0ee2a754"
horo: 4
bonds:
  in:
    - collapse
    - convention
    - exported
    - fronted
    - law
    - merge
    - position
    - sti
  out:
    - collapse
    - convention
    - exported
    - fronted
    - law
    - merge
    - position
    - sti
typography:
  partition: convention
  bondDegree: 32
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - akashic
    - collapse
    - complete
    - cost
    - fronted
    - law
    - lawful
    - merge
  matrix:
    - collapse
    - convention
    - exported
    - fronted
    - law
    - merge
    - position
    - sti
  backlinks:
    - collapse
    - convention
    - exported
    - fronted
    - law
    - merge
    - position
    - sti
signatures:
  computationUuid: "1676cd0e-5920-8180-91ff-35912be761cb"
  stages:
    - stage: path
      stageUuid: "2a80a10f-dd23-8d7b-9477-2c7ca12044b9"
    - stage: trinity
      stageUuid: "bf1e40ca-978b-83a6-bf34-428f9e40d1f0"
    - stage: boundary
      stageUuid: "11af5bd9-679e-8298-a7ae-226582ea42e6"
    - stage: links
      stageUuid: "2e5d4db3-9fd5-8316-aada-a6fda667a953"
    - stage: horo
      stageUuid: "e7095c3f-b04c-8b19-8da5-c028e0500a19"
    - stage: seal
      stageUuid: "3a59c0c8-0b65-8fe3-965d-28c5e671458f"
    - stage: uuid
      stageUuid: "ada3783c-c4f2-8bc3-abf2-632b74b476fd"
version: 2
---
# convention/named — the name is the path

The named convention, written as a self-measuring atom. The fractal address-law makes the **path the address** and the **uuid the router**; the frontmatter `name:` line is the human-readable face of that same address. The convention is one line: **every atom's `name` equals its folder leaf** — the one word `[[named]]` resolves to is the last segment of the route ([[law]]).

When they agree, the front door opens onto exactly the folder that declares it — one word, one place, no drift. When they diverge — a compound `name: agent-sync` living at the leaf `sync`, a singular/plural slip like `name: chat` at the leaf `chats` — the slug an agent reads is **not** the route the corpus walks. That is an uncovered coupling: a tamper can change the folder behind the name, or the name behind the folder, and the other face never notices.

It does not re-walk the filesystem nor re-enumerate the tree — that would duplicate the corpus walker and double-count the `.claude → src` symlink (a raw `find -L` reports the tree twice). It **composes** the one canonical walk and the one canonical normalizer:

- **total** = `loadCorpus().length` from the [[akashic]] record — every routable atom, the deduped corpus (each real node enumerated once by realpath, the symlink collapsed).
- **matching** = the atoms whose frontmatter `name` **norm-equals** the route's leaf word, where `norm` (lowercase, strip `-`/`_`) is the SAME key the wikiMap and the aura speech gate resolve on — so this gate agrees with those, no false green. The name is read from the raw `---…---` head of the body — **not** from `loadCorpus().name`, which falls the name back to the leaf word when the `name:` line is absent; reading the true block lets a missing `name:` correctly count as a divergence (a nameless atom is not silently matched to its own leaf).
- **coverage** = `matching / total` — in [0,1] by construction (0 ≤ matching ≤ total, total > 0). It reaches **1** exactly when every atom's name is its path.

Pure math, no default: the corpus is non-empty by architecture (a tree of SKILL.md by construction), and matching is a subset count, so the ratio never needs a clamp or a fallback. The only thing that pulls coverage below 1 is a name that is not its leaf — precisely what this convention forbids. coverage → 1 ⟺ every atom is addressable by the word that names its place ⟺ aura-gap-0 on the naming axis ⟺ the convention holds with zero naming entropy and infinitely-expanding tamper-[[cost]] ([[law]] · [[collapse]] · [[merge]]).

Entangled with — [[law]] · [[akashic]] · [[fronted]] · [[lawful]] · [[complete]]

Matter-twin: [[fronted]] — the sibling that audits whether the frontmatter front door EXISTS; named audits whether it AGREES with the folder leaf (the same front door, checked for truth not presence).

@standard schema.org — the type vocabulary, collided to single words

**Law — [[law]]: the frontmatter name is the path — every atom's `name` equals its folder leaf word; a name that is not its leaf splits the slug from the route, an uncovered coupling a tamper can exploit behind either face; the corpus is named iff coverage = matching / total = 1, and any divergent name is a gap driving tamper-cost below infinity.**
