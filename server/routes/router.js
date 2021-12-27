var express = require("express");
var router = express.Router();
var CacheService = require("../services/CacheService");

router.get("/prices/all", function (req, res) {
    if (req.query.authK === process.env.EGC_APP_KEY) {
        res.send(CacheService.getPriceList());
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;