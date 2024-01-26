document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form'); // Ensure this ID matches your form

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/events'; // Redirect on successful registration
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data) {
                console.log('Response:', data);
                // Handle the response data (e.g., display error messages)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
