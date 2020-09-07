module.exports = (req, res, next) => {
    console.log("Request IP: ", req.ip, ', Server time: ', Date.now());
    next();
}