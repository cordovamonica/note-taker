// require express and notesRouter
const express = require('express');
const notesRouter = require('./notes');
const app = express();

app.use('/notes', notesRouter); 

// export
module.exports = app;