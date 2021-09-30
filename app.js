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
