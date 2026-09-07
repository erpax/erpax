---
name: marine
description: "Use when reasoning about the law of the sea on the quantum scale — maritime jurisdiction as geometry (UNCLOS zones from distance), flag-state governance as the vessel's content-identity, and general average as maritime double-entry; educational, not legal advice."
atomPath: "quantum/marine"
coordinate: "quantum/marine · 1/base · 6821c057"
contentUuid: "85067956-c237-5642-a5ce-e7b64ab75d7c"
diamondUuid: "07faf3c4-456c-807e-ac66-f1a412906834"
uuid: "6821c057-7e00-864c-bc13-129be210c9ed"
horo: 1
typography:
  partition: quantum
  bondDegree: 30
standards:
  - "UNCLOS (1982) Arts. 3·33·57·86·92; the York-Antwerp general-average principle"
bindings: []
signatures:
  computationUuid: "1081f2aa-0e82-8ec0-9be6-6d7b4d997f7e"
  stages:
    - stage: path
      stageUuid: "08ca1fa5-f3cc-81ec-8041-a6d17cf30cab"
    - stage: trinity
      stageUuid: "46ae7f00-8a3a-8684-9e18-8cc8fc93a43a"
    - stage: boundary
      stageUuid: "2192bf56-72bf-8e6d-aa44-856b0e5a737e"
    - stage: links
      stageUuid: "ac5c39b3-ff11-88c1-8ee3-11e09c5b6f31"
    - stage: horo
      stageUuid: "4c635cef-5e91-8b1f-92bb-b333c0e75b7f"
    - stage: seal
      stageUuid: "b62b0911-135e-8eba-b654-8a2b486277e5"
    - stage: uuid
      stageUuid: "8742fd4a-3744-8cff-90ac-3c4b534d1834"
quantum:
  superposition:
    - accounting
    - balance
    - cargo
    - identity
    - law
    - quantum
    - sea
    - ship
    - superposition
  collapse:
    - "UNCLOS (1982) Arts. 3·33·57·86·92; the York-Antwerp general-average principle"
    - "Use when reasoning about the law of the sea on the quantum scale — maritime jurisdiction as geometry (UNCLOS zones from distance), flag-state governance as the vessel's content-identity, and general average as maritime double-entry; educational, not legal advice."
    - "matter-twin:src/quantum/marine/index.ts"
    - "the sea is governed by geometry — distance from the baseline fixes the zone, the zone fixes the sovereign; beyond every zone, only the flag (the vessel's identity) governs. A sacrifice for the common voyage is shared by all in proportion, and the books balance even at sea."
    - "zones computed from distance, general average proportional to value — never asserted"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "1081f2aa-0e82-8ec0-9be6-6d7b4d997f7e"
    contentUuid: "85067956-c237-5642-a5ce-e7b64ab75d7c"
version: 2
---
# quantum/marine — the law of the sea, encoded in math

The sea has no fences, so its law is **geometry**: where you are determines who governs you. UNCLOS (1982) fixes the zones as exact distances from the baseline, which makes jurisdiction computable from a position — *position → zone → sovereign*:

- **≤ 12 nm — territorial sea** (Art. 3): coastal-state sovereignty, subject to innocent passage.
- **≤ 24 nm — contiguous zone** (Art. 33): limited enforcement (customs, immigration, sanitary).
- **≤ 200 nm — EEZ** (Art. 57): coastal-state sovereign rights over resources; high-seas freedoms otherwise remain.
- **> 200 nm — high seas** (Art. 86): no sovereignty. Only the **flag state** governs (Art. 92) — and a [[vessel]]'s flag is its registry, its [[identity]], a content-[[uuid]]. On the open sea, *you are the law you are registered under*.

## General average — the sea's double-entry

When part of the venture is sacrificed to save the whole — [[cargo]] jettisoned, a [[ship]] deliberately grounded — the loss is borne not by the unlucky owner but by **all interests in proportion to the value each had at risk** (the York-Antwerp principle). That is exactly [[accounting]]: the saved are debited, the sacrificer credited, and the contributions sum to the loss — the books [[balance]], even at sea. `generalAverage` computes it; conservation is the test.

## Honest

The zone thresholds and article numbers are **treaty facts** (nautical miles under UNCLOS); general average is stated as its proportional **principle**, in plain words, not reproduced from any rule text. This models the *structure* of the law so it is checkable — it is educational, **not legal advice**.

Matter-twin: `src/quantum/marine/index.ts` (`zoneOf` · `jurisdiction` · `generalAverage` · `NM_TERRITORIAL` · `NM_CONTIGUOUS` · `NM_EEZ`). Composes [[vessel]] · [[ship]] · [[cargo]] · [[sea]] · [[identity]] · [[uuid]] · [[accounting]] · [[balance]] · [[quantum]] · [[law]].

**Law — [[law]]: the sea is governed by geometry — distance from the baseline fixes the zone, the zone fixes the sovereign; beyond every zone, only the flag (the vessel's identity) governs. A sacrifice for the common voyage is shared by all in proportion, and the books balance even at sea.**

@audit zones computed from distance, general average proportional to value — never asserted
@standard UNCLOS (1982) Arts. 3·33·57·86·92; the York-Antwerp general-average principle

<sub>content-uuid `85067956-c237-5642-a5ce-e7b64ab75d7c` · account `quantum/marine` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
