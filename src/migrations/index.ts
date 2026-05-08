import * as migration_20260508_002100 from './20260508_002100';

export const migrations = [
  {
    up: migration_20260508_002100.up,
    down: migration_20260508_002100.down,
    name: '20260508_002100'
  },
];
