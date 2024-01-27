// Function to fetch event details from Ticketmaster API
async function fetchEventDetails(eventId) {
  try {
      const response = await fetch(`/events/${eventId}`);
      if (!response.ok) {
          throw new Error('Failed to fetch event details');
      }
      const eventData = await response.json();

      // Update the page content with the fetched data
      const template = document.querySelector('.event-details');
      const html = template.innerHTML;

      // Replace placeholders with actual event details
      const eventHTML = html
          .replace('{{event.name}}', eventData.name || 'Event Title not available')
          .replace('{{event.date}}', `Date: ${formatDate(eventData.dates.start.localDate) || 'Date not available'}`)
          .replace('{{event.location}}', `Location: ${eventData._embedded && eventData._embedded.venues ? eventData._embedded.venues[0].name : 'Location not available'}`)
          .replace('{{event.image}}', eventData.images && eventData.images.length > 0 ? eventData.images[0].url : '')
          .replace('{{event.description}}', eventData.info || 'No description available');

      // Update the event-details container with the rendered HTML
      template.innerHTML = eventHTML;

      // You can update the attending list and message board similarly

  } catch (error) {
      console.error('Error fetching event details:', error);
  }
}

// Get the event ID from the URL
const eventId = window.location.pathname.split('/').pop(); // Extract event ID from the URL
fetchEventDetails(eventId);
