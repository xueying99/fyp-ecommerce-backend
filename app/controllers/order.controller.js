const { order, orderItem } = require("../models");
const db = require("../models");
const Order = db.order;
const Op = db.Sequelize.Op;
const OrderItem = db.orderItem;
const Product = db.products;

exports.findAll = function(req, res){
  console.log("findAll")
  Order.findAll
  ({
    include: [{
        model: OrderItem,
        include: [{
            model: Product
        }]
    }],
    where: { userId: req.userId }
  }) 
  // .then(order => {
  //   res.send(order)
  // })
  .then(data => { res.send(data); })
  .catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders."
    });
});
}

// exports.create = function(req, res){ //.then
//   console.log("create")
//   Order.create({
//     cartId: req.body.cartId, 
//     quantity: req.body.quantity, 
//     userId: req.userId, 
//     totalPrice: req.body.productPrice,
//     date: req.body.date,
//     accepted: req.body.accepted ? req.body.accepted : false
//   })
//   res.sendStatus(200)
// }

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
    // productId: req.body.productId, 
    // quantity: req.body.quantity, 
    // productPrice: req.body.productPrice,
    date: req.body.date,
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
      where: { userId: req.userId },
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