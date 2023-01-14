const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.signUp));

router.route('/login')
    .get(users.renderLoginForm)
    // Add keepSessionInfo: true in passport.authenticate to store info in returnTo url
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), users.login);

router.get('/logout', users.logout);

module.exports = router;