import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProducts, updateProduct } from '../services/products';
import { Product } from '../types/Product';
import '../styles/edit.css'; // Importación del CSS

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID desde la URL
  const navigate = useNavigate();

  // Estado para los datos del formulario
  const [formData, setFormData] = useState<Omit<Product, '_id' | 'created_at' | 'updated_at'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
  });

  // Función para cargar el producto
  const fetchProduct = async () => {
    try {
      const products = await getProducts();
      const product = products.find((p) => p._id === id); // Buscar el producto por _id
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
        });
      } else {
        alert('Producto no encontrado.');
        navigate('/products'); // Redirigir si no se encuentra el producto
      }
    } catch (error) {
      console.error(error);
      alert('Hubo un error al cargar el producto.');
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value, // Convertir valores numéricos si es necesario
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct(id as string, formData); // Usar el ID como string
      alert('Producto actualizado exitosamente');
      navigate('/products'); // Redirigir a la lista de productos
    } catch (error) {
      console.error(error);
      alert('Hubo un error al actualizar el producto.');
    }
  };

  useEffect(() => {
    fetchProduct(); // Cargar el producto al montar el componente
  }, [id]);

  return (
    <div className="edit-product-container">
      <h1 className="edit-product-title">Editar Producto</h1>
      <form onSubmit={handleSubmit} className="edit-product-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Categoría:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <button type="submit" className="edit-product-button">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
