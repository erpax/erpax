import * as migration_20261115_091414_baseline from './20261115_091414_baseline';
import * as migration_20261115_133852_fold_contracts from './20261115_133852_fold_contracts';

export const migrations = [
  {
    up: migration_20261115_091414_baseline.up,
    down: migration_20261115_091414_baseline.down,
    name: '20261115_091414_baseline',
  },
  {
    up: migration_20261115_133852_fold_contracts.up,
    down: migration_20261115_133852_fold_contracts.down,
    name: '20261115_133852_fold_contracts'
  },
];
