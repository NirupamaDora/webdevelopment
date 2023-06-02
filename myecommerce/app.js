var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var session=require('express-session');
const bodyParser=require('body-parser');



var app = express();

app.use(session({
  secret:'webslesson',
  resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000000 }

}));


app.use(bodyParser.json());  
    
    app.post('post',(req,res)=>{
        console.log(req.body);
        res.json(req.body);
    });


var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var loginRouter= require('./routes/login-route');
var dashboardRouter= require('./routes/dashboard-route');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/cart',function(req,res){
  res.sendFile(path.join(__dirname,'./public/cart.html'));

})


app.use('/', indexRouter);
app.use('/', loginRouter);
app.use('/', dashboardRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
