var express = require("express");
var router = express.Router();
var CacheService = require("../services/CacheService");

router.get("/prices/all", function (req, res) {
    console.log(req.query.authK);
    console.log("--->"  + req.query);
    console.log(process.env.EGC_APP_KEY);

    if (req.query.authK === process.env.EGC_APP_KEY) {
        res.send(CacheService.getPriceList());
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;