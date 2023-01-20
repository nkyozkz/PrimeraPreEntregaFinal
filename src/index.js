const express = require("express");
const cartRouter = require('./routes/carrito_rutas');
const productRouter = require('./routes/productos_rutas.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);

app.listen(8080, () => console.log("Server initiated succesfully."));
