const newPostFormHandler = async (event) => {
    event.preventDefault();
    const recipeId = window.location.pathname.split('/').pop(); 
    const contents = document.querySelector("#comment-contents").value.trim(); // Content inpute must either be labeled with id="comment-contents" or we will need to change this
    // console.log(recipeId);
    // console.log(contents);
    if (contents) {
 
      const response = await fetch(`/api/comments/${recipeId}`, {
        method: "POST",
        body: JSON.stringify({ contents }),
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
  .querySelector(".newcomment-form") // Form will either need to have class="newcomment-form" or we will need to change this
  .addEventListener("submit", newPostFormHandler);