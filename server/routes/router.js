var express = require("express");
var router = express.Router();
var CacheService = require("../services/CacheService");

router.get("/prices/all", function (req, res) {
    res.send(CacheService.getPriceList());
});

module.exports = router;