// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to elements on the page
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const eventsList = document.getElementById('events-list');

    // Listen for the form submission
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        const city = searchInput.value; // Get the city from the input

        // Fetch events from the Ticketmaster API
        fetch(`/api/search-events?city=${encodeURIComponent(city)}`)
            .then(response => response.json())
            .then(events => {
                eventsList.innerHTML = ''; // Clear the list before adding new results
                if (events.length === 0) {
                    eventsList.innerHTML = '<p>No events found for this location.</p>';
                } else {
                    // Create a tile for each event and add it to the list
                    events.forEach(event => {
                        const eventTile = createEventTile(event);
                        eventsList.appendChild(eventTile);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                eventsList.innerHTML = '<p>Error fetching events.</p>';
            });
    });

    // Function to create the HTML for each event tile
    function createEventTile(event) {
        // Create the outer div for the event tile
        const tile = document.createElement('div');
        tile.className = 'flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg mb-4 shadow';
    
        // Create the details div that will contain the title, date, and location
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'flex-grow';
    
        // Event Title
        const title = document.createElement('h3');
        title.textContent = event.name || 'No title available';
        title.className = 'text-lg font-bold text-blue-600';
        detailsDiv.appendChild(title);
    
        // Event Date
        const date = document.createElement('p');
        date.textContent = `Date: ${formatDate(event.dates?.start?.localDate) || 'Date not available'}`;
        date.className = 'text-gray-600';
        detailsDiv.appendChild(date);
    
        // Event Location
        const location = document.createElement('p');
        location.textContent = `Location: ${event._embedded?.venues[0]?.name || 'Location not available'}`;
        location.className = 'text-gray-600 mb-4';
        detailsDiv.appendChild(location);
    
        // 'More Info' Button
        const moreInfoButton = document.createElement('a');
        moreInfoButton.href = `/event/${event.id}`;
        moreInfoButton.textContent = 'More Info';
        moreInfoButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out';
        moreInfoButton.setAttribute('role', 'button');
    
        // Append the details div and the 'More Info' button to the main tile
        tile.appendChild(detailsDiv);
        tile.appendChild(moreInfoButton);
    
        return tile;
    }
    
    function formatDate(date) {
        if (!date) return 'Date not available';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }     
});
