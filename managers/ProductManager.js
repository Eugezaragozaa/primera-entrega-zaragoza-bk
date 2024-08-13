const fs = require('fs');
const path = require('path');

class ProductManager{
    constructor() {
        this.products = [];
        this.cargarProductos();
    }

    cargarProductos() {
        const rutaArchivo = path.join(__dirname, '../data/products.json');
        if (fs.existsSync(rutaArchivo)) {
            const data = fs.readFileSync(rutaArchivo, 'utf-8');
            this.products = JSON.parse(data);
        } else {
            this.products = [];
            this.inicializarProductos();  // Carga inicial de productos
        }
    }

    guardarProductos() {
        const rutaArchivo = path.join(__dirname, '../data/products.json');
        fs.writeFileSync(rutaArchivo, JSON.stringify(this.products, null, 2));
    }

    inicializarProductos() {
        this.addProduct("Sweater Isabella", "sweater de lana", 15000, "ruta/sweater01.jpg", "C001", 100);
        this.addProduct("Sweater Amalia", "sweater de lana abombado", 15000, "ruta/sweater02.jpg", "C002", 100);
        this.addProduct("Sweater Carlota", "sweater de lana y brillos", 15000, "ruta/sweater03.jpg", "C003", 100);

        this.addProduct("Remera Cerezo", "remera de algodon batick", 10000, "ruta/remera01.jpg", "C004", 100);
        this.addProduct("Remera Arrayan", "remera de algodon strass", 10000, "ruta/remera02.jpg", "C005", 100);
        this.addProduct("Remera Ceibo", "remera de algodon cadenas", 10000, "ruta/remera03.jpg", "C006", 100);

        this.addProduct("Pantalon Eclipse", "Pantalon oversise", 40000, "ruta/pantalon01.jpg", "C007", 100);
        this.addProduct("Pantalon Nebula", "Pantalon tiro alto", 40000, "ruta/pantalon02.jpg", "C008", 100);
        this.addProduct("Pantalon Fusion", "Pantalon oxford bicolor", 40000, "ruta/pantalon03.jpg", "C009", 100);

        this.guardarProductos();
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Todos los campos son obligatorios');
            return;
        }

        let productoExistente = this.products.find(producto => producto.code === code);
        if (productoExistente) {
            console.log(`El producto con el codigo ${code} ya existe.`);
            return;
        }

        let id = 1;
        if (this.products.length > 0) {
            id = this.products[this.products.length - 1].id + 1;
        }

        let nuevoProducto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id,
        };

        this.products.push(nuevoProducto);
        this.guardarProductos();
        return nuevoProducto;
    }

    obtenerProductos() {
        return this.products;
    }

    obtenerProductoPorId(id) {
        let product = this.productos.find(producto => producto.id === id);
        if (!product) {
            return null;
        }
        return product;
    }

    actualizarProducto(id, actualizaciones) {
        const product = this.obtenerProductoPorId(id);
        if (!product) return null;
        Object.assign(product, actualizaciones);
        this.guardarProductos();
        return product;
    }

    eliminarProducto(id) {
        const indiceProducto = this.products.findIndex(producto => producto.id === id);
        if (indiceProducto === -1) return null;
        this.products.splice(indiceProducto, 1);
        this.guardarProductos();
        return true;
    }
}

module.exports = ProductManager;


