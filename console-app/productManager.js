const express = require("express");
const fs = require("fs");
const app = express();
const port = 8080;

app.use(express.json());

const productsRouter = express.Router();
app.use("/api/products", productsRouter);

const cartsRouter = express.Router();
app.use("/api/carts", cartsRouter);

const readDataFromJSON = (filename) => {
  try {
    const data = fs.readFileSync(filename, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeDataToJSON = (filename, data) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};

productsRouter.get("/", (req, res) => {
  const products = readDataFromJSON("productos.json");

  const limit = req.query.limit;
  if (limit) {
    res.json(products.slice(0, parseInt(limit))); // Convierte limit a entero
  } else {
    res.json(products);
  }
});

productsRouter.get("/:pid", (req, res) => {
  const productId = req.params.pid;
  const products = readDataFromJSON("productos.json");
  const product = products.find((product) => product.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

productsRouter.post("/", (req, res) => {
  const newProduct = req.body;
  const products = readDataFromJSON("productos.json");

  if (
    !newProduct.title ||
    !newProduct.description ||
    !newProduct.code ||
    isNaN(newProduct.price) ||
    isNaN(newProduct.stock) ||
    !newProduct.category
  ) {
    res
      .status(400)
      .json({ error: "Campos obligatorios faltantes o inválidos" });
    return;
  }

  newProduct.id = Date.now().toString();
  newProduct.status = true; // Establecer status en true por defecto
  newProduct.thumbnails = req.body.thumbnails || [];

  products.push(newProduct);
  writeDataToJSON("productos.json", products);
  res.status(201).json(newProduct);
});

productsRouter.put("/:pid", (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  const products = readDataFromJSON("productos.json");
  const index = products.findIndex((product) => product.id === productId);
  if (index !== -1) {
    // No actualizar el id
    updatedProduct.id = productId;
    products[index] = updatedProduct;
    writeDataToJSON("productos.json", products);
    res.json(products[index]);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

productsRouter.delete("/:pid", (req, res) => {
  const productId = req.params.pid;
  const products = readDataFromJSON("productos.json");
  const index = products.findIndex((product) => product.id === productId);
  if (index !== -1) {
    products.splice(index, 1);
    writeDataToJSON("productos.json", products);
    res.json({ message: "Producto eliminado" });
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

cartsRouter.post("/", (req, res) => {
  const newCart = req.body;
  const carts = readDataFromJSON("carrito.json");

  newCart.id = Date.now().toString();
  newCart.products = []; // Inicializar el arreglo de productos vacío
  carts.push(newCart);
  writeDataToJSON("carrito.json", carts);
  res.status(201).json(newCart);
});

cartsRouter.get("/:cid", (req, res) => {
  const cartId = req.params.cid;
  const carts = readDataFromJSON("carrito.json");
  const cart = carts.find((cart) => cart.id === cartId);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

cartsRouter.post("/:cid/product/:pid", (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;
  const carts = readDataFromJSON("carrito.json");
  const products = readDataFromJSON("productos.json");
  const cart = carts.find((cart) => cart.id === cartId);
  const product = products.find((product) => product.id === productId);

  if (!cart) {
    res.status(404).json({ error: "Carrito no encontrado" });
  } else if (!product) {
    res.status(404).json({ error: "Producto no encontrado" });
  } else {
    const existingProduct = cart.products.find((item) => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    writeDataToJSON("carrito.json", carts);
    res.status(201).json(cart);
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
