# outward/witness — two sources agreeing is evidence; one is a claim, and a shared upstream is neither

A cross-check is only worth the independence of its legs. `outward` already treats an unreachable
boundary as an **unanswered question** rather than a failure; this atom asks the sharper question
about the answers that *do* arrive: **were these two numbers produced by independent routes?**

Because a second API can share an upstream model. A **theorem** cannot.

## Measured live, 2026-09-28, against keyless public APIs

| cross | observation | independent leg | spread |
| --- | --- | --- | ---: |
| astronomy × mechanics | wheretheiss reports **7.649 km/s** | `√(μ/r)` at its own reported 436 km → **7.653** | **0.04 %** |
| economics × arithmetic | ECB via Frankfurter, EUR→USD→GBP→EUR = **1.0000** | arbitrage-free closure = **1** | **exact** |
| astronomy × geometry | sunrise-sunset.org **11.939 h** | `cos H = −tanφ·tanδ` → **11.628 h** | 19 min |
| geography × mathematics | OSRM road **2448.3 km** | great-circle **2014.5 km** | ratio **1.215** |
| meteorology × meteorology | open-meteo **10.2 °C** | met.no **9.5 °C** | 0.7 °C |

**Four of those five legs are independent by construction. The last one is not** — Open-Meteo and
MET Norway both ingest ECMWF, so their agreement is two views of one model. It is the weakest row in
the table and it is the one that looks most like a classical corroboration.

## What each row actually licenses

- **The orbit row is the strongest thing here.** One call returns both the reported speed and the
  altitude; the speed is then *re-derived* from the altitude by Newtonian mechanics. The API cannot
  corroborate itself by restating a cached value, because the second number is not its own.
- **The FX row needs no second provider at all.** Triangular closure checks the dataset against
  *itself*, so a shared upstream is irrelevant: a table that does not close is arbitrageable.
- **The solar row's 19 minutes is the approximation, not a disagreement.** `cos H = −tanφ·tanδ` puts
  sunrise at geometric horizon 0°, while the observed definition is −0.833° (atmospheric refraction
  plus the solar disc's radius), which adds several minutes at each end. The residual is a *named
  physical effect*, and reporting the row as "corroborated" without saying so would be the over-claim.
- **The road row is a RATIO claim wearing an agreement's clothes.** 433 km of spread is only inside
  tolerance because the tolerance was declared at 900. The honest statement is that road/great-circle
  = **1.215**, inside the known circuity range for long European routes — and that the great-circle
  distance is a hard **floor**: an API returning less is impossible on a sphere, which is the one
  verdict here that needs no tolerance at all.

## What this refuses

It does not prove that everything is entangled. Measured, the crosses differ in kind by orders of
magnitude — from exact closure to a 21 % ratio — and one of five has no independent leg whatsoever.
What the evidence supports is narrower and more useful:

**a cross-domain check is evidence only where one leg is independent by construction**, and
"independent" means *derived*, not *fetched from somewhere else*.

## Honest boundary

Corroboration is not truth: two independent routes can agree and both be wrong about the world (a
theorem anchors against *internal consistency*, not against reality). `tolerance` is the caller's,
because what counts as agreement belongs to the question — 2 °C is close for a forecast and absurd
for a distance — and a generous tolerance can manufacture agreement, which is exactly what the road
row shows. The atom judges numbers in one unit and refuses to compare across units rather than
guessing a conversion. Every probe is injected, so the verdict is provable with the network down; a
probe that throws contributes **silence**, never a number.

**Law — [[law]]: one source is a claim, two sources are evidence, and two sources sharing an upstream
are one source wearing two names. Anchor a cross on something derived, or it proves nothing.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.
- **WGS 84** — geodetic latitude/longitude.
- **ISO 80000-3** — space and time quantities.

Composes: [[outward]] · [[globe]] · [[algebra]] · [[law]].
