const { format, isValid, parse } = require("date-fns");

const formatDateMiddleware = (req, res, next) => {
    const { dueDate } = req.body;
    if (dueDate) {
      req.body.dueDate = format(parse(dueDate, "yyyy-MM-dd", new Date()), "yyyy-MM-dd");
    }
    next();
};

module.exports = {formatDateMiddleware};