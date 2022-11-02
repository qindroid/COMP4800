/**
 * Module for establishing exceptions to be thrown at api-endpoints.
 */

class IDNotFoundException extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = { IDNotFoundException };
