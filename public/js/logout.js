// document.getElementById('logoutButton').addEventListener('click', function (event) {
//     event.preventDefault();
//     fetch('/logout', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//     .then(response => {
//         if (response.ok) {
//             window.location.href = '/login';
//         } else {
//             console.error('Logout failed:', response.statusText);
//         }
//     })
//     .catch(error => {
//         console.error('Error during logout:', error);
//     });
// });