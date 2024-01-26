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
});

function createEventTile(event) {
    const tile = document.createElement('div');
    tile.className = 'bg-white p-4 border border-gray-200 rounded-lg mb-4 shadow';

    const title = document.createElement('h3');
    title.textContent = event.name || 'No title available';
    title.className = 'text-lg font-bold text-blue-600';

    const dateText = event.dates?.start?.localDate || 'Date not available';
    const date = document.createElement('p');
    date.textContent = `Date: ${dateText}`;
    date.className = 'text-gray-600';

    const locationText = event._embedded?.venues[0]?.name || 'Location not available';
    const location = document.createElement('p');
    location.textContent = `Location: ${locationText}`;
    location.className = 'text-gray-600';

    const descriptionText = event.info || 'No description available';
    const description = document.createElement('p');
    description.textContent = descriptionText;
    description.className = 'text-gray-600 mt-2';

    tile.appendChild(title);
    tile.appendChild(date);
    tile.appendChild(location);
    tile.appendChild(description);

    return tile;
}
