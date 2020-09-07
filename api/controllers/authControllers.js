const express = require("express");
const jwt = require('jsonwebtoken')

const router = express.Router();

router.get("/", loginHandler);

async function loginHandler(req, res, next) {
    const privateKey = process.env.ENCRYPTION_KEY
    const jwtEXP = process.env.JWT_EXP

    let jwtBody = {
        user_id: "1",
        user_name: "Majra",
        is_admin: true,
    }

    jwt.sign(jwtBody, privateKey, { expiresIn: jwtEXP }, function (err, token) {
        if (err) res.status(500).json(err)
        else res.status(200).json({ jwt_token: token })
    })
}


module.exports = router;