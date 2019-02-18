//import the Image constant explicitly
const { Image } = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('USERS')

//show all images
exports.index = async (req, res) => {

  //query the DB of all images
  await Image.find().exec()
    .then(images => {
      log.success('Retrieved all {} images', images.length)
      res.json({ images: images })
    }).catch(err => {
      log.error(err, 'Could not retrieve images: {}', err.message)
      res.json({
        error: err,
        message: "Could not retrieve images"
      }).status(500)
    })
}

//Store a new image
exports.store = async (req, res) => {

  let image = new Image(req.body)

  //save it in the DB
  await image.save()
    .then(image => {
      log.success('Created Image: {}', image.name)
      //send a 201 and the new resource
      res.status(201).json({ data: image })
    }).catch(err => {
      log.error(err, 'Error creating image: {}', image.name)
      let errStatus = err.name === 'ValidationError' ? 400 : 500
      res.status(errStatus).json({ err: err })
    })
}

//this function is for looking at one image by their mongo id
exports.show = async (req, res) => {

  //find this sneaky boye
  await Image.findById(req.params.id).exec()
    .then(image => {
      log.success('Found image: {}', image.name)
      res.json({ image: image })
    }).catch(err => {
      log.error(err, 'Error finding image: {}', req.params.id)
      res.json({
        error: err,
        message: 'Could not retrieve image'
      }).status(500)
    })
}

//ever wanted to make the images disappear
exports.delete = async (req, res) => {

  //find the sneaky boye and make him go away
  await Image.findByIdAndRemove(req.params.id).exec()
    .then(() => {
      log.success('Deleted Image: {}', req.params.id)
      //let em know there aint no content no mo
      res.status(204).json()
    }).catch(err => {
      log.error(err, 'Error finding image: {}', req.params.id)
      res.status(500).json({ err: err })
    })

}

//edit a image based on ID
exports.update = async (req, res) => {
  await Image.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .exec()
  .then(image => {
    log.success('Updated image: {}', req.params.id)
    res.status(200).json({ image: image })
  }).catch(err => {
    log.error(err, "Could not update image: {}", req.params.id)
    res.status(500).json({ err: err })
  })
}
