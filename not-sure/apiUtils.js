const fetch = require('node-fetch');

var apiKey = "Yio3XUbIXelEwiILrUkFNWRza6M30sVO";

const fetchEvents = (city) => {
  return new Promise((resolve, reject) => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${city}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

module.exports = { fetchEvents };

// ticketmaster.js
//if (require.main === module) {
  // Example usage for standalone testing
  //const city = "New York";
  //fetchEvents(city)
    //.then(eventData => {
    //  console.log("Standalone Event Data:", eventData);
    //})
    //.catch(error => {
    //  console.error('Error fetching events:', error);
   // });


