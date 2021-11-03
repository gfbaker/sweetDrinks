const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

const mainRoutes = require('./routes/mainRouter');
const productRoutes = require('./routes/productRouter');

const port = 3080; 

/* CARPETA DE ARCHIVOS ESTÁTICOS */
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', './src/views');


app.use("/", mainRoutes);
app.use("/products", productRoutes);

/* SERVIDOR LEVANTADO */
app.listen(port, () => {
    console.log('Servidor corriendo en puerto '+port);
});

