import { expect, test } from 'vitest';
import { BADGE_CONFIGS } from '../badges';

test('BADGE_CONFIGS should contain expected badges', () => {
  expect(BADGE_CONFIGS.build).toBeDefined();
  expect(BADGE_CONFIGS.license).toBeDefined();
  expect(BADGE_CONFIGS.version).toBeDefined();
  expect(BADGE_CONFIGS.downloads).toBeDefined();
  expect(BADGE_CONFIGS.build.label).toBe('Build');
});
