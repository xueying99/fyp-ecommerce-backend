const { order } = require("../models");
const db = require("../models");
const Order = db.order;
const Op = db.Sequelize.Op;

exports.findAll = function(req, res){
  console.log("findAll")
  Order.findAll
  ({
    where: {
      userId: req.userId
    }
  }) 
  .then(order => {
    res.send(order)
  })
}

exports.create = function(req, res){
  console.log("create")
  Order.create({
    cartId: req.body.cartId, 
    quantity: req.body.quantity, 
    userId: req.userId, 
    totalPrice: req.body.productPrice,
    date: req.body.date,
    accepted: req.body.accepted ? req.body.accepted : false
  })
  res.sendStatus(200)
}

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
      where: { id: id }
  })
      .then(num => {
          if(num == 1){
              res.send({message: "Order was deleted successfully."});
          } else {
              res.send({ message: `Cannot delete Order with id=${id}. Maybe Order was not found.`});
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
      where: {},
      truncate: false
  })
      .then(nums => {
          res.send({ message: `${nums} All Orders were deleted successfully.`});
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while removing all orders."
          });
      });
};