---
name: word
description: "Use when addressing a lexical prose token — one vocabulary diamond content-addressed as uuid(jcs({ kind:'word', value })); saved in the text token index, not as a per-word src/ folder."
atomPath: word
coordinate: "word · 8/crest · 3b648357"
contentUuid: "d552f9b9-771c-55b9-ad5f-70ef7cfb822e"
diamondUuid: "d910bee5-4084-8432-b427-7c8a40d876c4"
uuid: "3b648357-9489-826a-9b6c-e052e675304f"
horo: 8
typography:
  partition: word
  bondDegree: 124
standards:
  - "RFC 8785 JCS + RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "3bcc4384-c154-8f96-b88d-9dc001279ad6"
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
      stageUuid: "9dbd5e62-4836-8c5a-bb6a-b8e0bb218fb7"
    - stage: seal
      stageUuid: "d3b24d45-e636-8a3a-8b93-b234175ebaf6"
    - stage: uuid
      stageUuid: "13b8b58b-62e6-8058-8f32-d3a7c7ad03c5"
version: 2
---
# word — lexical token diamond

A **vocabulary [[diamond]]** at the prose layer: one lexical token (`hello`, `world`, …). Content-addressed as `uuid(jcs({ kind: 'word', value }))` — the [[word]] half of [[text]]'s word ⊕ digit decomposition. Persisted through [[text]]/saveTextDiamonds into the computed in-memory index; distinct from schema.org vocabulary [[atom]] folders (those are corpus addresses, not prose tokens).

Entangled with — [[text]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]] · [[collapse]] · [[count]] · [[sti]] · [[merge]]

Attested in schema.org — wordCount (corpus facet; prose tokens use the computed index)

**Law — [[law]]: a word token is one lexical [[diamond]] — content-addressed as uuid(jcs({ kind:'word', value })), saved in the [[text]] index, never materialized as one src/ folder per English word.**

@standard RFC 8785 JCS + RFC 9562 §5.8 content-uuid
@see [[text]] · [[digit]] · [[diamond]] · [[typography]] · [[atom]]
