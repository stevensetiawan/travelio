"use strict"
const router = require('express').Router()
const rating = require('./rating')
const favorite = require('./favorite')

router.use('/favorite', favorite)
router.use('/rating', rating)

module.exports = router

