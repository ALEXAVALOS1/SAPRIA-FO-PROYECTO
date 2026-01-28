import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Login } from './Login';

describe('Login Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders login form correctly', () => {
    render(<Login onLogin={jest.fn()} />);
    expect(screen.getByText('SINAPRIA-FO')).toBeInTheDocument();
    expect(screen.getByText('Acceso al Sistema')).toBeInTheDocument();
    expect(screen.getByLabelText('Usuario')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
    expect(screen.getByText('¿Olvidaste tu contraseña?')).toBeInTheDocument();
    expect(screen.getByLabelText('Mostrar contraseña')).toBeInTheDocument();
  });

  test('updates input values', () => {
    render(<Login onLogin={jest.fn()} />);
    
    const usernameInput = screen.getByLabelText('Usuario') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Contraseña') as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput.value).toBe('testuser@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('toggles password visibility', () => {
    render(<Login onLogin={jest.fn()} />);
    
    const passwordInput = screen.getByLabelText('Contraseña') as HTMLInputElement;
    const toggleButton = screen.getByLabelText('Mostrar contraseña');

    expect(passwordInput.type).toBe('password');

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    
    fireEvent.click(screen.getByLabelText('Ocultar contraseña'));
    expect(passwordInput.type).toBe('password');
  });

  test('shows error message for invalid email format', () => {
    const handleLogin = jest.fn();
    render(<Login onLogin={handleLogin} />);
    
    fireEvent.change(screen.getByLabelText('Usuario'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    expect(screen.getByText('Por favor, ingrese un correo electrónico válido.')).toBeInTheDocument();
    
    // Verify shake effect class is applied
    expect(screen.getByTestId('login-container')).toHaveClass('animate-shake');
    expect(handleLogin).not.toHaveBeenCalled();
  });

  test('shows error message for weak password', () => {
    const handleLogin = jest.fn();
    render(<Login onLogin={handleLogin} />);
    
    fireEvent.change(screen.getByLabelText('Usuario'), { target: { value: 'valid@example.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'weak' } });
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    expect(screen.getByText(/La contraseña debe tener mín. 8 caracteres/i)).toBeInTheDocument();
    
    expect(screen.getByTestId('login-container')).toHaveClass('animate-shake');
    expect(handleLogin).not.toHaveBeenCalled();
  });

  test('shows loading state and error message with invalid credentials', async () => {
    const handleLogin = jest.fn();
    render(<Login onLogin={handleLogin} />);
    
    const usernameInput = screen.getByLabelText('Usuario');
    const passwordInput = screen.getByLabelText('Contraseña');
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.change(usernameInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'WrongPass123$' } });
    fireEvent.click(submitButton);

    // Check loading state
    expect(screen.getByText('Procesando...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // Fast-forward time
    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    expect(screen.getByText(/Credenciales inválidas/i)).toBeInTheDocument();
    expect(handleLogin).not.toHaveBeenCalled();
  });

  test('calls onLogin with valid credentials after loading', async () => {
    const handleLogin = jest.fn();
    render(<Login onLogin={handleLogin} />);
    
    fireEvent.change(screen.getByLabelText('Usuario'), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'Admin123$' } });
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    expect(screen.getByText('Procesando...')).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    expect(screen.queryByText(/Credenciales inválidas/i)).not.toBeInTheDocument();
    expect(handleLogin).toHaveBeenCalledWith('admin');
  });

  test('handles forgot password flow', async () => {
    render(<Login onLogin={jest.fn()} />);

    // Open modal
    fireEvent.click(screen.getByText('¿Olvidaste tu contraseña?'));
    expect(screen.getByText('Recuperar Contraseña')).toBeInTheDocument();

    // Submit with valid email
    const emailInput = screen.getByLabelText('Correo Electrónico');
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.click(screen.getByText('Enviar Instrucciones'));

    // Check loading
    expect(screen.getByText('Enviando...')).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    // Check success
    expect(screen.getByText('¡Correo Enviado!')).toBeInTheDocument();
    expect(screen.getByText(/user@example.com/)).toBeInTheDocument();

    // Close modal
    fireEvent.click(screen.getByText('Entendido'));
    expect(screen.queryByText('Recuperar Contraseña')).not.toBeInTheDocument();
  });
});