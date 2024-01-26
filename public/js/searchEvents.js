document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const eventsList = document.getElementById('events-list');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const city = searchInput.value;

        fetch(`/api/search-events?city=${encodeURIComponent(city)}`)
            .then(response => response.json())
            .then(events => {
                // Clear previous results
                eventsList.innerHTML = '';

                if (events.length === 0) {
                    eventsList.innerHTML = '<p>No events found for this location.</p>';
                } else {
                    // Add new results to eventsList
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

    function createEventTile(event) {
        const tile = document.createElement('div');
        tile.className = 'bg-white p-4 border border-gray-200 rounded-lg mb-4 shadow';

        const title = document.createElement('h3');
        title.textContent = event.name || 'No title available';
        title.className = 'text-lg font-bold text-blue-600';

        // Format the date
        const dateText = formatDate(event.dates?.start?.localDate) || 'Date not available';
        const date = document.createElement('p');
        date.textContent = `Date: ${dateText}`;
        date.className = 'text-gray-600';

        const locationText = event._embedded?.venues[0]?.name || 'Location not available';
        const location = document.createElement('p');
        location.textContent = `Location: ${locationText}`;
        location.className = 'text-gray-600';

        // Create the "Click Here for more info" button
        const button = document.createElement('button');
        button.textContent = 'Click Here for more info';
        button.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 inline-block';

        button.addEventListener('click', function() {
            // Redirect to the event details page
            window.location.href = `/events/${event.id}`;
        });

        tile.appendChild(title);
        tile.appendChild(date);
        tile.appendChild(location);
        tile.appendChild(button);

        return tile;
    }

    function formatDate(date) {
        if (!date) return 'Date not available';

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }
});