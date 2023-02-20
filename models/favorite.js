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
      image: {
        type: String,
        required: true
      },
      author: {
        type: [String],
        required: true
      },
      id_api: {
        type: String,
        required: true,
        index: {
          unique: true,
          sparse: true
        },
        refPath: 'id_api'
      }
    },
    {timestamps: true}
  )

  const Favorite = mongoose.model("favorites", schema)
  return Favorite
}