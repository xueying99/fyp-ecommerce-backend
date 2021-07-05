const express = require("express");
const router = express.Router();
const file = require("../controllers/file.controller.js");

let routes = (app) => {
    router.post("/upload", file.upload);
    router.get("/files", file.getListFiles);
    router.get("/files/:name", file.download);
  
    app.use("/api", router);
  };
  
  module.exports = routes;