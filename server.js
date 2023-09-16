const express = require('express');

const path = require('path');

const fs = require('fs');

const PORT = process.env.PORT || 3001;

const uuid = require('./public/assets/js/uuid');

const app = express();

const postData = JSON.parse(fs.readFileSync('/db/db.json'));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//pathway
app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    res.json(postData);
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);