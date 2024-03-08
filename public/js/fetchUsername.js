<script>
document.addEventListener('DOMContentLoaded', function() {
    // Replace 'userIdValue' with the actual user ID from your session or authentication mechanism
    const userId = 'userIdValue';

    fetch(`/getUsername?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                // Assuming there's an element with the ID 'usernameSpan' where you want to display the username
                document.getElementById('usernameSpan').textContent = `Hello, ${data.username}`;
            }
        })
        .catch(error => console.error('Error fetching username:', error));
});
</script>
