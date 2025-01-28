import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/Product';
import { getProducts, deleteProduct } from '../services/products';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      await deleteProduct(id);
      fetchProducts(); // Refrescar la lista
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
    alert('Sesión cerrada exitosamente.');
    navigate('/'); // Redirigir al login
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-list-container">
      <div className="header">
        <h1 className="product-list-title">Lista de Productos</h1>
      </div>
      <div className="header-buttons">
          <button className="logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      <button className="add-product-button" onClick={() => navigate('/add')}>
            Agregar Producto
          </button>
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <div>
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/edit/${product.id}`)}
                  >
                    Editar
                  </button>
                </div>
                <div>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
