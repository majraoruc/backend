const mongojs = require('mongojs');

module.exports = function (req, res, next) {
    let isIdValid = true
    try {
        let a = mongojs.ObjectId(req.params.id)
    } catch (err) {
        isIdValid = false
    }

    if (isIdValid) next()
    else res.status(400).json("id is not valid")

}