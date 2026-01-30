const ForbiddenError = require("../errors/ForbiddenError");

const requireOwnership = (paramId, model) => {
  return async (req, res, next) => {
    
    const record = await model.findByPk(req.params[paramId]);

    if (!record) {
      return next(new ForbiddenError("Resource not found"));
    }

    // req.user.id comes from JWT
    if (record.userId !== req.user.id) {
      return next(new ForbiddenError("You do not own this resource"));
    }

    // attach it in case controller needs it
    req.record = record;

    next();
  };
};

module.exports = requireOwnership;