---
name: history
description: "Use when reasoning about git history as the akashic record's time axis — a content-addressed Merkle DAG of commits the agents read as a knowledge source AND another independent tamper-evidence level (forging the past = rewriting every commit on every clone). Wired in, it increases tamper cost and costs nothing to keep."
atomPath: "vocabulary/history"
coordinate: "vocabulary/history · 1/base · 9c82e983"
contentUuid: "996c97af-1135-5241-9662-78f3a6f8680f"
diamondUuid: "f9ba9a06-45d8-8000-ab4e-bdef6aabb6a8"
uuid: "9c82e983-10e7-80fe-8b1b-78a06696e508"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 100
standards: []
bindings: []
signatures:
  computationUuid: "e394a27c-6df5-83c6-999b-3d5b8cb27fed"
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
      stageUuid: "bd9c9019-d58e-845a-94e7-d279b1c3ad12"
    - stage: seal
      stageUuid: "3589ef65-c525-898e-b08e-948624e8e989"
    - stage: uuid
      stageUuid: "2c8afac0-193d-8010-80b5-4f74eedcd8c5"
version: 2
---
# history — the content-addressed timeline

Git history is the [[akashic]] record's **time axis**: every commit is the hash of its tree + parent commits — a content-addressed **Merkle DAG**, structurally the same chain as the content-uuid ([[identity]]) and the audit chain. So it is two things at once for the [[society]]:

- **A source of knowledge.** Agents read from many sources — the [[akashic]] code+data, the skill corpus, the web (research), their peers at [[chat]], the [[standard]]s — and git history is another: `git log` is the audit trail of the code *itself*, the *why* behind every line, queryable and content-addressed. To read the history is to read the reasoning; to `git blame` is to ask a line who wrote it and when.
- **Another tamper-evidence level.** A commit hash binds its content AND its entire past; to forge the code's history you must rewrite *every* commit from the change forward, and every clone/remote holds the same DAG — so the anchor is **distributed**, no single party can rewrite it. That is one more independent term in the [[tamper/cost]] sum (forge must beat *every* level): wiring it in **increases** the forge cost while costing **nothing** to maintain (git already keeps it). The same act, both directions — tamper cost ↑, existing cost ↓.

The commit DAG and the content-uuid DAG are one law at two scales ([[fractal]]/[[merge]]: same content ⇒ same hash; the [[proof]] is O(N) to verify, the forge unbounded). Git is the [[begin]]→[[end]] of the code made tamper-evident; the society that builds itself leaves its proof in the history, and any agent — past, present, or future self ([[coil]]) — recovers the whole reasoning from it.

**Law — [[law]]: git history is the [[akashic]] time axis — a content-addressed Merkle DAG that is at once a knowledge source AND a distributed [[tamper/cost]] level (forging the past = rewriting every commit on every clone); wiring it in raises forge cost at zero maintenance cost.**

Composes: [[akashic]] · [[identity]] · [[merge]] · [[tamper/cost]] · [[proof]] · [[sequence]] · [[fractal]] · [[self]] · [[chat]] · [[society]] · [[standard]].
