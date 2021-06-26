const orders = require("../controllers/order.controller.js");
const { authJwt } = require("../middleware");
module.exports = app => {

    var router = require("express").Router();

    //retrieve all Orders
    router.get("/", authJwt.verifyToken, orders.findAll);
    //create a new Order
    router.post("/create", authJwt.verifyToken, orders.create);
    //delete a Order with id
    router.delete("/:id", authJwt.verifyToken, orders.delete);
    //create a new Order
    router.delete("/", authJwt.verifyToken, orders.deleteAll);

    app.use("/api/orders", router);
};