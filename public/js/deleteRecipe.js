// Functionality to delete a recipe by sending a fetch DELETE request if the user confirms that they would like to delete the recipe.
const deleteRecipeHandler = async (event) => {
  event.preventDefault();
  if (confirm("Are you sure you want to delete your recipe?")) {
    const id = event.target.dataset.num;
    console.log(`ID: ${id}`);
    try {
      if (id) {
        const response = await fetch(`/api/recipes/${id}`, {
          method: 'DELETE',
          body: JSON.stringify({ id }),
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        alert("No recipe found.")
      }
      // If the recipe was successfully deleted, redirect the user to their my-recipes page.
      document.location.replace('/my-recipes');

    // Otherwise, console log the error produced.
    } catch (error) {
      console.log(error);
    }
  };
}

document.querySelector('#delete-btn').addEventListener('click', deleteRecipeHandler);
