module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        userId: {
            type: Sequelize.INTEGER
        },
        cartId: {
            type: Sequelize.INTEGER
        },
        totalQuantity: {
            type: Sequelize.INTEGER
        },
        totalPrice: {
            type: Sequelize.DOUBLE
        },
        date: {
            type: Sequelize.DATE
        },
        accepted: {
            type: Sequelize.BOOLEAN
        }
    }, { timestamps: false });

    return Order;
};