const express = require("express");

const mongojs = require('mongojs');
const checkAccessToken = require("../middlewares/checkAccessToken")
const checkAdmin = require("../middlewares/checkAdmin")

const db = mongojs(process.env.MONGODB_URL, ["products"]);
const validation = require("../middlewares/validation");
const checkValidId = require("../middlewares/checkValidId")

const router = express.Router();

router.get("/", getProductsHandler);
router.get("/:id", checkValidId, getProductHandler);
router.post("/", checkAccessToken, checkAdmin, validation.createValidation("addProduct"), validation.checkValidation, postProductHandler);
router.put("/:id", checkAccessToken, checkValidId, checkAdmin, checkAdmin, validation.createValidation("updateProduct"), validation.checkValidation, putProductHandler);
router.delete("/:id", checkAccessToken, checkValidId, checkAdmin, deleteProductHandler);

async function getProductsHandler(req, res, next) {
    let skip = parseInt(req.query.skip) || 0
    let limit = parseInt(req.query.limit) || 5
    db.products.find({}).limit(limit).skip(skip, function (err, docs) {
        if (err) res.status(500).json(err)
        else res.status(200).json(docs)
    })
}

async function getProductHandler(req, res, next) {
    let id = req.params.id

    db.products.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        if (err) res.status(500).json(err)
        else if (!doc) res.status(404).json("Product not found.")
        else res.status(200).json(doc)
    })
}

async function postProductHandler(req, res, next) {
    let newProduct = req.body
    db.products.save(newProduct, function (err, docs) {
        if (err) res.status(500).json(err)
        else res.status(200).json("Product successfully added.")
    })
}

async function putProductHandler(req, res, next) {
    let id = req.params.id
    let updatedElement = {}
    if (req.body.name) updatedElement.name = req.body.name
    if (req.body.category) updatedElement.category = req.body.category
    if (req.body.short_description) updatedElement.short_description = req.body.short_description
    if (req.body.manufacturer) updatedElement.manufacturer = req.body.manufacturer
    if (req.body.left_in_stock) updatedElement.left_in_stock = req.body.left_in_stock
    if (req.body.price) updatedElement.price = req.body.price


    db.products.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: updatedElement },
        new: true
    },
        function (err, doc, lastErrorObject) {
            if (err) res.status(500).json(err)
            else if (!doc) res.status(404).json("Product not found.")
            else res.status(200).json(doc)
        })
}

async function deleteProductHandler(req, res, next) {
    let id = req.params.id
    db.products.remove({ _id: mongojs.ObjectId(id) }, function (err, docs) {
        if (err) res.status(500).json(err)
        else res.status(200).json(docs)
    })
}

module.exports = router;