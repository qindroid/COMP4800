const express = require("express");
const router = express.Router();
const auth = require("../common/auth");
const checkAdmin = require("../common/isAdmin");
const errHandler = require("../common/errHandler");
const { endpoint } = require("../common/errHandler");
const Utils = require("../common/utils");

const getClient = require("../common/getClientUser");

const Cashflow = require("../models/cashflow");

const { IDNotFoundException } = require("../common/errorTypes");
const { route } = require("../app");

router.post(
  "/create",
  auth,
  endpoint(async (req, res, next) => {
    console.log(req.body);

    let cashflow = await Cashflow.create({
      Type: req.body.type,
      Amount: req.body.amount,
      Description: req.body.description,
      ReferenceType: req.body.referenceType,
    });

    Utils.SendResult(res, cashflow);
  })
);
router.get(
  "/all",
  auth,
  endpoint(async (req, res, next) => {
    // let user = await getClient(req.headers.token);
    // { where: { userID: user.id } }
    let result = Cashflow.findAll({});
    if (result) {
      Utils.SendResult(res, result);
    } else {
      throw new Error("No ");
    }
  })
);
router.get(
  "/:id",
  auth,
  endpoint(async (req, res, next) => {
    let cashflow = await Cashflow.findOne({ where: { id: req.params.id } });

    if (cashflow) Utils.SendResult(res, cashflow);
    else
      throw new IDNotFoundException(
        `Could not find cashflow with id: ${req.params.id}`
      );
  })
);

router.delete(
  "/delete",
  auth,
  endpoint(async (req, res, next) => {
    console.log(req.body);
    let deleted = await Cashflow.destroy({ where: { id: req.body.id } });
    console.log("deleted", deleted);
    if (deleted) {
      Utils.SendResult(res, { status: "OK" });
    } else
      throw new IDNotFoundException(
        `Could not delete Cashflow entry with id ${req.body.id}`
      );
  })
);

module.exports = router;
