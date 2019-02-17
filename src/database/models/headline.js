//import mongoose, our ODM for mongoDB
const mongoose = require('mongoose')

//Set any options for the schema
const options = {
  timestamps: true
}

const layerDefinition = {
  new: {
    type: Boolean,
    required: false
  },
  name: String,
  anchor: {
    x: Number,
    y: Number
  },
  layerType: String,
  zIndex: Number,
  image: String,
  text: String,
  rotation: Number,
  translate: {
    x: Number,
    y: Number
  },
  scale: {
    x: Number,
    y: Number
  },
  font: {
    primary: {
      color: String,
      family: String,
      shadow: {
        blur: Number,
        color: String,
        offset: {
          x: Number,
          y: Number
        }
      },
      size: Number,
      style: {
        bold: Boolean,
        italic: Boolean,
        underline: Boolean
      },
    },
    secondary: {
      color: String,
      family: String,
      shadow: {
        blur: Number,
        color: String,
        offset: {
          x: Number,
          y: Number
        }
      },
      size: Number,
      style: {
        bold: Boolean,
        italic: Boolean,
        underline: Boolean
      }
    }
  }
}

const layerSchema = new mongoose.Schema(layerDefinition, options)

const headlineDefinition = {
  name: String,
  layers: {
    type: [layerSchema],
    required: false
  }
}

//make the schema as a new instance of a mongoose schema, using our definition and options
const headlineSchema = new mongoose.Schema(headlineDefinition, options)

module.exports = mongoose.model('Headline', headlineSchema)
