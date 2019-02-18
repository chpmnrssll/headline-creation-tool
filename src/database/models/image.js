//import mongoose, our ODM for mongoDB
const mongoose = require('mongoose')

//Set any options for the schema
const options = {
  timestamps: true
}

const imageDefinition = {
  fileName: {
		type: String,
		required: true
	},
	buffer: {
		type: Buffer,
	}
}

//make the schema as a new instance of a mongoose schema, using our definition and options
const imageSchema = new mongoose.Schema(imageDefinition, options)

module.exports = mongoose.model('Image', imageSchema)
