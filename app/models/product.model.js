module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      productname: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    }, {timestamps: false});
  
    return Product;
  };