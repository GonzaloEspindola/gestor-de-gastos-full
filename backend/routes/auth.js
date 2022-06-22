const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

/* find all */ 
router.post('/login', passport.authenticate('local', {session: false}) ,async (req,res, next) => {
    try {
        const user = req.user;
        const payload = {
            sub: user._email,
            role: "usuario"
        }
        const secret = "myAdmin"
        const token = jwt.sign(payload, secret);
        res.json({
            user,
            token
        });
    } catch (error) {
        next(error)
    }
})

module.exports = router;