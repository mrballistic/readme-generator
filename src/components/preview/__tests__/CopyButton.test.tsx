import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CopyButton from '../CopyButton';
import * as clipboardModule from '../../../utils/clipboard';

vi.mock('../../../utils/clipboard', () => ({
  copyToClipboard: vi.fn(),
}));

describe('CopyButton', () => {
  it('should render copy button', () => {
    render(<CopyButton content="test content" />);
    expect(screen.getByRole('button', { name: /Copy/i })).toBeInTheDocument();
  });

  it('should call copyToClipboard when clicked', async () => {
    const copySpy = vi.spyOn(clipboardModule, 'copyToClipboard').mockResolvedValue(true);
    render(<CopyButton content="test content" />);
    
    const button = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(button);
    
    expect(copySpy).toHaveBeenCalledWith('test content');
  });

  it('should show success message after successful copy', async () => {
    vi.spyOn(clipboardModule, 'copyToClipboard').mockResolvedValue(true);
    render(<CopyButton content="test content" />);
    
    const button = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/Copied to clipboard/i)).toBeInTheDocument();
    });
  });
});
