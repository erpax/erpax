import * as migration_20261115_091414_baseline from './20261115_091414_baseline';
import * as migration_20261115_133852_fold_contracts from './20261115_133852_fold_contracts';
import * as migration_20261115_145812_fold_audit_policies from './20261115_145812_fold_audit_policies';
import * as migration_20261115_153312_fold_dunning from './20261115_153312_fold_dunning';
import * as migration_20261115_165406_fold_parties from './20261115_165406_fold_parties';
import * as migration_20261115_180058_cloudflare_email from './20261115_180058_cloudflare_email';
import * as migration_20261115_193406_plugins_real_schema from './20261115_193406_plugins_real_schema';

export const migrations = [
  {
    up: migration_20261115_091414_baseline.up,
    down: migration_20261115_091414_baseline.down,
    name: '20261115_091414_baseline',
  },
  {
    up: migration_20261115_133852_fold_contracts.up,
    down: migration_20261115_133852_fold_contracts.down,
    name: '20261115_133852_fold_contracts',
  },
  {
    up: migration_20261115_145812_fold_audit_policies.up,
    down: migration_20261115_145812_fold_audit_policies.down,
    name: '20261115_145812_fold_audit_policies',
  },
  {
    up: migration_20261115_153312_fold_dunning.up,
    down: migration_20261115_153312_fold_dunning.down,
    name: '20261115_153312_fold_dunning',
  },
  {
    up: migration_20261115_165406_fold_parties.up,
    down: migration_20261115_165406_fold_parties.down,
    name: '20261115_165406_fold_parties',
  },
  {
    up: migration_20261115_180058_cloudflare_email.up,
    down: migration_20261115_180058_cloudflare_email.down,
    name: '20261115_180058_cloudflare_email',
  },
  {
    up: migration_20261115_193406_plugins_real_schema.up,
    down: migration_20261115_193406_plugins_real_schema.down,
    name: '20261115_193406_plugins_real_schema'
  },
];
