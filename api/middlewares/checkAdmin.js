const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (!req.jwt.is_admin) res.status(401).json("You are not authorized to perform this operation")
    else next()

}