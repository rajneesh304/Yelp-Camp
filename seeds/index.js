const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            author: '63bc25543da172198665c71d',
            title: `${sample(descriptors)} ${sample(places)}`,
            description: '    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi ullam dolorem, doloribus provident laudantium quod iusto consectetur molestiae quia et quo odit amet magnam facilis assumenda! Odit assumenda accusamus cum.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/doq9fvxos/image/upload/v1673716089/YelpCamp/rwe5ma8y4uyklystfl1x.jpg',
                    filename: 'YelpCamp/rwe5ma8y4uyklystfl1x',
                },
                {
                    url: 'https://res.cloudinary.com/doq9fvxos/image/upload/v1673716090/YelpCamp/v0ubs7rtrlkz08xd0ab6.jpg',
                    filename: 'YelpCamp/v0ubs7rtrlkz08xd0ab6',
                }
            ]
        });
        await camp.save();
    }
};

seedDB()
    .then(() => {
        db.close();
    })
    .catch(error => {
        console.log(error);
    })