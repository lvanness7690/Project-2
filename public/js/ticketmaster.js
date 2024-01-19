var ticketmasterApiKey = "Yio3XUbIXelEwiILrUkFNWRza6M30sVO";
var openWeatherMapApiKey = "fcdb77bcab0f5e656f374a185e3665bd";
const city = "New York"; 

function getEvents(city) {
  fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketmasterApiKey}&city=${city}`)
    .then(response => response.json())
    .then(data => displayEvents(data))
    .catch(error => console.error('Error fetching events:', error));
}

function displayEvents(data) {
  console.log("Event Data:", data);
 
}





getEvents(city)