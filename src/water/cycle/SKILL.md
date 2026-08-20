---
name: cycle
description: "Use when reasoning about splitting water and burning it back — the loop purifies and stores, and cannot generate. Hess's law makes over-unity an identity failure rather than an engineering one, and the model searches the whole efficiency space for a counter-example instead of asserting there is none."
atomPath: water/cycle
---
# cycle — the loop purifies and stores; it cannot generate

Split polluted water, burn the hydrogen back: dirty in, pure out, and electricity along
the way. Two of those three are real.

## What is real

**The purification.** Electrolysis takes only H and O out of the cell. Dissolved solids,
metals, salts and most organics stay behind, so recombining the gases yields genuinely
pure water. Dirty in, potable out is sound chemistry.

**The storage.** Hydrogen holds energy well and gives it back on demand. Given surplus —
solar, curtailed grid — the loop buffers power *and* hands back clean water. Both outputs
are real. Neither is free.

## What is forbidden, and why it is not an engineering problem

Splitting liquid water costs **285.83 kJ/mol**. Burning the hydrogen back with the product
condensed returns **285.83 kJ/mol** — the same number, because it is the same start state
and the same end state. The enthalpies cancel by **Hess's law**. That is an identity, not
a limit someone might engineer past.

So the loop returns *at most* what it took, and every real device takes its cut:

| arrangement | round-trip |
| --- | ---: |
| perfect, in the limit | 100% (break-even, never above) |
| electrolyser 80% + fuel cell 60% | **48%** |
| electrolyser 80% + H₂ combustion engine 40% | **26%** |

`overUnityWitness()` does not assert this — it **searches** ~8000 combinations of
(electrolyser, engine, generator) for a counter-example and returns `undefined`. A claim
that forbids nothing explains nothing ([[rules]]/refutable); this one forbids a specific
thing and offers the search that would break it.

## The number that decides the design

**19.8 MJ per litre** — about **1,569×** what reverse osmosis needs for the same litre
(≈0.0126 MJ/L). If the goal is clean water, this loop is not a contender, and the model
says so in `versusReverseOsmosis` rather than leaving it flattering.

Note the shape of that: the purification cost depends **only on splitting**, so a better
engine recovers more energy but does not make the water any cheaper. Engine choice moves
the round-trip, never the litre.

## "At quantum scale" is where the constraint comes FROM

285.83 kJ/mol **is** a quantum result — the O–H bond energy from electronic structure.
The reversible cell voltage falls straight out of it: ΔG/(2F) = **1.229 V**, the floor
every real cell exceeds. So invoking quantum scale names the origin of the limit, not
an exit from it.

What quantum effects genuinely change is the **path** and the **rate**, never the state
function. Catalysis and tunnelling lower activation barriers — they make the reaction
*faster*, not *cheaper*. Zero-point energy has no lower state to fall to.

**The demon pays too.** Any scheme that sorts molecules by measuring them — however
quantum — must eventually erase what it learned, at `kT ln 2` per bit. That is
**1.72 kJ/mol** at 298 K: a cost, not a source, and 166× smaller than the bond energy
it would need to mint. `landauerKJPerMol` makes that explicit, and it *rises* with
temperature, so no cold trick escapes it either.

**The one real gain is photocatalysis.** A sufficiently energetic photon drives the
split directly, skipping both the generator and the electrolyser's electrical stage.
Lab solar-to-hydrogen records (~19–30%) beat the two-step PV 22% × electrolyser 80% =
**17.6%** — a genuine advantage, and `photonPath` computes which side wins. It removes
conversions; it does not remove the sun. Efficiency there is measured against incident
light, so nothing returns more than it received.

## Where it wins

Off-grid, with surplus input and a need for *both* outputs: dispatchable energy and
drinkable water from one system, with the exhaust safe to drink. The sun powers it — not
the water. Hydrogen is a **carrier**, never a source.

**Honest boundary.** This models ENERGY, not the cell: electrode overpotential, membrane
fouling by the very contaminants being removed, brine handling and hydrogen storage losses
are all real and none are here. It proves the loop cannot generate; it does not prove any
particular device works.

## The plant — where the design stops being absurd

Charged to purification alone, the loop is **~1,600× worse than reverse osmosis**
(`versusReverseOsmosis`). That is the number that kills the naive reading, and it is
correct. But it charges the whole split enthalpy to the water, and that is the wrong
ledger for a plant that would be electrolysing anyway.

`marginalWaterCostKwh` makes the split explicit. If storage is the reason the plant runs
— a duty grids already pay for — the distillate costs **zero at the margin**. Same
hardware, same physics; only the accounting question changed.

`plantSpec` sizes it from the storage duty:

| duty | charged | distillate | people @20 L | electricity back |
| --- | ---: | ---: | ---: | ---: |
| 0.5 MW × 8 h | 4,000 kWh/day | 728 L | 36 | 48% |
| 5 MW × 8 h | 40,000 kWh/day | 7,283 L | 364 | 48% |
| 100 MW × 8 h | 800,000 kWh/day | 145,658 L | 7,283 | 48% |

**What the membrane buys that a filter cannot.** Only H⁺ crosses. Salts, metals,
pathogens, PFAS and pharmaceuticals cannot follow a proton through the membrane, so the
exhaust purity is **independent of how filthy the feed was** — there is no rejection
ratio to degrade, because nothing is being rejected. That is a molecular separation, not
a sieve, and it is the one property RO cannot match at any pressure.

**What that does not fix.** Chloride in the feed evolves chlorine at the anode in
competition with oxygen; the reject brine still concentrates and still has to go
somewhere; and electrode fouling by the contaminants is exactly the failure mode the
energy model above does not contain. The separation is clean in principle and the cell
is where the engineering lives.

**Law — [[law]]: a closed loop cannot pay for itself. Splitting and recombining share a
start and an end state, so the enthalpies cancel — the cycle purifies, it stores, and it
never generates.**

Composes: [[water]] · [[energy]] · [[law]].
