const express = require('express');
const app = express();
const rutasProducts = require('./routes/products');
const rutasCarts = require('./routes/carts');

app.use(express.json());
app.use('/api/products', rutasProducts);
app.use('/api/carts', rutasCarts);

const PUERTO = 8080;
app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});