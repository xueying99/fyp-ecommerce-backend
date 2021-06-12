module.exports = app => {
    const promos = require("../controllers/promo.controller.js");

    var router = require("express").Router();

    //create a new Promo
    router.post("/", promos.create);
    //retrieve all Promos
    router.get("/", promos.findAll);
    //retrieve all published Promos
    router.get("/published", promos.findAllPublished);
    //retrieve a single Promo with id
    router.get("/:id", promos.findOne);
    //update a Promo with id
    router.put("/:id", promos.update);
    //delete a Promo with id
    router.delete("/:id", promos.delete);
    //create a new Promo
    router.delete("/", promos.deleteAll);
    
    app.use("/api/promos", router);
};