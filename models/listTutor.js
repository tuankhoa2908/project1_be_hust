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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      timeLession: {
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
    listTutor.belongsTo(db.user);
  };
  return listTutor;
};
