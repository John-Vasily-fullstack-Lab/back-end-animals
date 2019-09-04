const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      animal,
      age,
      color,
      image
    } = req.body;
    
    Animal
      .create({ name, animal, age, color, image })
      .then(animal => res.send(animal))
      .catch(next);
  })

  .get('/all', (req, res, next) => {
    Animal
      .find()
      .then(animals => res.send(animals))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Animal
      .findById(req.params.id)
      .then(animal => res.send(animal))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Animal
      .findById(req.params.id)
      .delete(req.params.id)
      .then(animal => res.send(animal))
      .catch(next);
  });

