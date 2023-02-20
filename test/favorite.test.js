const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { Favorite } = require("../models");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("PUT /api/v1/favorite", () => {
  it("should add book to favorite", async () => {
    const res = await request(app).put("/api/v1/favorite").send({
      title: "Sprint (Republish)",
      image: "http://books.google.com/books/content?id=LxRkDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      authors: ["Jake Knapp"],
      id_api: "LxRkDwAAQBAJ"
    });
    expect(res.statusCode).toBe(201);
  });
});

describe("GET /api/v1/favorite", () => {
  it("should return favorites", async () => {
    const res = await request(app).get(
      "/api/v1/favorite"
    );
    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /api/v1/favorite", () => {
  it("should return delete favorites", async () => {
    const newFavorite = await Favorite.findOne({id_api: "LxRkDwAAQBAJ"});
    const res = await request(app).delete(
      `/api/v1/favorite/${newFavorite._id}`
    );
    expect(res.statusCode).toBe(200);
  });
});

