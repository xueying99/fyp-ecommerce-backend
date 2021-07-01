module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
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