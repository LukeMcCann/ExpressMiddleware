'use strict';

const app = require('express')();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});