---
name: unreached
description: "Use when reasoning about unreached — The accounting wave's remaining 258 is not 258 separate defects. It is **80 leaves and their ancestors**: an atom is charged , and every folder above it is then charged for the…"
atomPath: "rules/unreached"
coordinate: "rules/unreached · 7/descent · 01b807ce"
contentUuid: "d23f1a9f-6794-58e3-9804-bb4c1ac7b421"
diamondUuid: "57194f5e-d5df-8ea0-9643-a3eb8e6f4c2d"
uuid: "01b807ce-24af-8d73-baa6-dac43cc2974a"
horo: 7
typography:
  partition: rules
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "de936590-0fad-8ff4-a30d-d5c5d8e7babe"
  stages:
    - stage: path
      stageUuid: "9d6e22fb-5a8a-815c-9c16-f9d20f2c1b0f"
    - stage: trinity
      stageUuid: "94fec9b5-6dd9-8ee2-936a-2dcca248a85a"
    - stage: boundary
      stageUuid: "daa8eda2-5de6-825b-bd7d-a7ad470a556f"
    - stage: links
      stageUuid: "720e16f5-0f59-85e7-9eeb-8fa65a613331"
    - stage: horo
      stageUuid: "29c5c49f-b7ae-880b-89ef-a42484cb67d7"
    - stage: seal
      stageUuid: "7e48da22-6c40-8767-9cf0-31bb90b04753"
    - stage: uuid
      stageUuid: "19f63e7a-03d1-89a0-bfbf-ea2a7423488b"
version: 2
---
# rules/unreached — 80 atoms of code that nothing reaches, from any entry this corpus has

The accounting wave's remaining 258 is not 258 separate defects. It is **80 leaves and their
ancestors**: an atom is charged `deployment: no materialised face`, and every folder above it is then
charged `path axis: ancestor chain unsealed` for the same absence. Pay the leaf and the chain pays
itself — the cascade [[diamond]]/membership already corrected once, one axis over.

## Five doors, tried before an atom is named

Each is a legitimate way to be reached, or a legitimate reason not to need reaching:

| door | what it admits |
| --- | --- |
| deployment face | the atom is reached from a worker · plugin · pwa entry |
| the gate registry | `src/rules/index.ts` imports it — it runs in CI |
| the CLI | `erpax` reaches it |
| a published package | it is a **public face**: `@erpax/*` ships it, so consumers reach it |
| a vocabulary word | its barrel exists only to name a schema.org word ([[seal]] fixed this once) |

**80 survive all five.** They are not gates, not CLI, not deployed, not shipped, and not words.

I expected the opposite. My first hypothesis was that the charge over-counts — that these are gate and
research atoms reached from the tooling entries and simply not from the worker. Measured: **3 of 83**
are reached from the gate or CLI. The premise was wrong and the charge is right.

## The door was checked, and never propagated — 78 to 64

`hasDeploymentFace` asked each atom whether IT carries a worker/plugin/pwa face. It never asked
whether something that does **imports it**. So an atom whose only door is "a deployed atom reaches
it" was charged as unreached.

`xml/escape` is the plain case: three exporters that all carry a face import it, and it was counted
anyway. Seeding the reachability walk with every face-bearing atom's barrel — the same walk the
tooling entries already get — took the count from **78 to 64**.

This is the [[rules]]/domain law turned on this axis: *a law reaches exactly the cases its checker
opens*. Fourteen atoms were neither passing nor failing; the question was never asked of them, and
an unasked question reports as a violation just as readily as it reports as green.

## What it is not

This is a **candidate list, never a purge list** — the same boundary [[rules]]/unfolded carries, and
for the same reason. An atom reached only DYNAMICALLY is invisible to a lexical import walk: a path
string in a config, an `importMap` entry, a `relationTo` slug. Payload reaches admin components
exactly that way, and `admin/ui/fields` is correctly NOT here because the generated importMap names
it — while `admin/ui/cells`, `admin/ui/dashboard` and `admin/ui/nav` are, because nothing names them.

So this proves nothing IMPORTS the atom. Whether that means *wire it* or *drop it* is a per-atom
product decision, and deleting 80 atoms because a lexical walk did not find them is exactly the blind
sweep this corpus refuses.

## It is not a chain — the hypothesis is refuted

The obvious read of 69 unreached atoms is a chain: find the root, wire it, and the rest follow.
`atomLeverage` measures it, and the answer is no.

| | |
| --- | ---: |
| unreached atoms | 69 |
| imported by **nobody at all** | 5 |
| imported **only by their own test, or by other unreached code** | 64 |
| **closing only themselves** | **63 of 69** |

