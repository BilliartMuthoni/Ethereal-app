const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const PORT = 3001;

// Database connection
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

// Serve static files from the project directory and make 'Pictures' publicly accessible
app.use(express.static(path.join(__dirname)));
app.use('/Pictures', express.static(path.join(__dirname, 'Pictures')));

// Route to fetch all recipes
app.get('/recipes', (req, res) => {
    const query = 'SELECT * FROM recipes';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching recipes:', err);
            return res.status(500).json({ message: 'Error fetching recipes' });
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Display server running on http://localhost:${PORT}`);
});
