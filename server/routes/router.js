var express = require("express");
var router = express.Router();
var MoralisService = require("../services/MoralisService");
var BitMartService = require("../services/BitMartService");
var ZTGlobalService = require("../services/ZTGlobalService");

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

    await ZTGlobalService.getPrice().then(function (ztData) {
        priceList.push(ztData);
     }).catch(error => {
        console.log("Error Getting Price for ZT Global : " + error);
    });

    res.send(priceList);
});

module.exports = router;