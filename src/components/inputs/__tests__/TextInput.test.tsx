import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TextInput from '../TextInput';

describe('TextInput', () => {
  it('should render with label', () => {
    render(<TextInput label="Repo Name" value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/Repo Name/i)).toBeInTheDocument();
  });

  it('should call onChange when value changes', () => {
    const onChange = vi.fn();
    render(<TextInput label="Repo Name" value="" onChange={onChange} />);
    
    const input = screen.getByLabelText(/Repo Name/i);
    fireEvent.change(input, { target: { value: 'my-repo' } });
    
    expect(onChange).toHaveBeenCalledWith('my-repo');
  });

  it('should display the current value', () => {
    render(<TextInput label="Repo Name" value="initial-value" onChange={() => {}} />);
    expect(screen.getByDisplayValue('initial-value')).toBeInTheDocument();
  });
});
