const express = require('express');
const app = express();
const path = require('path');

const mainRoutes = require('./routes/mainRouter');
const productRoutes = require('./routes/productRouter');

const port = 3080; 

/* CARPETA DE ARCHIVOS ESTÁTICOS */
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './src/views');


app.use("/", mainRoutes);
app.use("/", productRoutes);

/* SERVIDOR LEVANTADO */
app.listen(port, () => {
    console.log('Servidor corriendo');
});

