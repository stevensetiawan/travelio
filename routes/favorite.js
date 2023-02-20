"use strict"
const router = require('express').Router()
const favorite = require('../controllers/favorite')

router.get('/', favorite.getFavorites)
router.get('/:id', favorite.getFavorite)
router.put('/', favorite.favorite)
router.delete('/:id', favorite.unfavorite)

module.exports = router