import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SatisfactionSurveyModal } from './SatisfactionSurveyModal';

describe('SatisfactionSurveyModal Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('does not render when isOpen is false', () => {
    render(<SatisfactionSurveyModal isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByText('Encuesta de Satisfacción')).not.toBeInTheDocument();
  });

  test('renders correctly when isOpen is true', () => {
    render(<SatisfactionSurveyModal isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText('Encuesta de Satisfacción')).toBeInTheDocument();
    expect(screen.getByText('¿Qué tan útil te pareció la información?')).toBeInTheDocument();
  });

  test('calls onClose when Escape key is pressed', () => {
    const handleClose = jest.fn();
    render(<SatisfactionSurveyModal isOpen={true} onClose={handleClose} />);
    
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('allows rating selection and enables submit button', () => {
    render(<SatisfactionSurveyModal isOpen={true} onClose={jest.fn()} />);
    
    const submitButton = screen.getByText('Enviar Comentarios');
    expect(submitButton).toBeDisabled();

    const star = screen.getByLabelText('Calificar con 5 estrellas');
    fireEvent.click(star);
    
    expect(submitButton).not.toBeDisabled();
  });

  test('requires comment for low ratings', () => {
    render(<SatisfactionSurveyModal isOpen={true} onClose={jest.fn()} />);
    
    const submitButton = screen.getByText('Enviar Comentarios');
    const star = screen.getByLabelText('Calificar con 3 estrellas');
    
    fireEvent.click(star);
    expect(submitButton).toBeDisabled();
    expect(screen.getByText('Por favor, añade un comentario para calificaciones bajas.')).toBeInTheDocument();
    
    const textarea = screen.getByPlaceholderText(/Por favor, cuéntanos/i);
    fireEvent.change(textarea, { target: { value: 'Test comment' } });
    
    expect(submitButton).not.toBeDisabled();
  });

  test('handles form submission and closes after delay', () => {
    const handleClose = jest.fn();
    render(<SatisfactionSurveyModal isOpen={true} onClose={handleClose} />);
    
    fireEvent.click(screen.getByLabelText('Calificar con 5 estrellas'));
    fireEvent.click(screen.getByText('Enviar Comentarios'));
    
    // Check success message
    expect(screen.getByText('¡Gracias por tu opinión!')).toBeInTheDocument();
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});