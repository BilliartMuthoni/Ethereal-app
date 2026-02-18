document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-recipe-form');


    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const recipeData = {
            recipe_name: document.getElementById('recipe-name').value.trim(),
            recipe_owner: document.getElementById('recipe-owner').value.trim(),
            ingredients: document.getElementById('ingredients').value.trim(),
            recipe_image_url: document.getElementById('recipe-image-url').value.trim()
        };

        try {
           
            const response = await fetch('http://localhost:3000/submit_recipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipeData)
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message); 
                form.reset(); 
            } else {
                
                const errorData = await response.json();
                alert(`Failed to submit the recipe: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error:', error); 
            alert('There was an error adding the recipe. Please try again.');
        }
    });
});
