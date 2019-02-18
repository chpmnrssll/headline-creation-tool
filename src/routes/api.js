/*
 * This file is used to build the API routes, we may have
 * different routes for views and the like
 */

const express = require('express')
const headlineRoutes = require('./headlines')
const imageRoutes = require('./images')

const router = express.Router() //make a new router

//tell it to use the routes
router.use('/headlines', headlineRoutes)
router.use('/images', imageRoutes)

module.exports = router
