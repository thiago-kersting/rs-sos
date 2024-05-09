const mongoose = require('mongoose');
const locationSchema = require('./location');

const citySchema = new mongoose.Schema({
  cityName: String,
  locations: [locationSchema]
});

const City = mongoose.model('City', citySchema);

module.exports = City;