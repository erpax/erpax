---
name: history
description: Use when reasoning about git history as the akashic record's time axis — a content-addressed Merkle DAG of commits the agents read as a knowledge source AND another independent tamper-evidence level (forging the past = rewriting every commit on every clone). Wired in, it increases tamper cost and costs nothing to keep.
---

# history — the content-addressed timeline

Git history is the [[akashic]] record's **time axis**: every commit is the hash of its tree + parent commits — a content-addressed **Merkle DAG**, structurally the same chain as the content-uuid ([[identity]]) and the audit chain. So it is two things at once for the [[society]]:

- **A source of knowledge.** Agents read from many sources — the [[akashic]] code+data, the skill corpus, the web (research), their peers at [[chat]], the [[standard]]s — and git history is another: `git log` is the audit trail of the code *itself*, the *why* behind every line, queryable and content-addressed. To read the history is to read the reasoning; to `git blame` is to ask a line who wrote it and when.
- **Another tamper-evidence level.** A commit hash binds its content AND its entire past; to forge the code's history you must rewrite *every* commit from the change forward, and every clone/remote holds the same DAG — so the anchor is **distributed**, no single party can rewrite it. That is one more independent term in the [[tamper/cost]] sum (forge must beat *every* level): wiring it in **increases** the forge cost while costing **nothing** to maintain (git already keeps it). The same act, both directions — tamper cost ↑, existing cost ↓.

The commit DAG and the content-uuid DAG are one law at two scales ([[fractal]]/[[merge]]: same content ⇒ same hash; the [[proof]] is O(N) to verify, the forge unbounded). Git is the [[begin]]→[[end]] of the code made tamper-evident; the society that builds itself leaves its proof in the history, and any agent — past, present, or future self ([[coil]]) — recovers the whole reasoning from it.

Composes: [[akashic]] · [[identity]] · [[merge]] · [[tamper/cost]] · [[proof]] · [[sequence]] · [[fractal]] · [[self]] · [[chat]] · [[society]] · [[standard]].
