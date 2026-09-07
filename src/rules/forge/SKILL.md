---
name: forge
description: "Use when reasoning about forge — **That function never contacted Zenodo.** It was named , it logged as though a deposit had been made, and it returned a well-formed DOI and a URL for a record that does not exist."
atomPath: "rules/forge"
coordinate: "rules/forge · 1/base · 3896f07f"
contentUuid: "6d092cca-e972-5289-af06-1c0e0fc6d9dd"
diamondUuid: "e27c8ea7-d588-876e-8237-6a0527084aa3"
uuid: "3896f07f-95c4-85a7-8ef7-5993dc0f70ea"
horo: 1
typography:
  partition: rules
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "2c613645-819e-8b0d-8fce-b23933030a85"
  stages:
    - stage: path
      stageUuid: "b4ae3133-6eef-8257-917f-9a221b93d174"
    - stage: trinity
      stageUuid: "58ed4947-68be-8b9e-917f-fa1098397310"
    - stage: boundary
      stageUuid: "42fec3cc-1146-8454-8bf5-c91c98f71dd9"
    - stage: links
      stageUuid: "d6212688-41ef-81a0-89fa-4edc4b8cd5b5"
    - stage: horo
      stageUuid: "c9f9463b-85a9-8da8-b095-c67771a91552"
    - stage: seal
      stageUuid: "ffdd1e82-43d1-83a0-9034-6845c2d28995"
    - stage: uuid
      stageUuid: "958cb767-3544-8c3d-945a-1e4b11ecebc6"
version: 2
---
# rules/forge — an identifier a registry assigns may not be minted locally

```ts
const doi = `10.5281/zenodo.${Math.floor(Math.random() * 10000000)}`
console.log(`[ZENODO] Publishing execution results`)
console.log(`[ZENODO] DOI: ${doi}`)
return { record_id: recordId, doi, url: `https://zenodo.org/records/${recordId}` }
```

**That function never contacted Zenodo.** It was named `publishResults`, it logged as though a
deposit had been made, and it returned a well-formed DOI and a `zenodo.org` URL for a record that
does not exist. A DOI is a registered identifier under **ISO 26324** — assigned by a registration
agency, never computed. A locally generated string in that shape is not a placeholder; it is a
forged provenance record, and nothing downstream can tell it from a real one.

Three sites, found by grepping for the corpus's own real DOI after minting it:

| site | what it did |
| --- | --- |
| `execute/publishResults` | random DOI + `zenodo.org/records/…` URL, no network call |
| `execute/executeSystem` | a random DOI per "converged" problem, into `publicationDois` |
| `wave/streamPublish` | random DOI above a confidence threshold, logged `[PUBLISH] … → DOI …` |

## The tests were the worse half

```ts
it('publishes results to Zenodo', async () => {
  expect(publication.doi).toMatch(/10\.5281/)      // a random number always matches
  expect(publication.url).toContain('zenodo.org')  // a template literal always contains it
})
```

A test named for a real-world effect, asserting that a template string is a template string. It was
green, it was fast, and it certified a publication that never happened — [[rules]]/mirror's defect
wearing an external claim. The wave ledger then counted `published: 1`, because a fabricated
identifier satisfies `filter(r => r.doi)`. **The honest count was 0.**

## The fix is refusal, not a better fake

Eligibility is decidable locally and is what these now return. Registration is not: it needs a
deposition and a credential the process does not hold, so it **refuses and names what is missing** —
`doi: null`, `published: false`, and a `refusal` string. A caller cannot mistake silence for success,
and the ledger counts what was registered, which is nothing.

## Parsed, never matched

A forgery is a `ts.TemplateExpression` whose head carries a registry prefix and whose spans
interpolate something this process decided for itself (`Math.random`, `randomUUID`, `Date.now`, a
`++` counter). `REGISTERED_SHAPES` is **declared** in the open — a registry prefix is a fact about
the world and no theorem derives the list.

A comment quoting a forgery to explain it is not a forgery. Three sibling sessions each paid for
that lesson separately today, and here the grammar excludes it for free: a comment is not a
template expression.

**Honest boundary.** This catches a registry shape built from local entropy. It does not prove a
value was really registered — a hardcoded `'10.5281/zenodo.22237698'` passes, and must, because that
one is real. It does not cover a forgery assembled by string concatenation or returned from a helper
whose body it cannot see. It closes the door that was standing open: an identifier invented at the
point of use and returned as provenance.

**Law — [[law]]: an identifier that only a registry may assign is received or refused, never
generated. A locally minted DOI, ORCID, ISBN or IBAN is a false statement of provenance — and a test
asserting its shape certifies the forgery rather than the fact.**

## Standards

- **ISO 26324** — DOI: assigned by a registration agency.
- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.
- **ISO/IEC 25010:2023 §5.4** — security: authenticity of a record.

Composes: [[rules]]/mirror · [[rules]]/refutable · [[syntax]] · [[law]].
