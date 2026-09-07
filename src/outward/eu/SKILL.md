---
name: eu
description: "Use when checking whether the pan-EU authorities erpax depends on have moved — VIES (the VAT-validation contract), the ECB currency set, the Peppol directory envelope, and the EU sanctions schema. Each probe asks a STABLE question so a moved address is real news, never the daily churn. CLI lane: erpax outward eu [--write]."
atomPath: "outward/eu"
coordinate: "outward/eu · 2/share · eeefb33c"
contentUuid: "293691c9-c73e-52eb-9914-c1c33e94ab58"
diamondUuid: "83788a99-8ce3-84c4-9f97-53bad3b4caee"
uuid: "eeefb33c-11f5-8509-8461-e9ca214688d8"
horo: 2
typography:
  partition: outward
  bondDegree: 37
standards:
  - "ISO 19011:2018 §6.4 — audit evidence: the receipt IS the evidence"
bindings: []
signatures:
  computationUuid: "52501a0b-a5e4-8f53-af87-ada376c70bc4"
  stages:
    - stage: path
      stageUuid: "04e58abe-20e7-8273-9576-a9645d43c475"
    - stage: trinity
      stageUuid: "505f9c78-9f1b-835e-821e-e2242984d1e2"
    - stage: boundary
      stageUuid: "33339b5d-8fdd-8e7c-94da-27c8d0d4d9b0"
    - stage: links
      stageUuid: "25d978cb-52e2-8c61-82af-75ecd2885785"
    - stage: horo
      stageUuid: "e3aebc46-d1dc-83af-bead-628d55de3d3a"
    - stage: seal
      stageUuid: "5bd2941d-cd9f-8c13-8c83-767a51c3d7a6"
    - stage: uuid
      stageUuid: "bbdd8eb3-9da3-89a0-b609-e99f3b351c35"
version: 2
---
# outward/eu — the four authorities erpax stands on, receipted

VIES answers whether a VAT number is live. The sanctions list gates a counterparty.
The Peppol directory says who can receive an e-invoice. The ECB fixes the rate a
foreign invoice is priced at. **None of them is erpax's to control** — which is
exactly why their answers deserve receipts ([[outward]]).

## Each probe asks a stable question

That is the entire discipline. A receipt is meaningless if the query drifts, and it
is **noise** if the answer is expected to change every day — the ECB republishes
rates each morning, so probing the payload would report `moved` daily and teach
everyone to ignore the lane.

| probe | what it asks | a `moved` address means |
| --- | --- | --- |
| `vies` | the WSDL's declared operations | **the API contract changed** |
| `ecb` | the SET of published currency codes | a currency was added or dropped |
| `peppol` | the response envelope's keys for one fixed query | the directory API reshaped |
| `sanctions` | the list's root element + namespaces | the sanctions schema moved |

Each of those deserves a human. A new EUR/USD rate does not — and the test pins
exactly that: change the rates and the address **holds**; add a currency and it
**moves**.

## A lane, never a gate

It reaches the public network, so nothing in the push path may depend on it. It is
read-only and unauthenticated — four GETs to public EU endpoints, **no credential and
no tenant data leaves** — and only the addresses are stored, never the payloads.

```bash
erpax outward eu           # dry-run: report fresh · unchanged · moved · unreachable
erpax outward eu --write   # record the addresses in outward-receipts.json
```

The exit code judges the **world**, not the network: non-zero only when an answer
MOVED. An unreachable authority exits 0 — someone else's server being down is not
erpax's failure.

**Honest boundary.** A receipt proves an answer is **the same as last time** — never
that it is true, current, or that the host is who it claims (no certificate pinning
here). The projections are deliberately narrow: this watches the **contract**, not
the content, so a VAT number going invalid or a name entering the sanctions list is
*not* what this notices — those are queries the application makes, not facts about
the rail.

Composes: [[outward]] · [[country]] · [[standards]].
