const { DataTypes } = require("sequelize");
const sequelize = require("../common/sequelize");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(128).BINARY,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128).BINARY,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(128).BINARY,
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expired: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
    indexes: [
      { fields: ["username"], unique: true },
      { fields: ["token"], unique: true },
    ],
  }
);

module.exports = User;
