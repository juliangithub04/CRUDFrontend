const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos.' });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  try {
    const product = new Product({ name, description, price, category, stock });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el producto.' });
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, stock } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, stock },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto.' });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    res.json({ message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto.' });
  }
});


module.exports = router;
