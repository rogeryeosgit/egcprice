const ZTGlobalUrl = "https://www.ztb.im/api/v1/trades?symbol=EGC_USDT&size=1";
var axios = require('axios');
const currency = require("currency.js");

var ZTGlobalService = {

    getPrice: async function () {

        var ztData;
        var price;

        try {
            ztData = await axios.get(ZTGlobalUrl);
            price = {
                exchangeName: 'ZTGlobal',
                usdValue: currency(ztData[0].price, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
            }
        } catch (e) {
            console.log("Error in BitMart Service : " + e);
            return e;
        }
        return price;
    },
}

module.exports = ZTGlobalService;