import * as migration_20260507_122712 from './20260507_122712';
import * as migration_20260507_131228 from './20260507_131228';

export const migrations = [
  {
    up: migration_20260507_122712.up,
    down: migration_20260507_122712.down,
    name: '20260507_122712',
  },
  {
    up: migration_20260507_131228.up,
    down: migration_20260507_131228.down,
    name: '20260507_131228'
  },
];
