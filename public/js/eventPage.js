// public/js/eventPage.js

document.addEventListener('DOMContentLoaded', () => {
    const attendButton = document.getElementById('attendButton');
    const eventId = attendButton.getAttribute('data-event-id');
    const messageForm = document.getElementById('postMessageForm');
    const messageContent = document.getElementById('messageContent');

    // Handle 'Attend' button click
    attendButton.addEventListener('click', () => {
        fetch(`/api/events/${eventId}/attendees`, { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    // Update UI to reflect attendance
                    alert('You are now attending this event!');
                } else {
                    alert('Error attending event.');
                }
            })
            .catch(error => console.error('Error:', error));
    });

    // Handle message form submission
    messageForm.addEventListener('submit', event => {
        event.preventDefault();
        const content = messageContent.value.trim();
        if (content) {
            fetch(`/api/events/${eventId}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content })
            })
            .then(response => response.json())
            .then(data => {
                // Update the message board with the new message
                console.log('Message posted:', data);
                messageContent.value = ''; // Clear the textarea
            })
            .catch(error => console.error('Error posting message:', error));
        }
    });
});
