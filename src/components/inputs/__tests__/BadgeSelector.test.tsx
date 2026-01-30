import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import BadgeSelector from '../BadgeSelector';

describe('BadgeSelector', () => {
  it('should render all badge options', () => {
    render(<BadgeSelector selectedBadges={[]} onChange={() => {}} />);
    expect(screen.getByLabelText(/Build/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/License/i)).toBeInTheDocument();
  });

  it('should call onChange with new badges when a checkbox is clicked', () => {
    const onChange = vi.fn();
    render(<BadgeSelector selectedBadges={['build']} onChange={onChange} />);
    
    const licenseCheckbox = screen.getByLabelText(/License/i);
    fireEvent.click(licenseCheckbox);
    
    expect(onChange).toHaveBeenCalledWith(['build', 'license']);
  });

  it('should call onChange removing a badge when an active checkbox is clicked', () => {
    const onChange = vi.fn();
    render(<BadgeSelector selectedBadges={['build', 'license']} onChange={onChange} />);
    
    const buildCheckbox = screen.getByLabelText(/Build/i);
    fireEvent.click(buildCheckbox);
    
    expect(onChange).toHaveBeenCalledWith(['license']);
  });
});
