module.exports = (sequelize, DataTypes) => {
  const listTutor = sequelize.define(
    "list_tutor",
    {
      tutorId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      subjectCanAcpt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gradeCanAcpt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timeSession: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      minSalary: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
  listTutor.associate = (db) => {
    listTutor.belongsTo(db.user, {
      foreignKey: "tutorId",
    });
  };
  return listTutor;
};
