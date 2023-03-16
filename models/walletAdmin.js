module.exports = (sequelize, DataTypes) => {
  const walletAdmin = sequelize.define(
    "wallet_admin",
    {
      transactionAdminId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      timeAdminTransaction: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeAdminTransaction: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      AmountMonet: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fromUserId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CurrentAdminBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: false,
    }
  );

  walletAdmin.associate = (db) => {
    walletAdmin.belongsTo(db.user);
  };

  return walletAdmin;
};
