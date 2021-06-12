module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        contact: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        dob: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        poscode: {
            type: Sequelize.STRING
        }
    });

    return User;
};