// The signupFormHandler function is triggered when the user submits their signup information. This will cause a fetch POST request with the new user's username, email, and password to be sent to the /api/users endpoint. If the user is successfully created and the response is OK, the user will be redirected to the /my-recipes page.
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/my-recipes');
    } else {
      alert("Signup failed. Please try using a different email.");
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);