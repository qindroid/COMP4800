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
            Type: req.body.type,
            Amount: req.body.amount,
            Description: req.body.description,
            ReferenceType: req.body.referenceType
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

/*
PATCH is a partial update. It is used to update only the fields that have changed.
*/
router.patch("/update", async function (req, res, next) {
    try {
        let _cashflow = await Cashflow.findOne({
            where: {
                id: req.body.id
            }
        });
        if (_cashflow) {
            _cashflow.update({
                Type: req.body.type,
                Amount: req.body.amount,
                Description: req.body.description,
                ReferenceType: req.body.referenceType
            });
            Utils.SendResult(res, _cashflow);
        } else {
            Utils.SendError(res, errHandler.error_cashflow_not_found);
        }
    } catch (error) {
        console.log(error);
        Utils.SendError(res, error);
    }
});

router.delete("/delete", async function (req, res, next) {
    try {
        let _cashflow = await Cashflow.findOne({
            where: {
                id: req.body.id
            }
        });
        if (_cashflow) {
            await _cashflow.destroy();
            Utils.SendResult(res);
        } else {
            Utils.SendError(res, errHandler.error_cashflow_not_found);
        }
    } catch (error) {
        console.log(error);
        Utils.SendError(res, error);
    }
});

module.exports = router;
