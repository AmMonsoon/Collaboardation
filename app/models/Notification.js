
    module.exports = (sequelize, DataTypes) => {
      const Notification = sequelize.define('Notification', {
        id: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        message: DataTypes.STRING,
        isRead: DataTypes.BOOLEAN
      }, {});
      
      return Notification;
    };