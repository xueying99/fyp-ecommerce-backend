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

    return Order;
};