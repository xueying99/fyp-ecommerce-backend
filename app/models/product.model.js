module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      title: {
        type: Sequelize.STRING
      },
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
      quantity: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    }, {timestamps: false});
  
    // Product.associate = function(models) {
    //   // associations can be defined here
    //   models.Product.hasMany( models.OrderItem, { foreignKey: 'productId' } );
    // };
    
    return Product;
  };