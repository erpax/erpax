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
