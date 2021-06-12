module.exports = (sequelize, Sequelize) => {
    const Promo = sequelize.define("promo", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    }, {timestamps: false});
  
    return Promo;
  };