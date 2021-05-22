const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')
const User = require('../models/users');
const checkAuth = require("../middleware/check-auth");

router.post('/authentication', userController.authentication);
router.get('/getuser', userController.getuser);
router.get('/getidUser/:id', userController.getidUser);
router.get('/getuserDetail/:email', userController.getuserDetail);
router.post('/adduser', userController.adduser);
router.put('/edituser/:id', userController.edituser);
router.delete('/deleteuser/:id', userController.deleteuser);
// router.post('/login', userController.login);


const passport = require('passport');
const users = require('../models/users');

// router.get('/google', passport.authenticate('google', { scope: ['profile'] }))
// router.get('/google', (req, res) => {
//         res.send('google');
//         console.log('goooooo');
//     })
// @desc    Google auth callback
// @route   GET /auth/google/callback

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router;