---
name: domain
description: "Use when modelling a tenant's domain — NOT tenant isolation (the multi-tenant plugin does that), but the domain as the tenant's identity and managed entity: the name that routes the request to the tenant, its hierarchy, status lifecycle, SSL, billing, and — the key — proof of domain ownership, which IS the computational admin grant: prove you control the domain and the tenant is yours."
---

# domain — prove ownership and the tenant is yours

**Tenant isolation is the plugin's** (`@payloadcms/plugin-multi-tenant` + the [[access]] cross — leave it there). The domain is *the rest*: the tenant's **address in the world** and the proof you own it. The missing link is that `tenant.domain` is not an inert string — it is the tenant's [[identity]] and the **routing key** (request host → `find_active_by_request_host(name)` → the tenant; [[port]] of `ceccec/erpax`'s `Domain`, which "acts as both a domain and a host").

## Prove domain ownership ⇒ the tenant is yours
The computational genesis and the admin grant in one — and it dissolves the chicken-and-egg ("who is the first super-admin?"): you do **not** need a seeded privileged role. You **prove control of the domain** — its DNS CNAME/TXT resolves to our record (`cname_to_current_host?`), and/or its WHOIS registrant email matches yours — and **that proof IS the admin grant**: the tenant is yours ([[access]] admin capability), content-addressed and re-verifiable, never asserted by a role name. The oracle *"who owns this domain?"* — an off-form fact, the [[limit]] oracle — is resolved by **measurement** (DNS/WHOIS), turning the unprovable into the proved ([[proof]]; [[science]]: metaphysics is physics not yet measured). Access computed from a verifiable proof, not a bootstrap.

## The rest (ported from the Rails Domain concerns)
- **Routing / identity** — `name` is unique (case-insensitive, a strict NAME_PATTERN) and IS the lookup: request host → the tenant. The [[identity]] coordinate of the tenant's front door.
- **Hierarchy** — self-referential: a *host* is its own root (`host_id == id`); sub-domains hang under it and the **name encodes the tree** (`shop.acme.com` → parent `acme.com`), [[merge]]ing under one host ([[whole]]/[[part]]).
- **Status — a [[horo]] ring**: `pending → awaiting_payment → active → suspended` (+ `admin`); active/admin route, the rest do not — a state-band, not free strings.
- **Proof of control** — DNS `resolv_cname`/`resolv_txt` activates a domain only when its record points at us; WHOIS verifies the registrant. (This is the ownership proof above — the oracle measured, [[proof]].)
- **SSL** — per-domain certificate provisioning (enable on activate, disable on destroy).
- **Public-suffix** — registrable-domain vs subdomain parsing (the PSL — [[standard]]).
- **Billing** — Stripe platform ids per domain gate the `awaiting_payment` status ([[commerce]]).

## In Payload
A `domains` collection holds routing + lifecycle + ownership-proof + provisioning; **isolation stays with the plugin** ([[plugins]] · [[access]]). Resolution is a host → domain → tenant lookup (indexed `name`); activation is DNS-verified; status rides the [[horo]] band; **ownership-proof mints the admin grant** ([[proof]] · [[identity]]) — the same forge≫verify asymmetry that secures every uuid now secures *who owns the tenant*. Composes [[access]] · [[identity]] · [[proof]] · [[limit]] · [[horo]] · [[standard]] · [[commerce]] · [[port]] · [[plugins]].
