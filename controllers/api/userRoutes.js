const router = require("express").Router();
const User = require("../../models/User");

router.get('/', (req, res) => {
    User.findAll().then((data) => {
        res.json(data);
    });
    //Create Session
});

router.post("/", async (req, res) => {
    try {
        const newUser = User.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'failed to create user' });
    }
});
//Create Session 

module.exports = router;
