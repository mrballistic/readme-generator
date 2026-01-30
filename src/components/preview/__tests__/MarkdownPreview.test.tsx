import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MarkdownPreview from '../MarkdownPreview';

describe('MarkdownPreview', () => {
  it('should render markdown content', () => {
    render(<MarkdownPreview content="# Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('should render code blocks', () => {
    const content = '```bash\nnpm install\n```';
    render(<MarkdownPreview content={content} />);
    expect(screen.getByText('npm install')).toBeInTheDocument();
  });
});
