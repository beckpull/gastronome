// Functionality for logging out: when the user clicks the logout navbar-item, send a POST fetch request to the /api/users/logout endpoint to the req.session can be destroyed. If the response is OK, redirect the user to the '/', the login page.
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);
