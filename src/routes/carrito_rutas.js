const express = require("express");
const productManager = require("../managers/productManager.js");
const cartManager = require("../managers/cartManager.js");

const router = express.Router();

router.post('/', (req, res) => {
// · crear un carrito
const cart = cartManager.createCart();
res.status(200).send(cart);
});

router.get('/:cid', (req, res) => {
// · conseguir un carrito por su id
const { cid } = req.params;

const getCart = cartManager.getCartByID(cid)
if(getCart.id){
    res.status(200).send(getCart)
}else{
    res.status(400).send(getCart)
}

});

router.post('/:cid/product/:pid', (req, res) => {
    // agregar el producto al arreglo de carrito, product id & quantity.
    const { cid, pid } = req.params;
    const product = productManager.getProductById(pid);
    if(!product){
    return res.status(404).send({ error: 'Product not found' });
    }
    const result = cartManager.addProductToCart(cid, pid)
    
    if(result.cart){
        res.status(200).send(result)
    }else{
        res.status(400).send(result)
    }
});

module.exports = router;