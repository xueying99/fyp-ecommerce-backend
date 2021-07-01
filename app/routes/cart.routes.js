const carts = require("../controllers/cart.controller.js");
const { authJwt } = require("../middleware");
module.exports = app => {

    var router = require("express").Router();

    //retrieve all Carts
    router.get("/", authJwt.verifyToken, carts.findAll);
    //create a new Cart
    router.post("/create", authJwt.verifyToken, carts.create);
    //delete a Cart with id
    router.delete("/:id", authJwt.verifyToken, carts.delete);
    //create a new Cart
    router.delete("/", authJwt.verifyToken, carts.deleteAll);

    router.post("/checkout", authJwt.verifyToken, carts.checkout);

    app.use("/api/carts", router);
};