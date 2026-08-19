---
name: bg
description: "Use for the two Bulgarian rails erpax codes against — БНБ daily exchange rates (CODE/REVERSERATE/RATE XML) and Търговски Регистър merchant lookup by дело. Both addresses were dead in production and are now fixed and captured; the contracts pin the euro-era shape, the DD.MM.YYYY fixing date, and the two 200-under-HTML traps that make a working endpoint read as no data."
atomPath: outward/bg
---

# outward/bg — the two Bulgarian rails, contracted

Both declare `clientImplemented: true` in [[country]]/api, so both are promises that
erpax parses their answers — and both were **unproven** until this layer asked
([[outward]]/coverage). The first thing asking found was that **neither worked**.

| rail | address | was | now |
| --- | --- | --- | --- |
| БНБ | `index.htm?download=xml` | `StERFCDownload.aspx` served **HTML** | ✓ 29 currencies |
| TR | `/CR/api/Deeds/{eik}/Applications` | `/api/public/companies/{eik}` served **404** | ✓ 266 заявления |

## Why a working endpoint read as no data

Three defects, none of which surfaces as an error:

- **БНБ's WAF answers an HTML error page under a `200`** to clients it does not
  recognise. Measured against the live host: `curl`, `Wget` and `python-requests`
  are served; Node's default agent and every `Mozilla/…` string are refused — it
  gates *browser-shaped* agents, not automation. The parser read that page and
  reported "no fixing".
- **The portal rewrites unknown paths to its SPA shell**, so a wrong TR path
  answers `200` with HTML. A dead endpoint looked alive.
- **Node's undici sends `Accept-Language: *`, and the register answers `500` to
  it.** That header alone flips a working `200` into a `500` — so TR failed from
  Node while succeeding from curl.

## The euro changed the meaning, not just the address

БНБ's `RATIO` column is **gone**. The fixing is now quoted against the **euro** in
both directions: `RATE` is foreign-per-EUR, `REVERSERATE` is EUR-per-unit. A parser
written for the lev era reads nothing at all. Downstream, the sync job hardcoded
`toCurrency: 'BGN'` — it would have stored euro-denominated rates labelled *lev*.

The ECB and БНБ also quote in **opposite directions**, so a consumer reading `rate`
from whichever publisher answered silently inverts every rate when the fallback
fires. `quotePerUnit` means the same thing in both and is the field to read.

## What the capture caught that the live run hid

The feed dates as **`18.08.2026`**, not ISO. The client tested for ISO, failed, and
fell back to `new Date()` — dating an 18.08 fixing as 19.08. A live run *looked*
correct because the two were one day apart; the frozen fixture failed immediately.
An unparseable fixing date is now **refused**, not defaulted.

Two dates cannot be guessed at all here, so neither is: the feed takes **no date
parameter** and always serves the current fixing, so a back-dated request is
**refused** rather than answered with today's rate wearing a past date.

## The register is addressed by дело, not by company

That is not an API quirk — it is the regulated unit. Under the **ЗТРРЮЛНЦ** the
**дело** is kept in electronic form and holds the *заявления*, the documents proving
each entered circumstance, and the *обявени актове*; **чл. 11** makes that base data
public and free, which is why this lookup carries no credential. Documents bearing
personal data sit behind an electronic signature or an agency-issued certificate and
are deliberately **not** reached from here. So the merchant's name and status are
read off the дело's own filings (`incomingLinkedDeeds`) — there is no company
endpoint to call, because the register does not keep companies, it keeps дела.

**Honest boundary.** These contracts prove the **shape** the authorities send, never
that a value is **true**: that USD is `0.8639` EUR/unit today is БНБ's claim, and a
merchant's `status: 2` is the register's. The TR capture is one дело (`831641791`),
so it pins the shape of a live, active merchant and says nothing about a struck-off
or in-liquidation one. The portal rate-limits (`429`), which is surfaced rather than
retried. And a fixture freezes a moment — only the online lane can say the world
still agrees.

**Law — [[law]]: a contract pins what the client parses; only a capture proves the
world ever sent it. An endpoint that answers 200 with the wrong body is worse than
one that fails, because it reports absence instead of breakage.**

Composes: [[outward]] · [[country]] · [[currency]].
