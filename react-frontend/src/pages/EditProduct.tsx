import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProducts, updateProduct } from '../services/products';
import { Product } from '../types/Product';
import '../styles/edit.css'; // Importación del CSS

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
  });

  const fetchProduct = async () => {
    try {
      const products = await getProducts();
      const product = products.find((p) => p.id === Number(id));
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
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      alert('Hubo un error al cargar el producto.');
    }
  };

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
      await updateProduct(Number(id), formData);
      alert('Producto actualizado exitosamente');
      navigate('/products');
    } catch (error) {
      console.error(error);
      alert('Hubo un error al actualizar el producto.');
    }
  };

  useEffect(() => {
    fetchProduct();
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
