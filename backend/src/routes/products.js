const express = require('express');
const pool = require('../db'); // Conexión a la base de datos
const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.id, p.name, p.description, p.price, c.name AS category, p.stock, p.created_at, p.updated_at
      FROM products p
      LEFT JOIN categories c ON p.category = c.id
      ORDER BY p.id;
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al obtener los productos.' });
  }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, price, category, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, category, stock]
    );
    res.status(201).json({ message: 'Producto agregado exitosamente.', product: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al agregar el producto.' });
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    const { id } = req.params; // Capturar el id de la URL
    const { name, description, price, category, stock } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE products SET name = $1, description = $2, price = $3, category = $4, stock = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
        [name, description, price, category, stock, id] // Pasar el id como parámetro
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }
  
      res.status(200).json({ message: 'Producto actualizado exitosamente.', product: result.rows[0] });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Error al actualizar el producto.' });
    }
  });
  

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    res.status(200).json({ message: 'Producto eliminado exitosamente.', product: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al eliminar el producto.' });
  }
});

module.exports = router;
