import express from 'express';
import ProductManager from '../managers/ProductManager.js';


const router = express.Router();
const productManager= new ProductManager();

// Ruta para obtener todos los productos
router.get('/', (req, res) => {
    const products = productManager.obtenerProductos();
    res.json(products);
});

// Ruta para obtener un producto por id
router.get('/:pid', (req, res) => {
    const product = productManager.obtenerProductoPorId(parseInt(req.params.pid));
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
    const { title, description, price, thumbnails, code, stock, category } = req.body;
    const nuevoProducto = productManager.agregarProducto(title, description, price, thumbnails, code, stock, category);
    res.status(201).json(nuevoProducto);
});

// Ruta para actualizar un producto por id
router.put('/:pid', (req, res) => {
    const productoActualizado = productManager.actualizarProducto(parseInt(req.params.pid), req.body);
    if (!productoActualizado) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(productoActualizado);
});

// Ruta para eliminar un producto por id
router.delete('/:pid', (req, res) => {
    const productoEliminado = productManager.eliminarProducto(parseInt(req.params.pid));
    if (!productoEliminado) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(204).send();
});

export default router;