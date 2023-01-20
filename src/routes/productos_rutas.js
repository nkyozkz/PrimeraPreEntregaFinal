const express = require("express");
const productManager = require("../managers/productManager.js");

const router = express.Router();

router.get('/', (req,res) => {
    res.status(200).send(productManager.getProducts())
});

router.get('/:pid', (req,res) => {
    const { pid } = req.params;

    const result = productManager.getProductById(pid);

    if( result.id ){
        res.status(200).send(result)
    }else{
        res.status(400).send(result)
    }
});

router.post('/', (req,res) => {
    const {title, description, code, price, stock, thumbnail} = req.body;

    if(!title){
        throw new Error('Title is required.')
    }

    if(!description){
        throw new Error('Description is required.')
    }

    if(!code){
        throw new Error('Code is required.')
    }

    if(!price){
        throw new Error('Price is required.')
    }

    if(!stock){
        throw new Error('Stock is required.')
    }

    if(!thumbnail){
        throw new Error('Thumbnail is required.')
    }

    productManager.addProduct(title, description, price, thumbnail, code, stock);
    res.status(200).send({message: "Product added succesfully"})
});

router.put('/:pid', (req,res) => {
    const {pid} = req.params;
    const {title, description, code, price, stock, thumbnail} = req.body;

    const result = productManager.updateProduct(pid, {title, description, code, price, stock, thumbnail});

    if(result.err){
        res.status(400).send(result)
    }else{
        res.status(200).send(result)
    }
    
})

module.exports = router;