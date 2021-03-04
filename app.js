'use strict';

const app = require('express')();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(loggingMiddleware);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

app.get('/users', authMiddleware, (req, res) => {
    res.sendFile(__dirname + '/users.html');
});

function loggingMiddleware(req, res, next) {
    console.log(`${new Date().toString()}: ${req.originalUrl}`);
    next();
};

function authMiddleware(req, res, next) {
    req.query.admin ? next() : res.status(401).json({ status: 401, message: "You are not authorized to view this page."} );
};

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});