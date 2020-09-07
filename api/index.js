const bodyParser = require("body-parser");

const productsControllers = require("./controllers/productsControllers")
const categoriesControllers = require("./controllers/categoriesControllers")
const authControllers = require("./controllers/authControllers")



const requestLogger = require("./middlewares/requestLogger")

module.exports = function (app) {

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(requestLogger)

    app.use("/login", authControllers)
    app.use("/products", productsControllers)
    app.use("/categories", categoriesControllers)
};