// Function to fetch and display messages
async function fetchMessages() {
    try {
        const response = await fetch('/api/events'); // Replace with your actual API endpoint
        const events = await response.json();

        // Display messages
        const messagesSection = document.getElementById('messagesSection');
        messagesSection.innerHTML = '';

        events.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.innerHTML = `<h3>${event.title}</h3>`;

            if (event.messages && event.messages.length > 0) {
                const messagesList = document.createElement('ul');
                event.messages.forEach(message => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${message.content} (Posted by User ${message.userId})`;
                    messagesList.appendChild(listItem);
                });

                eventDiv.appendChild(messagesList);
            } else {
                eventDiv.innerHTML += '<p>No messages yet.</p>';
            }

            messagesSection.appendChild(eventDiv);
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

// Function to post a new message
async function postMessage() {
    const messageContent = document.getElementById('messageContent').value;
    const eventId = 1; // Replace with the actual event ID

    if (messageContent.trim() === '') {
        alert('Please enter a message.');
        return;
    }

    try {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: messageContent,
                userId: 1, // Replace with the actual user ID
                eventId: eventId,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Clear the input field and fetch and display updated messages
        document.getElementById('messageContent').value = '';
        fetchMessages();
    } catch (error) {
        console.error('Error posting message:', error);
        alert('Error posting message. Please try again.');
    }
}

// Fetch and display messages on page load
fetchMessages();