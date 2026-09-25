# solvent — the formula a document named as missing, written down

Zenodo record **10.5281/zenodo.22934883** analyses a "Dry Cleaning Multimodal Algebra Framework".
Its own §3 names the limitation and its §4 names the cure:

> phase equilibrium varies dynamically with temperature and pressure via non-linear equations
> (e.g., Antoine Equation), which are currently simplified to constants
>
> — *Replace simplified K_eq terms with the Antoine Equation for vapour pressure of
> tetrachloroethylene.*

So the missing formula is named by the work that is missing it. This atom is that formula:
`log₁₀ P = A − B/(T + C)`, with **received** coefficients for tetrachloroethylene and the interval
they were fitted on.

## The coefficients are received, never derived

`ANTOINE_PCE` is read from the NIST Chemistry WebBook (species `C127184`) — Polak, Murakami et al.
(1970), coefficients calculated by NIST from the authors' data. A measured constant is the shape
[[rules]]/forge refuses to mint: it is cited with its source and its **fitted range**, because three
numbers keep returning an answer long after the measurements stop.

The transcription is checked against evidence that did not produce it. PCE's vapour pressure at
25 °C is ~2.47 kPa in every handbook, and **298.15 K sits below Polak's interval** — the correlation
is extrapolating there and agrees anyway. That is a real test of the digits; asserting them against
themselves would be [[rules]]/mirror.

`vapourPressure` therefore returns `extrapolated` beside the number rather than throwing. A caller
sweeping a temperature range has a legitimate reason to ask for 298 K and a legitimate need to know
that nothing was measured there — a bare number cannot carry that and an exception cannot be plotted.

## What the record's images actually contain

Four images accompany the record. **Three are the same poster with the hub label swapped** —
`FUSION POWER PLANT`, `DRY CLEANING`, `PERMACULTURE ECOSYSTEM` — over a periphery that is otherwise
identical down to the rendering artefact reading `DNA FKING MODEL` in all three. Content-address
them and they are one body at three addresses, which is [[rules]]/copy's law: *one implementation
and two decoys.* A poster whose surround is unchanged when its subject changes from fusion to
laundry is evidence about the generator, not about either subject.

The equations printed on them are **formula-shaped and not formulas**. `m_solv = m_solv + m_soil`
has the single solution `m_soil = 0` — it states that no soil exists. `F_racts = (m_solv −
C_solv)/(m_dn_C_liquid) · (1/10%)` divides a mass by a name and multiplies by a percentage of a
percentage. This is [[rules]]/forge one domain over: a **derivation** carries authority only a
derivation may assign, and a locally generated string in that shape is a false statement of
provenance however decorative its intent.

So the mass balance here is the one the poster gestured at: `input = output + fugitive`, which is
what EU 2010/75 Annex VII calls a solvent management plan. A negative fugitive is refused rather
than reported — declared outputs exceeding declared input is an error, never a negative emission.

**Honest boundary.** This is a **correlation and three balances**, not a process model. The source
document's own limitation stands: real installations need an equation of state (Peng-Robinson) and
this has none. It says nothing about mixtures — PCE with dissolved soil is not pure PCE, and Raoult
is an idealisation. `arrheniusRate` and `firstOrderDecay` are the general laws the document called
"Arrhenius-like" and never wrote; neither carries a rate constant for any real soil-removal
reaction, because no one measured one here. And the extrapolation flag says the correlation was
asked outside its fit — never that the answer is wrong, nor that it is right.

**Law — [[law]]: a correlation is a fit to an interval, and a constant is a measurement someone
made. Cite both with their source, carry the range with the coefficients, and say so when you are
asked outside it — a formula that answers everywhere claims more than the data it came from.**

## Standards

- **Antoine (1888)** — `log₁₀ P = A − B/(T + C)`, the vapour-pressure correlation.
- **EU 2010/75 Annex VII** — solvent management plan: input = output + fugitive.
- **CODATA 2018** — molar gas constant R = 8.314462618 J·mol⁻¹·K⁻¹, exact by SI definition.

Composes: [[emission]] · [[rules]]/forge · [[rules]]/copy · [[algebra]] · [[law]].
