const { cart } = require("../models");
const db = require("../models");
const Cart = db.cart;
const Op = db.Sequelize.Op;

exports.findAll = function(req, res){
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
}

exports.create = function(req, res){
  console.log("create")
  Cart.create({
    productId: req.body.productId, 
    quantity: req.body.quantity, 
    userId: req.userId, 
    productPrice: req.body.productPrice
  })
  res.sendStatus(200)
}

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cart.destroy({
      where: { id: id }
  })
      .then(num => {
          if(num == 1){
              res.send({message: "Cart Item was deleted successfully."});
          } else {
              res.send({ message: `Cannot delete Cart Item with id=${id}. Maybe Cart Item was not found.`});
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
      where: {},
      truncate: false
  })
      .then(nums => {
          res.send({ message: `${nums} All Cart Items were deleted successfully.`});
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while removing all cart items."
          });
      });
};