//Here we will import all our controllers, this way we only need to
//import the controller as a single module, or an explicit constant later!!!
const headlinesController = require('./headlines')
const imagesController = require('./images')

module.exports = {
  headlinesController,
  imagesController
}