The single lever is `payable`, whose barrel is nothing but `export *` over `aging · analytics ·
discounts · workflow` — wire it and five close. After that the list is flat: `google/workspace`,
`iso/3166/1`, `iso/3166/2`, `llm` and `separation` close two each, and everything else closes one.

So this is not one gap with 69 symptoms. It is **63 independent atoms that each have a proof and no
consumer** — `rules/unfolded`'s "its single use is its own test" at atom scale, and the reason each
needs a per-atom decision rather than one wire.

The `payable` case names what that decision costs. AP aging, analytics, early-payment discounts and
approval workflow are all implemented and tested; `payload-types.ts` carries a `payable` slug, so the
collection exists too — and **nothing imports `@/payable`**. The mentions elsewhere are prose and a
string literal. Whether that is a wire to write or capability to drop is a product call, which is
exactly the boundary this atom already states.

## The sixth door — a path string is a reach, and the census said it was not

The boundary above said it plainly: *Payload reaches admin components by a path string, and
`admin/ui/cells`, `admin/ui/dashboard` and `admin/ui/nav` are here because nothing names them.* The
second half was false. `src/plugins/admin/ui/index.ts` names all three — `Cell: '@/admin/ui/cells/
SealBadgeCell'`, `'@/admin/ui/dashboard/CorpusEntropyDashboard'`, `'@/admin/ui/nav/CorpusNavLinks'` —
and a test **pinned them as unreferenced**, certifying the walk's blind spot as a fact about the tree.
They were the three highest-ranked `unreached` leads on the frontier.

`nameDoor` reads every `ts.StringLiteral` that is not an import specifier and matches a Payload
component path, plus the generated importMap. Measured 2026-10-03: **244 literals, 150 distinct
paths, 3 of 69 charged atoms named** — 69 → 66, and the three were exactly the ones the prose had
already pointed at. A comment quoting a path is not a literal and opens nothing; the test plants both.

## The involution — the census asked from the referrer's seat

`unreachedAtoms` walks forward from entries and reports what no walk reaches. `referrersOf` walks
**backward** from each charged atom and reports who reaches it from outside the charged set: an
importing file, or a path string. The two are duals, not the same instrument re-run — which is why
`unreachedStrict` is not one: it closes a door on the same forward walk and can only ever agree.

A charged atom with a **live** referrer is a lead the involution **refutes**: a door the forward walk
does not open. The frontier tags it a `lie` ([[self]]/involute) and the fix is a door in this walk,
never a sweep of the atom. Asked live the day it was written, it refuted two — `search/engine` and
`security/header` pass through the shipped/word doors, which had never propagated what their barrels
import, exactly as the deployed door once had not. Propagating them released six atoms (66 → 60):
the two children and four carried through `iso/20022` and `iso/3166/1`.

The other two it reported were not refutations. `dashboard`'s barrel imports `dashboard/nav` and
**nothing imports the barrel**; the atom-level census had marked `dashboard` reached because a
descendant file is, so the barrel's death was invisible to it. A referrer therefore carries a `live`
flag read from the forward walk's own FILE set (`reachedFiles`): a dead referrer does not refute the
lead, it **carries** it, and names the address where the dead code actually starts. A charged atom
with no live referrer holds from both seats, and that is the only kind the queue should rank.

Two corrections of the instrument came out of reading its first answers. Seeding exempt barrels
through the ancestor-marking walk exempted whole parent chains (`en/16931`, `ifrs/15`, `versions`
read as reached with no referrer at all: 50 where the honest count is 60) — an exempt barrel seeds
what it imports and nothing else. And the probe that ran the measurement sat at `src/` root, so two
other axes counted it: the instrument measuring itself.

**Law — [[law]]: an atom of code earns its place by being reachable. Try every door — deployed,
gated, shipped, a word, or a name — and what is left is code nothing runs. Ask the question from the
referrer's seat before ranking it; name it, ratchet it, and decide per atom; never sweep it.**

## Sealed — the walk is paid once per tree

Measured 2026-10-03 in a fresh process with the law populations already sealed: `unreachedAtoms` cost
**42.7–54.8 s** of import walking, and every coil and every develop paid it — the develop twice, once
for the rosetta and once for the frontier's sources. The census is a pure function of the tree, so it
is now sealed by the corpus fingerprint ([[cache]]/fingerprint, on disk): the first caller computes,
every later caller and every later process reads it — **1.2 s** on the hit, and any edit bumps the
fingerprint and recomputes. `reachedFiles` is sealed in-process only, because a Set does not round-trip
through JSON and this corpus never seals what it cannot read back.

## Standards

- **ISO/IEC 25010:2023 §5.6** — maintainability: unreachable code is a cost with no counterpart.

Composes: [[rules]]/unfolded · [[rules]]/cycle · [[diamond]]/membership · [[law]].
