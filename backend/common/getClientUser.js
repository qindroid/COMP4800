const User = require("../models/user");

async function getClient(token) {
  return await User.findOne({ where: { id: token } });
}

module.exports = { getClient };
