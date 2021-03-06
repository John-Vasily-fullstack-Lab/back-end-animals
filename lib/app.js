const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/animals', require('./routes/animals'));
app.use('/api/v1/animals/all', require('./routes/animals'));
app.use('/api/v1/animals/:id', require('./routes/animals'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
