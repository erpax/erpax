---
name: word
description: "Use when addressing a lexical prose token — one vocabulary diamond content-addressed as uuid(jcs({ kind:'word', value })); saved in the text token index, not as a per-word src/ folder."
atomPath: word
coordinate: "word · 4/weave · 15f5b6ac"
contentUuid: "61b5c14a-ccc9-59a0-92c1-95cf3eb1e702"
diamondUuid: "b53b07be-b9f9-884d-9a2b-a9656a875a20"
uuid: "15f5b6ac-a800-8f8b-b216-abdbdc0255f3"
horo: 4
typography:
  partition: word
  bondDegree: 124
standards:
  - "RFC 8785 JCS + RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "c64e6dbf-2477-8c74-be55-8bc9141200b0"
  stages:
    - stage: path
      stageUuid: "d192d2ae-93f9-8e99-8ab1-5fbc545bc75f"
    - stage: trinity
      stageUuid: "0914ad4e-0531-8c1e-860c-5cb2ef397355"
    - stage: boundary
      stageUuid: "0885ae7e-40a2-814c-bc26-20c7024c6099"
    - stage: links
      stageUuid: "8b65b08a-c3ad-88f4-929c-7e648c6fd08c"
    - stage: horo
      stageUuid: "38bcd0d3-3e8e-88e4-a304-511a1de4b0d8"
    - stage: seal
      stageUuid: "d3b24d45-e636-8a3a-8b93-b234175ebaf6"
    - stage: uuid
      stageUuid: "640720e1-8bc3-846f-9720-44b29fb2ad7e"
version: 2
---
# word — lexical token diamond

A **vocabulary [[diamond]]** at the prose layer: one lexical token (`hello`, `world`, …). Content-addressed as `uuid(jcs({ kind: 'word', value }))` — the [[word]] half of [[text]]'s word ⊕ digit decomposition. Persisted through [[text]]/saveTextDiamonds into the computed in-memory index; distinct from schema.org vocabulary [[atom]] folders (those are corpus addresses, not prose tokens).

Entangled with — [[text]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]] · [[collapse]] · [[count]] · [[sti]] · [[merge]]

Attested in schema.org — wordCount (corpus facet; prose tokens use the computed index)

**Law — [[law]]: a word token is one lexical [[diamond]] — content-addressed as uuid(jcs({ kind:'word', value })), saved in the [[text]] index, never materialized as one src/ folder per English word.**

@standard RFC 8785 JCS + RFC 9562 §5.8 content-uuid
@see [[text]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]]
