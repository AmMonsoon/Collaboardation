

module.exports = {
  validateId: require('./validateId'),
  checkExists: require('./checkExists'),
  validateEmail: require('./validateEmail'),
  duplicateEmail: require('./duplicateEmail'),
  validateTitle: require('./validateTitle'),
  checkUserFields: require('./checkUserFields'),
  checkRequestBody: require('./checkRequestBody'),
  errorHandler: require('./errorHandler'),
  notFoundHandler: require('./notFoundHandler'),
  requireOwnership: require('./requireOwnership')
};