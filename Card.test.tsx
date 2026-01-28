import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  test('renders children correctly', () => {
    render(
      <Card>
        <span>Child Element</span>
      </Card>
    );
    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });

  test('applies default styling classes', () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    
    expect(card).toHaveClass('bg-card-light');
    expect(card).toHaveClass('dark:bg-card-dark');
    expect(card).toHaveClass('rounded-xl');
    expect(card).toHaveClass('shadow-sm');
  });

  test('merges custom className with default classes', () => {
    render(<Card data-testid="card" className="custom-class extra-padding">Content</Card>);
    const card = screen.getByTestId('card');
    
    expect(card).toHaveClass('custom-class');
    expect(card).toHaveClass('extra-padding');
    // Verify defaults are still there
    expect(card).toHaveClass('bg-card-light');
  });

  test('passes additional HTML attributes', () => {
    const handleClick = jest.fn();
    render(
      <Card 
        data-testid="interactive-card" 
        onClick={handleClick} 
        role="button"
        tabIndex={0}
      >
        Clickable
      </Card>
    );
    
    const card = screen.getByTestId('interactive-card');
    expect(card).toHaveAttribute('role', 'button');
    expect(card).toHaveAttribute('tabindex', '0');
    
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});