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

/*CARRITO1.HTML */
app.get('/carrito1', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/carrito1.html'));
});

app.post('/carrito1', (req, res) => {
    res.redirect('/');
});

/*CARRITO2.HTML */
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

/*REGISTRO.HTML */
app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/registro.html'));
});

app.post('/registro', (req, res) => {
    res.redirect('/');
});

/* LOGIN */
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.post('/login', (req, res) => {
    res.redirect('/');
});