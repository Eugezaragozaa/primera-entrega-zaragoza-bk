/*import express from 'express';
import rutasProducts from '../routes/products.js';
import rutasCarts from '../routes/carts.js';

const app = express();

app.use(express.json());
app.use('/api/products', rutasProducts);
app.use('/api/carts', rutasCarts);

const PUERTO = 8080;
app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});*/


import express from 'express';
import rutasProducts from '../routes/products.js';
import rutasCarts from '../routes/carts.js';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
import { engine } from 'express-handlebars';

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server); 

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Middleware JSON y URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para 'public'
app.use(express.static('./src/public'));

// Rutas
app.use('/api/products', rutasProducts);
app.use('/api/carts', rutasCarts);

// Endpoint para vista 
app.get('/', (req, res) => {
    res.render('home');
});

// Endpoint para realTime
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// Configuracion de socket.io
io.on('connection', (socket) => {
    console.log('Cliente conectado');
    
});

const PUERTO = 8080;
server.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});

export { io };