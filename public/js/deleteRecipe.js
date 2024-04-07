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
      document.location.replace('/my-recipes');

    } catch (error) {
      console.log(error);
    }
  };
}


  document.querySelector('#delete-btn').addEventListener('click', deleteRecipeHandler);
