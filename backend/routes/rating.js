"use strict"
const router = require('express').Router()
const rating = require('../controllers/rating')

router.get('/', rating.getRatings)
router.get('/:id', rating.getRatingId)
router.put('/', rating.createRating)
router.delete('/:id', rating.deleteRating)

module.exports = router