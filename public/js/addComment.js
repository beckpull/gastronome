const newPostFormHandler = async (event) => {
    event.preventDefault();
    const postId = window.location.pathname.split('/').pop(); 
    const contents = document.querySelector("#comment-contents").value.trim();
    console.log(postId);
    console.log(contents);
    if (contents) {
 
      const response = await fetch(`/api/comments/${postId}`, {
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
  .querySelector(".addcomment-card")
  .addEventListener("submit", newPostFormHandler);