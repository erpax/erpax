---
name: provider
description: "Use when reasoning about provider — The browser half of the ecommerce plugin. Two values decide what it can do, and both may be absent: the tenant's Stripe publishable key and the server URL."
atomPath: "ecommerce/client/provider"
coordinate: "ecommerce/client/provider · 2/share · 0095cabc"
contentUuid: "4fd534fd-f893-5e33-8711-82f7deab93dd"
diamondUuid: "fd01c3af-a6e8-8390-afbf-2c92ebc9d400"
uuid: "0095cabc-299e-8721-a726-bc655369f516"
horo: 2
typography:
  partition: ecommerce
  bondDegree: 25
standards: []
bindings: []
signatures:
  computationUuid: "c1d991a0-27f8-8020-b433-f48b56a48652"
  stages:
    - stage: path
      stageUuid: "00bd36e9-92df-828d-b972-212d2ce52941"
    - stage: trinity
      stageUuid: "2e17b3c7-ac24-8500-bd61-32bcc3e51e44"
    - stage: boundary
      stageUuid: "798c6cb2-43ad-82b2-8f6a-b371f4ce8e04"
    - stage: links
      stageUuid: "ec781212-bbc6-8ee8-a87e-7b7facce1822"
    - stage: horo
      stageUuid: "fe8ae227-4239-8825-8a54-0a9647a9ef83"
    - stage: seal
      stageUuid: "62e858cd-be21-8e52-af1a-5a394d7f9245"
    - stage: uuid
      stageUuid: "cefad2d6-b04a-89c9-bb3a-db0e432c6e17"
version: 2
---
# ecommerce/client/provider — no publishable key means no payment method, not a broken one

The browser half of the ecommerce plugin. Two values decide what it can do, and both may be absent:
the tenant's Stripe publishable key and the server URL.

**An absent key yields an empty `paymentMethods` array.** That is the decision worth stating: the
alternative — constructing the Stripe adapter with `''` — produces an adapter that looks configured,
mounts a payment form, and fails at the moment a customer tries to pay. An empty list renders no
payment option at all, which is the honest presentation of "this tenant cannot take card payments
yet".

The environment fallback is deliberately **not** available in production. In development, reading
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is a convenience; in production it would let one tenant's
checkout silently run on another tenant's key, which is a billing defect, not a configuration one.
So the production branch returns empty rather than falling back.

Currency is single and canonical — EUR, mirroring the server configuration. Display in another
currency is an FX concern at render time, not a second set of price columns.

**Honest boundary.** The proof asserts the key/adapter relationship and the production fallback
refusal, because those are decidable from the inputs. It does not exercise Stripe, and it makes no
claim that a configured key is *valid* — only that an unconfigured one produces no payment method.

**Law — [[law]]: a missing credential produces no capability, never a broken one. An adapter built
from an empty key advertises a payment path that cannot complete, and the customer discovers it at
the checkout.**

Composes: `ecommerce` · [[law]].
