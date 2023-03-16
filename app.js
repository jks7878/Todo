const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { verifyToken } = require('./src/middleware/authChecker');

const userRouter = require('./src/api/users');
const todoRouter = require('./src/api/todos');
const accountRouter = require('./src/api/account');
const tokenRouter = require('./src/api/token');

const errorHandler = require('./src/api/error-handler');

const app = express();

app.listen(8000, '0.0.0.0', () => { console.log(`Express Api Server Now Listening on port 8000`) });

const whiteList = ["http://localhost:3000"];
const corsOptions = {
    origin: function (origin, callback) {
        if(whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        }else {
            callback(new Error("Not Allowed Origin"));
        }
    }
}
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);
app.use('/api/account', accountRouter);
app.use('/api/token', tokenRouter);

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
