---
name: matrix
description: "Use when asking who is adjacent to whom — the corpus graph as nodes and edges, addressed rather than searched. neighborsOf and backlinksOf resolve an atom's outgoing and incoming edges through an adjacency index built once at module load; they previously scanned all 37,854 edges per call, which made a corpus-wide pass O(atoms × edges) and unfinishable. Edges are {f,t} INDICES, not names — a filter on .from/.to returns zero for every atom, which is how two false measurements were once confirmed."
atomPath: "uuid/matrix"
coordinate: "uuid/matrix · 2/share · c3de42c6"
contentUuid: "20c3668a-eb5f-5dd6-8a37-a8c37f35defd"
diamondUuid: "9a97e51e-d443-8277-8baf-9d9b872a3733"
uuid: "c3de42c6-159e-8192-8a0b-a68332116306"
horo: 2
typography:
  partition: uuid
  bondDegree: 311
standards:
  - "RFC 9562 §5.8 (uuidv8 content-uuid) + §4.1 variant"
bindings: []
signatures:
  computationUuid: "548494c7-c8d8-8e29-aeb8-4494d52b42b7"
  stages:
    - stage: path
      stageUuid: "9a9fd94d-795c-8891-880b-cf6973b21317"
    - stage: trinity
      stageUuid: "3daf920a-dba6-8d47-99c9-a0855a5af7cc"
    - stage: boundary
      stageUuid: "e69bdd9c-07b0-8f5b-8d53-e3995cf41aef"
    - stage: links
      stageUuid: "1f9766b0-87d0-8c20-9f0f-f2e03ede9f1b"
    - stage: horo
      stageUuid: "b7949a89-df85-85fe-b261-b6fa0df19f3d"
    - stage: seal
      stageUuid: "c9ea2822-05d1-8048-929c-c61f66067620"
    - stage: uuid
      stageUuid: "f69616a3-4693-85f4-8cca-6733cde1a092"
version: 2
---
# uuid/matrix — adjacency by address, not by search

The corpus is a graph — one node per atom, one edge per bond, both counted by the matrix itself rather than by this sentence. This atom answers the only question that graph is asked — **who is adjacent to whom** — and it answers by address.

```
neighborsOf(atom)   outgoing edges
backlinksOf(atom)   incoming edges
```

## Why it is an index and not a filter

Both functions used to scan the whole edge array per call:

```ts
UUID_MATRIX_EDGES.filter((e) => e.f === i)
```

Called once per atom across the corpus that is **O(atoms × edges)**. Measured on the live frontmatter sync: **14:50 of CPU for three files** — about five minutes an atom, so roughly 267 hours for the corpus. It could not finish and was killed mid-run.

Two `Map`s built once at module load, from the same arrays in the same order:

```
3,193 atoms × 2 lookups   →   7 ms   (0.002 ms/atom)
```

A linear scan to ask *who is adjacent* is travel; an index is an address. The idiom was already here — `childrenByParentUuid` indexes the parent axis the same way.

**Proven, not assumed.** On indices, with no name resolution in the path, the index equals the scan **3,193/3,193 in both directions**. The first attempt at that proof reported 2,735/3,193 and was itself the bug: it resolved atom names through its own map while `neighborsOf` uses `nodeIndexOf`, so duplicate leaf names diverged. Comparing on indices removes the variable.

## The edge shape has cost this corpus real measurements

An edge is `{ f, t }` — **indices into the node array**, never names. A hand-rolled scan filtering on `e.from` / `e.to` returns **zero for every atom**, and that zero once "confirmed" that three atoms were isolated. A second query agreed, because it had the same defect. Two false measurements, one wrong assumption about a field name.

That is why `neighborsOf` / `backlinksOf` exist as the only sanctioned readers: a tool that reads the real shape once cannot be wrong in the direction nobody checked.

## Honest boundary

This proves **adjacency as recorded in the generated matrix** — never that the matrix is complete, and never that an edge means what a reader assumes. `nodeIndexOf` resolves by key, so two atoms sharing a leaf name resolve to one of them: pass a full atom path when the leaf is ambiguous. And the index is built at module load from `matrix.generated`, so it reflects the last generation, not the working tree.

**Law — [[law]]: adjacency is answered by address. An edge is an index pair, and a scan to find one is travel the corpus already paid to avoid.**

## Standards

- **RFC 9562 §5.8** — content-addressed identity: the same content resolves to the same node.

Composes: [[uuid]] · [[matrix]] · [[diamond]] · [[law]].
