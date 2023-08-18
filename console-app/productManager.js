const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = 'archivoProductos.txt';
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const existingProduct = this.products.find(prod => prod.code === code);
        if (existingProduct) {
            console.log(`Error: El producto ${title} no se pudo agregar porque el código está duplicado.`);
            return;
        }

        const newProduct = {
            id: this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
        this.saveProducts();
        console.log(`Producto "${title}" agregado con éxito.`);
    }

    getProducts() {
        console.log(this.products);
    }

    getProductById(idFind) {
        const product = this.products.find(prod => prod.id === idFind);
        if (!product) {
            console.log(`Error: El producto con id ${idFind} no existe.`);
            return;
        }
        console.log(product);
    }

    updateProduct(idFind, campoCambiar, valorCambiar) {
        const product = this.products.find(prod => prod.id === idFind);
        if (!product) {
            console.log(`Error: El producto con id ${idFind} no existe.`);
            return;
        }

        if (!product.hasOwnProperty(campoCambiar)) {
            console.log(`Error: El campo ${campoCambiar} no existe en el producto.`);
            return;
        }

        product[campoCambiar] = valorCambiar;
        this.saveProducts();
        console.log(`El campo ${campoCambiar} del producto con id ${idFind} fue cambiado a ${valorCambiar}.`);
    }

    deleteProduct(idFind) {
        const index = this.products.findIndex(prod => prod.id === idFind);
        if (index === -1) {
            console.log(`Error: El producto con id ${idFind} no existe.`);
            return;
        }

        this.products.splice(index, 1);
        this.saveProducts();
        console.log(`El producto con id ${idFind} fue eliminado.`);
    }
}

const postProduct = new ProductManager();
postProduct.addProduct('Producto prueba', 'Este producto es una prueba', 200, 'Sin imagen', 'abc123', 25);
postProduct.addProduct('Producto prueba2', 'Este producto es una prueba', 21, 'Sin imagen', 'abc124', 25);
postProduct.getProducts();
postProduct.updateProduct(1, 'title', 'Título cambiado');
postProduct.deleteProduct(1);
postProduct.getProductById(2);