// public/js/event-details.js

// Function to fetch event details from Ticketmaster API
async function fetchEventDetails(eventId) {
    try {
      const response = await fetch(`/events/${eventId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event details');
      }
      const eventData = await response.json();
  
      // Update the page content with the fetched data
      document.querySelector('.event-title').textContent = eventData.name;
      document.querySelector('.event-date').textContent = `Date: ${formatDate(eventData.dates.start.localDate)}`;
      const location = eventData._embedded && eventData._embedded.venues ? eventData._embedded.venues[0].name : 'Location not available';
      document.querySelector('.event-location').textContent = `Location: ${location}`;
      if (eventData.images && eventData.images.length > 0) {
        document.querySelector('.event-image').src = eventData.images[0].url;
        document.querySelector('.event-image').alt = eventData.name;
      }
      const description = eventData.info ? eventData.info : 'No description available';
      document.querySelector('.event-description').textContent = description;
  
      // You can update the attending list and message board similarly
  
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  }
  
  // Call the fetchEventDetails function with the event ID
  const eventId = 'YOUR_EVENT_ID'; // Replace with the actual event ID
  fetchEventDetails(eventId);
  