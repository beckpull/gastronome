

// Function to handle media queries
function handleMediaQueries() {
    // Check if the window width is less than 768 pixels (example breakpoint)
    if (window.innerWidth < 768) {
        // Apply styles or behaviors for small screens
        
    } else {
        // Apply styles or behaviors for larger screens
        console.log('Large screen detected');
    }
}

// Call the function initially to handle media queries on page load
handleMediaQueries();

// Add event listener for window resize event to handle media queries dynamically
window.addEventListener('resize', handleMediaQueries);
