const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./src/api/users');
const todoRouter = require('./src/api/todos');
const errorHandler = require('./src/api/error-handler');

const app = express();

app.listen(8000, '0.0.0.0', () => { console.log(`Express Api Server Now Listening on port 8000`) });

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);

app.use(errorHandler);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
