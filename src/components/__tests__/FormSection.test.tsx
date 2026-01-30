import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import FormSection from '../FormSection';
import type { ReadmeFormData } from '../../types';

describe('FormSection', () => {
  const mockData: ReadmeFormData = {
    repoName: 'test-repo',
    githubUsername: 'test-user',
    workflowName: 'main.yml',
    description: 'test-desc',
    techStack: [],
    installCommand: 'npm install',
    usageExample: 'npm start',
    license: 'MIT',
    badges: [],
  };

  it('should render all input fields', () => {
    render(<FormSection formData={mockData} onChange={() => {}} />);
    expect(screen.getByLabelText(/Repository Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Project Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Installation Command/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Usage Example/i)).toBeInTheDocument();
  });

  it('should call onChange when a field is updated', () => {
    const onChange = vi.fn();
    render(<FormSection formData={mockData} onChange={onChange} />);
    
    const input = screen.getByLabelText(/Repository Name/i);
    fireEvent.change(input, { target: { value: 'new-name' } });
    
    expect(onChange).toHaveBeenCalledWith({ ...mockData, repoName: 'new-name' });
  });
});
