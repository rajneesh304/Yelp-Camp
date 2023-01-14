
const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
};

module.exports.signUp = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            req.flash('success', 'Welcome to YelpCamp!');
            res.redirect('/campgrounds');
        })
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }

};

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo;
    console.log(req.session.returnTo);
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });

};