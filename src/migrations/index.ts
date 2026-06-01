import * as migration_20260530_012613 from './20260530_012613';

export const migrations = [
  {
    up: migration_20260530_012613.up,
    down: migration_20260530_012613.down,
    name: '20260530_012613'
  },
];
