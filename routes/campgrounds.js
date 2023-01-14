const express = require('express');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds')
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

const router = express.Router();

router.get('/new', isLoggedIn, campgrounds.newForm);


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.create));

router.route('/:id')
    .get(catchAsync(campgrounds.show))
    .put(isLoggedIn, validateCampground, isAuthor, catchAsync(campgrounds.edit))//Actual edit route
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete));


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editForm));




module.exports = router; 