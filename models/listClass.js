module.exports = (sequelize, DataTypes) => {
  const listClass = sequelize.define(
    "list_class",
    {
      classId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      classOwnerId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneContactClass: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      statusClass: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "actived",
      },
      subjectClass: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gradeClass: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      salaryPerSession: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sessionPerWeek: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      moneyPerMonth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      requireJob: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      timeSession: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genderStudent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameStudent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      schoolStudent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: false,
    }
  );
  listClass.associate = (models) => {
    listClass.hasMany(models.list_offer, {
      foreignKey: "offer_class_classId",
    });
    listClass.belongsTo(models.user);
  };

  return listClass;
};
