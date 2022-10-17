const utils = require("./utils");
const errHandler = require("./errHandler");
const user = require("../model/user");

/*
 * This function should be added for any routers when we want to
 * check if a user has logged in.
 */
module.exports = function (req, res, next) {
    user.findAll({
        where: {
            token: req.headers.token,
        },
    })
        .then(function (users) {
            if (users.length) {
                next();
            } else {
                utils.SendError(res, errHandler.error_login);
            }
        })
        .catch(function (error) {
            utils.SendError(res, error);
        });
};
