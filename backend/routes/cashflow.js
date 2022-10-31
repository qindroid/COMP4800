const express = require("express");
const router = express.Router();
const auth = require("../common/auth");
const checkAdmin = require("../common/isAdmin");
const errHandler = require("../common/errHandler");
const Utils = require("../common/utils");
const Cashflow = require("../models/cashflow");

router.post("/create", async function (req, res, next) {
    try {
        console.log(req.body);
            
        let cashflow = await Cashflow.create({
            Type: req.body.Type,
            Amount: req.body.Amount,
            Description: req.body.Description,
            ReferenceType: req.body.ReferenceType
        });

        Utils.SendResult(res, cashflow);
    } catch (error) {
        console.log(error);
        Utils.SendError(res, error);
    }
    
});

router.get("/get", async function (req, res, next) {
    try {
        let _cashflows = await Cashflow.findAll();
        Utils.SendResult(res, _cashflows);
    } catch (error) {
        console.log(error);
        Utils.SendError(res, error);
    }
});

module.exports = router;
