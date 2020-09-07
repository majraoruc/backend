const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const authorizationBearer = req.headers["authorization"]

    if (!authorizationBearer) res.status(401).json("You are not authorized to perform this operation")
    else {
        const encryptionKey = process.env.ENCRYPTION_KEY

        try {
            const splitAuthorizationHeader = authorizationBearer.split(' ')

            const authorizationType = splitAuthorizationHeader[0]
            const authorizationToken = splitAuthorizationHeader[1]

            const decoded = jwt.verify(authorizationToken, encryptionKey);

            req.jwt = decoded

            if (authorizationType !== 'Bearer') {
                res.status(401).json("You are not authorized to perform this operation")
            } else { next() }

        } catch (err) {
            res.status(401).json("You are not authorized to perform this operation")
        }
    }

}