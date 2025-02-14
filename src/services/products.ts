import axios from 'axios';
import { Product } from '../types/Product';

const API_URL = import.meta.env.VITE_API_URL;

// Obtener todos los productos
export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_URL}/products`);
  return response.data;
};

// Crear un nuevo producto
export const createProduct = async (
  product: Omit<Product, '_id' | 'created_at' | 'updated_at'>
): Promise<Product> => {
  const response = await axios.post<Product>(`${API_URL}/products`, product);
  return response.data;
};


// Actualizar un producto

export const updateProduct = async (id: string, product: Omit<Product, '_id' | 'created_at' | 'updated_at'>) => {
  const response = await axios.put<Product>(`${API_URL}/products/${id}`, product);
  return response.data;
};

// Eliminar un producto
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/products/${id}`);
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw error; // Propaga el error
  }
};
