//import mongoose, our ODM for mongoDB
const mongoose = require('mongoose')

//Set any options for the schema
const options = {
  timestamps: true
}

//Define all of its fields, like columns of a SQL table
const layerDefinition = {
  name: {
    type: String,
    required: true
  },
  layerType: {
    type: String,
    required: true
  },
  zIndex: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: false
  },
  font: {
    type: {
      color: {
        type: String,
        required: false
      },
      family: {
        type: String,
        required: false
      },
      size: {
        type: String,
        required: false
      },
      style: {
        type: String,
        required: false
      },
    },
    required: false
  },
}

const layerSchema = new mongoose.Schema(layerDefinition, options)

const headlineDefinition = {
  name: {
    type: String,
    required: true
  },
  layers: {
    type: [layerSchema],
    required: false
  },
}

//make the schema as a new instance of a mongoose schema, using our definition and options
const headlineSchema = new mongoose.Schema(headlineDefinition, options)

module.exports = mongoose.model('Headline', headlineSchema)
