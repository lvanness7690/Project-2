// Function to fetch and display attendees
async function fetchAttendees(eventId) {
    try {
        const response = await fetch(`/api/events/${eventId}/attendees`);
        const attendees = await response.json();

        // Display attendees
        const attendeesList = document.getElementById('attendeesList');
        attendeesList.innerHTML = '';

        attendees.forEach(attendee => {
            const listItem = document.createElement('li');
            listItem.textContent = `User ${attendee.id}`;
            attendeesList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching attendees:', error);
    }
}

// Function to join the event
async function joinEvent() {
    const eventId = 1; // Replace with the actual event ID
    const userId = 1; // Replace with the actual user ID

    try {
        const response = await fetch(`/api/events/${eventId}/attendees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Fetch and display updated attendees
        fetchAttendees(eventId);
    } catch (error) {
        console.error('Error joining event:', error);
        alert('Error joining event. Please try again.');
    }
}

// Fetch attendees on page load
fetchAttendees(1); // Replace with the actual event ID