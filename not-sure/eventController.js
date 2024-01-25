var ticketmasterApiKey = "Yio3XUbIXelEwiILrUkFNWRza6M30sVO";

const { fetchEvents } = require('../public/js/utils/apiUtils');

const getEvents = (req, res) => {
  const { city } = req.params;

  fetchEvents(ticketmasterApiKey, city)
    .then(eventData => {
      res.json(eventData);
    })
    .catch(error => {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

module.exports = { getEvents };
