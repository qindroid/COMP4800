'use strict';
const { DataTypes } = require("sequelize");
const sequelize = require("../common/sequelize");

const Cashflow = sequelize.define(
  "Cashflow",
  {
    Type: DataTypes.STRING,
    Amount: DataTypes.FLOAT,
    Description: DataTypes.STRING,
    ReferenceType: DataTypes.STRING
  }

);

module.exports = Cashflow;
