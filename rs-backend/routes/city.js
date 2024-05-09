const express = require('express');
const router = express.Router();
const City = require('../models/city');

router.get('/', async (req, res) => {
  const cities = await City.find();
  res.json(cities);
});

router.post('/', async (req, res) => {
    const city = new City({
        cityName: req.body.cityName,
        locations: req.body.locations
    });

    try {
        const newCity = await city.save();
        res.status(201).json(newCity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/:cityId/locations', async (req, res) => {
    const city = await City.findById(req.params.cityId);
    city.locations.push(req.body);
    const savedCity = await city.save();
    res.json(savedCity);
  });

router.put('/:cityId/:locationId', async (req, res) => {
  const city = await City.findById(req.params.cityId);
  const location = city.locations.id(req.params.locationId);
  
  location.localName = req.body.localName;
  location.localAdress = req.body.localAdress;
  location.needVolunteers = req.body.needVolunteers;
  location.type = req.body.type;
  location.items = req.body.items;
  
  const savedCity = await city.save();
  res.json(savedCity);
});

router.post('/:cityId/:locationId/items', async (req, res) => {
    const city = await City.findById(req.params.cityId);
    const location = city.locations.id(req.params.locationId);
    location.items.push(req.body);
    const savedCity = await city.save();
    res.json(savedCity);
});

router.put('/:cityId/:locationId/items/:itemId', async (req, res) => {
  const city = await City.findById(req.params.cityId);
  const location = city.locations.id(req.params.locationId);
  const item = location.items.id(req.params.itemId);
  Object.assign(item, req.body);
  const savedCity = await city.save();
  res.json(savedCity);
});

router.delete('/:cityId/:locationId/items/:itemId', async (req, res) => {
  const city = await City.findById(req.params.cityId);
  const location = city.locations.id(req.params.locationId);
  location.items.id(req.params.itemId).remove();
  const savedCity = await city.save();
  res.json(savedCity);
});

module.exports = router;
