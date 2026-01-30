import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TechStackInput from '../TechStackInput';

describe('TechStackInput', () => {
  it('should render with label', () => {
    render(<TechStackInput value={[]} onChange={() => {}} />);
    expect(screen.getByLabelText(/Technology Stack/i)).toBeInTheDocument();
  });

  it('should call onChange when a new technology is added', async () => {
    const onChange = vi.fn();
    render(<TechStackInput value={[]} onChange={onChange} />);
    
    const input = screen.getByLabelText(/Technology Stack/i);
    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(onChange).toHaveBeenCalledWith(['React']);
  });

  it('should call onChange when a technology is removed', () => {
    const onChange = vi.fn();
    render(<TechStackInput value={['React', 'TypeScript']} onChange={onChange} />);
    
    const deleteButton = screen.getAllByTestId('CancelIcon')[0]; // MUI Chip delete icon
    fireEvent.click(deleteButton);
    
    expect(onChange).toHaveBeenCalledWith(['TypeScript']);
  });
});
