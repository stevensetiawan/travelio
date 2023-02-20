"use strict"
const {
  Rating
} = require('../models')

exports.getRatings = async (req, res) => {
  try {
    const result = await Rating.find().sort({
      updatedAt: -1
    })
    return res.status(200).send(result)
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error while retrieve data"
    })
  }
}

exports.getRatingId = async (req, res) => {
  try {
    const result = await Rating.findOne(req.params.id_api)
    if(result){
      return res.status(200).send(result.rating)
    } else {
      return req.status(200).send(0)
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error while retrieve data"
    })
  }
}

exports.createRating = async (req, res) => {
  try {
    const rating = new Rating({
      title: req.body.title,
      rating: req.body.rate,
    })
    const result = await Rating.findOneAndUpdate(
      { id_api: req.body.id_api },
      { $set: { rating: req.body.rate, title: req.body.title } },
      { upsert: true, new: true }
    );
    if (!result) {
      return res.status(404).send({
        message: "Book is not found"
      })
    } else {
      return res.status(201).send({
        message: "Success to rate"
      })
    }
  } catch (err) {
    return res.status(409).send({
      message: err.message || "Error to unfavorite book"
    })
  }
}

exports.updateRating = async (req, res) => {
  try {
    const id = req.params.id
    let rating = {
      title: req.body.title,
      rating: req.body.image,
    }

    const result = await Rating.findByIdAndUpdate(
      id, rating, {
        returnOriginal: false
      }
    )
    if (!result) {
      return res.status(404).send({
        message: "Rating is not found"
      })
    } else {
      return res.status(200).send({
        message: "Rating is updated",
        data: result
      })
    }
  } catch (err) {
    return res.status(409).send({
      message: err.message || "Error while update order package"
    })
  }
}

exports.deleteRating = async (req, res) => {
  try {
    const id = req.params.id
    const result = await Rating.findByIdAndRemove(id)

    if (!result) {
      return res.status(404).send({
        message: "Rating is not found"
      })
    } else {
      return res.status(200).send({
        message: "Rating is unfavorite"
      })
    }
  } catch (err) {
    return res.status(409).send({
      message: err.message || "Error to unfavorite book"
    })
  }
}