import { describe, expect, it } from 'vitest';
import { generateBadges, generateTechStack, generateLicenseSection, generateReadme } from '../markdownGenerator';

describe('markdownGenerator', () => {
  describe('generateBadges', () => {
    it('should return empty string if no badges selected', () => {
      expect(generateBadges('test-repo', [], 'MIT')).toBe('');
    });

    it('should generate build badge', () => {
      const result = generateBadges('test-repo', ['build'], 'MIT');
      expect(result).toContain('![Build](https://img.shields.io/github/actions/workflow/status/');
      expect(result).toContain('test-repo');
    });

    it('should generate license badge', () => {
      const result = generateBadges('test-repo', ['license'], 'MIT');
      expect(result).toContain('![License](https://img.shields.io/github/license/');
    });
  });

  describe('generateTechStack', () => {
    it('should return empty string if no tech selected', () => {
      expect(generateTechStack([])).toBe('');
    });

    it('should generate a list of technologies', () => {
      const result = generateTechStack(['React', 'TypeScript']);
      expect(result).toContain('- React');
      expect(result).toContain('- TypeScript');
    });
  });

  describe('generateLicenseSection', () => {
    it('should return empty string if license is None', () => {
      expect(generateLicenseSection('None')).toBe('');
    });

    it('should generate license section for MIT', () => {
      const result = generateLicenseSection('MIT');
      expect(result).toContain('## License');
      expect(result).toContain('MIT');
    });
  });

  describe('generateReadme', () => {
    const mockFormData: any = {
      repoName: 'awesome-project',
      description: 'A project that is truly awesome.',
      techStack: ['React', 'TypeScript'],
      installCommand: 'npm install',
      usageExample: 'npm start',
      license: 'MIT',
      badges: ['build', 'license'],
    };

    it('should generate a complete README', () => {
      const result = generateReadme(mockFormData);
      expect(result).toContain('# awesome-project');
      expect(result).toContain('A project that is truly awesome.');
      expect(result).toContain('## Tech Stack');
      expect(result).toContain('## Installation');
      expect(result).toContain('## Usage');
      expect(result).toContain('## License');
      expect(result).toContain('![Build]');
    });
  });
});
