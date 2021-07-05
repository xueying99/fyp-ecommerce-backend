const { cart } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;
const Cart = db.cart;
const Order = db.order;
const OrderItem = db.orderItem;

exports.findAll = function (req, res) {
    console.log("findAll")
    Cart.findAll
        ({
            where: {
                userId: req.userId
            }
        })
        .then(cart => {
            res.send(cart)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving carts."
            });
        });
}

// Create and Save a new Cart
exports.create = (req, res) => {
    //validate request
    if (!req.body.productId) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    //create a Cart
    const cart = {
        userId: req.userId,
        productId: req.body.productId,
        quantity: req.body.quantity,
        productPrice: req.body.productPrice
    };

    //save Cart in the database
    Cart.create(cart)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving carts."
            });
        });
};

// Delete a Cart with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Cart.destroy({
        where: {
            id: id,
            userId: req.userId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Cart Item was deleted successfully." });
            } else {
                res.send({ message: `Cannot delete Cart Item with id=${id}. Maybe Cart Item was not found.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Cart Item with id= " + id
            });
        });
};

// Delete all Carts from the database.
exports.deleteAll = (req, res) => {
    Cart.destroy({
        where: { userId: req.userId },
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} All Cart Items were deleted successfully.` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all cart items."
            });
        });
};

exports.checkout = (req, res) => {
    Cart.findAll({
        where: { userId: req.userId }
    })
        .then(carts => {
            let order = {
                userId: req.userId,
                payment: req.body.payment,
                date: new Date().toDateString(),  
                completed: true,
            }
            Order.create(order).then(o => {
                let orderItems = []
                for (let i = 0; i < carts.length; i++) {
                    orderItems.push({
                        orderId: o.id,
                        quantity: carts[i].quantity,
                        price: carts[i].productPrice,
                        productId: carts[i].productId
                    })
                }
                OrderItem.bulkCreate(orderItems).then(() => {
                    Cart.destroy({
                        where: { userId: req.userId }
                    })
                        .then(() => {
                            res.status(200)
                        })
                })
            })
        })
};