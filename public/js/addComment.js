// Functionality to post a new comment when the user clicks the submit button to submit their comment
const newCommentFormHandler = async (event) => {
  event.preventDefault();
  // Obtain the recipeId by grabbing the content of the url after the '/' delimiter
  const recipeId = window.location.pathname.split('/').pop();
  const content = document.querySelector("#comment-contents").value.trim();

  if (content) {
    // Send a POST request with the user's comment to the appropriate endpoint for the given recipe
    const response = await fetch(`/api/comments/${recipeId}`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });

    // If the response from the POST fetch request is OK, reload the page. Otherwise, create an alert with the response status text.
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#submit-comment-btn")
  .addEventListener("click", newCommentFormHandler);

