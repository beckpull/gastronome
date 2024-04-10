const mainContainer = document.querySelector('#main-container');
const image = document.querySelector('img');
const formColumn = document.querySelector('.form-column');
const container = document.querySelector('#container');

function handleMediaQueries() {
    if (window.innerWidth < 768) {
        // phone
        

    } else if (window.innerWidth < 1126) {
        //   tablet
        mainContainer.classList.remove('columns');

    } else {
        // desktop

    }
}

// call the function initially to handle media queries on page load
handleMediaQueries();

// event listener for window resize event to handle media queries dynamically
window.addEventListener('resize', handleMediaQueries);
