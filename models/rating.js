"use strict"
const mongoose = require('mongoose')
const { Schema } = mongoose
module.exports = (mongoose) => {
  const schema = Schema(
    {
      title: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      id_api: {
        type: String,
        index: {
          unique: true,
          sparse: true
        },
        required: true
      }
    },
    {timestamps: true}
  )

  const Rating = mongoose.model("ratings", schema)
  return Rating
}