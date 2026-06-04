import * as migration_20260604_223629 from './20260604_223629';

export const migrations = [
  {
    up: migration_20260604_223629.up,
    down: migration_20260604_223629.down,
    name: '20260604_223629'
  },
];
