---
name: history
description: "Use when reasoning about git history as the akashic record's time axis — a content-addressed Merkle DAG of commits the agents read as a knowledge source AND another independent tamper-evidence level (forging the past = rewriting every commit on every clone). Wired in, it increases tamper cost and costs nothing to keep."
atomPath: "vocabulary/history"
coordinate: "vocabulary/history · 1/base · 234a5a3c"
contentUuid: "7e641176-f626-5e0c-b3c9-6a4e29156e54"
diamondUuid: "4c391638-f780-86ef-b3e7-b01fa2872cee"
uuid: "234a5a3c-a980-8950-a88e-14268cbedbce"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 104
standards: []
bindings: []
signatures:
  computationUuid: "3711b5c7-3a10-8895-a73f-0f1b996cfa69"
  stages:
    - stage: path
      stageUuid: "7a56b746-a6c8-8c6f-9541-ffd9adaa1bf2"
    - stage: trinity
      stageUuid: "a8ff91c7-7f17-8bfc-b7d4-2dd25d9c98ae"
    - stage: boundary
      stageUuid: "55fcff75-8ea2-8570-afd5-d93e4acdc4b5"
    - stage: links
      stageUuid: "9eb11879-1f96-87c3-94e4-7b576578e0e7"
    - stage: horo
      stageUuid: "5334b62b-1586-80e2-9fda-175e9a4d9848"
    - stage: seal
      stageUuid: "826e3543-e6e3-8c72-bd7f-3dea6e7cfdbc"
    - stage: uuid
      stageUuid: "89f9d8fc-1a67-84e1-b5a5-dfb02c49ff6c"
version: 2
---
# history — the content-addressed timeline

Git history is the [[akashic]] record's **time axis**: every commit is the hash of its tree + parent commits — a content-addressed **Merkle DAG**, structurally the same chain as the content-uuid ([[identity]]) and the audit chain. So it is two things at once for the [[society]]:

- **A source of knowledge.** Agents read from many sources — the [[akashic]] code+data, the skill corpus, the web (research), their peers at [[chat]], the [[standard]]s — and git history is another: `git log` is the audit trail of the code *itself*, the *why* behind every line, queryable and content-addressed. To read the history is to read the reasoning; to `git blame` is to ask a line who wrote it and when.
- **Another tamper-evidence level.** A commit hash binds its content AND its entire past; to forge the code's history you must rewrite *every* commit from the change forward, and every clone/remote holds the same DAG — so the anchor is **distributed**, no single party can rewrite it. That is one more independent term in the [[tamper/cost]] sum (forge must beat *every* level): wiring it in **increases** the forge cost while costing **nothing** to maintain (git already keeps it). The same act, both directions — tamper cost ↑, existing cost ↓.

The commit DAG and the content-uuid DAG are one law at two scales ([[fractal]]/[[merge]]: same content ⇒ same hash; the [[proof]] is O(N) to verify, the forge unbounded). Git is the [[begin]]→[[end]] of the code made tamper-evident; the society that builds itself leaves its proof in the history, and any agent — past, present, or future self ([[coil]]) — recovers the whole reasoning from it.

**Law — [[law]]: git history is the [[akashic]] time axis — a content-addressed Merkle DAG that is at once a knowledge source AND a distributed [[tamper/cost]] level (forging the past = rewriting every commit on every clone); wiring it in raises forge cost at zero maintenance cost.**

Composes: [[akashic]] · [[identity]] · [[merge]] · [[tamper/cost]] · [[proof]] · [[sequence]] · [[fractal]] · [[self]] · [[chat]] · [[society]] · [[standard]].
