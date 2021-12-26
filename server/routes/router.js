var express = require("express");
var router = express.Router();
var MoralisService = require("../services/moralisService");
var BitMartService = require("../services/bitMartService");

router.get("/prices/all", async function (req, res) {

    var priceList = [];

    // getting PCS price
    await MoralisService.getPrice("PancakeSwap-V2").then(function (pcsData) {
        priceList.push(pcsData);
    }).catch(error => {
        console.log("Error Getting Price for PCS : " + error);
    });

    await BitMartService.getPrice().then(function (bmData) {
        priceList.push(bmData);
     }).catch(error => {
        console.log("Error Getting Price for BitMart : " + error);
    });

    res.send(priceList);
});

module.exports = router;