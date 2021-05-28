module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    //create a new Tutorial
    router.post("/", tutorials.create);
    //retrieve all Tutorials
    router.get("/", tutorials.findAll);
    //retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);
    //retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
    //update a Tutorial with id
    router.put("/:id", tutorials.update);
    //delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
    //create a new Tutorial
    router.delete("/", tutorials.deleteAll);
    
    app.use("/api/tutorials", router);
};