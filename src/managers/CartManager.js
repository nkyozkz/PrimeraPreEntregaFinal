// * --- Formato del carrito = {id, products: []}
const fs = require("fs");

class CartManager {
  constructor(path) {
    this.path = path;
  }

  createCart() {
    const cartList = this.getData();
    const cart = { products: [] };

    if (cartList.length == 0) {
      cart.id = 1;
    } else {
      let lastItemID = cartList[cartList.length - 1].id;
      cart.id = lastItemID + 1;
    }

    cartList.push(cart);
    fs.writeFileSync(this.path, JSON.stringify(cartList, null, 2));
    return cart;
  }

  getCartByID(cid) {
    const cartList = this.getData();

    const searchCart = cartList.find((cart) => cart.id == cid);
    if (searchCart) {
      return searchCart;
    } else {
      return { err: "A cart with that ID does not exist." };
    }
  }

  addProductToCart(cid, pid) {
    const cartList = this.getData();

    const indexCart = cartList.findIndex((cart) => cart.id == cid);
    if (indexCart == -1) {
      return { err: "A cart with that ID does not exist." };
    }

    let productIndex = cartList[indexCart].products.findIndex(
      (prod) => prod.id == pid
    );
    if (productIndex == -1) {
      const toAdd = { id: pid, quantity: 1 };

      cartList[indexCart].products.push(toAdd);
      fs.writeFileSync(this.path, JSON.stringify(cartList, null, 2));

      return { message: "added to cart", cart: cartList[indexCart].products };
    } else {
      cartList[indexCart].products[productIndex].quantity += 1;

      fs.writeFileSync(this.path, JSON.stringify(cartList, null, 2));

      return { message: "added to cart", cart: cartList[indexCart].products };
    }
  }

  getData() {
    let data = [];
    try {
      const carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      carts.forEach((element) => {
        data.push(element);
      });
    } catch (err) {
      console.log("The file was empty or did not exist.");
    }
    return data;
  }
}

module.exports = CartManager;

// * ---------- Testing ---------- *
/*const testProd = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price:200,
    thumbnail:"Sin imagen",
    code: "abc123",
    stock:25
}

const instancia = new ProductManager('./productList.json');

console.log(instancia.getProducts())
instancia.addProduct(testProd)
console.log(instancia.getProducts())
console.log(instancia.addProduct(testProd))
console.log(instancia.getProductByID(1))
console.log(instancia.updateProduct(1, {price: 300}))
console.log(instancia.deleteProduct(2))*/
