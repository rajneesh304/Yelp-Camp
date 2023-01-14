const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}

module.exports.newForm = (req, res) => {
    return res.render('campgrounds/new');
}

module.exports.create = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    req.flash('success', 'Successfully made a new campground!');
    // if (!req.body.campground) throw new ExpressError('Invalid campground data', 400);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.show = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate(
        {
            path: 'reviews',
            populate: {
                path: 'author'
            }
        }).populate('author');
    if (!campground) {
        req.flash('error', "Cannot find that campground");
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/details', { campground });
}

module.exports.editForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', "Cannot find that campground");
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.edit = async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });
    req.flash('success', 'Successfully updated the campground!');
    res.redirect(`/campgrounds/${id}`);
}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
};