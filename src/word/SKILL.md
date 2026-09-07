---
name: word
description: "Use when addressing a lexical prose token — one vocabulary diamond content-addressed as uuid(jcs({ kind:'word', value })); saved in the text token index, not as a per-word src/ folder."
atomPath: word
coordinate: "word · 8/crest · c461a078"
contentUuid: "422d02c2-a038-5ef9-9992-96166582331c"
diamondUuid: "1d515722-af07-8e54-b07b-a9c144d93765"
uuid: "c461a078-fd82-8271-9438-3113a421f5d0"
horo: 8
typography:
  partition: word
  bondDegree: 122
standards:
  - "RFC 8785 JCS + RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "b91d3d96-d1f5-8977-942a-6e83d23a17e1"
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
      stageUuid: "b404a3a4-1370-8833-b558-4ebd0c576cb8"
    - stage: seal
      stageUuid: "d3b24d45-e636-8a3a-8b93-b234175ebaf6"
    - stage: uuid
      stageUuid: "094c66be-b35b-82a3-9c8e-68c3a3f5cc44"
version: 2
---
# word — lexical token diamond

A **vocabulary [[diamond]]** at the prose layer: one lexical token (`hello`, `world`, …). Content-addressed as `uuid(jcs({ kind: 'word', value }))` — the [[word]] half of [[text]]'s word ⊕ digit decomposition. Persisted through [[text]]/saveTextDiamonds into the computed in-memory index; distinct from schema.org vocabulary [[atom]] folders (those are corpus addresses, not prose tokens).

Entangled with — [[text]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]] · [[collapse]] · [[count]] · [[sti]] · [[merge]]

Attested in schema.org — wordCount (corpus facet; prose tokens use the computed index)

**Law — [[law]]: a word token is one lexical [[diamond]] — content-addressed as uuid(jcs({ kind:'word', value })), saved in the [[text]] index, never materialized as one src/ folder per English word.**

@standard RFC 8785 JCS + RFC 9562 §5.8 content-uuid
@see [[text]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]]
