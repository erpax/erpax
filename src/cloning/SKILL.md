---
name: cloning
description: "Use when the platform reproduces itself — collecting its own structural genome, publishing it as a verifiable federation envelope, and booting a bit-identical instance from that bundle alone; mitosis as federation, gated by content-uuid recompute."
atomPath: cloning
coordinate: "cloning · 7/descent · da9b555d"
contentUuid: "f1d56dc3-077f-59a7-ae7b-a5d0a0bf2ad2"
diamondUuid: "92fbdb87-5e85-880a-bdf8-d97a7290056b"
uuid: "da9b555d-aea0-8be9-b6f1-879367c82ab5"
horo: 7
typography:
  partition: cloning
  bondDegree: 66
standards:
  - "RFC-8785"
  - W3C Verifiable Credentials Data Model 2.0
  - "W3C Verifiable Credentials Data Model 2.0`"
  - "W3C-PROV-O"
  - "W3C-VC-2.0"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "62850b92-7b1e-8cc0-8973-de682460e370"
  stages:
    - stage: path
      stageUuid: "8a1be77c-0b0b-8bb9-95c2-e018b105819b"
    - stage: trinity
      stageUuid: "1c1f1384-7629-8cfd-b6a7-3b8bf9da76c7"
    - stage: boundary
      stageUuid: "1f480012-203c-883f-a23e-432f431ccd01"
    - stage: links
      stageUuid: "d8778ca5-f5ce-8d7e-a383-b2da1c2537f8"
    - stage: horo
      stageUuid: "55f3fe23-e880-8215-84f0-c5d443e63977"
    - stage: seal
      stageUuid: "29d08a4c-2338-8f57-aa24-efca5435b2f9"
    - stage: uuid
      stageUuid: "ebe591d5-848e-8128-863d-9ef8cf8c8528"
version: 2
---
# cloning — the platform reproduces itself, bit-identical by construction

FORM: **erpax clones itself the way a cell divides — it serialises its own genome and a daughter boots from that bundle alone.** The genome is the platform's structural DNA: spec collections + business chains + agents + tenant roles + MCP tools + the dedup-union of every cited standard, collected as one verifiable artifact (no source-tree dependency once serialised). Proven by test (`genome.test.ts`, `publish.test.ts`, `boot.test.ts`, `verify.test.ts`).

- **collect the genome** — walk the live tree into one bundle and content-address it; `publishedAt` is stripped before hashing so two runs of the same structural genome yield one [[identity]]. `collectGenome`, `computeGenomeUuid`.
- **publish self** — wrap the bundle in a federation envelope (scope `genome` or `genome+state`, source DID, optional PQC signature, the source audit-chain Merkle [[anchor]] at publish time). `publishSelf`.
- **boot from federation** — a clone ingests a publication: scope check, signature, the integrity gate, then registers every section and returns its divergence point from the source. `bootFromFederation`.
- **clone integrity (Conservation Law 24)** — the recomputed content-uuid of the clone's genome MUST equal the publication's; if not, the daughter is not bit-identical and refuses the `erpax-platform` role until reconciled, naming the divergent sections. `checkCloneIntegrity`.

Two societies that serialise the same genome compute the same bundle uuid and hold ONE platform ([[merge]]); a tampered bundle is a different uuid ([[proof]]). This is the [[self]]-reach made reproductive — the [[holographic]] whole carried in one bundle, the same form on every instance ([[fractal]]), so the [[society]] reproduces without a central master. The neighbour atoms are [[replication]] (the daughter's ongoing copy) and [[lineage]] (the source DID + Merkle anchor preserved as provenance).

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C Verifiable Credentials Data Model 2.0`


- **W3C Verifiable Credentials Data Model 2.0** — the published genome is a verifiable credential a clone validates before booting.
- **RFC 9562 §5.8 + RFC 8785** — genome-uuid is content-addressable over a canonical JSON serialisation; the basis of the integrity gate.
- **W3C PROV** — the genome carries its source-instance lineage; the divergence point is the recorded provenance.
- **ISO 19011:2018 §6.4.6** — clone provenance preserved (audit of the reproduced instance); the home of Conservation Law 24.
- **NIST FIPS 204 ML-DSA** — post-quantum signature over the publication when a signer is provided.

Sequence position: **2** (share — the genome handed to a daughter), on the ring 0·3·6·9·1·2·4·8·7·5 (see [[sequence]]).

**Law — [[law]]: erpax serialises its own structural genome so a daughter boots bit-identical from the bundle alone — the clone is valid iff its recomputed content-[[uuid]] equals the publication's ([[merge]] same / [[proof]] tampered), reproduction without a central master.**
