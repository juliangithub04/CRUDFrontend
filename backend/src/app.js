require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const connectDB = require('./db');


connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Gestión de Productos!');
});

// Rutas de autenticación
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});

