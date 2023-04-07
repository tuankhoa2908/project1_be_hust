module.exports = (sequelize, DataTypes) => {
  const listOffer = sequelize.define(
    "list_offer",
    {
      offerId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      classOfferId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      classOwnerOfferId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tutorOfferId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // timeOffer: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      result: {
        type: DataTypes.STRING,
        defaultValue: "waiting",
        allowNull: false,
      },
      salaryPerMonth: {
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
  listOffer.associate = (db) => {
    listOffer.belongsTo(db.user, {
      foreignKey: "classOwnerOfferId",
      foreignKey: "tutorOfferId",
    });
    listOffer.belongsTo(db.list_class, {
      foreignKey: "classOfferId",
    });
  };
  return listOffer;
};
