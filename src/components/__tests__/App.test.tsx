import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from '../../App';

// Mock useMediaQuery to support dark mode tests
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: vi.fn().mockReturnValue(false),
  };
});

describe('App Component', () => {
  it('should render the main layout with form and preview', () => {
    render(<App />);
    expect(screen.getByText(/README Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Live Preview/i)).toBeInTheDocument();
  });

  it('should update the preview when form inputs change', () => {
    render(<App />);
    const repoInput = screen.getByLabelText(/Repository Name/i);
    
    fireEvent.change(repoInput, { target: { value: 'My Awesome Project' } });
    
    expect(screen.getByText('My Awesome Project')).toBeInTheDocument();
  });
});
