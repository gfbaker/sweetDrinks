const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE
const session = require('express-session') //Requiriendo Session

const mainRoutes = require('./routes/mainRouter');
const productRoutes = require('./routes/productRouter');
const usersRoutes = require('./routes/usersRouter');

const port = 3080; 

/* CARPETA DE ARCHIVOS ESTÁTICOS */
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({secret:'Sweet Drinks Secret'})); 

//middleware para usar atributos de session
app.use(function(req, res, next) {
    res.locals.user = req.session.usuarioLogueado;
    next();
  });


app.set('view engine', 'ejs');
app.set('views', './src/views');


app.use("/", mainRoutes);
app.use("/products", productRoutes);
app.use("/", usersRoutes);

app.use((req,res, next) => {
    res.status(404).render('not-found')
});

/* SERVIDOR LEVANTADO */
app.listen(port, () => {
    console.log('Servidor corriendo en puerto '+port);
});

