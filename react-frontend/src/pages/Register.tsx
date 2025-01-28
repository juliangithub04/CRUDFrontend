import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';
import '../styles/register.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '', // Cambiado de "name" a "full_name"
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setSuccess('');
      return;
    }

    try {
      await registerUser({
        full_name: formData.full_name, // Cambiado de "name" a "full_name"
        email: formData.email,
        password: formData.password,
      });

      setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
      setError('');
      setFormData({ full_name: '', email: '', password: '', confirmPassword: '' });

      setTimeout(() => navigate('/'), 2000); // Redirigir al login tras el registro
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar el usuario.');
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      <h1>Registro de Usuario</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="full_name">Nombre Completo:</label> {/* Etiqueta actualizada */}
          <input
            type="text"
            id="full_name"
            name="full_name" // Asegúrate de que coincida con el campo del estado
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-button">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
