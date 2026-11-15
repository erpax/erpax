import * as migration_20261115_091414_baseline from './20261115_091414_baseline';

export const migrations = [
  {
    up: migration_20261115_091414_baseline.up,
    down: migration_20261115_091414_baseline.down,
    name: '20261115_091414_baseline'
  },
];
