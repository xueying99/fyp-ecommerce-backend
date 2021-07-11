const orders = require("../controllers/order.controller.js");
const { authJwt } = require("../middleware");

module.exports = app => {

    var router = require("express").Router();

    //retrieve all Orders
    router.get("/", authJwt.verifyToken, orders.findAll);
    //retrieve a single Product with id
    router.get("/:id", authJwt.verifyToken, orders.findOne);
    //create a new Order
    router.post("/create", authJwt.verifyToken, orders.create);
    //delete a Order with id
    router.delete("/:id", authJwt.verifyToken, orders.delete);
    //create a new Order
    router.delete("/", authJwt.verifyToken, orders.deleteAll);
    //update a Order
    router.put("/:id", authJwt.verifyToken, orders.update);

    app.use("/api/orders", router); 
};