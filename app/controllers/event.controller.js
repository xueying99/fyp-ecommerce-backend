const db = require("../models");
const Event = db.events;
const Op = db.Sequelize.Op;

// Create and Save a new Event
exports.create = (req, res) => {
    //validate request
    if(!req.body.title){
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    //create a Event
    const event = {
        title: req.body.title,
        eventname: req.body.eventname,
        description: req.body.description,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        published: req.body.published ? req.body.published : false
    };

    //save Event in the database
    Event.create(event)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving events."
            });
        });
};

// Retrieve all Events from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Event.findAll({ where: condition })
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving events."
            });
        });
};

// Find a single Event with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Event.findByPk(id)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Event with id = " + id
            });
        });
};

// Update a Event by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Event.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({message: "Event was updated successfully."});
            } else {
                res.send({message: `Cannot update Event with id=${id}. Maybe Event was not found or res.body is empty.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Event with id= " + id
            });
        });
};

// Delete a Event with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Event.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({message: "Event was deleted successfully."});
            } else {
                res.send({ message: `Cannot delete Event with id=${id}. Maybe Event was not found.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Event with id= " + id
            });
        });
};

// Delete all Events from the database.
exports.deleteAll = (req, res) => {
    Event.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Events were deleted successfully.`});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all events."
            });
        });
};

// Find all published Events
exports.findAllPublished = (req, res) => {
    Event.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving events."
            });
        });
};