const newCommentFormHandler = async (event) => {
    event.preventDefault();
    const recipeId = window.location.pathname.split('/').pop(); 
    const content = document.querySelector("#comment-contents").value.trim(); // Content inpute must either be labeled with id="comment-contents" or we will need to change this
    // console.log(recipeId);
    // console.log(contents);
    if (content) {
 
      const response = await fetch(`/api/comments/${recipeId}`, {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };

document
  .querySelector("#submit-comment-btn") // Form will either need to have class="newcomment-form" or we will need to change this
  .addEventListener("click", newCommentFormHandler);

  // will need this link in recipe.handlebars

