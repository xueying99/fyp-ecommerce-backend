const { orderItem } = require("../models");
const db = require("../models");
// const Cart = db.cart;
const Op = db.Sequelize.Op;
// const Order = db.order;
const OrderItem = db.orderItem;

exports.findAll = function (req, res) {
    console.log("findAll")
    OrderItem.findAll
        ({
            where: { userId: req.userId }
        })
        .then(orderItem => {
            res.send(orderItem)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving order items."
            });
        });
}

// Create and Save a new OrderItem
exports.create = (req, res) => {
    //validate request
    if (!req.body.productId) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    //create a OrderItem
    const orderItem = {
        orderId: req.body.orderId,
        quantity: req.body.quantity,
        price: req.body.price,
        productId: req.body.productId,
    };

    //save OrderItem in the database
    OrderItem.create(orderItem)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving carts."
            });
        });
};

// Delete a OrderItem with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    OrderItem.destroy({
        where: {
            id: id,
            userId: req.userId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Order Item was deleted successfully." });
            } else {
                res.send({ message: `Cannot delete Order Item with id=${id}. Maybe Cart Item was not found.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Order Item with id= " + id
            });
        });
};

// Delete all OrderItems from the database.
exports.deleteAll = (req, res) => {
    OrderItem.destroy({
        where: { userId: req.userId },
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} All Order Items were deleted successfully.` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all order items."
            });
        });
};