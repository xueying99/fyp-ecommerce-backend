const db = require("../models");
const Promo = db.promos;
const Op = db.Sequelize.Op;

// Create and Save a new Promo
exports.create = (req, res) => {
    //validate request
    if(!req.body.title){
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    //create a Promo
    const promo = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    //save Promo in the database
    Promo.create(promo)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving promotions."
            });
        });
};

// Retrieve all Promos from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Promo.findAll({ where: condition })
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving promotions."
            });
        });
};

// Find a single Promotion with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Promo.findByPk(id)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Promotion with id = " + id
            });
        });
};

// Update a Promo by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Promo.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({message: "Promotion was updated successfully."});
            } else {
                res.send({message: `Cannot update Promotion with id=${id}. Maybe Promotion was not found or res.body is empty.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Promotion with id= " + id
            });
        });
};

// Delete a Promotion with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Promo.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({message: "Promotion was deleted successfully."});
            } else {
                res.send({ message: `Cannot delete Promotion with id=${id}. Maybe Promotion was not found.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Promotion with id= " + id
            });
        });
};

// Delete all Promos from the database.
exports.deleteAll = (req, res) => {
    Promo.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Promotions were deleted successfully.`});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all promotions."
            });
        });
};

// Find all published Promos
exports.findAllPublished = (req, res) => {
    Promo.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving promotions."
            });
        });
};