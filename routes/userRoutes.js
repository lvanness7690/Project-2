const User = require("../models/User");

router.get('/api/user', (req, res) => {
    User.findAll().then((data) => {
        res.json(data);
    });
});

router.post("/api/user", async (req, res) => {
    try {
        const newUser = User.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'failed to create user' });
    }
});

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/home', (req, res) => {
    res.render('home');
});

module.exports = router;