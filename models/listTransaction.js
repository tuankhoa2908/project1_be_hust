module.exports = (sequelize, DataTypes) => {
  const listTransaction = sequelize.define(
    "list_transaction",
    {
      transactionId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      userTransactionId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeTransaction: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timeTransaction: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balanceFluctuations: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );

  listTransaction.associate = (db) => {
    listTransaction.belongsTo(db.user,
      {
        foreignKey: "userTransactionId",
      });
  };

  return listTransaction;
};
