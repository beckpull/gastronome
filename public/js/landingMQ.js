const imgColumn = document.querySelector('.img-column');
const image = document.querySelector('img');
const formColumn = document.querySelector('.form-column');
const container = document.querySelector('#container');



function handleMediaQueries() {
    if (window.innerWidth < 768) {
        // small screens
        container.classList.remove('columns');
        imgColumn.classList.remove('column', 'img-column');
        formColumn.classList.remove('column', 'form-column');
        image.setAttribute('style', 'width: 100vw; height: 30vh; object-fit: cover; object-position: center; ')

    } else {
       // larger screens
       container.classList.add('columns');
       imgColumn.classList.add('column', 'img-column');
       formColumn.classList.add('column', 'form-column');
       image.removeAttribute('style', 'width: 100vw; height: 30vh; object-fit: cover; object-position: center; ')
   }
}

// call the function initially to handle media queries on page load
handleMediaQueries();

// event listener for window resize event to handle media queries dynamically
window.addEventListener('resize', handleMediaQueries);
