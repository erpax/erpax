import * as migration_20260507_160310 from './20260507_160310';

export const migrations = [
  {
    up: migration_20260507_160310.up,
    down: migration_20260507_160310.down,
    name: '20260507_160310'
  },
];
