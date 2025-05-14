const express = require("express");
const cors = require("cors");

const setupMiddleware = (app) => {
  // Enable CORS
  app.use(cors());

  // Parse JSON bodies
  app.use(express.json());
};

module.exports = setupMiddleware;
