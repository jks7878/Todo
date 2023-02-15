const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const userRouter = require('./src/api/user');

const app = express();

app.listen(8000, () => { console.log(`Express Api Server Now Listening on port 8000`) });

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/users', userRouter);

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
