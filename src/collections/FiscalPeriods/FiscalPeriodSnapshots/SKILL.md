---
name: fiscal-period-snapshots
description: The fiscal-period-snapshots collection — FiscalPeriodSnapshots Collection
---

# fiscal-period-snapshots

Immutable snapshots of FiscalPeriods at critical moments: creation, amendment, validation, closing, regulatory audit. Implements Law 60 (chain) and GDPR Art. 32 (audit trail for system modifications).

Composes: [[standard]] · [[access]] · [[proof]] · [[identity]].

## Standards & Invariants

```
@standard GDPR:2016/679 Art. 32 (audit evidence, access control, encryption)
@standard eIDAS:2014/910/EU (signature on critical amendments)
@standard SOX:2002 (access control audit evidence, change log)
@standard NIST-SP-800-92 (audit logging, integrity verification)
@invariant One snapshot per event (creation, amendment, validation, closing, regulatory audit)
@invariant snapshotData is JSON copy of FiscalPeriods state at event time
@invariant eventType enum constrains event classification
@invariant priorSnapshot points to previous snapshot (creates immutable audit chain)
@invariant signedUuid: optional eIDAS QES signature for amendments/regulatory events
@invariant Never updated; only created and read
```
