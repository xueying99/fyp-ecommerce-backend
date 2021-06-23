module.exports = app => {
    const events = require("../controllers/event.controller.js");

    var router = require("express").Router();

    //create a new Event
    router.post("/", events.create);
    //retrieve all Events
    router.get("/", events.findAll);
    //retrieve all published Events
    router.get("/published", events.findAllPublished);
    //retrieve a single Event with id
    router.get("/event-mgt/:id", events.findOne);
    //update a Event with id
    router.put("/event-mgt/:id", events.update);
    //delete a Event with id
    router.delete("/event-mgt/:id", events.delete);
    //create a new Event
    router.delete("/", events.deleteAll);
    
    app.use("/api/events", router);
};