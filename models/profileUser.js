module.exports = (sequelize, DataTypes) => {
  const profileUser = sequelize.define(
    "profile_user",
    {
      profileId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      fullnameUser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ageUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      genderUser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressUser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneUser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // job: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "normalUser",
      },
      userProfileId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );

  profileUser.associate = (db) => {
    profileUser.belongsTo(db.user, {
      foreignKey: "userProfileId",
    });
  };

  return profileUser;
};
