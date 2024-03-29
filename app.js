const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRouter = require('./src/api/users');
const todoRouter = require('./src/api/todos');
const accountRouter = require('./src/api/account');
const tokenRouter = require('./src/api/token');

const errorHandler = require('./src/middleware/error-handler');

require('dotenv').config();

const app = express();

const whiteList = ["http://localhost:3000"];
const corsOptions = {
    origin: function (origin, callback) {
        if(whiteList.indexOf(origin) !== -1 || !origin) {
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

module.exports = app;
