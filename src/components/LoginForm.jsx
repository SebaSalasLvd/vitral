import { useState } from 'react';
import { AppleIcon, GithubIcon, GoogleIcon } from './LoginFormIcon';


export const LoginForm = ({ hidden }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@/;

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      console.log('Submitting form with data:', formData);
      setTimeout(() => {
        console.log('Login Successful');
        setIsSubmitting(false);
      }, 100);
    } else {
      console.log('Validation errors:', errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col w-full h-auto ml-10 ${hidden ? 'hidden' : ''}`}>
      <div className="w-[80%] flex flex-col gap-2 mb-5 mt-10">
        <h1 className="text-3xl font-semibold">Iniciar sesion</h1>
      </div>
      <div className="w-[80%] min-h-[70%] flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-semibold">Introduce un correo electronico</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-2 p-3 border border-gray-300 rounded-md"
            placeholder="Correo electronico"
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
          {isSubmitting ? 'Iniciando sesion...' : 'Iniciar sesion'}
        </button>   
      </div>
      <div>
        <p className='mt-3 mb-3 text-sm'>
          Iniciar sesion con
        </p>
        <div className='flex flex-row gap-2'>
          <AppleIcon />
          <GoogleIcon/>
          <GithubIcon/>

        </div>
      </div>
      <div className='items-center flex'>
        <p className="mt-3 text-sm item">
          Aun no tienes una cuenta? <a href="/register" className="text-blue-600">Registrate!</a>
        </p>
      </div>
    </form>
  );
};