/*
 * This file is used to build the API routes, we may have
 * different routes for views and the like
 */

const express = require('express')

const headlineRoutes = require('./headlines')

const router = express.Router() //make a new router

//tell it to use the headlineRoutes
router.use('/headlines', headlineRoutes)

module.exports = router
