const { order, orderItem } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;
const Order = db.order;
const OrderItem = db.orderItem;
const Product = db.products;

exports.findAll = function (req, res) {
    console.log("findAll")
    Order.findAll
        ({
            // where: { userId: req.userId }
        })
        .then(order => { res.send(order); })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
}

// Create and Save a new Order
exports.create = (req, res) => {
    //validate request
    //   if(!req.body.productId){
    //       res.status(400).send({
    //           message: "Content cannot be empty!"
    //       });
    //       return;
    //   }

    //create a Order
    const order = {
        userId: req.userId,
        date: req.body.date,
        payment: req.body.payment,
        accepted: req.body.accepted ? req.body.accepted : false
    };

    //save Order in the database
    Order.create(order)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
};

// Update a Order by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Order.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({message: "Order was updated successfully."});
            } else {
                res.send({message: `Cannot update Order with id=${id}. Maybe Order was not found or res.body is empty.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Order with id= " + id
            });
        });
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Order.destroy({
        where: {
            id: id,
            userId: req.userId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Order was deleted successfully." });
            } else {
                res.send({ message: `Cannot delete Order with id=${id}. Maybe Order was not found.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Order with id= " + id
            });
        });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
    Order.destroy({
        where: { userId: req.userId },
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} All Orders were deleted successfully.` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all orders."
            });
        });
};