require('dotenv').config();
const { Pool } = require('pg');

console.log('Conectando a la base de datos con los siguientes parámetros:')
console.log(`Usuario: ${process.env.DB_USER}`)
console.log(`Base de datos: ${process.env.DB_NAME}`)
console.log(`Host: ${process.env.DB_HOST}`)
console.log(`Contraseña: ${process.env.DB_PASSWORD}`)
console.log(`Puerto: ${process.env.DB_PORT}`)

// Configuración de la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
