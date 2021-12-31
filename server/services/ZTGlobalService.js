const ZTGlobalUrl = "https://www.ztb.im/api/v1/trades?symbol=EGC_USDT&size=1";
var axios = require('axios');
const currency = require("currency.js");

var ZTGlobalService = {

    getPrice: async function (setExchangePrice) {

        var ztData;
        var price;

        try {
            ztData = await axios.get(ZTGlobalUrl);
            price = {
                exchangeName: 'ZTGlobal',
                usdValue: currency(ztData.data[0].price, {
                    precision: 9
                }).format(),
                timestamp: Date.now(),
            }
        } catch (e) {
            console.log("Error in ZTGlobal Service : " + e);
            return e;
        }
        setExchangePrice(price.exchangeName, price);
    },
}

module.exports = ZTGlobalService;