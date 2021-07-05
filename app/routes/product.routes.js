const products = require("../controllers/product.controller.js");

module.exports = app => {

    var router = require("express").Router();

    //create a new Product
    router.post("/", products.create);
    //retrieve all Products
    router.get("/", products.findAll);
    //retrieve all published Products
    router.get("/published", products.findAllPublished);
    //retrieve a single Product with id
    router.get("/:id", products.findOne);
    //update a Product with id
    router.put("/:id", products.update);
    //delete a Product with id
    router.delete("/:id", products.delete);
    //create a new Product
    router.delete("/", products.deleteAll);
    
    app.use("/api/products", router);
};