document.addEventListener('DOMContentLoaded', () => {
    // DOM is fully loaded

    // Example: Event listener for a form submission
    const exampleForm = document.getElementById('example-form');
    if (exampleForm) {
        exampleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Logic for handling form submission
            // For example, an AJAX request to your server
        });
    }

    // Example: Function to update part of the page dynamically
    function updateEventsList() {
        // Logic to dynamically update the events list
        // Could be an AJAX call to fetch and display new events
    }

    // Example: Event listener for user interactions
    const someButton = document.getElementById('some-button');
    if (someButton) {
        someButton.addEventListener('click', () => {
            // Logic to handle the button click
            // Maybe show/hide a form, or load more content, etc.
        });
    }

    // More event listeners and functions as needed
});

// Additional functions or utilities can be defined here
<script src="/js/main.js"></script>
