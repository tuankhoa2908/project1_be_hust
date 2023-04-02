module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currentBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
  // Associate between tables
  user.associate = (db) => {
    user.hasMany(db.profile_user, {
      foreignKey: "profile_user_userId",
    });
    user.hasMany(db.list_transaction, {
      foreignKey: "transaction_user_userId",
    });
    user.hasMany(db.list_tutor, {
      foreignKey: "tutor_user_userId",
    });
    user.hasMany(db.list_class, {
      foreignKey: "classOwner_user_userId",
      foreignKey: "tutorAccept_user_userId",
    });
    user.hasMany(db.list_offer, {
      foreignKey: "offer_user_tutorId",
    });
    user.hasMany(db.wallet_admin, {
      foreignKey: "wallet_admin_userId",
    });
  };

  return user;
};
