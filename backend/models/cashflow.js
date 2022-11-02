"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../common/sequelize");
const { User } = require("./user");

const Cashflow = sequelize.define("Cashflow", {
  Type: DataTypes.STRING,
  Amount: DataTypes.FLOAT,
  Description: DataTypes.STRING,
  referenceType: DataTypes.STRING,
  //TODO: create user associations with cashflows.
  // userID: DataTypes.INTEGER,
});

module.exports = Cashflow;
