//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const { imagesController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all headlines
router.get('/', catchErrors(imagesController.index))

//make a new headline
router.post('/', catchErrors(imagesController.store))

//see one headline
router.get('/:id', catchErrors(imagesController.show))

//get rid of a headline
router.delete('/:id', catchErrors(imagesController.delete))

//update a headline
router.put('/:id', catchErrors(imagesController.update))

module.exports = router
