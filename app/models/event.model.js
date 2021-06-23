module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
      title: {
        type: Sequelize.STRING
      },
      eventname: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      startdate: {
        type: Sequelize.STRING
      },
      enddate: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    }, {timestamps: false});
  
    return Event;
  };