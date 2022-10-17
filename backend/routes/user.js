const express = require("express");
const router = express.Router();
const auth = require("../common/auth");
const isAdmin = require("../common/isAdmin");
const errHandler = require("../common/errHandler");
const Utils = require("../common/utils");
const user = require("../model/user");

router.post("/create", auth, isAdmin, async function (req, res, next) {
    try {
        if (!req.body.username.trim().length) {
            return Utils.SendError(res, errHandler.error_empty_username);
        }
        await user.create({
            username: req.body.username,
            password: req.body.password,
            isAdmin: req.body.isAdmin,
            token: Utils.CalcStringMD5(req.body.username + req.body.password),
        });
        Utils.SendResult(res);
    } catch (error) {
        console.log(error);
        Utils.SendError(res, error);
    }
});

router.post("/login", async function (req, res, next) {
    try {
        let user = await user.findOne({
            where: req.body,
        });

        if (!user) {
            Utils.SendError(res, errHandler.error_credential);
            return;
        }

        Utils.SendResult(res, user);
    } catch (error) {
        console.log(error);
        Utils.SendError(res, error);
    }
});

router.get("/info", auth, async function (req, res, next) {
    try {
        let user = await user.findOne({
            where: {
                token: req.headers.token,
            },
        });

        if (!user) {
            Utils.SendError(res, errHandler.error_credential);
            return;
        }

        Utils.SendResult(res, user);
    } catch (error) {
        console.log(error);
        Utils.SendError(res, error);
    }
});

router.post("/password", auth, async function (req, res, next) {
    try {
        let user = await user.findOne({
            where: {
                token: req.headers.token,
            },
        });

        user.token = Utils.CalcStringMD5(user.username + req.body.password);
        await user.update(
            {
                password: req.body.password,
                token: user.token,
            },
            {
                where: {
                    token: req.headers.token,
                },
            }
        );

        Utils.SendResult(res, user);
    } catch (error) {
        console.log(error);
        Utils.SendError(res, error);
    }
});

router.post("/list", auth, isAdmin, async function (req, res, next) {
    try {
        let page = req.body.page ? req.body.page : 1;
        let limit = req.body.limit ? req.body.limit : 20;
        let offset = (page - 1) * limit;

        const count = await user.count();
        let users = await user.findAll({
            offset,
            limit,
            order: [["id", "DESC"]],
        });

        let data = {
            count,
            data: users,
        };

        Utils.SendResult(res, data);
    } catch (error) {
        console.log(error);
        Utils.SendError(res, error);
    }
});

router.post("/all", auth, isAdmin, async function (req, res, next) {
    try {
        const count = await user.count();
        let users = await user.findAll({
            attributes: ["id", "username"],
        });

        Utils.SendResult(res, users);
    } catch (error) {
        console.log(error);
        Utils.SendError(res, error);
    }
});

router.post("/detail", auth, isAdmin, async function (req, res, next) {
    try {
        let user = await user.findOne({
            where: {
                id: req.body.id,
            },
        });

        if (!user) {
            Utils.SendError(res, errHandler.error_no_user);
            return;
        }

        Utils.SendResult(res, user);
    } catch (error) {
        console.log(error);
        Utils.SendError(res, error);
    }
});

router.post("/update", auth, isAdmin, async function (req, res, next) {
    try {
        await user.update(
            {
                username: req.body.username,
                password: req.body.password,
                isAdmin: parseInt(req.body.id) === 1 ? 1 : req.body.isAdmin, //id为1的必须是admin
                token: Utils.CalcStringMD5(
                    req.body.username + req.body.password
                ),
            },
            {
                where: {
                    id: req.body.id,
                },
            }
        );

        Utils.SendResult(res);
    } catch (error) {
        console.log(error);
        Utils.SendError(res, error);
    }
});

router.post("/delete", auth, isAdmin, async function (req, res, next) {
    try {
        if (parseInt(req.body.id) === 1) {
            return Utils.SendError(res, errHandler.error_del_sysadmin);
        }

        await user.destroy({
            where: {
                id: req.body.id,
            },
        });

        Utils.SendResult(res);
    } catch (error) {
        console.log(error);
        Utils.SendError(res, error);
    }
});

module.exports = router;
