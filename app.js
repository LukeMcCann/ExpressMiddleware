'use strict';

const app = require('express')();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(loggingMiddleware);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

function loggingMiddleware(req, res, next) {
    console.log('Hello from the middleware!');
    next();
}

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});