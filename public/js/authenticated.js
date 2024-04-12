// This stylesheet provides functionality needed by the nav bar, search modal, and accordion footer in the main.handlebars layout.


// Functionality for mobile burger nav menu
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
  // If the navbarMenu does not have the class is-active, it will be added on click. If the navbar menu does have the class is-active, it will be removed on click.
  navbarMenu.classList.toggle('is-active');
  navbarMenu.classList.toggle('navbar-top-margin');
});


// Functionality for accordion footer
const accordion = document.getElementsByClassName('contentBx');

for (i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    // For each contentBx of the accordion footer, on click, if the 'active' class is present, it is removed. If it is not present, it is added. The 'active' class adds height and padding to reveal the accessory links.
    this.classList.toggle('active');
  });
}


// Functionality for the search modal. Modals are display: none by default, and the display property is adjusted as appropriate when the user clicks to open or close the modal.
let searchModalLink = document.getElementById("search-modal-link");
let searchModal = document.getElementById("search-modal");
let innerModalClose = document.getElementById("inner-modal-close");
let outerModalClose = document.getElementById("outer-modal-close");

searchModalLink.onclick = function () {
  searchModal.style.display = "block";
}

innerModalClose.onclick = function () {
  searchModal.style.display = "none";
}

outerModalClose.onclick = function () {
  searchModal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target.className == "modal-background") {
    searchModal.style.display = "none";
  }
}
