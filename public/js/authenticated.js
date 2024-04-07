// functionality for mobile burger nav menu

const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
    // If the navbarMenu does not have the class is-active, it will be added on click. If the navbar menu does have the class is-active, it will be removed on click.
    navbarMenu.classList.toggle('is-active');
    navbarMenu.classList.toggle('navbar-top-margin');
});
