import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleSwitch } from './ToggleSwitch';

describe('ToggleSwitch Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders with provided label', () => {
    render(
      <ToggleSwitch 
        label="Test Label" 
        checked={false} 
        onChange={mockOnChange} 
      />
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('reflects checked state correctly', () => {
    const { rerender } = render(
      <ToggleSwitch 
        label="Switch" 
        checked={true} 
        onChange={mockOnChange} 
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    rerender(
      <ToggleSwitch 
        label="Switch" 
        checked={false} 
        onChange={mockOnChange} 
      />
    );
    expect(checkbox).not.toBeChecked();
  });

  test('calls onChange when clicked', () => {
    render(
      <ToggleSwitch 
        label="Switch" 
        checked={false} 
        onChange={mockOnChange} 
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  test('applies custom className', () => {
    const { container } = render(
      <ToggleSwitch 
        label="Switch" 
        checked={false} 
        onChange={mockOnChange}
        className="custom-class"
      />
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('custom-class');
  });
});