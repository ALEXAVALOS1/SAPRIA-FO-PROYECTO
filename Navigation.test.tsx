import React from 'react';
import { render, screen } from '@testing-library/react';
import { Navigation } from './Navigation';

describe('Navigation Component', () => {
  test('renders all primary navigation links', () => {
    render(<Navigation />);
    
    const expectedLinks = [
      'Dashboard Principal',
      'Reportes Históricos',
      'Alertas Activas',
      'Recursos y Ayuda'
    ];

    expectedLinks.forEach(linkText => {
      const link = screen.getByText(linkText);
      expect(link).toBeInTheDocument();
      // Verifica que sean enlaces válidos (aunque apunten a # por ahora)
      expect(link.closest('a')).toHaveAttribute('href', '#');
    });
  });

  test('renders the PDF report generation button', () => {
    render(<Navigation />);
    
    // Busca el botón por su rol y texto accesible
    const pdfButton = screen.getByRole('button', { name: /Generar Reporte PDF/i });
    expect(pdfButton).toBeInTheDocument();
  });

  test('renders icons correctly', () => {
    render(<Navigation />);
    expect(screen.getByText('picture_as_pdf')).toBeInTheDocument();
  });

  test('has correct layout classes', () => {
    const { container } = render(<Navigation />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('bg-primary');
  });
});