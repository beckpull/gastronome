// Functionality for mobile burger nav menu
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
    // If the navbarMenu does not have the class is-active, it will be added on click. If the navbar menu does have the class is-active, it will be removed on click.
    navbarMenu.classList.toggle('is-active');
    navbarMenu.classList.toggle('navbar-top-margin');
});


// Functionality for the logout button
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


// Functionality for accordion footer
const accordion = document.getElementsByClassName('contentBx');

for (i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function() {
        this.classList.toggle('active')
    })
}

let searchModalLink = document.getElementById("search-modal-link");
let searchModal = document.getElementById("search-modal");
let innerModalClose = document.getElementById("inner-modal-close");
let outerModalClose = document.getElementById("outer-modal-close");
searchModalLink.onclick = function() {
  searchModal.style.display = "block";
}

innerModalClose.onclick = function() {
  searchModal.style.display = "none";
}
outerModalClose.onclick = function() {
  searchModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target.className == "modal-background") {
    searchModal.style.display = "none";
  }
}
