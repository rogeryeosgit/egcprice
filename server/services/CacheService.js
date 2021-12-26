var MoralisService = require("../services/MoralisService");
var BitMartService = require("../services/BitMartService");
var ZTGlobalService = require("../services/ZTGlobalService");
var LBankService = require("../services/LBankService");
var BiboxService = require("../services/BiboxService");
var cron = require('node-cron');
const NodeCache = require("node-cache");
const EGCCache = new NodeCache();
var priceList = [];

var CacheService = {

    init: function () {

        getUpdatedPrices(); // initial setup
        cron.schedule('*/20 * * * * *', async () => {
            getUpdatedPrices();
        });
    },

    getPriceList: function () {
        return EGCCache.get("priceList");
    }
}

module.exports = CacheService;


// Function to get prices from all exchanges
async function getUpdatedPrices() {
    // empty priceList
    priceList.length = 0;

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

    await LBankService.getPrice().then(function (lbData) {
        priceList.push(lbData);
    }).catch(error => {
        console.log("Error Getting Price for LBank : " + error);
    });

    await BiboxService.getPrice().then(function (bbData) {
        priceList.push(bbData);
    }).catch(error => {
        console.log("Error Getting Price for Bibox : " + error);
    });

    EGCCache.set("priceList", priceList, 3600);
}