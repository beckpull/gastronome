const deleteRecipeHandler = async (event) => {
  // event.preventDefault();
  if (confirm("Are you sure you want to delete your recipe?")) {
    const id = event.target.dataset.num;
    console.log(`ID: ${id}`);
  
    if (id) {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/my-recipes');
        // response.json({message: "Success!"});
      } else {
        alert(response.statusText);
      }
    }
  }
  };


document.querySelector('#delete-btn').addEventListener('click', deleteRecipeHandler);