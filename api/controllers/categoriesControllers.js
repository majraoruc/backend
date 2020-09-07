const express = require("express");

const mongojs = require('mongojs');

const db = mongojs(process.env.MONGODB_URL, ["products"]);

const router = express.Router();

router.get("/:category/count", categoryCountHandler);
router.get("/:category/cheapest", categoryCheapestHandler);

async function categoryCountHandler(req, res, next) {
    let category = req.params.category
    db.products.count({ category }, function (err, docs) {
        if (err) res.status(500).json(err)
        else res.status(200).json(docs)
    })
}

async function categoryCheapestHandler(req, res, next) {
    let category = req.params.category
    db.products.aggregate(
        [
            { $match: { category } },
            { $sort: { price: 1 } },
            { $project: { name: "$name", left_in_stock: "$left_in_stock", price: "$price" } },
            { $limit: 1 }


        ],
        function (err, docs) {
            if (err) res.status(500).json(err)
            else if (docs.length < 1) res.status(500).json("Error in aggregate function")
            else res.status(200).json(docs[0])
        })
}

module.exports = router;