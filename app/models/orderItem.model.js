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

    return OrderItem;
};