const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/gestion_productos', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a MongoDB exitosa.');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Detener el servidor si no se puede conectar
  }
};

module.exports = connectDB;
