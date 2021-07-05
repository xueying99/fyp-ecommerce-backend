module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        userId: {
            type: Sequelize.INTEGER
        },
        date: {
            type: Sequelize.DATE
        },
        payment: {
            type: Sequelize.DOUBLE
        },
        completed: {
            type: Sequelize.BOOLEAN
        }
    }, { timestamps: false });

    // Order.associate = function(models) {
    //     // associations can be defined here
    //     models.Order.hasMany( models.OrderItem, { foreignKey: 'orderId' } );
    // };
      

    return Order;
};