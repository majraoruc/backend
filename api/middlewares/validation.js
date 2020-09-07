const { body, validationResult } = require("express-validator");

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ name: 'validationError', message: 'Invalid parameters', error: errors.array() });
        return;
    }
    next();
};

exports.createValidation = method => {
    switch (method) {
        case "addProduct": {
            return [
                body("name", "name required").exists(),
                body("category", "category required").exists(),
                body("short_description", "short_description required").exists(),
                body("manufacturer", "manufacturer required").exists(),
                body("left_in_stock", "left_in_stock required").exists(),
                body("left_in_stock", "left_in_stock required").isNumeric(),
                body("price", "price required").exists(),
                body("price", "price required").isNumeric(),
            ];
        }
        case "updateProduct": {
            return [
                body("left_in_stock", "left_in_stock required").isNumeric(),
                body("price", "price required").isNumeric(),
            ];
        }
    }
};