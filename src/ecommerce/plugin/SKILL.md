# ecommerce/plugin — the card never reaches this system

`createEcommercePlugin` wires the storefront to Stripe with per-tenant keys, so each tenant
transacts under its own account and one tenant's credentials never authorise another's charge.

Card data is tokenised by Stripe and never observed here. That is the whole PCI-DSS argument:
scope is minimised by not holding the data, not by protecting it better.

Composes: [[law]].
