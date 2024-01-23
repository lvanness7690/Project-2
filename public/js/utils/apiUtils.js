var ticketmasterApiKey = "Yio3XUbIXelEwiILrUkFNWRza6M30sVO";
const fetch = require('node-fetch'); // need to install the 'node-fetch' package

const fetchEvents = (icketmasterApiKey, city) => {
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
