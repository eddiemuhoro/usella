"use strict";
exports.__esModule = true;
exports.handleErrors = void 0;
var express_validator_1 = require("express-validator");
var handleErrors = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty) {
        res.status(400).errors(errors.array());
    }
    else {
        next();
    }
};
exports.handleErrors = handleErrors;
