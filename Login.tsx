import React, { useState, useEffect, useRef } from 'react';

interface LoginProps {
  onLogin: (role: string) => void;
}

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password: string) => {
  // Mínimo 8 caracteres, al menos un número y un símbolo
  return password.length >= 8 && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
};

// CORRECCIÓN: Eliminamos la redundancia de LoginProps en los parámetros
export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>('');
  const [isResetLoading, setIsResetLoading] = useState<boolean>(false);
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);
  const [resetError, setResetError] = useState<string>('');
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(username)) {
      setError('Por favor, ingrese un correo electrónico válido.');
      setShake(true);
      // CORRECCIÓN: window.setTimeout para evitar errores de tipo en VS Code
      window.setTimeout(() => {
        if (isMounted.current) setShake(false);
      }, 500);
      return;
    }

    if (!validatePassword(password)) {
      setError('La contraseña debe tener mín. 8 caracteres, un número y un símbolo.');
      setShake(true);
      window.setTimeout(() => {
        if (isMounted.current) setShake(false);
      }, 500);
      return;
    }

    setIsLoading(true);

    // Simular retardo de red
    await new Promise(resolve => window.setTimeout(resolve, 1500));

    if (!isMounted.current) return;

    // Simulación de autenticación simple
    if (username === 'admin@example.com' && password === 'Admin123$') {
      onLogin('admin');
    } else if (username === 'operator@example.com' && password === 'Operator123$') {
      onLogin('operator');
    } else if (username === 'viewer@example.com' && password === 'Viewer123$') {
      onLogin('viewer');
    } else {
      setError('Credenciales inválidas. Pruebe: admin@... y pass: Admin123$');
      setIsLoading(false);
      setShake(true);
      window.setTimeout(() => {
        if (isMounted.current) setShake(false);
      }, 500);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    
    if (!validateEmail(resetEmail)) {
      setResetError('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    setIsResetLoading(true);
    await new Promise(resolve => window.setTimeout(resolve, 1500));
    
    if (!isMounted.current) return;

    setIsResetLoading(false);
    setResetSuccess(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Contenedor principal con lógica de animación condicional */}
      <div data-testid="login-container" className={`bg-white dark:bg-card-dark p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700 animate-fade-in-up ${shake ? 'animate-shake' : ''}`}>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-dark-green mb-2">SINAPRIA-FO</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">Acceso al Sistema</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de Usuario */}
          <div>
            <label htmlFor="username" className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-green outline-none transition-all"
              placeholder="ejemplo@correo.com"
              disabled={isLoading}
            />
          </div>
          
          {/* Campo de Contraseña con toggle de visibilidad */}
          <div>
            <label htmlFor="password" className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">Contraseña</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-green outline-none transition-all pr-10"
                placeholder="••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                disabled={isLoading}
              >
                <span className="material-icons-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="button" 
              className="text-xs text-brand-green hover:underline font-medium" 
              disabled={isLoading}
              onClick={() => setIsForgotPasswordOpen(true)}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center bg-red-50 dark:bg-red-900/20 p-2 rounded">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-brand-green hover:bg-brand-dark-green disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-lg font-bold shadow-lg transition-transform active:scale-95 uppercase tracking-wide text-sm flex items-center justify-center gap-2"
          >
            {isLoading ? 'Procesando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
      
      {/* ... (Modal de recuperación se mantiene igual) ... */}
    </div>
  );
};

export default Login;