---
name: word
description: "Use when addressing a lexical prose token — one vocabulary diamond content-addressed as uuid(jcs({ kind:'word', value })); saved in the text token index, not as a per-word src/ folder."
atomPath: word
coordinate: "word · 5/round · 093f26b7"
contentUuid: "cc04662f-d502-5a26-bb17-b4284965b88f"
diamondUuid: "8a542d46-226b-8f05-86be-ad084a75408c"
uuid: "093f26b7-394e-8578-8fa7-732c6b7c7753"
horo: 5
typography:
  partition: word
  bondDegree: 124
standards:
  - "RFC 8785 JCS + RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "0fdb6dd3-1b7f-82b9-a18e-a50a71c7c236"
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
      stageUuid: "22ce7371-d804-8ec4-987b-b1fccfe17b75"
    - stage: seal
      stageUuid: "d3b24d45-e636-8a3a-8b93-b234175ebaf6"
    - stage: uuid
      stageUuid: "21207ce2-190a-82e9-8984-50d06e4a20d7"
version: 2
---
# word — lexical token diamond

A **vocabulary [[diamond]]** at the prose layer: one lexical token (`hello`, `world`, …). Content-addressed as `uuid(jcs({ kind: 'word', value }))` — the [[word]] half of [[text]]'s word ⊕ digit decomposition. Persisted through [[text]]/saveTextDiamonds into the computed in-memory index; distinct from schema.org vocabulary [[atom]] folders (those are corpus addresses, not prose tokens).

Entangled with — [[text]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]] · [[collapse]] · [[count]] · [[sti]] · [[merge]]

Attested in schema.org — wordCount (corpus facet; prose tokens use the computed index)

**Law — [[law]]: a word token is one lexical [[diamond]] — content-addressed as uuid(jcs({ kind:'word', value })), saved in the [[text]] index, never materialized as one src/ folder per English word.**

@standard RFC 8785 JCS + RFC 9562 §5.8 content-uuid
@see [[text]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]]
