import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Asegúrate de tener configurada esta variable en tu .env

// Servicio para registrar usuarios
export const registerUser = async (userData: { full_name: string; email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (credentials: { email: string; password: string }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al iniciar sesión.');
    }
  
    return response.json();
  };