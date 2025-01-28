import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/products';
import '../styles/add.css'; // Importa el archivo CSS

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      alert('Producto agregado exitosamente');
      navigate('/products'); // Redirigir a la lista de productos
    } catch (error) {
      console.error(error);
      alert('Hubo un error al agregar el producto.');
    }
  };

  return (
    <div className="add-product-container">
      <h1 className="add-product-title">Agregar Producto</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Descripción:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Precio:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Categoría:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
