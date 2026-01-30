import { expect, test } from 'vitest';
import { LICENSE_OPTIONS } from '../licenses';

test('LICENSE_OPTIONS should contain expected licenses', () => {
  expect(LICENSE_OPTIONS).toContainEqual({ value: 'MIT', label: 'MIT' });
  expect(LICENSE_OPTIONS).toContainEqual({ value: 'None', label: 'None' });
  expect(LICENSE_OPTIONS.length).toBeGreaterThan(0);
});
