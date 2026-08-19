---
name: standards
description: "Use for the standards wire-format boundary — the outbound service that emits documents and the inbound parser that ingests them, the give and take of the same formats."
atomPath: "export/standards"
---
# standards

The two directions of one boundary. `service` **gives** — it emits the canonical wire formats; `import` **takes** — banks and Peppol Access Points hand erpax an XML document and it routes to the canonical parser by a `format` discriminator, returning the typed structure the write path ingests.

They are siblings because they must agree on the same formats: a give that the take cannot parse is a boundary that only works outward.

Composes: [[standards]] · [[law]].
