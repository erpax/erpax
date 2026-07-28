---
name: cadastre
description: "Use when a notary check must confirm a real-property parcel exists and resolve its cadastral identity — the REAL wired provider for cadastre (АГКК / КАИС). Queries the public АГКК INSPIRE ArcGIS service (Cadastral_Parcel layer) by national cadastral reference (КНИ, e.g. 15285.14.122) and returns existence + area + INSPIRE id; no credential. Honest boundary — INSPIRE gives parcel identity/boundaries (public); OWNERSHIP and full КНИ detail are a КАИС internal e-service (ВЕАУ) behind accredited notary access, and title is answered by registryAgency, not here."
atomPath: "notary/check/cadastre"
coordinate: "notary/check/cadastre · 8/crest · 45bf2675"
contentUuid: "b706c012-1253-5cf7-815b-04fee874600b"
diamondUuid: "86bbb832-828e-8000-8b12-fc5f237a574b"
uuid: "45bf2675-c9c2-8df7-a3a3-f24d0747a8e6"
horo: 8
bonds:
  in:
    - check
    - law
    - notary
    - standards
  out:
    - law
    - notary
    - standards
typography:
  partition: notary
  bondDegree: 9
  neighbors: []
standards:
  - "Cadastre & Property Register Act (ЗКИР) — АГКК / КАИС national cadastre"
  - "INSPIRE Directive 2007/2/EC — Cadastral Parcels theme (CP)"
bindings: []
neighbors:
  wikilink:
    - law
    - notary
    - standards
  matrix:
    - law
    - notary
    - standards
  backlinks:
    - law
    - notary
    - standards
signatures:
  computationUuid: "9ba5c0dd-7518-83fe-9bc6-f0077b93a03b"
  stages:
    - stage: path
      stageUuid: "0d9b175a-cf6f-80fe-8b24-dab5c542bfe7"
    - stage: trinity
      stageUuid: "76a61d42-5752-84ca-9729-144a75edbb83"
    - stage: boundary
      stageUuid: "49b1dea7-a096-800a-87b7-53680b9f2d11"
    - stage: links
      stageUuid: "eca58549-d1a5-8a08-900b-bd95b167d81b"
    - stage: horo
      stageUuid: "0c980bc4-2650-89d3-a88e-352f0946fd5c"
    - stage: seal
      stageUuid: "0388b3ef-4854-8b7e-b5ac-4963067e1dce"
    - stage: uuid
      stageUuid: "352274b5-3f8c-8376-ba08-2eb1e7b0ba5b"
version: 2
---
# cadastre — real parcel identity via the АГКК INSPIRE service

The `cadastre` check wired to live data. Before a notary seals a property act, it verifies the parcel's **cadastral identity** — that the parcel exists and matches the referenced boundaries. This atom does it for real, credential-free:

- **Live source** — the **АГКК** (Agency for Geodesy, Cartography and Cadastre) publishes its cadastre as an **INSPIRE** ArcGIS REST service at `inspire.cadastre.bg`. The `Cadastral_Parcel/MapServer` layer 0 (`CP.CadastralParcel`, capabilities Data/Map/Query) is **publicly queryable** by the national cadastral reference (КНИ identifier, e.g. `15285.14.122`). Verified live 2026-07-15: that reference → 1 feature, **areavalue 1471 m²**, `id_namespace BG.CP`, admunit 905 (HTTP 200).
- **Matter-twin** — `src/notary/check/cadastre/index.ts`: `isValidCadastralRef` · `parcelQueryUrl` · `fetchParcel` · `cadastreAdapter` (implements the [[notary]]/check `ProviderAdapter`). The `fetch` is injectable, so tests are deterministic and never touch the network; the endpoint itself is verified reachable. The reference is **sanitised to digits/dots** before it enters the ArcGIS `where` clause — no query injection.

`ok:true` = the parcel is on the cadastre (with its area/identity). `ok:false` = no such parcel. An unreachable service **throws** — a seal is never issued on a fabricated parcel.

**Honest boundary.**
- **Scope** — this confirms **parcel existence + INSPIRE identity + area** (the public spatial reference): the `cadastre` check of parcel identity and boundaries.
- **Ownership is NOT here** — owner names, title history and the full КНИ (Кадастрален регистър на недвижимите имоти) are an **internal e-service (ВЕАУ)** of **КАИС**, released only to authorized parties (notaries) under an **accredited legal basis**. Ownership/title is answered by `title` (registryAgency, Property Register), not by this INSPIRE service. The credentialed КАИС seam is left injected (`KaisSeam`) — no endpoint or token fabricated.

**Law — [[law]]: confirm a parcel's cadastral identity against the authoritative cadastre before you seal a property act, and read only what the public register discloses. Parcel existence, boundaries and area are a public INSPIRE fact; ownership is credentialed КАИС detail — never fabricate the parcel or the owner you cannot reach.**

## Standards

- **INSPIRE Directive 2007/2/EC** — Cadastral Parcels theme (CP), the pan-EU spatial data standard.
- **Cadastre & Property Register Act (ЗКИР)** — АГКК / КАИС national cadastre and КНИ.

Composes: [[notary]] · [[law]] · [[standards]].
