// Function to fetch event details from Ticketmaster API
async function fetchEventDetails(eventId) {
  try {
      const response = await fetch(`/events/${eventId}`);
      if (!response.ok) {
          throw new Error('Failed to fetch event details');
      }
      const eventData = await response.json();

      // Update the page content with the fetched data
      document.querySelector('.event-title').textContent = eventData.name || 'Event Title not available';
      document.querySelector('.event-date').textContent = `Date: ${formatDate(eventData.dates.start.localDate) || 'Date not available'}`;
      const location = eventData._embedded && eventData._embedded.venues ? eventData._embedded.venues[0].name : 'Location not available';
      document.querySelector('.event-location').textContent = `Location: ${location}`;
      if (eventData.images && eventData.images.length > 0) {
          document.querySelector('.event-image').src = eventData.images[0].url;
          document.querySelector('.event-image').alt = eventData.name || 'Event Photo';
      }
      const description = eventData.info || 'No description available';
      document.querySelector('.event-description').textContent = description;

      // You can update the attending list and message board similarly

  } catch (error) {
      console.error('Error fetching event details:', error);
  }
}

// Get the event ID from the URL
const eventId = window.location.pathname.split('/').pop(); // Extract event ID from the URL
fetchEventDetails(eventId);
