import { expect, test } from 'vitest';
import { COMMON_TECH_STACK } from '../techStack';

test('COMMON_TECH_STACK should contain expected technologies', () => {
  expect(COMMON_TECH_STACK).toContain('React');
  expect(COMMON_TECH_STACK).toContain('TypeScript');
  expect(COMMON_TECH_STACK.length).toBeGreaterThan(0);
});
