import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PaginationControls } from './PaginationControls';

describe('PaginationControls Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onNext: jest.fn(),
    onPrev: jest.fn(),
  };

  test('renders correctly', () => {
    render(<PaginationControls {...defaultProps} />);
    expect(screen.getByText('Página 1 de 5')).toBeInTheDocument();
    expect(screen.getByLabelText('Página anterior')).toBeInTheDocument();
    expect(screen.getByLabelText('Página siguiente')).toBeInTheDocument();
  });

  test('does not render when totalPages is 1', () => {
    const { container } = render(<PaginationControls {...defaultProps} totalPages={1} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('disables previous button on first page', () => {
    render(<PaginationControls {...defaultProps} currentPage={1} />);
    expect(screen.getByLabelText('Página anterior')).toBeDisabled();
    expect(screen.getByLabelText('Página siguiente')).not.toBeDisabled();
  });

  test('disables next button on last page', () => {
    render(<PaginationControls {...defaultProps} currentPage={5} />);
    expect(screen.getByLabelText('Página siguiente')).toBeDisabled();
    expect(screen.getByLabelText('Página anterior')).not.toBeDisabled();
  });

  test('calls onNext when next button is clicked', () => {
    render(<PaginationControls {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Página siguiente'));
    expect(defaultProps.onNext).toHaveBeenCalledTimes(1);
  });

  test('calls onPrev when previous button is clicked', () => {
    render(<PaginationControls {...defaultProps} currentPage={2} />);
    fireEvent.click(screen.getByLabelText('Página anterior'));
    expect(defaultProps.onPrev).toHaveBeenCalledTimes(1);
  });
});