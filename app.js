var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connection = require('./mongo');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const CustomerRouter = require('./routes/customers');
const AccountRouter = require('./routes/accounts');
const BillRouter = require('./routes/bills');
const RecipientRouter = require('./routes/recipients');
const CreditCardRouter = require('./routes/creditcards');
const StockRouter = require('./routes/stocks');
const LuisLowConfidencyLogRouter = require('./routes/luisLowConfidencyLogs');
const MainApiErrorLogRouter = require('./routes/mainApiErrorLogs');

var app = express();

var swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./example.json');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', indexRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Customers', CustomerRouter);
app.use('/Accounts', AccountRouter);
app.use('/Bills', BillRouter);
app.use('/Recipients', RecipientRouter);
app.use('/CreditCards', CreditCardRouter);
app.use('/Stocks', StockRouter);
app.use('/LuisLowConfidencyLogs', LuisLowConfidencyLogRouter);
app.use('/MainApiErrorLogs', MainApiErrorLogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
