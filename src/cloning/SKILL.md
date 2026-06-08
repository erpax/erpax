---
name: cloning
description: "Use when the platform reproduces itself — collecting its own structural genome, publishing it as a verifiable federation envelope, and booting a bit-identical instance from that bundle alone; mitosis as federation, gated by content-uuid recompute."
atomPath: cloning
coordinate: cloning · 2/share · 84c0f801
contentUuid: "203c8262-3038-57f4-8616-d3b239c48837"
diamondUuid: "8f8d337e-2911-8e9c-9f37-31197efccf71"
uuid: "84c0f801-3e9f-8ffb-b92d-bb09628208bf"
horo: 2
bonds:
  in:
    - anchor
    - communication
    - entanglement
    - fractal
    - holographic
    - identity
    - key
    - law
    - lineage
    - merge
    - proof
    - reference
    - replication
    - self
    - sequence
    - society
    - uuid
  out:
    - anchor
    - communication
    - entanglement
    - fractal
    - holographic
    - identity
    - key
    - law
    - lineage
    - merge
    - proof
    - reference
    - replication
    - self
    - sequence
    - society
    - uuid
typography:
  partition: cloning
  bondDegree: 54
  neighbors: []
standards:
  - "ISO 19011:2018 §6.4.6 (clone provenance + Conservation Law 24)"
  - "RFC-8785"
  - "RFC-9562"
  - W3C Verifiable Credentials Data Model 2.0
  - "W3C-PROV-O"
  - "W3C-VC-2.0"
bindings: []
neighbors:
  wikilink:
    - anchor
    - fractal
    - holographic
    - identity
    - law
    - lineage
    - merge
    - proof
    - replication
    - self
    - sequence
    - society
    - uuid
  matrix:
    - anchor
    - communication
    - entanglement
    - fractal
    - holographic
    - identity
    - key
    - law
    - lineage
    - merge
    - proof
    - reference
    - replication
    - self
    - sequence
    - society
    - uuid
  backlinks:
    - anchor
    - communication
    - entanglement
    - fractal
    - holographic
    - identity
    - key
    - law
    - lineage
    - merge
    - proof
    - reference
    - replication
    - self
    - sequence
    - society
    - uuid
signatures:
  computationUuid: "ad405d34-b9d8-8fb8-958a-8e2568767ffd"
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
      stageUuid: "1a602325-5113-8bc2-838b-96c6c3a7fff2"
    - stage: seal
      stageUuid: "e3370e1f-0066-88f9-aa9e-63b77b84c2ff"
    - stage: uuid
      stageUuid: "9a166f21-8ac5-8f62-8e73-8fa00b373e89"
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

- **W3C Verifiable Credentials Data Model 2.0** — the published genome is a verifiable credential a clone validates before booting.
- **RFC 9562 §5.8 + RFC 8785** — genome-uuid is content-addressable over a canonical JSON serialisation; the basis of the integrity gate.
- **W3C PROV** — the genome carries its source-instance lineage; the divergence point is the recorded provenance.
- **ISO 19011:2018 §6.4.6** — clone provenance preserved (audit of the reproduced instance); the home of Conservation Law 24.
- **NIST FIPS 204 ML-DSA** — post-quantum signature over the publication when a signer is provided.

Sequence position: **2** (share — the genome handed to a daughter), on the ring 0·3·6·9·1·2·4·8·7·5 (see [[sequence]]).

**Law — [[law]]: erpax serialises its own structural genome so a daughter boots bit-identical from the bundle alone — the clone is valid iff its recomputed content-[[uuid]] equals the publication's ([[merge]] same / [[proof]] tampered), reproduction without a central master.**
