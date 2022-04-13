const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();

//setting
app.set('port', process.env.PORT || 3000);
app.engine('.hbs', engine({
    defaultLayout:'main',
    layoutsDir: app.get(path.join(__dirname, 'layouts')),
    partialsDir: app.get(path.join(__dirname, 'partials')),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set("views", path.join(__dirname,'views'));


//midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));


//static
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use(require('./router/route'));


app.listen(app.get('port'), () => {
    console.log('server on port:', app.get('port'));
})