"use strict"
const {
  Favorite,
} = require('../models')

exports.getFavorite = async (req, res) => {
  try {
    const result = await Book.findOne(req.params.id_api)
    if(result){
      return res.status(200).send(true)
    } else {
      return res.status(200).send(false)
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error while retrieve data"
    })
  }
}

exports.getFavorites = async (req, res) => {
  try {
    const result = await Favorite.aggregate([
      { "$lookup": {
        "from": "ratings",
        "localField": "id_api",
        "foreignField": "id_api",
        "as": "rating"
      }}
    ]).sort({
      updatedAt: -1
    })
    return res.status(200).send(result)
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error while retrieve data"
    })
  }
}

exports.favorite = async (req, res) => {
  try {
    const favorite = {
      title: req.body.title,
      image: req.body.image,
      author: req.body.author
    }
    const result = await Favorite.findOneAndUpdate(
      { id_api: req.body.id_api },
      { $set: {
        title: req.body.title,
        image: req.body.image,
        author: req.body.author
        } 
      },
      { upsert: true, new: true }
    )
    return res.status(201).send(result)
  } catch (err) {
    return res.status(409).send({
      message: err.message || "Error to create package"
    })
  }
}

exports.unfavorite = async (req, res) => {
  try {
    const id = req.params.id
    const result = await Favorite.findByIdAndRemove(id)

    if (!result) {
      return res.status(404).send({
        message: "Book is not found"
      })
    } else {
      return res.status(200).send({
        message: "Book is unfavorite"
      })
    }
  } catch (err) {
    return res.status(409).send({
      message: err.message || "Error to unfavorite book"
    })
  }
}
