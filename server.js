const express = require('express');

const path = require('path');

const fs = require('fs');

const PORT = process.env.PORT || 3001;

const uuid = require('./public/assets/js/uuid');

const app = express();

const postData = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//pathway
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    res.json(postData);
})

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const postNew = {
            title,
            text,
            id: uuid(),
        }
    }
    postData.push(postNew);
    fs.writeFileSync(
        './db/db.json',
        JSON.stringify(postData),
        (err) => {
            if (err) {
                throw err
            }
            console.info('Successfully updated notes!')
        }
    )
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);