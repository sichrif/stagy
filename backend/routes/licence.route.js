const express = require('express');
const app = express();
const licenceRoute = express.Router();

// Licence model
let Licence = require('../model/Licence');

// Add Licence
licenceRoute.route('/add-licence').post((req, res, next) => {
  Licence.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all licence
licenceRoute.route('/').get((req, res) => {
  Licence.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single licence
licenceRoute.route('/read-licence/:id').get((req, res) => {
  Licence.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update licence
licenceRoute.route('/update-licence/:id').put((req, res, next) => {
  Licence.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Licence successfully updated!')
    }
  })
})

// Delete licence
licenceRoute.route('/delete-licence/:id').delete((req, res, next) => {
  Licence.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = licenceRoute;