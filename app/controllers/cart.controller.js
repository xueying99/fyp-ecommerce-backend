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

// exports.create = function(req, res){
//   console.log("create")
//   Cart.create({
//     productId: req.body.productId, 
//     quantity: req.body.quantity, 
//     userId: req.userId, 
//     productPrice: req.body.productPrice
//   })
//   res.sendStatus(200)
// }

// Create and Save a new Cart
exports.create = (req, res) => {
  //validate request
  if(!req.body.productId){
      res.status(400).send({
          message: "Content cannot be empty!"
      });
      return;
  }

  //create a Cart
  const cart = {
    productId: req.body.productId, 
    quantity: req.body.quantity, 
    userId: req.userId, 
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
      where: { userId: req.userId },
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

//exports.checkout
//pass cartId 
exports.checkout = (req, res) => {
    //validate request
    if(!req.body.productId){
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }
  
    //create a Cart
    const order = {
      productId: req.body.productId, 
      quantity: req.body.quantity, 
      userId: req.userId, 
      productPrice: req.body.productPrice
    };
  
    //save Cart in the database
    Cart.checkout(order)
        .then(data => { 
            res.send(data); 
            Cart.destroy({
                where: { userId: req.userId },
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
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving carts."
            });
        });
  };