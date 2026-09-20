# casino — the table tray, mounted on the same control as a bank drawer

A gaming table opens with a chip float, takes and pays through the session, and is counted at
close. That is [[float]]'s structure exactly, so it is [[float]]'s code exactly — this atom adds
the house's scale and one thing the bank does not have.

## The scale is a parameter, because a house has several

A table tray, the cage and a tournament set are three different chip scales **in one house**.
Hard-coding any of them makes the other two uncountable, so `reconcileTray` takes the scale and
`CHIPS` is only a default. The test asserts the same count is balanced against a tournament scale
and **void** against the cash scale — which is the whole reason the scale travels with the count.

## The drop and the variance answer different questions

The **drop** is what the table took in net of what it paid out — the movements alone, without the
opening float. The **variance** is whether the count can be believed at all. A table can take money
*and* fail to count, and a report that folds those together loses the finding that matters: a
pinned test has a table with a positive drop and a short tray.

**Honest boundary.** This reconciles a tray against a declared scale. It says nothing about play,
odds, or whether a chip is genuine — a counterfeit chip of a legal denomination counts as that
denomination here, and detecting it is a physical control, not an arithmetic one.

**Law — [[law]]: the table's result and the table's honesty are two questions. Report the drop and
the variance separately, or a winning night will cover a tray that does not count.**

## Standards

- **ISO 4217** — currency and minor units.
- **ISA 501** — physical count as audit evidence.

Composes: [[float]] · [[law]].
