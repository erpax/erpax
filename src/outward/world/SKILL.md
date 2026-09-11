---
name: world
description: "Use when reasoning about world — Use for the public parser-backed rails beyond the EU four and BG two — Brønnøysundregistrene, OFAC SDN, SEC EDGAR, Frankfurter, ExchangeRate-API, Open Food Facts. Contracts pin what the client parses against real captures, and specifically pin the 200-carrying-a-failure trap: Open Food Facts answers status 0 and ExchangeRate-API answers result error, both under HTTP 200."
atomPath: "outward/world"
coordinate: "outward/world · 5/round · e11dac8b"
contentUuid: "97107e03-64a9-5abe-8e0c-b4b814986b09"
diamondUuid: "4e118a4c-6672-83a5-8903-eb79385ebb7b"
uuid: "e11dac8b-d33e-83a6-b160-c62acb4d2f5e"
horo: 5
typography:
  partition: outward
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "4f864644-77a6-8050-a793-33dabdf35118"
  stages:
    - stage: path
      stageUuid: "f2b5b76d-b487-8529-8985-5f9cb851275b"
    - stage: trinity
      stageUuid: "209475f7-c0fc-8f7e-9701-4a4aa4a79e42"
    - stage: boundary
      stageUuid: "561116c8-1323-8059-9833-b056c9e80d1c"
    - stage: links
      stageUuid: "9ffce1eb-f017-80ea-b1d4-16b28722299a"
    - stage: horo
      stageUuid: "db4cf85b-c6f0-87f1-b459-17d4857d98e7"
    - stage: seal
      stageUuid: "69e070a4-968d-8432-8296-1bc32e680002"
    - stage: uuid
      stageUuid: "5bdec262-9a80-8450-993d-e44b67e41383"
version: 2
---
# outward/world — the rest of the public rails, contracted

The EU four and the BG two left **28 public rows** claiming a client with nothing able
to contradict them ([[outward]]/coverage). This closes every one that has a real
parser, each against a **capture taken with the exact request the client makes**.

| rail | what the client reads |
| --- | --- |
| Brønnøysundregistrene | `navn` · `organisasjonsform.kode` · `registrertIMvaregisteret` |
| OFAC SDN | raw text — so the contract is the `<sdnList>` root + publication header |
| SEC EDGAR | the whole submissions record — `cik` · `filings.recent` |
| Frankfurter | `base` · `date` · `rates` |
| ExchangeRate-API | `result` · `base_code` · `rates` |
| Open Food Facts | `status` + `product{code, product_name, brands, …}` |

## The trap this exists for: a 200 that carries a failure

Two of these answer **HTTP 200 with an error in the body**:

- **Open Food Facts** returns `status: 0` for an unknown barcode. `r.ok` is `true` on
  a miss, so a client trusting the status code reads an empty product as success.
- **ExchangeRate-API** returns `result: "error"`. Same shape — the transport
  succeeded and the answer is a failure.

That is the same family that hid two dead BG rails ([[outward]]/bg): **a 200 carrying
the wrong body reads as absence, not breakage**, so nothing goes red and the gap is
invisible. Both are pinned here, and both are why the checks read the body's own
verdict rather than the HTTP status.

## Two shapes that must never pass

**A zero-record sanctions list must not read as clean.** `checkOfac` refuses
`Record_Count` of `0`: an empty export screens every counterparty as unsanctioned,
which is the most dangerous silent pass in the corpus. The same rule holds for the EU
consolidated list ([[outward]]/eu), whose client turned out to be dead for a different
reason — it omitted the Commission's public access token and got `403` on every call.

**A rate without its date is unusable.** `checkFrankfurter` requires `date`, because a
fixing that does not say what day it is valid for cannot price an invoice — the same
defect that had БНБ silently dating a fixing "today".

## Field names are not interchangeable

ExchangeRate-API carries `base_code`, **not** `base`; Brønnøysund nests the legal form
at `organisasjonsform.kode`, not a flat field; Open Food Facts sends `brands` as a
**comma-separated string**, not an array. Each is pinned by its own test, because each
is a shape a reasonable reader would guess wrong.

**Honest boundary.** These prove the **shape** an authority sends, never that a value
is **true** — that Equinor is `ASA` is Brønnøysund's claim, and the OFAC head proves a
list was published, never that it is complete or current. Two fixtures are
**truncated captures**: OFAC's export is ~28 MB and SEC's record ~164 KB, so the OFAC
fixture is the first 4 KB of the real file and the SEC fixture keeps every real
top-level key with `filings.recent` cut to two rows. They pin headers and shape, not
volume. And a fixture freezes a moment — only `--online` can say the world still
agrees.

**Law — [[law]]: read the body's own verdict, never the status code. An authority that
answers 200 with a failure inside will be believed by anything that trusts the
transport, and the resulting silence reads as data.**

Composes: [[outward]] · [[country]] · [[trading]] · [[law]].
