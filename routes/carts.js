import express from 'express';
import CartManager from '../managers/CartManager.js';

const router = express.Router();
const cartManager = new CartManager();

// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
    const nuevoCarrito = cartManager.crearCarrito();
    res.status(201).json(nuevoCarrito);
});

// Ruta para obtener productos de un carrito por id
router.get('/:cid', (req, res) => {
    const cart = cartManager.obtenerCarritoPorId(parseInt(req.params.cid));
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart.products);
});

// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
    const cart = cartManager.agregarProductoACarrito(parseInt(req.params.cid), parseInt(req.params.pid));
    if (!cart) {
        return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    }
    res.status(201).json(cart);
});

export default router;