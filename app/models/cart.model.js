// const Product = require("./product.model");
// const User = require("./user.model");

module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("cart", {
    userId: {
      type: Sequelize.INTEGER
    },
    productId: {
      type: Sequelize.INTEGER
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    productPrice: {
      type: Sequelize.DOUBLE
    }
  }, { timestamps: false });

  return Cart;
};