const express = require("express");
const router = express.Router();
const file = require("../controllers/file.controller.js");

module.exports = app => {

  var router = require("express").Router();

  router.post("/upload", file.upload);
    router.get("/files", file.getListFiles);
    router.get("/files/:name", file.download);
  
    app.use("/api", router);
};
