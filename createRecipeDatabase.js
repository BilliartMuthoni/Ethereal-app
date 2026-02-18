const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');

    db.query('CREATE DATABASE IF NOT EXISTS recipe_app', (err) => {
        if (err) throw err;
        console.log('Database created or exists already.');

        db.changeUser({ database: 'recipe_app' }, (err) => {
            if (err) throw err;
            console.log('Using recipe_app database');

            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS recipes (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    recipe_name VARCHAR(255) NOT NULL,
                    recipe_owner VARCHAR(255),
                    ingredients TEXT,
                    recipe_image_url VARCHAR(255)
                )
            `;
            db.query(createTableQuery, (err) => {
                if (err) throw err;
                console.log('Recipes table created or exists already.');
                db.end();
            });
        });
    });
});
