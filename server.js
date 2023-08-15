const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
}
);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
}
);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
}
);