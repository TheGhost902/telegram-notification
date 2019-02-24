const express = require('express');
const morgan = require('morgan');

const formRouter = require('./routers/form');

const app = express();
const port = 3000;

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());

app.use('/', formRouter);

app.listen(port, () => {
    console.log(`Server stert on port ${port}...`);
});