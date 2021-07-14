const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
    //validate request
    if (!req.body.title || !req.body.category || !req.body.productname || !req.body.description || !req.body.size || !req.body.price) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    Product.findOne({
        where: { productname: req.body.productname }
    })
        .then(product => {
            let data = {
                title: req.body.title,
                productname: req.body.productname,
                category: req.body.category,
                description: req.body.description,
                size: req.body.size,
                price: req.body.price,
                quantity: req.body.quantity,
                published: false
            };
            if(product) {
                res.status(400).send({
                    message: "Failed! Product name already existed."
                });
                return;
            } else {
                Product.create(data).then(e => {
                    res.send(product);
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving events."
            }); 
        });
}

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    const productname = req.query.productname;
    var condition = productname ? { productname: { [Op.like]: `%${productname}%` } } : null;

    Product.findAll({ where: condition })
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            });
        });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Product with id = " + id
            });
        });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Product.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Product was updated successfully." });
            } else {
                res.send({ message: `Cannot update Product with id=${id}. Maybe Product was not found or res.body is empty.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id= " + id
            });
        });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Product.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Product was deleted successfully." });
            } else {
                res.send({ message: `Cannot delete Product with id=${id}. Maybe Product was not found.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id= " + id
            });
        });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
    Product.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Products were deleted successfully.` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all products."
            });
        });
};

// Find all published Products
exports.findAllPublished = (req, res) => {
    Product.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            });
        });
};