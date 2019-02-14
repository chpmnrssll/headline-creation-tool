//import mongoose, our ODM for mongoDB
const mongoose = require('mongoose')

//Set any options for the schema
const options = {
  timestamps: true
}

const fontDefinition = {
  color: {
    type: String,
    required: true
  },
  family: {
    type: String,
    required: true
  },
  shadow: {
    type: Object,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  style: {
    type: Object,
    required: true
  },
}

const fontSchema = new mongoose.Schema(fontDefinition, options)

const layerDefinition = {
  new: {
    type: Boolean,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  anchor: {
    type: Object,
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
    type: fontSchema,
    required: true
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
