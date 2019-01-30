//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const { headlinesController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all headlines
router.get('/', catchErrors(headlinesController.index))

//make a new headline
router.post('/', catchErrors(headlinesController.store))

//see one headline
router.get('/:id', catchErrors(headlinesController.show))

//get rid of a headline
router.delete('/:id', catchErrors(headlinesController.delete))

//update a headline
router.put('/:id', catchErrors(headlinesController.update))

module.exports = router
