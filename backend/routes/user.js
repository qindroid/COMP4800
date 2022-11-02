const express = require("express");
const router = express.Router();
const auth = require("../common/auth");
const checkAdmin = require("../common/isAdmin");
const errHandler = require("../common/errHandler");
const { endpoint } = require("../common/errHandler");
const Utils = require("../common/utils");
const User = require("../models/user");

function createDefaultExpiryDate() {
  let dateNow = new Date();
  dateNow.setMonth(dateNow.getMonth() + 3);

  return dateNow;
}

router.post(
  "/create",
  auth,
  checkAdmin,
  endpoint(async (req, res, next) => {
    try {
      if (!req.body.username.trim().length) {
        return Utils.SendError(res, errHandler.error_empty_username);
      }
      let _expired = createDefaultExpiryDate();

      await User.create({
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        created: Utils.GetNow(),
        expired: _expired,
        token: Utils.CalcStringMD5(req.body.username + req.body.password),
      });
      Utils.SendResult(res);
    } catch (error) {
      console.log(error);
      Utils.SendError(res, error);
    }
  })
);

router.post(
  "/signup",
  endpoint(async (req, res, next) => {
    if (!req.body.username.trim().length) {
      return Utils.SendError(res, errHandler.error_empty_username);
    }
    let _expired = createDefaultExpiryDate();

    await User.create({
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      created: Utils.GetNow(),
      expired: _expired, // defalut 3 days expired
      token: Utils.CalcStringMD5(req.body.username + req.body.password),
    });
    Utils.SendResult(res);
  })
);

router.post(
  "/login",
  endpoint(async (req, res, next) => {
    let user = await User.findOne({
      where: req.body,
    });

    if (!user) {
      Utils.SendError(res, errHandler.error_credential);
      return;
    }

    Utils.SendResult(res, user);
  })
);

router.get(
  "/info",
  auth,
  endpoint(async (req, res, next) => {
    let user = await User.findOne({
      where: {
        token: req.headers.token,
      },
    });

    if (!user) {
      Utils.SendError(res, errHandler.error_credential);
      return;
    }

    Utils.SendResult(res, user);
  })
);

router.post("/password", auth, async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        token: req.headers.token,
      },
    });

    user.token = Utils.CalcStringMD5(user.username + req.body.password);
    await User.update(
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

router.post(
  "/list",
  auth,
  checkAdmin,
  endpoint(async (req, res, next) => {
    let page = req.body.page ? req.body.page : 1;
    let limit = req.body.limit ? req.body.limit : 20;
    let offset = (page - 1) * limit;

    const count = await User.count();
    let users = await User.findAll({
      offset,
      limit,
      order: [["id", "DESC"]],
    });

    let data = {
      count,
      data: users,
    };

    Utils.SendResult(res, data);
  })
);

router.post(
  "/all",
  auth,
  checkAdmin,
  endpoint(async (req, res, next) => {
    const count = await User.count();
    let users = await User.findAll({
      attributes: ["id", "username"],
    });

    Utils.SendResult(res, users);
  })
);

router.post(
  "/detail",
  auth,
  checkAdmin,
  endpoint(async (req, res, next) => {
    let user = await User.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (!user) {
      Utils.SendError(res, errHandler.error_no_user);
      return;
    }

    Utils.SendResult(res, user);
  })
);

router.post(
  "/update",
  auth,
  checkAdmin,
  endpoint(async (req, res, next) => {
    await User.update(
      {
        username: req.body.username,
        password: req.body.password,
        isAdmin: parseInt(req.body.id) === 1 ? 1 : req.body.isAdmin, //id为1的必须是admin
        token: Utils.CalcStringMD5(req.body.username + req.body.password),
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    Utils.SendResult(res);
  })
);

router.post(
  "/delete",
  auth,
  checkAdmin,
  endpoint(async (req, res, next) => {
    if (parseInt(req.body.id) === 1) {
      return Utils.SendError(res, errHandler.error_del_sysadmin);
    }

    await User.destroy({
      where: {
        id: req.body.id,
      },
    });

    Utils.SendResult(res);
  })
);

module.exports = router;
