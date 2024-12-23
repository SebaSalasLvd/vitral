import { useState } from 'react';

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
      }, 1000);
    } else {
      console.log('Validation errors:', errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col items-center w-full h-full ${hidden ? 'hidden' : ''}`}>
      <div className="w-[80%] flex flex-col gap-2 mb-5">
        <h1 className="text-3xl font-semibold">Iniciar sesion</h1>
      </div>
      <div className="w-[80%] min-h-[70%] flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-2 p-3 border border-gray-300 rounded-md"
            placeholder="john_doe@gmail.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-semibold">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-2 p-3 border border-gray-300 rounded-md"
            placeholder="$up3r_Secr3t_P4ssw0rd!"
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
        <p className="mt-4 text-sm">
          Aun no tienes una cuenta? <a href="/register" className="text-blue-600">Registrate!</a>
        </p>
      </div>
    </form>
  );
};