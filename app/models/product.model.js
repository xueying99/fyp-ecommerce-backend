module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      productname: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    }, {timestamps: false});
  
    return Product;
  };