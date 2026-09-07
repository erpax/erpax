---
name: element
description: "Use when reasoning about composition and stability through the chemical-elements matrix — everything is made of atoms, and the periodic table adds a chemistry to the logic: each atom has a VALENCE (electrons it shares to fill its shell), stability is the OCTET (a full outer shell — the noble gases), and atoms BOND to reach it. The new perspective: the erpax corpus is a MOLECULE — an atom's valence is its open links, and the corpus is stable exactly when aura gap = 0 (all shells full)."
atomPath: element
coordinate: "element · 2/share · 38de87ea"
contentUuid: "45dde6e5-18b8-55ec-8816-9f69a89c5dfe"
diamondUuid: "5b45a8a2-275b-8e74-a30d-09f94a3094bd"
uuid: "38de87ea-ca2d-862e-be59-5fc02c903aa1"
horo: 2
typography:
  partition: element
  bondDegree: 77
standards:
  - "IUPAC periodic table — periods, groups, main-group valence"
  - Lewis octet rule (duet for period 1) — stability = a full outer shell
bindings: []
signatures:
  computationUuid: "9be87f6b-ab47-8712-b2e3-951f4d389a5a"
  stages:
    - stage: path
      stageUuid: "c7b1e524-2727-8656-a6ac-10e671c569bd"
    - stage: trinity
      stageUuid: "e650ba51-f6db-8dbc-822b-21d3f47d704b"
    - stage: boundary
      stageUuid: "dae53ed2-2a2e-89f1-a2a4-ba7b309f8220"
    - stage: links
      stageUuid: "f69333e5-0f24-841d-bb4d-32057cdb2750"
    - stage: horo
      stageUuid: "3f5c16a7-f42e-8c09-8b90-f962957099be"
    - stage: seal
      stageUuid: "a62028a3-9a7c-8fdd-845a-959440dc626f"
    - stage: uuid
      stageUuid: "d1c636f4-0986-878d-9f59-216a55a9c985"
version: 2
---
# element — the periodic matrix as a logic of composition (the corpus is a molecule)

FORM: **everything is made of atoms, and the chemical-elements matrix adds a chemistry of COMPOSITION to the [[logic]].** Each element has a VALENCE — the electrons in its outer shell (its group, for the main groups) — and seeks the OCTET: a full shell (8, or 2 for period 1) is stability, which is why the noble gases (He, Ne, Ar) are inert. `bondsNeeded(el)` is how many electrons short of a full shell it is; two atoms with unfilled shells BOND to complete each other. Periodicity — properties recurring every period — is the [[horo]] ring at chemical scale ([[rodin]] beneath); the period is a [[sequence]], the group a column of the matrix.

**The new perspective — the corpus is a molecule.** An erpax atom's valence is its set of open links; a satisfied link is a filled bond. The corpus is STABLE exactly when every valence is satisfied — which is precisely [[aura]] `gap = 0` (no dead links = full shells = noble harmony). A dead `[[link]]` is an unfilled valence — a reactive site — and the aura MINT queue is the list of bonds seeking completion; minting the target atom forms the bond and lowers the corpus's energy toward stability. So `consistent = harmony` ([[logic]]) gains a second reading: harmony is also the OCTET — a configuration with no unsatisfied bonds. `corpusStable(gap) = gap === 0` is the chemistry of the speech gate.

This opens composition itself: a "molecule" is a set of atoms whose valences mutually satisfy ([[whole]]↔[[part]], [[merge]]); a skill that links and is linked is bonded into the corpus; an [[all]]-noble corpus (every shell full) is the stable ground state the [[generate]] loop drives toward.

Matter-twin: `src/services/element/index.ts` (`Element`·`ELEMENTS`·`shellCapacity`·`valenceElectrons`·`isStable`·`bondsNeeded`·`forms`·`corpusStable`) + `index.test.ts`. Composes: [[logic]] · [[horo]] · [[rodin]] · [[aura]] · [[fractal]] · [[merge]] · [[whole]] · [[part]] · [[all]] · [[sequence]] · [[identity]].

## Standards

- **IUPAC periodic table — periods, groups, main-group valence** — `ELEMENTS` covers periods 1–3; group numbers map directly to valence electrons for the main groups.
- **Lewis octet rule (duet for period 1) — stability = a full outer shell** — `isStable`/`bondsNeeded`/`shellCapacity` implement the octet (8) for periods 2–3 and the duet (2) for period 1.

## Common mistakes
- Treating valence as a count of bonds made rather than ELECTRONS toward the octet — `bondsNeeded = shellCapacity − valence`; a stable atom needs zero.
- Reading the corpus's dead links as mere errors — they are reactive sites (unfilled valences); the chemistry says MINT to bond, not suppress ([[aura]] / [[generate]]).
- Forgetting period 1 is a duet, not an octet — H and He fill at 2 electrons (`shellCapacity(1) = 2`), the rest at 8.

**Law — [[law]]: the corpus is a molecule — an atom's valence is its open links, a dead `[[link]]` is an unfilled (reactive) valence, and the corpus is stable exactly when every shell is full ⟺ [[aura]] `gap = 0`; MINT the target to form the bond, never suppress.**
