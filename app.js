const express = require('express');
const path = require('path');
const insertRecipeRoutes = require('./insertRecipeDatabase');

const app = express();
const PORT = 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the HTML form on the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addNewRecipe.html'));
});

// Use the route from insertRecipeDatabase.js for handling form submissions
app.use(insertRecipeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
