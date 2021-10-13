const express = require('express');
const app = express();
const path = require('path');

const port = 3080; 

/* CARPETA DE ARCHIVOS ESTÁTICOS */
app.use(express.static('public'));

/* SERVIDOR LEVANTADO */
app.listen(port, () => {
    console.log('Servidor corriendo');
});

/* ARCHIVO INDEX.HTML */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/carrito1', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/carrito1.html'));
});

app.post('/carrito1', (req, res) => {
    res.redirect('/');
});

app.get('/carrito2', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/carrito2.html'));
});

app.post('/carrito2', (req, res) => {
    res.redirect('/');
});

/*PRODUCTDETAIL.HTML */
app.get('/productDetail', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/productDetail.html'));
});