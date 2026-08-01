---
name: domain
description: "Use when modelling a tenant's domain — NOT tenant isolation (the multi-tenant plugin does that), but the domain as the tenant's identity and managed entity: the name that routes the request to the tenant, its hierarchy, status lifecycle, SSL, billing, and — the key — proof of domain ownership, which IS the computational admin grant: prove you control the domain and the tenant is yours."
atomPath: domain
coordinate: "domain · 4/weave · 7cd013fd"
contentUuid: "651bd041-d6b6-5f83-80ca-ba9383f159c5"
diamondUuid: "d52c2215-feb8-84f5-bbf9-38bc831d61f9"
uuid: "7cd013fd-7934-8c63-b658-b7f742dd1d64"
horo: 4
typography:
  partition: domain
  bondDegree: 66
standards: []
bindings: []
signatures:
  computationUuid: "584bf91f-d83c-85b7-96eb-ece1d6dbe607"
  stages:
    - stage: path
      stageUuid: "d51a7a0f-f89c-8662-8ebd-2bb8db95d24e"
    - stage: trinity
      stageUuid: "2ea9c99f-61a3-8bc9-a64e-fae7e44e73cf"
    - stage: boundary
      stageUuid: "14ba162f-2347-8803-9755-9ea9075ef634"
    - stage: links
      stageUuid: "535501f4-42d8-864e-8df6-8ccedf07e910"
    - stage: horo
      stageUuid: "8dffa625-7eed-8313-94f1-b3daf82e8bb6"
    - stage: seal
      stageUuid: "ff5ffc08-4181-8d78-9844-ef039741d3bf"
    - stage: uuid
      stageUuid: "dc064cda-d245-8b45-929d-9a5d1a011efd"
version: 2
---
# domain — prove ownership and the tenant is yours

**Tenant isolation is the plugin's** (`@payloadcms/plugin-multi-tenant` + the [[access]] cross — leave it there). The domain is *the rest*: the tenant's **address in the world** and the proof you own it. The missing link is that `tenant.domain` is not an inert string — it is the tenant's [[identity]] and the **routing key** (request host → `find_active_by_request_host(name)` → the tenant; [[port]] of `ceccec/erpax`'s `Domain`, which "acts as both a domain and a host").

## Prove domain ownership ⇒ the tenant is yours
The computational genesis and the admin grant in one — and it dissolves the chicken-and-egg ("who is the first super-admin?"): you do **not** need a seeded privileged role. You **prove control of the domain** — its DNS CNAME/TXT resolves to our record (`cname_to_current_host?`), and/or its WHOIS registrant email matches yours — and **that proof IS the admin grant**: the tenant is yours ([[access]] admin capability), content-addressed and re-verifiable, never asserted by a role name. The oracle *"who owns this domain?"* — an off-form fact, the [[limit]] oracle — is resolved by **measurement** (DNS/WHOIS), turning the unprovable into the proved ([[proof]]; [[science]]: metaphysics is physics not yet measured). Access computed from a verifiable proof, not a bootstrap. And since **emails carry domains**, the same key works one scale down: a verified email *at* this domain places its user in this tenant ([[auth]]: email : user :: domain : tenant) — a user's tenant is *derived* from the email domain, never hand-assigned, and the WHOIS registrant (itself an email) is the owner.

## The rest (ported from the Rails Domain concerns)
- **Routing / identity** — `name` is unique (case-insensitive, a strict NAME_PATTERN) and IS the lookup: request host → the tenant. The [[identity]] coordinate of the tenant's front door.
- **Hierarchy** — self-referential: a *host* is its own root (`host_id == id`); sub-domains hang under it and the **name encodes the tree** (`shop.acme.com` → parent `acme.com`), [[merge]]ing under one host ([[whole]]/[[part]]).
- **Status — a [[horo]] ring**: `pending → awaiting_payment → active → suspended` (+ `admin`); active/admin route, the rest do not — a state-band, not free strings.
- **Proof of control** — DNS `resolv_cname`/`resolv_txt` activates a domain only when its record points at us; WHOIS verifies the registrant. (This is the ownership proof above — the oracle measured, [[proof]].)
- **SSL** — per-domain certificate provisioning (enable on activate, disable on destroy).
- **Public-suffix** — registrable-domain vs subdomain parsing (the PSL — [[standard]]).
- **Billing** — Stripe platform ids per domain gate the `awaiting_payment` status ([[commerce]]).

## In Payload
A `domains` collection holds routing + lifecycle + ownership-proof + provisioning; **isolation stays with the plugin** ([[plugins]] · [[access]]). Resolution is a host → domain → tenant lookup (indexed `name`); activation is DNS-verified; status rides the [[horo]] band; **ownership-proof mints the admin grant** ([[proof]] · [[identity]]) — the same forge≫verify asymmetry that secures every uuid now secures *who owns the tenant*. **Built from Payload's own primitives, never a bypass:** the multi-tenant plugin resolves the tenant context (`getTenantFromCookie`) — domain-routing simply *sets* that context from the request host (a host→tenant lookup on the indexed `domain`); membership is the plugin's `tenants[]` (`admin` role) gated by `userHasAccessToAllTenants` + the cross; the ownership proof rides Payload [[auth]] (email-verify) + a Payload endpoint/job for DNS/WHOIS; and the grant is written through the access-respecting Local API (the genesis does exactly this). A collection + hooks + endpoint + the plugin — no hand-rolled resolution, no hand-rolled grant. The content-addressed mechanism — publish the proven object's content-uuid in the CNAME/TXT record and re-verify automatically when the object changes — is `src/domain/verification` ([[verification]]): the proof self-invalidates by architecture, no expiry needed. Composes [[access]] · [[identity]] · [[proof]] · [[verification]] · [[limit]] · [[horo]] · [[standard]] · [[commerce]] · [[port]] · [[plugins]] · [[Tenants]].
