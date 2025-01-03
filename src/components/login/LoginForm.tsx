import { useState } from 'react';
import { AppleIcon, GithubIcon, GoogleIcon } from './LoginFormIcon';
import { signIn } from '../../lib/auth.clients';

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

export const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validate = (): Errors => {
    const errors: Errors = {}; 
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email) {
      errors.email = 'You must enter your email address';
    } else if (!regex.test(formData.email)) {
      errors.email = 'You must enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'You must enter a password';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (formData.password.length > 20) {
      errors.password = 'Password must be at most 20 characters';
    }

    setErrors(errors);
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) return;
    setIsSubmitting(true);
    try {
      // Falta el signin con el formulario
      console.log('Formulario enviado:', formData);
    } catch (err) {
      console.log("Error al iniciar sesión con email y contraseña:", err);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await signIn.social({ provider: 'github' })
      console.log('Formulario enviado:', formData);
    } catch (err) {
      console.log("Error al iniciar sesión con GitHub:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full overflow-y-auto p-2">
      <div className="w-[80%] flex flex-col gap-2 mb-5">
        <h1 className="text-3xl font-semibold">Iniciar sesión</h1>
      </div>
      <div className="w-[80%] min-h-[70%] flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-semibold">Introduce un correo electrónico</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-2 p-3 border border-gray-300 rounded-md"
            placeholder="Correo electrónico"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-lg font-semibold">Introduce una contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-2 p-3 border border-gray-300 rounded-md"
            placeholder="Contraseña"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
      </div>
      <div className="w-[80%] flex flex-col gap-2 items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 mt-4 text-white bg-blue-900 rounded-md ${isSubmitting ? 'opacity-50' : ''}`}
        >
          {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </div>
      <div>
        <p className='mt-3 mb-3 text-sm'>
          Iniciar sesión con
        </p>
        <div className='flex flex-row gap-2'>
          <button>
            <AppleIcon />
          </button>
          <button>
            <GoogleIcon />
          </button>
          <button
            type='button'
            onClick={handleGitHubLogin}>
            <GithubIcon />
          </button>
        </div>
      </div>
      <div className='items-center flex'>
        <p className="mt-3 text-sm item">
          Aún no tienes una cuenta? <a href="/register" className="text-blue-600">¡Regístrate!</a>
        </p>
      </div>
    </form>
  );
};