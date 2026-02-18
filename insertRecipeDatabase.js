const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3000;
const path = require('path');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'recipe_app'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database recipe_app');
});

app.use(express.json());

app.get('/addNewRecipe', (req, res) => {
    res.sendFile(path.join(__dirname, 'addNewRecipe.html'));
});

app.post('/submit_recipe', (req, res) => {
    const { recipe_name, recipe_owner, ingredients, recipe_image_url } = req.body;

    console.log('Received data:', { recipe_name, recipe_owner, ingredients, recipe_image_url });

    const query = 'INSERT INTO recipes (recipe_name, recipe_owner, ingredients, recipe_image_url) VALUES (?, ?, ?, ?)';
    db.query(query, [recipe_name, recipe_owner, ingredients, recipe_image_url], (err, result) => {
        if (err) {
            console.error('Error inserting recipe into database:', err);
            return res.status(500).json({ message: 'Error saving recipe' });
        }
        res.json({ message: 'Recipe added successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Insert server running on http://localhost:${PORT}`);
});
