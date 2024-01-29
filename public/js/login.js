document.getElementById('loginButton').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            window.location.href = '/events';
        } else {
            console.error('Login failed:', response.statusText);
        }
    } catch (error) {
        console.error('Login error:', error);
    }
});

function redirectToMainPage() {
    window.location.href = "/";
}
