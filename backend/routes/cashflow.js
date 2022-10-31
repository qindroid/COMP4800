const express = require("express");
const router = express.Router();
const auth = require("../common/auth");
const checkAdmin = require("../common/isAdmin");
const errHandler = require("../common/errHandler");
const Utils = require("../common/utils");
const Cashflow = require("../models/cashflow");

router.post("/create", auth, async function (req, res, next) {
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
router.post("/delete", auth);
module.exports = router;
