module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        emailId: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING,
            validate: {
                is: ["^[1-9][0-9]{9}$", 'i']
            }
        },
        country: {
            type: Sequelize.STRING
        },
    });

    return User;
};
