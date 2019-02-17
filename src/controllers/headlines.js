//import the Headline constant explicitly
const { Headline } = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('USERS')

//show all headlines
exports.index = async (req, res) => {

  //query the DB of all headlines
  await Headline.find().exec()
    .then(headlines => {
      log.success('Retrieved all {} headlines', headlines.length)
      res.json({ headlines: headlines })
    }).catch(err => {
      log.error(err, 'Could not retrieve headlines: {}', err.message)
      res.json({
        error: err,
        message: "Could not retrieve headlines"
      }).status(500)
    })
}

//Store a new headline
exports.store = async (req, res) => {

  let headline = new Headline(req.body)

  //save it in the DB
  await headline.save()
    .then(headline => {
      log.success('Created Headline: {}', headline.name)
      //send a 201 and the new resource
      res.status(201).json({ data: headline })
    }).catch(err => {
      log.error(err, 'Error creating headline: {}', headline.name)
      let errStatus = err.name === 'ValidationError' ? 400 : 500
      res.status(errStatus).json({ err: err })
    })
}

//this function is for looking at one headline by their mongo id
exports.show = async (req, res) => {

  //find this sneaky boye
  await Headline.findById(req.params.id).exec()
    .then(headline => {
      log.success('Found headline: {}', headline.name)
      res.json({ headline: headline })
    }).catch(err => {
      log.error(err, 'Error finding headline: {}', req.params.id)
      res.json({
        error: err,
        message: 'Could not retrieve headline'
      }).status(500)
    })
}

//ever wanted to make the headlines disappear
exports.delete = async (req, res) => {

  //find the sneaky boye and make him go away
  await Headline.findByIdAndRemove(req.params.id).exec()
    .then(() => {
      log.success('Deleted Headline: {}', req.params.id)
      //let em know there aint no content no mo
      res.status(204).json()
    }).catch(err => {
      log.error(err, 'Error finding headline: {}', req.params.id)
      res.status(500).json({ err: err })
    })

}

//edit a headline based on ID
exports.update = async (req, res) => {
  await Headline.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .exec()
  .then(headline => {
    log.success('Updated headline: {}', req.params.id)
    res.status(200).json({ headline: headline })
  }).catch(err => {
    log.error(err, "Could not update headline: {}", req.params.id)
    res.status(500).json({ err: err })
  })
}
