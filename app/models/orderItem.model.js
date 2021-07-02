module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define("orderItem", {
        orderId: {
            type: Sequelize.INTEGER
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.DOUBLE
        },
        productId: {
            type: Sequelize.INTEGER
        }

    }, { timestamps: false });

    // OrderItem.associate = function(models) {
    //     // associations can be defined here
    //     models.OrderItem.belongsTo( models.Order, { foreignKey: 'orderId' } );
    //     models.OrderItem.belongsTo( models.Product, { foreignKey: 'productId' } );
    // };

    return OrderItem;
};