const fs = require("fs");

function requiredParameter(parameterName) {
    throw new Error(`El Parametro ${parameterName} no fue ingresado`);
}

class ProductManager {
    constructor(path) {
    this.fileName = "../productos.json";
    this.path = path;
    this.products = [];
    this.idProductoCreado = 0;
    }

    getProducts() {
    try {
        const data = JSON.parse(fs.readFileSync(`${this.path + this.fileName}`));
        return data;
    } catch (error) {
        console.log(
        `No se encontró un archivo con el nombre ${this.fileName} en la ruta ${this.path}`
        );
        return [];
    }
    }

    writeProducts(productsToPost) {
    fs.writeFileSync(
        `${this.path + this.fileName}`,
        JSON.stringify(productsToPost)
    );
    }

    incrementId() {
    this.idProductoCreado++;
    }

    addProduct(
    title = requiredParameter("title"),
    description = requiredParameter("description"),
    price = requiredParameter("price"),
    thumbnail = requiredParameter("thumbnail"),
    code = requiredParameter("code"),
    stock = requiredParameter("stock")
    ) {
    //Retornar todos los productos
    const products = this.getProducts();

    //Validar que el code no se repita
    const codigoRepetido = products.some((product) => product.code == code);
    if (codigoRepetido) {
        console.log("Code already exists");
        return;
    }

    //Se crea el objeto productos
    const product = {
        id: this.idProductoCreado,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    };

    //Se agrega el producto al json
    products.push(product);
    this.writeProducts(products);

    //Se incrementa el id en 1
    this.incrementId();
    }

    getProductById(id) {
    const products = this.getProducts();
    const foundProduct = products.find((product) => product.id == id);

    if (foundProduct == undefined) {
        console.log("Id to get not found");
    } else {
        return foundProduct;
    }
    }

    updateProduct(id, dataToUpdate) {
    const products = this.getProducts();
    const foundProductIndex = products.findIndex((product) => product.id == id);

    //Si no se encuentra el id, no se actulizará el producto
    if (foundProductIndex == -1) {
        console.log("Id to update not found");
        return;
    }

    //Si se encuentra el Id, se procederá a actualizarlo
    products[foundProductIndex] = {
        ...products[foundProductIndex],
        ...dataToUpdate,
    };
    this.writeProducts(products);
    return products[foundProductIndex];
    }

    deleteProduct(id) {
    const products = this.getProducts();
    const foundProductIndex = products.findIndex((product) => product.id == id);

    //Si no se encuentra el id, no se actulizará el producto
    if (foundProductIndex == -1) {
        console.log("Id to delete not found");
        return;
    }

    //Si se encuentra el Id, se procederá a borrarlo
    const productToDelete = products.splice(foundProductIndex, 1);
    this.writeProducts(products);
    return productToDelete;
    }
}

// -------------------- Se instancia el product manager para probar funcionalidad --------------------
const productManager = new ProductManager("./");

module.exports = {
    productManager
};