import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PreviewSection from '../PreviewSection';

describe('PreviewSection', () => {
  it('should render markdown preview and copy button', () => {
    render(<PreviewSection markdown="# Test Markdown" />);
    expect(screen.getByText('Test Markdown')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Copy/i })).toBeInTheDocument();
  });
});
