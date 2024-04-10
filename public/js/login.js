// The loginFormHandler function is triggered when the user submits their login information.
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    // If the user entered an email and password, 
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the user's my-recipes page.
        document.location.replace('/my-recipes');
      } else {
        alert("Incorrect email or password. Please try again!");
      }
    }
  };
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

  