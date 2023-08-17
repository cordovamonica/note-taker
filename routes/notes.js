// require packages and files
const note = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils.js');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
note.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
}
);

// GET Route for a specific note
note.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === noteId)[0] || {};
            return res.json(result);
        });
}
);

// POST Route for a new note
note.post('/', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error adding note');
    }
});

// DELETE Route for notes
note.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);

            writeToFile('./db/db.json', result);

            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
}
);

// export
module.exports = note;