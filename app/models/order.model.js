module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        userId: {
            type: Sequelize.INTEGER
        },
        date: {
            type: Sequelize.STRING
        },
        payment: {
            type: Sequelize.DOUBLE
        },
        shippingname: {
            type: Sequelize.STRING
        },
        shippingaddress: {
            type: Sequelize.STRING
        },
        shippingcontact: {
            type: Sequelize.STRING
        },
        bankname: {
            type: Sequelize.STRING
        },
        bankacc: {
            type: Sequelize.STRING
        },
        accepted: {  //payment status
            type: Sequelize.BOOLEAN
        },
        courier: {
            type: Sequelize.STRING
        },
        tracking: {
            type: Sequelize.STRING
        },
        completed: {  //order status
            type: Sequelize.BOOLEAN
        }
    }, { timestamps: false });

    return Order;
};