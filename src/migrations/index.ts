import * as migration_20260602_200725 from './20260602_200725';

export const migrations = [
  {
    up: migration_20260602_200725.up,
    down: migration_20260602_200725.down,
    name: '20260602_200725'
  },
];
