const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { Rating } = require("../models");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("PUT /api/v1/rating", () => {
  it("should rate book", async () => {
    const res = await request(app).put("/api/v1/rating").send({
      title: "Sprint (Republish)",
      rating: 2,
      id_api: "LxRkDwAAQBAJ"
    });
    expect(res.statusCode).toBe(201);
  });
});

describe("GET /api/v1/rating", () => {
  it("should return ratings", async () => {
    const res = await request(app).get(
      "/api/v1/rating"
    );
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /api/v1/rating/:id", () => {
  it("should return rating by id", async () => {
    const rating = await Rating.findOne({id_api: "LxRkDwAAQBAJ"});
    const res = await request(app).get(
      `/api/v1/rating/${rating._id}`
    );
    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /api/v1/rating/:id", () => {
  it("should return rating by id", async () => {
    const rating = await Rating.findOne({id_api: "LxRkDwAAQBAJ"});
    const res = await request(app).delete(
      `/api/v1/rating/${rating._id}`
    );
    expect(res.statusCode).toBe(200);
  });
});

