class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(productData) {
      const existingProduct = this.products.find(product => product.code === productData.code);
      if (existingProduct) {
        throw new Error("Product with the same code already exists.");
      }
  
      const id = this.generateUniqueId();
      const newProduct = {
        id,
        ...productData,
      };
  
      this.products.push(newProduct);
      return newProduct;
    }
  
    getProductById(productId) {
      const product = this.products.find(product => product.id === productId);
      if (!product) {
        throw new Error("Product not found.");
      }
      return product;
    }
  
    generateUniqueId() {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let id;
      do {
        id = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      } while (this.products.some(product => product.id === id));
      return id;
    }
  }
  
  // Crear una instancia de ProductManager
  const productManager = new ProductManager();
  
  // Agregar un producto
  try {
    productManager.addProduct({
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    });
    console.log("Producto agregado con éxito.");
  } catch (error) {
    console.error("Error al agregar el producto:", error.message);
  }
  
  // Obtener lista de productos
  console.log("Lista de productos:", productManager.getProducts());
  
  // Intentar agregar un producto con el mismo código
  try {
    productManager.addProduct({
      title: "producto repetido",
      description: "Este es un producto repetido",
      price: 150,
      thumbnail: "Sin imagen",
      code: "abc123", // Código repetido
      stock: 10,
    });
    console.log("Producto agregado con éxito.");
  } catch (error) {
    console.error("Error al agregar el producto:", error.message);
  }
  
  // Obtener producto por ID
  try {
    const productId = productManager.getProducts()[0].id; // Obtener el ID del primer producto
    const foundProduct = productManager.getProductById(productId);
    console.log("Producto encontrado:", foundProduct);
  } catch (error) {
    console.error("Error al obtener el producto:", error.message);
  }