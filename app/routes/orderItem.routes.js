const orderItems = require("../controllers/orderItem.controller.js");
const { authJwt } = require("../middleware");
module.exports = app => {

    var router = require("express").Router();

    //retrieve all orderItems
    router.get("/", authJwt.verifyToken, orderItems.findAll);
    //create a new orderItem
    router.post("/create", authJwt.verifyToken, orderItems.create);
    //delete a orderItem with id
    router.delete("/:id", authJwt.verifyToken, orderItems.delete);
    //create a new orderItem
    router.delete("/", authJwt.verifyToken, orderItems.deleteAll);

    app.use("/api/orderItems", router);
};