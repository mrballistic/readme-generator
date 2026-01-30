import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LicenseDropdown from '../LicenseDropdown';

describe('LicenseDropdown', () => {
  it('should render with label', () => {
    render(<LicenseDropdown value="MIT" onChange={() => {}} />);
    expect(screen.getByLabelText(/License/i)).toBeInTheDocument();
  });

  it('should call onChange when a different license is selected', async () => {
    const onChange = vi.fn();
    render(<LicenseDropdown value="MIT" onChange={onChange} />);
    
    // Open the select
    const select = screen.getByLabelText(/License/i);
    fireEvent.mouseDown(select);
    
    // Find the option in the listbox
    const listbox = screen.getByRole('listbox');
    const option = within(listbox).getByText('Apache 2.0');
    fireEvent.click(option);
    
    expect(onChange).toHaveBeenCalledWith('Apache-2.0');
  });
});
