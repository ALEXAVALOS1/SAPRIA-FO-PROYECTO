import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer Component', () => {
  test('renders branding section', () => {
    render(<Footer />);
    expect(screen.getByText('SINAPRIA-FO')).toBeInTheDocument();
    expect(screen.getByAltText('Gobierno Municipal de Juárez')).toBeInTheDocument();
    expect(screen.getByText(/Sistema de Alertamiento Temprano/i)).toBeInTheDocument();
  });

  test('renders strategic links', () => {
    render(<Footer />);
    expect(screen.getByText('Enlaces Estratégicos')).toBeInTheDocument();
    expect(screen.getByText('Protección Civil')).toBeInTheDocument();
    expect(screen.getByText('Cuerpo de Bomberos')).toBeInTheDocument();
    expect(screen.getByText('Plan de Contingencia')).toBeInTheDocument();
  });

  test('renders emergency contact info', () => {
    render(<Footer />);
    expect(screen.getByText('Atención de Emergencias')).toBeInTheDocument();
    expect(screen.getByText('911')).toBeInTheDocument();
    expect(screen.getByTitle('Seguridad Pública')).toBeInTheDocument();
    expect(screen.getByTitle('Cruz Roja')).toBeInTheDocument();
    expect(screen.getByTitle('Bomberos')).toBeInTheDocument();
  });

  test('renders copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 Merkatics Ciudad Juárez/i)).toBeInTheDocument();
  });
});